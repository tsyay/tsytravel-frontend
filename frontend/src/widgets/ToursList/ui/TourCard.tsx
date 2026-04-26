// src/widgets/ToursList/ui/TourCard.tsx
import styles from "./toursList.module.css";
import type { Tour } from "../../../entities/tour/model/tours.mock";
import {
  DIFFICULTY_LABELS,
  CATEGORY_LABELS,
  SEASON_LABELS,
} from "../../../features/tours-filter";
import type { Difficulty, TourCategory, Season } from "../../../entities/tour/model/tours.mock";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={styles.star} style={{ opacity: i < Math.round(rating) ? 1 : 0.25 }}>★</span>
      ))}
      <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
    </div>
  );
}

export function TourCard({ tour }: { tour: Tour }) {
  const difficultyColor = { easy: "#2E8B57", medium: "#D4AF37", hard: "#C0392B" }[tour.difficulty];

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        <img src={tour.coverImage} alt={tour.title} />
        <div className={styles.cardBadges}>
          {tour.isBestseller && <span className={styles.badgeBest}>Хит</span>}
          {tour.isNew && <span className={styles.badgeNew}>Новый</span>}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <div className={styles.cardMeta}>
            <span
              className={styles.difficulty}
              style={{
                color: difficultyColor,
                borderColor: difficultyColor + "33",
                backgroundColor: difficultyColor + "11",
              }}
            >
              {DIFFICULTY_LABELS[tour.difficulty as Difficulty]}
            </span>
            {tour.category.map((cat) => (
              <span key={cat} className={styles.category}>
                {CATEGORY_LABELS[cat as TourCategory]}
              </span>
            ))}
          </div>
          <StarRating rating={tour.rating} />
        </div>

        <h3 className={styles.cardTitle}>{tour.title}</h3>
        <p className={styles.cardDescription}>{tour.description}</p>

        <div className={styles.cardHighlights}>
          {tour.highlights.slice(0, 4).map((h) => (
            <span key={h} className={styles.highlight}>{h}</span>
          ))}
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoItem}>
              <span className={styles.cardInfoLabel}>Длительность</span>
              <span className={styles.cardInfoValue}>{tour.durationDays} дней</span>
            </div>
            <div className={styles.cardInfoItem}>
              <span className={styles.cardInfoLabel}>Отзывы</span>
              <span className={styles.cardInfoValue}>{tour.reviewsCount}</span>
            </div>
            <div className={styles.cardInfoItem}>
              <span className={styles.cardInfoLabel}>Группа</span>
              <span className={styles.cardInfoValue}>до {tour.groupSizeMax} чел</span>
            </div>
            <div className={styles.cardInfoItem}>
              <span className={styles.cardInfoLabel}>Сезоны</span>
              <span className={styles.cardInfoValue}>
                {tour.seasons.map((s) => SEASON_LABELS[s as Season]).join(", ")}
              </span>
            </div>
          </div>

          <div className={styles.cardPrice}>
            <span className={styles.priceFrom}>от</span>
            <span className={styles.priceValue}>{tour.priceFrom.toLocaleString("ru-RU")} ₽</span>
            <a href={`/tours/${tour.slug}`} className={styles.cardCta}>Подробнее</a>
          </div>
        </div>
      </div>
    </article>
  );
}