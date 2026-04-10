import styles from "./footer.module.css";

const NAV_LINKS = [
  { label: "Туры", href: "#tours" },
  { label: "О нас", href: "#about" },
  { label: "Маршруты", href: "#routes" },
  { label: "Контакты", href: "#contacts" },
];

const CONTACTS = [
  { label: "+7 (914) 000-00-00", href: "tel:+79140000000" },
  { label: "info@kochevniki.ru", href: "mailto:info@kochevniki.ru" },
];

const SOCIALS = [
  { label: "ВКонтакте", href: "#" },
  { label: "Telegram", href: "#" },
  { label: "WhatsApp", href: "#" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Силуэт гор */}

      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo}>
              КОЧЕВНИКИ
            </a>
            <p className={styles.tagline}>
              Туры по Бурятии — природа,
              <br />
              культура и настоящие приключения
            </p>
          </div>

          <nav className={styles.nav}>
            <span className={styles.navTitle}>Навигация</span>
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contacts}>
            <span className={styles.navTitle}>Контакты</span>
            <ul className={styles.navList}>
              {CONTACTS.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className={styles.navLink}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.socials}>
            <span className={styles.navTitle}>Мы в сети</span>
            <ul className={styles.navList}>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className={styles.navLink}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span className={styles.copy}>
            © 2025 Кочевники. Все права защищены.
          </span>
          <a href="#booking" className={styles.cta}>
            Забронировать тур →
          </a>
        </div>
      </div>
      <div className={styles.mountains}>
        <svg
          viewBox="0 0 1440 220"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={styles.mountainsSvg}
        >
          <path
            d="M0,180 L60,155 L130,165 L200,130 L280,140 L340,110 L400,125 L460,95 L520,115 L580,85 L640,100 L700,70 L760,90 L820,60 L880,80 L940,50 L1000,72 L1060,45 L1120,65 L1180,40 L1240,58 L1300,75 L1360,55 L1440,80 L1440,220 L0,220 Z"
            fill="rgba(255,255,255,0.03)"
          />
          <path
            d="M0,200 L80,175 L150,185 L220,155 L300,168 L370,140 L430,158 L500,125 L570,142 L640,112 L710,130 L780,100 L850,120 L920,90 L990,108 L1060,78 L1130,95 L1200,68 L1270,88 L1340,110 L1440,95 L1440,220 L0,220 Z"
            fill="rgba(255,255,255,0.05)"
          />
          <path
            d="M0,220 L70,200 L140,210 L210,188 L280,198 L350,172 L420,185 L490,160 L560,175 L630,148 L700,165 L770,138 L840,155 L910,130 L980,148 L1050,122 L1120,140 L1190,115 L1260,135 L1330,158 L1440,145 L1440,220 Z"
            fill="rgba(255,255,255,0.08)"
          />
        </svg>
      </div>
    </footer>
  );
}
