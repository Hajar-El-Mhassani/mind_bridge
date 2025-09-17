"use client";

import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

const NAV = [
  { href: "/", label: "Home" },
  { href: "public-courses", label: "Courses" },
  { href: "/about", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
];

const DESKTOP_BP = 980;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setOpen(false);
    router.push("/");
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BP && open) {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [open]);

  const getNavigation = () => {
    if (isAuthenticated) {
      return [
        { href: "/", label: "Home" },
        { href: "/profile", label: "My Profile" },
        { href: "public-courses", label: "Courses" },
        { href: "/about", label: "About Us" },
        { href: "/contact-us", label: "Contact Us" },
      ];
    }
    return NAV;
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.bar}>
          <Link
            href="/"
            className={`${styles.logoLink}  ${styles.caps}`}
            onClick={handleLinkClick}
          >
            <img
              src="/LandingPage/logo.png"
              alt="Logo"
              className={styles.logo}
              width="130"
              height="30"
            />
          </Link>

          <div className={styles.right}>
            <nav className={styles.links} aria-label="Primary">
              {getNavigation().map((l) => {
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

            {!loading && (
              <>
                {isAuthenticated ? (
                  <Link
                    href="#"
                    onClick={handleLogout}
                    className={styles.loginBtn}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    href="/auth"
                    className={styles.loginBtn}
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                )}
              </>
            )}

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
          {getNavigation().map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={handleLinkClick}
              className={styles.mItem}
            >
              {l.label}
            </Link>
          ))}

          {/* Mobile login/logout */}
          {!loading && (
            <>
              {isAuthenticated ? (
                <Link
                  href="#"
                  onClick={handleLogout}
                  className={`${styles.mLogin}`}
                >
                  <FaSignOutAlt className={styles.icon} /> Logout
                </Link>
              ) : (
                <Link
                  href="/auth"
                  onClick={handleLinkClick}
                  className={`${styles.mLogin}`}
                >
                  <FaSignInAlt className={styles.icon} /> Login
                </Link>
              )}
            </>
          )}
        </div>
      )}

      <div className={styles.spacer} />
    </>
  );
}
