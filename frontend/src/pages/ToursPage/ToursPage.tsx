// src/pages/ToursPage/ui/ToursPage.tsx
import Header from "../../widgets/Header";
import { ToursHero } from "../../widgets/ToursHero";
import { ToursFilters } from "../../widgets/ToursFilters";
import { ToursList } from "../../widgets/ToursList";
import { useFilteredTours } from "../../features/tours-filter";
import { MOCK_TOURS } from "../../entities/tour/model/tours.mock";
import styles from "./toursPage.module.css";
import { DevBanner } from "../../widgets/DevBanner";

export default function ToursPage() {
  const {
    filters,
    setFilters,
    sort,
    setSort,
    filtered,
    toggleSeason,
    toggleCategory,
    resetFilters,
    hasActiveFilters,
  } = useFilteredTours();

  return (
    <div className={styles.page}>
      <Header />

      <ToursHero
        search={filters.search}
        onSearch={(val) => setFilters((f) => ({ ...f, search: val }))}
        totalCount={MOCK_TOURS.length}
      />

      <section data-header-theme="light">
        <div className={styles.layout}>
          <ToursFilters
            filters={filters}
            setFilters={setFilters}
            toggleSeason={toggleSeason}
            toggleCategory={toggleCategory}
            resetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />
          <ToursList
            tours={filtered}
            sort={sort}
            onSort={setSort}
            onReset={resetFilters}
          />
          <DevBanner />
        </div>
      </section>
    </div>
  );
}
