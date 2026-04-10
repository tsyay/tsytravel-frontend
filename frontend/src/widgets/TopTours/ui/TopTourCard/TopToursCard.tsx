import type { topTour } from "../../model/topTours";
import style from "./topToursCard.module.css";
import { useRef, useCallback } from "react";

type Props = {
  topTour: topTour;
  index: number;
  reversed?: boolean;
};

export function TopToursCard({ topTour, index, reversed = false }: Props) {
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

      const moveX = x * 28;
      const moveY = y * 18;

      img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.12)`;
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
      className={`${style.card} ${reversed ? style.reversed : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={style.imageBox}>
        <img
          src={topTour.background}
          alt=""
          className={style.bgImage}
          draggable={false}
        />

        <img
          ref={imageRef}
          src={topTour.image}
          alt={topTour.title}
          className={style.parallaxImage}
          draggable={false}
        />

        <div className={style.imageOverlay} />
      </div>

      <div className={style.text}>
        <span className={style.index}>0{index + 1}</span>
        <div className={style.divider} />
        <h3 className={style.heading}>{topTour.title}</h3>
        <p className={style.description}>{topTour.description}</p>
        <a href="#" className={style.cta}>
          <span>Узнать подробнее</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}