import styles from "./toursFilters.module.css";
import type { Filters } from "../../../features/tours-filter";
import {
  DIFFICULTY_LABELS,
  SEASON_LABELS,
  CATEGORY_LABELS,
} from "../../../features/tours-filter";
import type { Difficulty, Season, TourCategory } from "../../../entities/tour/model/tours.mock";

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleSeason: (s: Season) => void;
  toggleCategory: (c: TourCategory) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
};

export function ToursFilters({
  filters,
  setFilters,
  toggleSeason,
  toggleCategory,
  resetFilters,
  hasActiveFilters,
}: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.title}>Фильтры</span>
        {hasActiveFilters && (
          <button className={styles.resetBtn} onClick={resetFilters}>Сбросить</button>
        )}
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Цена, ₽</span>
        <div className={styles.rangeInputs}>
          <input
            type="number"
            className={styles.rangeInput}
            placeholder="от"
            value={filters.priceMin || ""}
            onChange={(e) => setFilters((f) => ({ ...f, priceMin: Number(e.target.value) || 0 }))}
          />
          <span className={styles.rangeDash}>—</span>
          <input
            type="number"
            className={styles.rangeInput}
            placeholder="до"
            value={filters.priceMax === 200000 ? "" : filters.priceMax}
            onChange={(e) => setFilters((f) => ({ ...f, priceMax: Number(e.target.value) || 200000 }))}
          />
        </div>
        <div className={styles.hints}>
          {[30000, 50000, 80000, 100000].map((p) => (
            <button key={p} className={styles.hint} onClick={() => setFilters((f) => ({ ...f, priceMax: p }))}>
              до {(p / 1000).toFixed(0)}к
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Длительность, дней</span>
        <div className={styles.rangeInputs}>
          <input
            type="number"
            className={styles.rangeInput}
            placeholder="от"
            value={filters.daysMin === 1 ? "" : filters.daysMin}
            onChange={(e) => setFilters((f) => ({ ...f, daysMin: Number(e.target.value) || 1 }))}
          />
          <span className={styles.rangeDash}>—</span>
          <input
            type="number"
            className={styles.rangeInput}
            placeholder="до"
            value={filters.daysMax === 14 ? "" : filters.daysMax}
            onChange={(e) => setFilters((f) => ({ ...f, daysMax: Number(e.target.value) || 14 }))}
          />
        </div>
        <div className={styles.hints}>
          {[3, 5, 7, 10].map((d) => (
            <button key={d} className={styles.hint} onClick={() => setFilters((f) => ({ ...f, daysMax: d }))}>
              до {d}д
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Сложность</span>
        <div className={styles.chipGroup}>
          {(["all", "easy", "medium", "hard"] as const).map((d) => (
            <button
              key={d}
              className={`${styles.chip} ${filters.difficulty === d ? styles.chipActive : ""}`}
              onClick={() => setFilters((f) => ({ ...f, difficulty: d }))}
            >
              {d === "all" ? "Все" : DIFFICULTY_LABELS[d as Difficulty]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Сезон</span>
        <div className={styles.chipGroup}>
          {(["spring", "summer", "autumn", "winter"] as const).map((s) => (
            <button
              key={s}
              className={`${styles.chip} ${filters.seasons.includes(s) ? styles.chipActive : ""}`}
              onClick={() => toggleSeason(s)}
            >
              {SEASON_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Категория</span>
        <div className={styles.chipGroup}>
          {(["nature", "culture", "adventure", "spiritual"] as const).map((c) => (
            <button
              key={c}
              className={`${styles.chip} ${filters.categories.includes(c) ? styles.chipActive : ""}`}
              onClick={() => toggleCategory(c)}
            >
              {CATEGORY_LABELS[c as TourCategory]}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}