import styles from "./header.module.css";

const NAV_LINKS = [
  { label: "Туры", href: "#tours" },
  { label: "О нас", href: "#about" },
  { label: "Маршруты", href: "#routes" },
  { label: "Контакты", href: "#contacts" },
];

export function Header() {
  return (
    <header className={styles.wrapper}>
      <a href="/" className={styles.logo}>
        КОЧЕВНИКИ
      </a>

      <nav className={styles.nav}>
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#booking" className={styles.cta}>
          Забронировать
        </a>
      </nav>
    </header>
  );
}