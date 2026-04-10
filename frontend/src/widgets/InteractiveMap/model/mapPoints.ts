export type MapPoint = {
  id: string;
  title: string;
  description: string;
  category: "nature" | "spiritual" | "city" | "adventure";
  lat: number;
  lng: number;
};

export const MAP_POINTS: MapPoint[] = [
  {
    id: "baikal-olkhon",
    title: "Остров Ольхон",
    description: "Священный остров на Байкале. Мыс Бурхан, скала Шаманка и бескрайние виды на озеро.",
    category: "nature",
    lat: 53.1500,
    lng: 107.3400,
  },
  {
    id: "ivolginsky-datsan",
    title: "Иволгинский дацан",
    description: "Главный буддийский монастырь России. Здесь хранится нетленное тело Хамбо-ламы Итигэлова.",
    category: "spiritual",
    lat: 51.7833,
    lng: 107.2500,
  },
  {
    id: "ulan-ude",
    title: "Улан-Удэ",
    description: "Столица Бурятии. Самая большая голова Ленина в мире, этнографический музей и буузные.",
    category: "city",
    lat: 51.8333,
    lng: 107.6000,
  },
  {
    id: "barguzin-valley",
    title: "Баргузинская долина",
    description: "Нетронутая природа восточного Байкала. Горячие источники Умхей и эвенкийские стойбища.",
    category: "adventure",
    lat: 54.3500,
    lng: 109.6000,
  },
  {
    id: "svyatoy-nos",
    title: "Полуостров Святой Нос",
    description: "Уникальный полуостров в Баргузинском заповеднике с видом на Чивыркуйский залив.",
    category: "nature",
    lat: 53.9500,
    lng: 109.0000,
  },
  {
    id: "arshan",
    title: "Аршан",
    description: "Курорт у подножия Восточных Саян. Термальные источники, водопады и буддийские ступы.",
    category: "spiritual",
    lat: 51.9300,
    lng: 102.4300,
  },
];

export const CATEGORY_LABELS: Record<MapPoint["category"], string> = {
  nature: "Природа",
  spiritual: "Духовные места",
  city: "Города",
  adventure: "Приключения",
};

export const CATEGORY_COLORS: Record<MapPoint["category"], string> = {
  nature: "#2E8B57",
  spiritual: "#D4AF37",
  city: "#FF6B35",
  adventure: "#C0392B",
};