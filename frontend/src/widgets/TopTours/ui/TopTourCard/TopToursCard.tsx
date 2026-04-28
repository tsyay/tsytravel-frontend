import type { topTour } from "../../model/topTours";
import style from "./topToursCard.module.css";
import { useRef, useCallback } from "react";

type Props = {
  topTour: topTour;
  index: number;
};

export function TopToursCard({ topTour, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(0);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const img = imageRef.current;
      if (!card || !img) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      img.style.transform = `translate(${x * 24}px, ${y * 16}px) scale(1.2)`;
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const img = imageRef.current;
    if (!img) return;
    img.style.transform = `translate(0px, 0px) scale(1)`;
  }, []);

  return (
    <div
      ref={cardRef}
      className={style.card}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Размытый статичный фон */}
      <img
        src={topTour.background}
        alt=""
        className={style.bgImage}
        draggable={false}
      />

      {/* Параллакс картинка */}
      <img
        ref={imageRef}
        src={topTour.image}
        alt={topTour.title}
        className={style.parallaxImage}
        draggable={false}
      />

      {/* Виньетка */}
      <div className={style.vignette} />

      {/* Контент */}
      <div className={style.content}>
        <span className={style.index}>0{index + 1}</span>
        <div className={style.bottom}>
          <h3 className={style.heading}>{topTour.title}</h3>
          <p className={style.description}>{topTour.description}</p>
          <a href="#" className={style.cta}>
            Узнать подробнее
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}