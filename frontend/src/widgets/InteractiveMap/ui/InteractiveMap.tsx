import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker, CircleMarker } from "leaflet";
import { MAP_POINTS, CATEGORY_COLORS, CATEGORY_LABELS } from "../model/mapPoints";
import type { MapPoint } from "../model/mapPoints";
import styles from "./interactiveMap.module.css";

export function InteractiveMap() {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, CircleMarker>>(new Map());
  const [activePoint, setActivePoint] = useState<MapPoint | null>(null);
  const [activeCategory, setActiveCategory] = useState<MapPoint["category"] | "all">("all");

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
          if (activePoint?.id !== point.id) {
            marker.setStyle({ radius: 13 });
          }
        });

        marker.on("mouseout", () => {
          if (activePoint?.id !== point.id) {
            marker.setStyle({ radius: 10 });
          }
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
          {/* Боковая панель */}
          <aside className={styles.sidebar}>
            {/* Фильтры */}
            <div className={styles.filters}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filter} ${activeCategory === cat ? styles.filterActive : ""}`}
                  onClick={() => setActiveCategory(cat)}
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

            {/* Список мест */}
            <div className={styles.list}>
              {filteredPoints.map((point) => (
                <button
                  key={point.id}
                  className={`${styles.item} ${activePoint?.id === point.id ? styles.itemActive : ""}`}
                  onClick={() => handlePointClick(point)}
                >
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: CATEGORY_COLORS[point.category] }}
                  />
                  <div className={styles.itemText}>
                    <span className={styles.itemTitle}>{point.title}</span>
                    <span className={styles.itemCategory}>
                      {CATEGORY_LABELS[point.category]}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Карточка активного места */}
            {activePoint && (
              <div className={styles.card}>
                <div
                  className={styles.cardAccent}
                  style={{ backgroundColor: CATEGORY_COLORS[activePoint.category] }}
                />
                <span className={styles.cardCategory}>
                  {CATEGORY_LABELS[activePoint.category]}
                </span>
                <h3 className={styles.cardTitle}>{activePoint.title}</h3>
                <p className={styles.cardDescription}>{activePoint.description}</p>
                <button className={styles.cardCta}>Подробнее →</button>
              </div>
            )}
          </aside>

          {/* Карта */}
          <div className={styles.mapWrapper}>
            <div ref={mapContainerRef} className={styles.map} />
          </div>
        </div>
      </div>
    </section>
  );
}