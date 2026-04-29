import sayani from "../../../../assets/hero/sayani.jpg";
import baikal from "../../../../assets/hero/baikal.jpg";

export type Slide = {
  image: string;
  title: string;
};

export const heroSlides: Slide[] = [
  {
    image: sayani,
    title: "САЯНЫ",
  },
  {
    image: baikal,
    title: "БАЙКАЛ",
  },
];