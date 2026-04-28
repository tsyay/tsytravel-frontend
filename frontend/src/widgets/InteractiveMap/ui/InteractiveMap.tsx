import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, CircleMarker } from "leaflet";
import { MAP_POINTS, CATEGORY_COLORS, CATEGORY_LABELS } from "../model/mapPoints";
import type { MapPoint } from "../model/mapPoints";
import styles from "./interactiveMap.module.css";

export function InteractiveMap() {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, CircleMarker>>(new Map());
  const [activePoint, setActivePoint] = useState<MapPoint | null>(null);
  const [activeCategory, setActiveCategory] = useState<MapPoint["category"] | "all">("all");
  const [mapActive, setMapActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const initMap = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      const map = L.map(mapContainerRef.current!, {
        center: [53.0, 107.5],
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

      MAP_POINTS.forEach((point) => {
        const color = CATEGORY_COLORS[point.category];

        const marker = L.circleMarker([point.lat, point.lng], {
          radius: 10,
          fillColor: color,
          color: "#fff",
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        marker.on("click", () => {
          setActivePoint(point);
          map.flyTo([point.lat, point.lng], 10, { duration: 1.2 });
          markersRef.current.forEach((m, id) => {
            m.setStyle({
              radius: id === point.id ? 14 : 10,
              weight: id === point.id ? 3 : 2.5,
            });
          });
        });

        marker.on("mouseover", () => {
          if (activePoint?.id !== point.id) marker.setStyle({ radius: 13 });
        });

        marker.on("mouseout", () => {
          if (activePoint?.id !== point.id) marker.setStyle({ radius: 10 });
        });

        markersRef.current.set(point.id, marker);
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

  const handleScroll = () => {
    if (!mapActive) {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      setShowHint(true);
      hintTimerRef.current = setTimeout(() => setShowHint(false), 2000);
    }
  };

  const handlePointClick = (point: MapPoint) => {
    setActivePoint(point);
    if (mapRef.current) {
      mapRef.current.flyTo([point.lat, point.lng], 10, { duration: 1.2 });
    }
    markersRef.current.forEach((m, id) => {
      m.setStyle({
        radius: id === point.id ? 14 : 10,
        weight: id === point.id ? 3 : 2.5,
      });
    });
  };

  const filteredPoints = activeCategory === "all"
    ? MAP_POINTS
    : MAP_POINTS.filter((p) => p.category === activeCategory);

  const categories = ["all", ...Array.from(new Set(MAP_POINTS.map((p) => p.category)))] as const;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Места на карте</h2>
          <p className={styles.subheading}>Исследуйте Бурятию</p>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.filters}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filter} ${activeCategory === cat ? styles.filterActive : ""}`}
                  onClick={() => setActiveCategory(cat as MapPoint["category"] | "all")}
                  style={
                    activeCategory === cat && cat !== "all"
                      ? { borderColor: CATEGORY_COLORS[cat as MapPoint["category"]], color: CATEGORY_COLORS[cat as MapPoint["category"]] }
                      : {}
                  }
                >
                  {cat === "all" ? "Все" : CATEGORY_LABELS[cat as MapPoint["category"]]}
                </button>
              ))}
            </div>

            <div className={styles.list}>
              {filteredPoints.map((point) => (
                <button
                  key={point.id}
                  className={`${styles.item} ${activePoint?.id === point.id ? styles.itemActive : ""}`}
                  onClick={() => handlePointClick(point)}
                >
                  <span className={styles.dot} style={{ backgroundColor: CATEGORY_COLORS[point.category] }} />
                  <div className={styles.itemText}>
                    <span className={styles.itemTitle}>{point.title}</span>
                    <span className={styles.itemCategory}>{CATEGORY_LABELS[point.category]}</span>
                  </div>
                </button>
              ))}
            </div>

            {activePoint && (
              <div className={styles.card}>
                <div className={styles.cardAccent} style={{ backgroundColor: CATEGORY_COLORS[activePoint.category] }} />
                <span className={styles.cardCategory}>{CATEGORY_LABELS[activePoint.category]}</span>
                <h3 className={styles.cardTitle}>{activePoint.title}</h3>
                <p className={styles.cardDescription}>{activePoint.description}</p>
                <button className={styles.cardCta}>Подробнее →</button>
              </div>
            )}
          </aside>

          <div
            className={`${styles.mapWrapper} ${mapActive ? styles.mapActive : ""}`}
            onClick={enableMap}
            onMouseLeave={disableMap}
            onWheel={handleScroll}
          >
            <div ref={mapContainerRef} className={styles.map} />

            {/* Оверлей когда карта неактивна */}
            {!mapActive && (
              <div className={styles.mapOverlay}>
                <div className={styles.mapOverlayContent}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="white" strokeWidth="1.5" fill="none"/>
                    <circle cx="12" cy="9" r="2.5" stroke="white" strokeWidth="1.5"/>
                  </svg>
                  <span className={styles.mapOverlayText}>Нажмите чтобы взаимодействовать с картой</span>
                </div>
              </div>
            )}

            {/* Подсказка при скролле */}
            <div className={`${styles.scrollHint} ${showHint ? styles.scrollHintVisible : ""}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="8" y="2" width="8" height="14" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 6v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M5 20h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Нажмите на карту для управления масштабом
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}