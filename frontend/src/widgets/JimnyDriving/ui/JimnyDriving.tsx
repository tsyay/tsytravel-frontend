import { useEffect, useRef } from "react";
import styles from "./jimnyDriving.module.css";
import terrain from "../../../assets/jimnyTour/terrain.webp";
import jimny90 from "../../../assets/jimnyTour/jimny90.webp";
import background from "../../../assets/jimnyTour/goriDriving.webp";

export function JimnyDriving() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const car = carRef.current;
      if (!section || !car) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      const progress = 1 - (rect.bottom / (sectionHeight + viewportHeight));
      const clamped = Math.max(0, Math.min(1, progress));

      const sectionWidth = section.offsetWidth;
      const carWidth = car.offsetWidth;
      const startX = -carWidth;
      const centerX = (sectionWidth - carWidth) / 2;
      const endX = sectionWidth;

      let x: number;
      if (clamped < 0.4) {
        x = startX + (centerX - startX) * (clamped / 0.4);
      } else {
        x = centerX + (endX - centerX) * ((clamped - 0.4) / 0.6);
      }

      car.style.transform = `translateX(${x}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <img src={background} alt="" className={styles.bg} />
        <div className={styles.overlay} />

        <div className={styles.inner}>
          <div className={styles.textGrid}>
            <div className={styles.textBlock}>
              <span className={styles.number}>01</span>
              <h3 className={styles.textTitle}>
                Места, куда не доедет никто другой
              </h3>
              <p className={styles.textBody}>
                Suzuki Jimny — это не просто машина. Это пропуск в места,
                закрытые для любого другого транспорта. Мы забираемся на
                перевалы высотой 2400 метров, переезжаем вброд горные реки
                и ночуем там, где нет ни дорог, ни людей — только Байкал,
                горы и звёздное небо.
              </p>
            </div>

            <div className={styles.textBlock}>
              <span className={styles.number}>02</span>
              <h3 className={styles.textTitle}>Маленький, но непобедимый</h3>
              <p className={styles.textBody}>
                Jimny весит меньше тонны и проезжает там, где застревают
                Land Cruiser и Defender. Короткая база, блокировки,
                понижающая передача — этот автомобиль создан для Бурятии.
                Каждая машина подготовлена: лифт подвески, внедорожная
                резина, защита картера и экспедиционный багажник.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.ground}>
          <img
            ref={carRef}
            src={jimny90}
            alt="Suzuki Jimny"
            className={styles.car}
          />
          <div className={styles.terrainWrapper}>
            <div className={styles.terrainOverlay} />
            <img src={terrain} className={styles.grassImg} />
          </div>
        </div>
      </div>

      <div className={styles.scrollSpace} />
    </section>
  );
}