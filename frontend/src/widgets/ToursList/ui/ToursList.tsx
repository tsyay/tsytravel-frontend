import styles from "./toursList.module.css";
import { TourCard } from "./TourCard";
import type { Tour } from "../../../entities/tour/model/tours.mock";
import type { SortKey } from "../../../features/tours-filter";
import { SORT_LABELS } from "../../../features/tours-filter";

type Props = {
  tours: Tour[];
  sort: SortKey;
  onSort: (s: SortKey) => void;
  onReset: () => void;
};

export function ToursList({ tours, sort, onSort, onReset }: Props) {
  return (
    <main className={styles.results}>
      <div className={styles.resultsHeader}>
        <span className={styles.resultsCount}>
          Найдено <strong>{tours.length}</strong> туров
        </span>
        <div className={styles.sortGroup}>
          {(["rating", "price", "days", "reviews"] as const).map((s) => (
            <button
              key={s}
              className={`${styles.sortBtn} ${sort === s ? styles.sortBtnActive : ""}`}
              onClick={() => onSort(s)}
            >
              {SORT_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {tours.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🏔</span>
          <h3 className={styles.emptyTitle}>Ничего не найдено</h3>
          <p className={styles.emptyText}>Попробуйте изменить фильтры или сбросить поиск</p>
          <button className={styles.emptyReset} onClick={onReset}>Сбросить фильтры</button>
        </div>
      ) : (
        <div className={styles.cardList}>
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </main>
  );
}