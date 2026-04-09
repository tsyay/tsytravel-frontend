import { useRef, useState, useCallback } from "react";
import type { TourFormat } from "../../model/tourFormats";
import { ParticleCanvas } from "../ParticleCanvas/ParticleCanvas";
import styles from "./tourFormatCard.module.css";

type Props = { format: TourFormat };

function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  ms: number,
  onDone?: () => void
) {
  const steps = 30;
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
  const [hovered, setHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onEnter = useCallback(() => {
    setHovered(true);
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.volume = 0;
    a.play().catch(() => {});
    fadeVolume(a, 0, 0, 800);
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    const a = audioRef.current;
    if (!a) return;
    fadeVolume(a, 0, 0, 500, () => {
      a.pause();
      a.currentTime = 0;
    });
  }, []);

  return (
    <article
      className={`${styles.card} ${hovered ? styles.active : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ "--accent": format.accentColor } as React.CSSProperties}
    >
      <ParticleCanvas
        active={hovered}
        particles={format.particles}
        accentColor={format.accentColor}
      />

      <div className={styles.bgLayer}>
        <img src={format.bgImage} alt="" className={styles.bgImage} draggable={false} />
      </div>

      <div className={styles.bgOverlay} />

      <div className={styles.imageClip}>
        <img src={format.mainImage} alt={format.title} className={styles.image} draggable={false} />
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