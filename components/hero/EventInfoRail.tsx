"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./EventInfoRail.module.css";
import { QuantumParticle, QuantumCalendar, QuantumClock, QuantumLocation } from "../visuals/QuantumPrimitives";

export default function EventInfoRail() {
  return (
    <section className={styles.railSection}>
      <div className={styles.container}>
        
        {/* Animated Data Particle traveling along the top border */}
        <motion.div 
          className={styles.particleTrack}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <QuantumParticle size={4} color="var(--cyan-bright)" blur={8} />
        </motion.div>

        <div className={styles.grid}>
          {/* Calendar */}
          <div className={styles.infoBlock}>
            <div className={styles.iconWrapper}>
              <QuantumCalendar />
            </div>
            <div className={styles.textContent}>
              <span className={styles.label}>DATE</span>
              <span className={styles.value}>8th & 9th SEPTEMBER 2026</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Clock */}
          <div className={styles.infoBlock}>
            <div className={styles.iconWrapper}>
              <QuantumClock />
            </div>
            <div className={styles.textContent}>
              <span className={styles.label}>TIME</span>
              <span className={styles.value}>2:00 P.M. ONWARDS</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Location */}
          <div className={styles.infoBlock}>
            <div className={styles.iconWrapper}>
              <QuantumLocation />
            </div>
            <div className={styles.textContent}>
              <span className={styles.label}>LOCATION</span>
              <span className={styles.value}>
                DR. VIKRAM SARABHAI AUDITORIUM,<br/>
                9TH FLOOR, EB-BLOCK, SILVER OAK UNIVERSITY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
