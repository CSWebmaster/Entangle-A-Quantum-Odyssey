"use client";

import React from "react";
import styles from "./Footer.module.css";
import { QuantumParticle, OrbitalRing } from "../visuals/QuantumPrimitives";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/IEEESilverOakUni/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ieee_silveroakuni/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@IEEESOU",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/IEEE_SilverOak",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const coordinators = [
  { name: "Rishi Amrutiya", phone: "+91 63524 74784", tel: "+916352474784" },
  { name: "Dhruv Chavda", phone: "+91 79908 15230", tel: "+917990815230" },
  { name: "Manthan Davra", phone: "+91 83209 48255", tel: "+918320948255" },
  { name: "Ranveer Singh", phone: "+91 72754 08209", tel: "+917275408209" },
  { name: "Dheer Patel", phone: "+91 70438 18236", tel: "+917043818236" },
  { name: "Anugrah Polara", phone: "+91 63539 54460", tel: "+916353954460" },
];

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.backgroundLayer}>
        <div className={styles.circuitPattern} />
      </div>

      <div className={styles.container}>
        {/* 3-Column Footer Layout: Brand | Hosted By | Contact Us */}
        <div className={styles.content}>
          {/* Column 1: Brand Info */}
          <div className={styles.brandSection}>
            <h2 className={styles.title}>ENTANGLE</h2>
            <p className={styles.subtitle}>A QUANTUM ODYSSEY</p>
            <p className={styles.description}>
              Explore the real quantum computing.<br />
              One qubit at a time.
            </p>
            <p className={styles.venueInfo}>
              📍 Silver Oak University, Ahmedabad
            </p>
          </div>

          {/* Column 2: Institutional Partners */}
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

          {/* Column 3: Contact Us */}
          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>
              <span>Contact Us</span>
              <span className={styles.titleUnderline} />
            </h3>

            <div className={styles.contactList}>
              {/* Email */}
              <a href="mailto:ieee.fbc@socet.edu.in" className={styles.contactItemLink}>
                <span className={styles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span className={styles.contactText}>ieee.fbc@socet.edu.in</span>
              </a>

              {/* Phone Numbers with Coordinator Names */}
              <div className={styles.phoneBlock}>
                <span className={styles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                <div className={styles.phoneList}>
                  {coordinators.map((c) => (
                    <a key={c.name} href={`tel:${c.tel}`} className={styles.phoneRow}>
                      <span className={styles.coordinatorName}>{c.name}:</span>
                      <span className={styles.coordinatorPhone}>{c.phone}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media Icons in a Circular Row */}
            <div className={styles.socialRow}>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialCircleBtn}
                  aria-label={s.name}
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
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
