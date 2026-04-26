import { useEffect, useRef } from "react";
import styles from "./jimnyHero.module.css";
import jimny from "../../../assets/tourFormats/jimny.png";
import gori from "../../../assets/backgrounds/gori.png";


export function JimnyHero() {
  const bgRef = useRef<HTMLImageElement>(null);
  const carRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
      if (carRef.current) {
        carRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.section}>
      <img
        ref={bgRef}
        src={gori}
        alt=""
        className={styles.bg}
      />
      <img
        ref={carRef}
        src={jimny}
        alt="Suzuki Jimny"
        className={styles.car}
      />

      <div className={styles.inner}>
        <div className={styles.content}>

          <h1 className={styles.title}>
            Туры на<br />
            Suzuki Jimny
          </h1>

          <p className={styles.description}>
            Горные перевалы, броды через реки и дороги,
            которых нет на картах. Мы забираемся туда,
            куда не доедет ни один автобус и ни одна
            легковая машина.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>8</span>
              <span className={styles.statLabel}>дней</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>4×4</span>
              <span className={styles.statLabel}>полный привод</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>6</span>
              <span className={styles.statLabel}>человек макс</span>
            </div>
          </div>

          <div className={styles.actions}>
            <a href="#program" className={styles.ctaPrimary}>
              Программа тура
            </a>
            <a href="#booking" className={styles.ctaSecondary}>
              Забронировать
            </a>
          </div>
        </div>
      </div>

      <div className={styles.scroll}>
        <span className={styles.scrollText}>Листайте вниз</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}