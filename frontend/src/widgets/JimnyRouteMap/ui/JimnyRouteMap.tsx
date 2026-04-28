import { useEffect, useRef, useState } from "react";
import styles from "./jimnyRouteMap.module.css";

type RoutePoint = {
  id: string;
  day: number;
  order: number;
  title: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  type: "start" | "stop" | "camp" | "end";
};

const ROUTE_POINTS: RoutePoint[] = [
  {
    id: "ulan-ude",
    day: 1,
    order: 1,
    title: "Улан-Удэ",
    description: "Старт из столицы Бурятии. Загружаем машины, проверяем снаряжение и выдвигаемся на юг. Заправка, закупка провизии на три дня.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
    lat: 51.8333,
    lng: 107.6000,
    type: "start",
  },
  {
    id: "selenga",
    day: 1,
    order: 2,
    title: "Переправа через Селенгу",
    description: "Первый серьезный брод — река Селенга в межсезонье. Проверяем машины, фотографируемся на фоне горных хребтов.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    lat: 51.5500,
    lng: 107.2000,
    type: "stop",
  },
  {
    id: "hamar-daban",
    day: 1,
    order: 3,
    title: "Перевал Хамар-Дабан",
    description: "Подъем на перевал 1800 метров. Дорога исчезает — едем по GPS и интуиции. Ночевка в палатках у подножия хребта.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    lat: 51.2000,
    lng: 106.8000,
    type: "camp",
  },
  {
    id: "baikal-south",
    day: 2,
    order: 4,
    title: "Южный берег Байкала",
    description: "Спускаемся к Байкалу с горной стороны. Купание в кристально чистой воде, обед на берегу. Температура воды +12°C — бодрит.",
    image: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=400&q=80",
    lat: 51.5000,
    lng: 105.5000,
    type: "stop",
  },
  {
    id: "snezhnaya",
    day: 2,
    order: 5,
    title: "Река Снежная",
    description: "Брод через горную реку Снежная. Самый технически сложный участок маршрута. Глубина до 80 см, сильное течение.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
    lat: 51.6000,
    lng: 104.8000,
    type: "stop",
  },
  {
    id: "kultuk",
    day: 2,
    order: 6,
    title: "Стоянка у Култука",
    description: "Ночевка в поселке Култук у самого южного края Байкала. Баня, ужин из свежепойманного омуля, костер.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
    lat: 51.7200,
    lng: 103.7000,
    type: "camp",
  },
  {
    id: "arshan",
    day: 3,
    order: 7,
    title: "Аршан — термальные источники",
    description: "Курорт у подножия Восточных Саян. Купание в горячих источниках после двух дней внедорожья. Водопады и буддийские ступы.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
    lat: 51.9300,
    lng: 102.4300,
    type: "stop",
  },
  {
    id: "tunka",
    day: 3,
    order: 8,
    title: "Тункинская долина",
    description: "Финальный перегон через широкую степную долину в окружении Саян. Финиш в Улан-Удэ к вечеру третьего дня.",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400&q=80",
    lat: 51.7000,
    lng: 102.9000,
    type: "end",
  },
];

const DAY_COLORS: Record<number, string> = {
  1: "#C0392B",
  2: "#2E8B57",
  3: "#D4AF37",
};

const TYPE_LABELS: Record<RoutePoint["type"], string> = {
  start: "Старт",
  stop: "Остановка",
  camp: "Ночевка",
  end: "Финиш",
};

