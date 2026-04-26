import styles from "./toursHero.module.css";
import jimny from "../../../assets/hero/sayani.webp";

type Props = {
  search: string;
  onSearch: (val: string) => void;
  totalCount: number;
};

export function ToursHero({ search, onSearch, totalCount }: Props) {
  return (
    <div className={styles.hero} data-header-theme="dark">
      <img src={jimny} alt="" className={styles.bg} />
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <h1 className={styles.title}>Все туры по Бурятии</h1>
        <p className={styles.sub}>{totalCount} маршрутов — найдите своё приключение</p>

        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
          {search && (
            <button className={styles.searchClear} onClick={() => onSearch("")}>✕</button>
          )}
        </div>
      </div>
    </div>
  );
}