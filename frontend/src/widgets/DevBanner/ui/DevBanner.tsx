import { useState, useEffect } from "react";
import styles from "./devBanner.module.css";

const PAGES = [
  { label: "Главная", href: "/", emoji: "🏠" },
  { label: "Все туры", href: "/tours", emoji: "🗺" },
  { label: "Джип-тур", href: "/tours/jimny", emoji: "🚙" },
];

const JOKES = [
  "Разработчик ушёл в поход. Вернётся когда Байкал растает.",
  "Остальные страницы в стадии активной прокрастинации.",
  "404 страниц не существует. Как и некрасивых мест в Бурятии.",
  "Сайт на 30% готов. Джимни тоже не с первого раза заводится.",
  "Остальное допилим после того как доедем до перевала.",
];

export function DevBanner() {
  const [visible, setVisible] = useState(false);
  const [joke, setJoke] = useState("");
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    setJoke(JOKES[Math.floor(Math.random() * JOKES.length)]);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.wrapper} ${minimized ? styles.minimized : ""}`}>
      {minimized ? (
        <button className={styles.minimizedBtn} onClick={() => setMinimized(false)}>
          🚧 Dev
        </button>
      ) : (
        <div className={styles.banner}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.badge}>🚧 В разработке</span>
              <h3 className={styles.title}>Доступно 3 страницы</h3>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.iconBtn} onClick={() => setMinimized(true)} title="Свернуть">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <button className={styles.iconBtn} onClick={() => setVisible(false)} title="Закрыть">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.pages}>
            {PAGES.map((page) => (
              <a key={page.href} href={page.href} className={styles.pageLink}>
                <span className={styles.pageEmoji}>{page.emoji}</span>
                <span className={styles.pageLabel}>{page.label}</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={styles.pageArrow}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>

          <div className={styles.joke}>
            <span className={styles.jokeIcon}>💬</span>
            <p className={styles.jokeText}>{joke}</p>
          </div>

          <div className={styles.progress}>
            <div className={styles.progressLabel}>
              <span>Прогресс разработки</span>
              <span>30%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}