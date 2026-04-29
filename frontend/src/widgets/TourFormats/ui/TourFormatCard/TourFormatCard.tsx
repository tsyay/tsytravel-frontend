import { useRef, useCallback } from "react";
import type { TourFormat } from "../../model/tourFormats";
import styles from "./tourFormatCard.module.css";

type Props = { format: TourFormat };

function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  ms: number,
  onDone?: () => void
) {
  const steps = 20;
  const dt = ms / steps;
  const delta = (to - from) / steps;
  let v = from;
  let n = 0;
  const id = setInterval(() => {
    v += delta;
    audio.volume = Math.min(1, Math.max(0, v));
    if (++n >= steps) {
      clearInterval(id);
      onDone?.();
    }
  }, dt);
}

export function TourFormatCard({ format }: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onEnter = useCallback(() => {
    // Прямая работа с DOM — без setState, без ре-рендера
    cardRef.current?.classList.add(styles.active);

    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.volume = 0;
    a.play().catch(() => {});
    fadeVolume(a, 0, 0.45, 800);
  }, []);

  const onLeave = useCallback(() => {
    cardRef.current?.classList.remove(styles.active);

    const a = audioRef.current;
    if (!a) return;
    fadeVolume(a, 0.45, 0, 500, () => {
      a.pause();
      a.currentTime = 0;
    });
  }, []);

  return (
    <article
      ref={cardRef}
      className={styles.card}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={styles.bgLayer}>
        <img
          src={format.bgImage}
          alt=""
          className={styles.bgImage}
          draggable={false}
          decoding="async"
        />
      </div>

      <div className={styles.imageClip}>
        <img
          src={format.mainImage}
          alt={format.title}
          className={styles.image}
          draggable={false}
          decoding="async"
        />
      </div>

      <div className={styles.vignette} />

      <footer className={styles.footer}>
        <span className={styles.line} />
        <p className={styles.subtitle}>{format.subtitle}</p>
        <h3 className={styles.title}>{format.title}</h3>
        <p className={styles.description}>{format.description}</p>
        <span className={styles.cta}>Подробнее →</span>
      </footer>

      <audio ref={audioRef} src={`/sounds/${format.musicFile}.mp3`} loop />
    </article>
  );
}