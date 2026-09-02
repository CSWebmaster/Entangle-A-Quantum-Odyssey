"use client";

import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import { QuantumParticle, OrbitalRing } from "../visuals/QuantumPrimitives";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "X (Twitter)",
    href: "https://x.com/IEEE_SilverOak",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/IEEESilverOakUni/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ieee_silveroakuni/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ieee-silveroakuni/posts/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:ieee@silveroakuni.ac.in",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.backgroundLayer}>
        <div className={styles.circuitPattern} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brandSection}>
            <h2 className={styles.title}>ENTANGLE</h2>
            <p className={styles.subtitle}>A QUANTUM ODYSSEY</p>
            <p className={styles.description}>
              Explore the real quantum computing.<br />
              One qubit at a time.
            </p>
          </div>

          <div className={styles.institutionalSection}>
            <p className={styles.sectionLabel}>HOSTED BY</p>
            <div className={styles.boxesGrid}>
              <div className={styles.hostBox}>
                <img src="/brand/logo1.png" alt="Silver Oak University" className={styles.logoImage} />
              </div>
              <div className={styles.hostBox}>
                <img src="/brand/logo3.png" alt="Silver Oak University IEEE Student Branch" className={styles.logoImage} />
              </div>
              <div className={styles.hostBox}>
                <img src="/brand/logo2.png" alt="IEEE Computer Society Student Branch Chapter" className={styles.logoImage} />
              </div>
              <div className={styles.hostBox}>
                <img src="/brand/kalpvruksh.png" alt="Kalpvruksh - Multidisciplinary Conclave of SOU" className={styles.logoImage} />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Row */}
        <div className={styles.socialBar}>
          <div className={styles.socialIconsList}>
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconBtn}
                aria-label={s.name}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2026 ENTANGLE: A QUANTUM ODYSSEY. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative Quantum Element */}
      <motion.div 
        className={styles.decorativeNode}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <OrbitalRing size={300} borderStyle="dashed" color="rgba(0,175,196,0.1)" strokeWidth={1} />
        <OrbitalRing size={200} borderStyle="solid" color="rgba(0,175,196,0.05)" strokeWidth={2} />
        <QuantumParticle size={6} style={{ top: 25, left: 150 }} />
      </motion.div>
    </footer>
  );
}
