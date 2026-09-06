"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Speakers", href: "/#speakers" },
  { name: "Schedule", href: "/#schedule" },
  { name: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Determine active section based on scroll position
      const sections = ["about", "speakers", "schedule", "faq"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.container}>
          {/* Left: Brand / Institutional Logos */}
          <Link href="/" className={styles.brandContainer} onClick={closeMobileMenu}>
            <div className={styles.brandLogosWrapper}>
              <img src="/brand/logo1.png" alt="Silver Oak University" className={styles.navLogoImg} />
              <div className={styles.navLogoDivider} />
              <img src="/brand/logo3.png" alt="IEEE SOU SB" className={styles.navLogoImg} />
              <div className={styles.navLogoDivider} />
              <img src="/brand/logo2.png" alt="IEEE CS Chapter" className={styles.navLogoImg} />
              <div className={styles.navLogoDivider} />
              <img src="/brand/kalpvruksh.png" alt="Kalpvruksh" className={styles.navLogoImg} />
            </div>
          </Link>

          {/* Desktop Center Links */}
          <div className={styles.navLinks}>
            {navLinks.map((link) => {
              const sectionKey = link.href.replace("/#", "");
              const isActive = activeSection === sectionKey;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div layoutId="activeNavIndicator" className={styles.activeIndicator} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions for Desktop */}
          <div className={styles.navActions}>
            <Link href="/badge" className={styles.generateBadgeBtn}>
              Generate Badge
            </Link>
            <a 
              href="https://konfhub.com/entangle-a-quantum-odyssey" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.registerNavBtn}
            >
              Register Now
            </a>
            <Link href="/volunteer" className={styles.volunteerNavBtn}>
              Volunteer
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className={`${styles.hamburgerBtn} ${isMobileMenuOpen ? styles.hamburgerActive : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className={styles.mobileDrawerContainer}>
            {/* Backdrop */}
            <motion.div 
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobileMenu}
            />

            {/* Drawer Panel */}
            <motion.div
              className={styles.mobileDrawer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className={styles.mobileDrawerHeader}>
                <span className={styles.mobileDrawerTitle}>NAVIGATION</span>
                <button 
                  type="button" 
                  className={styles.mobileCloseBtn}
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className={styles.mobileNavLinks}>
                {navLinks.map((link) => {
                  const sectionKey = link.href.replace("/#", "");
                  const isActive = activeSection === sectionKey;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ""}`}
                      onClick={closeMobileMenu}
                    >
                      <span className={styles.mobileNavBullet}>✦</span>
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className={styles.mobileDivider} />

              <div className={styles.mobileActions}>
                <a
                  href="https://konfhub.com/entangle-a-quantum-odyssey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileRegisterBtn}
                  onClick={closeMobileMenu}
                >
                  Register Now ↗
                </a>
                <Link
                  href="/badge"
                  className={styles.mobileBadgeBtn}
                  onClick={closeMobileMenu}
                >
                  🪪 Generate Badge
                </Link>
                <Link
                  href="/volunteer"
                  className={styles.mobileVolunteerBtn}
                  onClick={closeMobileMenu}
                >
                  🤝 Volunteer Portal
                </Link>
              </div>

              {/* Institution logos preview in drawer */}
              <div className={styles.mobileDrawerFooter}>
                <p className={styles.mobileFooterLabel}>ORGANIZED BY</p>
                <div className={styles.mobileLogosGrid}>
                  <img src="/brand/logo1.png" alt="Silver Oak University" className={styles.mobileLogoImg} />
                  <img src="/brand/logo3.png" alt="IEEE SOU SB" className={styles.mobileLogoImg} />
                  <img src="/brand/logo2.png" alt="IEEE CS Chapter" className={styles.mobileLogoImg} />
                  <img src="/brand/kalpvruksh.png" alt="Kalpvruksh" className={styles.mobileLogoImg} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
