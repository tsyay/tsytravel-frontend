import nebo from "../../../assets/tourFormats/nebo.avif";
import hram from "../../../assets/tourFormats/hram.webp";
import jimny from "../../../assets/tourFormats/jimny.webp";
import skali from "../../../assets/tourFormats/skali.webp";
import loshad from "../../../assets/tourFormats/loshad.webp";
import step from "../../../assets/tourFormats/step.webp";
import arshan from "../../../assets/tourFormats/arshan.webp";
import reka from "../../../assets/tourFormats/kamennayareka.webp";


export type ParticleType =
  | "lotus"
  | "gold_dust"
  | "light"
  | "incense"
  | "prayer_flags"
  | "snow"
  | "leaf"
  | "water_drops"
  | "fog"
  | "wind"
  | "lantern"
  | "city_lights"
  | "spark"
  | "neon_dots"
  | "confetti"
  | "dust"
  | "rocks"
  | "mud"
  | "sparks"
  | "trail";

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
    description:
      "Буддийские дацаны, святые источники и места силы. Тур для тех, кто ищет спокойствие и внутреннюю гармонию.",
    particles: ["lotus", "gold_dust", "light", "incense", "prayer_flags"],
    accentColor: "#D4AF37",
    musicFile: "meditation",
  },
  {
    id: "nature",
    title: "Природа Бурятии",
    subtitle: "Байкал и горы",
    bgImage: reka,
    mainImage: arshan,
    description:
      "Байкал, Саяны, горные перевалы и бескрайние степи. Дикая природа и путешествие вне цивилизации.",
    particles: ["snow", "leaf", "water_drops", "fog", "wind"],
    accentColor: "#2E8B57",
    musicFile: "nature",
  },
  {
    id: "horse_tours",
    title: "Конные похождения",
    subtitle: "Конные туры по Улан-Удэ и окрестностям",
    bgImage: step,
    mainImage: loshad,
    description:
      "Путешествия верхом по степям. Бурятские традиции коневодства, природа региона и настоящая атмосфера кочевой культуры.",
    particles: ["lotus", "gold_dust", "light", "incense", "prayer_flags"],
    accentColor: "#C47A2C",
    musicFile: "horse_tour",
  },
  {
    id: "jeep",
    title: "Джип-приключения",
    subtitle: "Дороги без дорог",
    bgImage: skali,
    mainImage: jimny,
    description:
      "Горные дороги, броды и перевалы — места, куда невозможно добраться обычным транспортом.",
    particles: ["dust", "rocks", "mud", "sparks", "trail"],
    accentColor: "#C0392B",
    musicFile: "adventure",
  },
];