export function JimnyRouteMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [activePoint, setActivePoint] = useState<RoutePoint | null>(ROUTE_POINTS[0]);
  const [activeDay, setActiveDay] = useState<number | "all">("all");
  const [mapActive, setMapActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const initMap = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      const map = L.map(mapContainerRef.current!, {
        center: [51.7, 105.5],
        zoom: 7,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      const days = [1, 2, 3];
      days.forEach((day) => {
        const dayPoints = ROUTE_POINTS.filter((p) => p.day === day);
        const coords = dayPoints.map((p) => [p.lat, p.lng] as [number, number]);
        if (coords.length > 1) {
          L.polyline(coords, {
            color: DAY_COLORS[day],
            weight: 3,
            opacity: 0.8,
            dashArray: "8, 6",
          }).addTo(map);
        }
      });

      ROUTE_POINTS.forEach((point) => {
        const color = DAY_COLORS[point.day];

        const iconHtml = `
          <div style="
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: ${color};
            border: 3px solid white;
            box-shadow: 0 2px 12px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: system-ui, sans-serif;
            font-size: 13px;
            font-weight: 700;
            color: white;
            cursor: pointer;
          ">${point.order}</div>
        `;

        const icon = L.divIcon({
          html: iconHtml,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const marker = L.marker([point.lat, point.lng], { icon }).addTo(map);

        marker.on("click", () => {
          setActivePoint(point);
          map.flyTo([point.lat, point.lng], 10, { duration: 1 });
        });
      });

      mapRef.current = map;
    };

    initMap();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const enableMap = () => {
    const map = mapRef.current;
    if (!map) return;
    setMapActive(true);
    map.scrollWheelZoom.enable();
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
  };

  const disableMap = () => {
    const map = mapRef.current;
    if (!map) return;
    setMapActive(false);
    map.scrollWheelZoom.disable();
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
  };

  const handleWheel = () => {
    if (!mapActive) {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      setShowHint(true);
      hintTimerRef.current = setTimeout(() => setShowHint(false), 2000);
    }
  };

  const filteredPoints = activeDay === "all"
    ? ROUTE_POINTS
    : ROUTE_POINTS.filter((p) => p.day === activeDay);

  const handlePointClick = (point: RoutePoint) => {
    setActivePoint(point);
    if (mapRef.current) {
      mapRef.current.flyTo([point.lat, point.lng], 10, { duration: 1 });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.tag}>Маршрут · 3 дня</span>
            <h2 className={styles.heading}>Маршрут тура</h2>
            <p className={styles.subheading}>Улан-Удэ — Хамар-Дабан — Байкал — Аршан</p>
          </div>

          <div className={styles.dayFilters}>
            <button
              className={`${styles.dayBtn} ${activeDay === "all" ? styles.dayBtnActive : ""}`}
              style={activeDay === "all" ? { borderColor: "#C0392B", color: "#C0392B" } : {}}
              onClick={() => setActiveDay("all")}
            >
              Все дни
            </button>
            {[1, 2, 3].map((day) => (
              <button
                key={day}
                className={`${styles.dayBtn} ${activeDay === day ? styles.dayBtnActive : ""}`}
                style={activeDay === day ? { borderColor: DAY_COLORS[day], color: DAY_COLORS[day] } : {}}
                onClick={() => setActiveDay(day)}
              >
                День {day}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.pointList}>
              {filteredPoints.map((point) => (
                <button
                  key={point.id}
                  className={`${styles.pointItem} ${activePoint?.id === point.id ? styles.pointItemActive : ""}`}
                  onClick={() => handlePointClick(point)}
                  style={activePoint?.id === point.id ? { borderLeftColor: DAY_COLORS[point.day] } : {}}
                >
                  <div
                    className={styles.pointNumber}
                    style={{ backgroundColor: DAY_COLORS[point.day] }}
                  >
                    {point.order}
                  </div>
                  <div className={styles.pointInfo}>
                    <span className={styles.pointTitle}>{point.title}</span>
                    <span className={styles.pointMeta}>
                      День {point.day} · {TYPE_LABELS[point.type]}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {activePoint && (
              <div className={styles.card}>
                <div className={styles.cardImage}>
                  <img src={activePoint.image} alt={activePoint.title} />
                  <div
                    className={styles.cardDay}
                    style={{ backgroundColor: DAY_COLORS[activePoint.day] }}
                  >
                    День {activePoint.day}
                  </div>
                  <div className={styles.cardType}>
                    {TYPE_LABELS[activePoint.type]}
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{activePoint.title}</h3>
                  <p className={styles.cardDescription}>{activePoint.description}</p>
                </div>
              </div>
            )}
          </aside>

          <div
            className={`${styles.mapWrapper} ${mapActive ? styles.mapActive : ""}`}
            onClick={enableMap}
            onMouseLeave={disableMap}
            onWheel={handleWheel}
          >
            <div ref={mapContainerRef} className={styles.map} />

            {!mapActive && (
              <div className={styles.mapOverlay}>
                <div className={styles.mapOverlayContent}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="white" strokeWidth="1.5" fill="none"/>
                    <circle cx="12" cy="9" r="2.5" stroke="white" strokeWidth="1.5"/>
                  </svg>
                  <span className={styles.mapOverlayText}>Нажмите чтобы взаимодействовать с картой</span>
                </div>
              </div>
            )}

            <div className={`${styles.scrollHint} ${showHint ? styles.scrollHintVisible : ""}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="8" y="2" width="8" height="14" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 6v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Нажмите на карту для управления масштабом
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}