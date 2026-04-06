import type { Slide } from "../../model/Slide/slide";
import style from "./slide.module.css";

type SlideProps = {
  slide: Slide;
};

export function Slide({ slide }: SlideProps) {
  return (
    <div className={style.slide}>
      <img src={slide.image} className={style.image} />
      <p className={style.title}>{slide.title}</p>
    </div>
  );
}
