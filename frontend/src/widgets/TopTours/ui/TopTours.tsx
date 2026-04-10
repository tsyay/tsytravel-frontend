import style from "./topTours.module.css";
import { TOP_TOURS } from "../model/topTours";
import { TopToursCard } from "./TopTourCard/TopToursCard";

export function TopTours() {
  return (
    <section className={style.section}>
      <div className={style.inner}>
        <div className={style.header}>
          <h2 className={style.heading}>Топ туров</h2>
          <p className={style.subheading}>
            Лучшие маршруты, отобранные нашей командой
          </p>
        </div>
        <div className={style.row}>
          {TOP_TOURS.map((topTour, index) => (
            <TopToursCard
              key={topTour.title + index}
              topTour={topTour}
              index={index}
              reversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}