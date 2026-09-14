import Link from "next/link";
import styles from "./SiteNav.module.css";

export function SiteNav() {
  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <Link className={styles.homeLink} href="/">
        Home
      </Link>
    </nav>
  );
}
