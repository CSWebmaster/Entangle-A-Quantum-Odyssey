"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import styles from "./Navbar.module.css";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Speaker", href: "#speakers" },
  { name: "Schedule", href: "#schedule" },
  { name: "Experience", href: "#experience" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check saved theme or default to dark
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Determine active section based on scroll position
      const sections = ["about", "speakers", "schedule", "experience", "faq"];
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
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <motion.nav 
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={styles.container}>
        {/* Left: Brand / Institutional Logos */}
        <Link href="/" className={styles.brandContainer}>
          <div className={styles.brandLogosWrapper}>
            <img src="/brand/logo1.png" alt="Silver Oak University" className={styles.navLogoImg} />
            <div className={styles.navLogoDivider} />
            <img src="/brand/logo3.png" alt="IEEE SOU SB" className={styles.navLogoImg} />
            <div className={styles.navLogoDivider} />
            <img src="/brand/logo2.png" alt="IEEE CS Chapter" className={styles.navLogoImg} />
            <div className={styles.navLogoDivider} />
            <img src="/brand/kalpvruksh.png" alt="Kalpvruksh - Multidisciplinary Conclave of SOU" className={styles.navLogoImg} />
          </div>
        </Link>

        {/* Desktop Nav: Center Links */}
        <div className={styles.navLinks}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
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

        {/* Desktop Nav: Right Actions */}
        <div className={styles.navActions}>
          <Link href="#card-generator" className={styles.generateBadgeBtn}>
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
          <button 
            onClick={toggleTheme} 
            className={styles.themeToggleBtn}
            aria-label="Toggle Dark and Light Mode"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={styles.mobileLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="#card-generator" 
              className={styles.mobileActionBtn}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Generate Badge
            </Link>
            <a 
              href="https://konfhub.com/entangle-a-quantum-odyssey" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.mobileRegisterBtn}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register Now
            </a>
            <Link 
              href="/volunteer" 
              className={styles.mobileActionBtn}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ borderColor: 'var(--cyan)' }}
            >
              Volunteer Portal
            </Link>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.5rem' }}>
              <button 
                onClick={toggleTheme} 
                className={styles.themeToggleBtn}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
