import style from "./topTours.module.css";
import { TOP_TOURS } from "../model/topTours";
import { TopToursCard } from "./TopTourCard/TopToursCard";
import sayani from "../../../assets/hero/sayani.webp";

export function TopTours() {
  return (
    <section className={style.section}>
      <div className={style.inner}>
        <div className={style.header}>
          <h2 className={style.heading}>Топ туров</h2>
          <p className={style.subheading}>Лучшие маршруты, отобранные нашей командой</p>
        </div>
        <div className={style.grid}>
          {TOP_TOURS.slice(0, 3).map((topTour, index) => (
            <TopToursCard
              key={topTour.title + index}
              topTour={topTour}
              index={index}
            />
          ))}

          {/* Четвёртая ячейка — большое фото */}
          <div className={style.featuredImage}>
            <img src={sayani} alt="Бурятия" className={style.featuredImg} />
            <div className={style.featuredOverlay} />
            <div className={style.featuredText}>
              <span className={style.featuredLabel}>Откройте Бурятию</span>
              <a href="/tours" className={style.featuredCta}>Все маршруты →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}