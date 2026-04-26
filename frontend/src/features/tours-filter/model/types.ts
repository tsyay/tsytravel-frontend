import type { Difficulty, Season, TourCategory } from "../../../entities/tour/model/tours.mock";

export type SortKey = "price" | "rating" | "days" | "reviews";

export type Filters = {
  search: string;
  priceMin: number;
  priceMax: number;
  daysMin: number;
  daysMax: number;
  difficulty: Difficulty | "all";
  seasons: Season[];
  categories: TourCategory[];
};

export const INITIAL_FILTERS: Filters = {
  search: "",
  priceMin: 0,
  priceMax: 200000,
  daysMin: 1,
  daysMax: 14,
  difficulty: "all",
  seasons: [],
  categories: [],
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Лёгкий",
  medium: "Средний",
  hard: "Сложный",
};

export const SEASON_LABELS: Record<Season, string> = {
  spring: "Весна",
  summer: "Лето",
  autumn: "Осень",
  winter: "Зима",
};

export const CATEGORY_LABELS: Record<TourCategory, string> = {
  nature: "Природа",
  culture: "Культура",
  adventure: "Приключения",
  spiritual: "Духовные",
};

export const SORT_LABELS: Record<SortKey, string> = {
  price: "По цене",
  rating: "По рейтингу",
  days: "По длительности",
  reviews: "По отзывам",
};