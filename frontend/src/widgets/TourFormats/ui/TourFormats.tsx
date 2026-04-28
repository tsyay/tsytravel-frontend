// TourFormats.tsx
import { TOUR_FORMATS } from "../model/tourFormats";
import { TourFormatCard } from "./TourFormatCard/TourFormatCard";
import styles from "./tourFormats.module.css";

export function TourFormats() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {TOUR_FORMATS.map((format) => (
          <TourFormatCard key={format.id} format={format} />
        ))}
      </div>
    </section>
  );
}