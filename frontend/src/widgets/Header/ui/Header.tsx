// Header.tsx
import { useEffect, useState } from "react";
import styles from "./header.module.css";

const NAV_LINKS = [
  { label: "Туры", href: "#tours" },
  { label: "О нас", href: "#about" },
  { label: "Маршруты", href: "#routes" },
  { label: "Контакты", href: "#contacts" },
];

export function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const lightSections = document.querySelectorAll("[data-header-theme='light']");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDark(true);
          }
        });
      },
      {
        rootMargin: "-20px 0px -90% 0px",
        threshold: 0,
      }
    );

    const darkSections = document.querySelectorAll("[data-header-theme='dark']");
    const darkObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDark(false);
          }
        });
      },
      {
        rootMargin: "-20px 0px -90% 0px",
        threshold: 0,
      }
    );

    lightSections.forEach((s) => observer.observe(s));
    darkSections.forEach((s) => darkObserver.observe(s));

    return () => {
      observer.disconnect();
      darkObserver.disconnect();
    };
  }, []);

  return (
    <header className={styles.wrapper}>
      <a href="/" className={`${styles.logo} ${dark ? styles.logoDark : ""}`}>
        КОЧЕВНИКИ
      </a>

      <nav className={`${styles.nav} ${dark ? styles.navDark : ""}`}>
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={`${styles.link} ${dark ? styles.linkDark : ""}`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#booking" className={`${styles.cta} ${dark ? styles.ctaDark : ""}`}>
          Забронировать
        </a>
      </nav>
    </header>
  );
}