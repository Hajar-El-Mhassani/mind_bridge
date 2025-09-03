"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SideBar.module.css";

const NAV_ITEMS = [
  { href: "/profile", label: "Profile" },
  { href: "/my-courses", label: "My Courses" },
  { href: "/add-course", label: "Add Course" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoWrapper}>
        <Link href="/" className={styles.logo}>
          <img
            src="/landingPage/logo.png"
            alt="Logo"
            className={styles.logo}
            width={220}
            height={40}
          />
        </Link>
      </div>

      <nav className={styles.nav} aria-label="Sidebar">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${active ? styles.active : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
