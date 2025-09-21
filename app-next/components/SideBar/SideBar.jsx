"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./SideBar.module.css";
import {
  FaUser,
  FaBookOpen,
  FaPlusCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiBookShelfLine } from "react-icons/ri";
import { FiBookOpen, FiMail, FiPlusCircle, FiUser } from "react-icons/fi";

import Image from "next/image";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const NAV_ITEMS = [
    {
      href: "/public-courses",
      label: "View all courses",
      icon: <RiBookShelfLine />,
    },
    { href: "/profile", label: "Profile", icon: <FiUser /> },
    { href: "/my-courses", label: "My Courses", icon: <FiBookOpen /> },
    { href: "/add-courses", label: "Add Course", icon: <FiPlusCircle /> },
    { href: "/contact-user", label: "Contact Us", icon: <FiMail /> },
  ];

  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeSidebar();
    router.push("/");
  };

  return (
    <>
      <button
        className={styles.mobileToggle}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && <div className={styles.overlay} onClick={closeSidebar} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.logoWrapper}>
            <Link href="/" className={styles.logo} onClick={closeSidebar}>
              <Image
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
                  onClick={closeSidebar}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <span className={styles.icon}>
              <FaSignOutAlt />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
