"use client";

import { FaSignInAlt } from "react-icons/fa";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV = [
  { href: "/", label: "Home" },
  { href: "public-courses", label: "Courses" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const DESKTOP_BP = 980; // must match your CSS @media (max-width: 980px)

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu when clicking a link or the logo
  const handleLinkClick = () => setOpen(false);

  // Auto-close when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  //  Auto-close when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BP && open) {
        setOpen(false);
      }
    };

    // run once on mount (handles SSR -> client width)
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [open]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.bar}>
          {/* Logo */}
          <Link
            href="/"
            className={`${styles.logoLink}  ${styles.caps}`}
            onClick={handleLinkClick}
          >
            <img
              src="/LandingPage/logo1.png"
              alt="Logo"
              className={styles.logo}
              width="130"
              height="30"
            />
          </Link>

          {/* Right side (desktop) */}
          <div className={styles.right}>
            <nav className={styles.links} aria-label="Primary">
              {NAV.map((l) => {
                const active =
                  pathname === l.href || pathname.startsWith(`${l.href}/`);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={handleLinkClick}
                    className={`${styles.link} ${
                      active ? styles.linkActive : ""
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop login */}
            <Link
              href="/login"
              className={styles.loginBtn}
              onClick={handleLinkClick}
            >
              <FaSignInAlt className={styles.icon} /> Login
            </Link>

            {/* Hamburger (mobile) */}
            <button
              className={styles.burger}
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown (column) */}
      {open && (
        <div className={styles.mobile} role="dialog" aria-modal="true">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={handleLinkClick}
              className={styles.mItem}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={handleLinkClick}
            className={`${styles.mLogin}`}
          >
            <FaSignInAlt className={styles.icon} /> Login
          </Link>
        </div>
      )}

      {/* Spacer so content isn't hidden under fixed navbar */}
      <div className={styles.spacer} />
    </>
  );
}
