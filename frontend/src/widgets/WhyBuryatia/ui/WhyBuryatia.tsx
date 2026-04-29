import styles from "./WhyBuryatia.module.css";
import baikal from "../../../assets/WhyBuryatia/baikal.jpg";
import budda from "../../../assets/WhyBuryatia/budda.png";
import bg from "../../../assets/backgrounds/buryatia_no_background.png"
const PHOTOS = [
  {
    src: baikal,
    alt: "Байкал",
  },
  {
    src: budda,
    alt: "Дацан",
  },
];

const TEXTS = [
  "Бурятия — это место, где природа, культура и тишина создают путешествие, которое невозможно повторить.",
  "Знакомство с бурятскими традициями, национальной кухней, конными прогулками и гостеприимством, которое передаётся из поколения в поколение.",
];

export function WhyBuryatia() {
  return (
    <section className={styles.section}>

        <img src={bg} alt="" className={styles.bgMap}/>

      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.title}>
            Почему
            <br />
            Бурятия?
          </h2>
          <p className={styles.text}>{TEXTS[0]}</p>
          <div className={styles.actions}>
            <a href="#tours" className={styles.ctaPrimary}>
              Смотреть туры
            </a>
            <a href="#about" className={styles.ctaSecondary}>
              О нас
            </a>
          </div>
        </div>

        <div className={styles.photoLeft}>
          <img
            src={PHOTOS[0].src}
            alt={PHOTOS[0].alt}
            className={styles.photo}
          />
        </div>

        <div className={styles.right}>
          <div className={styles.photoRight}>
            <img
              src={PHOTOS[1].src}
              alt={PHOTOS[1].alt}
              className={styles.photo}
            />
          </div>
          <p className={styles.text}>{TEXTS[1]}</p>
        </div>
      </div>
    </section>
  );
}
