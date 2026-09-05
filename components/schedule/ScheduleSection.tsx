"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./ScheduleSection.module.css";
import { scheduleDay1, scheduleDay2 } from "../../data/schedule";
import { QuantumOrbitalAnimation, QuantumParticle } from "../visuals/QuantumPrimitives";

interface SessionItem {
  time: string;
  title: string;
  description: string;
}

const SessionRow = ({ item, index, day }: { item: SessionItem; index: number; day: number }) => {
  return (
    <motion.div 
      className={styles.sessionRow}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Node on Vertical Timeline Line */}
      <div className={styles.nodeVisual}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 350, damping: 22, delay: index * 0.08 + 0.1 }}
          className={styles.nodePoint}
        >
          {day === 1 ? (
            <QuantumOrbitalAnimation radius={16} particleCount={2} speed={3}>
              <div className={styles.coreNodeDiscover} />
            </QuantumOrbitalAnimation>
          ) : (
            <div className={styles.coreNodeBuild}>
              <div className={styles.circuitInner} />
            </div>
          )}
        </motion.div>
      </div>

      {/* Session Box */}
      <motion.div 
        className={styles.sessionCard}
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <span className={styles.timeBadge}>{item.time}</span>
        <h4 className={styles.sessionTitle}>{item.title}</h4>
        <p className={styles.sessionDescription}>{item.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default function ScheduleSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const fillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="schedule" ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>ODYSSEY TIMELINE</h2>
          <p className={styles.subtitle}>EXPLORE THE TWO-DAY QUANTUM EXPEDITION</p>
        </div>

        <div className={styles.capsulesWrapper}>
          <div className={styles.capsulesGrid}>
            
            {/* Day 1 Capsule */}
            <motion.div 
              className={styles.capsule}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.capsuleArchGlow} />

              <div className={styles.capsuleHeader}>
                <div className={styles.dayNumber}>DAY 01</div>
                <h3 className={styles.dayTheme}>DISCOVER</h3>
              </div>

              <div className={styles.timelineContainer}>
                {/* Connecting Vertical Line Track */}
                <div className={styles.timelineTrack}>
                  <motion.div 
                    className={styles.timelineFill}
                    style={{ height: fillHeight }}
                  />
                </div>

                {scheduleDay1.map((item, index) => (
                  <SessionRow key={`d1-${index}`} item={item} index={index} day={1} />
                ))}
              </div>
            </motion.div>

            {/* Day 2 Capsule */}
            <motion.div 
              className={styles.capsule}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.capsuleArchGlow} />

              <div className={styles.capsuleHeader}>
                <div className={styles.dayNumber}>DAY 02</div>
                <h3 className={`${styles.dayTheme} ${styles.dayThemeDay2}`}>EXPLORE</h3>
              </div>

              <div className={styles.timelineContainer}>
                {/* Connecting Vertical Line Track */}
                <div className={styles.timelineTrack}>
                  <motion.div 
                    className={styles.timelineFill}
                    style={{ height: fillHeight }}
                  />
                </div>

                {scheduleDay2.map((item, index) => (
                  <SessionRow key={`d2-${index}`} item={item} index={index} day={2} />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
