"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SideBar.module.css";
import { FaUser, FaBookOpen, FaPlusCircle, FaEnvelope } from "react-icons/fa";

export default function SideBar() {
  const NAV_ITEMS = [
    { href: "/profile", label: "Profile", icon: <FaUser /> },
    { href: "/my-courses", label: "My Courses", icon: <FaBookOpen /> },
    { href: "/add-courses", label: "Add Course", icon: <FaPlusCircle /> },
    { href: "/contact-us", label: "Contact Us", icon: <FaEnvelope /> },
  ];

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
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
