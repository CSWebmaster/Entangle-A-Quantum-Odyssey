"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { motion } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Speaker", href: "#speakers" },
  { name: "Schedule", href: "#schedule" },
  { name: "Experience", href: "#experience" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");

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

        {/* Center Links */}
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

        {/* Right Actions */}
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
        </div>
      </div>
    </motion.nav>
  );
}
