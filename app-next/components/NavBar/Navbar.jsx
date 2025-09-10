"use client";

import { FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/public-courses", label: "Courses" }, // Fixed: added leading slash
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const DESKTOP_BP = 980;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu when clicking a link or the logo
  const handleLinkClick = () => setOpen(false);

  // Auto-close when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Auto-close when resizing to desktop
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
        <div className="container container-xl">
          <div className={styles.bar}>
            {/* Logo */}
            <Link
              href="/"
              className={styles.logoLink}
              onClick={handleLinkClick}
            >
              <img
                src="/landingPage/logo.png"
                alt="MindBridge Logo"
                className={styles.logo}
                width="180"
                height="32"
              />
            </Link>

            {/* Right side (desktop) */}
            <div className={styles.right}>
              <nav className={styles.links} aria-label="Primary Navigation">
                {NAV.map((l) => {
                  const active =
                    pathname === l.href ||
                    (l.href !== "/" && pathname.startsWith(`${l.href}/`));
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
        </div>
      </header>

      {/* Mobile dropdown */}
      {open && (
        <div className={styles.mobile} role="dialog" aria-modal="true">
          <div className="container container-xl">
            <div className={styles.mobileContent}>
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
                className={styles.mLogin}
              >
                <FaSignInAlt className={styles.icon} /> Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer so content isn't hidden under fixed navbar */}
      <div className={styles.spacer} />
    </>
  );
}
