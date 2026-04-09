import nebo from "../../../assets/tourFormats/nebo.avif"
import hram from "../../../assets/tourFormats/hram.png"

export type ParticleType =
  | "lotus" | "gold_dust" | "light" | "incense" | "prayer_flags"
  | "snow" | "leaf" | "water_drops" | "fog" | "wind"
  | "lantern" | "city_lights" | "spark" | "neon_dots" | "confetti"
  | "dust" | "rocks" | "mud" | "sparks" | "trail";

export type TourFormat = {
  id: string;
  title: string;
  subtitle: string;
  bgImage: string;
  mainImage: string;
  description: string;
  particles: ParticleType[];
  accentColor: string;
  musicFile: string;
};

export const TOUR_FORMATS: TourFormat[] = [
  {
    id: "sacred",
    title: "Священные места",
    subtitle: "Буддийская Бурятия",
    bgImage: nebo,
    mainImage: hram,
    description: "Буддийские дацаны, святые источники и места силы. Тур для тех, кто ищет спокойствие и внутреннюю гармонию.",
    particles: ["lotus", "gold_dust", "light", "incense", "prayer_flags"],
    accentColor: "#D4AF37",
    musicFile: "meditation",
  },
  {
    id: "nature",
    title: "Природа Бурятии",
    subtitle: "Байкал и горы",
    bgImage: nebo,
    mainImage: hram,
    description: "Байкал, Саяны, горные перевалы и бескрайние степи. Дикая природа и путешествие вне цивилизации.",
    particles: ["snow", "leaf", "water_drops", "fog", "wind"],
    accentColor: "#2E8B57",
    musicFile: "nature",
  },
  {
    id: "city",
    title: "Городские похождения",
    subtitle: "Столица Бурятии",
    bgImage: nebo,
    mainImage: hram,
    description: "История, культура и современная жизнь столицы. Уникальное сочетание Азии и России, гастрономия и городские легенды.",
    particles: ["lantern", "city_lights", "spark", "confetti", "neon_dots"],
    accentColor: "#FF6B35",
    musicFile: "city",
  },
  {
    id: "jeep",
    title: "Джип-приключения",
    subtitle: "Дороги без дорог",
    bgImage: nebo,
    mainImage: hram,
    description: "Горные дороги, броды и перевалы — места, куда невозможно добраться обычным транспортом.",
    particles: ["dust", "rocks", "mud", "sparks", "trail"],
    accentColor: "#C0392B",
    musicFile: "adventure",
  },
];