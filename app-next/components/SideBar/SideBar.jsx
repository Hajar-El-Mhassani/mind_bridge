"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SideBar.module.css";
import {
  FaUser,
  FaBookOpen,
  FaPlusCircle,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";

export default function SideBar() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/profile", label: "Profile", icon: <FaUser /> },
    { href: "/my-courses", label: "My Courses", icon: <FaBookOpen /> },
    { href: "/add-course", label: "Add Course", icon: <FaPlusCircle /> },
    { href: "/contact-us", label: "Contact Us", icon: <FaEnvelope /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink}>
            <img
              src="/landingPage/logo.png"
              alt="MindBridge Logo"
              className={styles.logo}
              width={180}
              height={32}
            />
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Admin Navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navItem} ${
                      active ? styles.active : ""
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.label}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
