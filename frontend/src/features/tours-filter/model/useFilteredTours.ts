import { useState, useMemo } from "react";
import { MOCK_TOURS } from "../../../entities/tour/model/tours.mock";
import type { Season, TourCategory } from "../../../entities/tour/model/tours.mock";
import { INITIAL_FILTERS } from "./types";
import type { Filters, SortKey } from "./types";

export function useFilteredTours() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [sort, setSort] = useState<SortKey>("rating");

  const filtered = useMemo(() => {
    return MOCK_TOURS.filter((tour) => {
      if (
        filters.search &&
        !tour.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !tour.description.toLowerCase().includes(filters.search.toLowerCase())
      ) return false;

      if (tour.priceFrom < filters.priceMin || tour.priceFrom > filters.priceMax) return false;
      if (tour.durationDays < filters.daysMin || tour.durationDays > filters.daysMax) return false;
      if (filters.difficulty !== "all" && tour.difficulty !== filters.difficulty) return false;

      if (filters.seasons.length > 0) {
        if (!filters.seasons.some((s) => tour.seasons.includes(s))) return false;
      }

      if (filters.categories.length > 0) {
        if (!filters.categories.some((c) => tour.category.includes(c))) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sort === "price") return a.priceFrom - b.priceFrom;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "days") return a.durationDays - b.durationDays;
      if (sort === "reviews") return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [filters, sort]);

  const toggleSeason = (s: Season) => {
    setFilters((f) => ({
      ...f,
      seasons: f.seasons.includes(s) ? f.seasons.filter((x) => x !== s) : [...f.seasons, s],
    }));
  };

  const toggleCategory = (c: TourCategory) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(c) ? f.categories.filter((x) => x !== c) : [...f.categories, c],
    }));
  };

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  const hasActiveFilters =
    !!filters.search ||
    filters.difficulty !== "all" ||
    filters.seasons.length > 0 ||
    filters.categories.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < 200000 ||
    filters.daysMin > 1 ||
    filters.daysMax < 14;

  return {
    filters,
    setFilters,
    sort,
    setSort,
    filtered,
    toggleSeason,
    toggleCategory,
    resetFilters,
    hasActiveFilters,
  };
}