"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Hero.module.css";
import Button from "../ui/Button";
import Navbar from "../layout/Navbar";
import QuantumSystem from "./QuantumSystem";
import CountdownTimer from "./CountdownTimer";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={containerRef} className={styles.heroSection}>
      <Navbar />
      
      <div className={styles.backgroundLayer}>
        <QuantumSystem />
        <div className={styles.overlayGradient} />
      </div>

      <div className={styles.contentContainer}>
        {/* Center Quantum Event Area */}
        <div className={styles.heroCenterContent}>

          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            style={{ opacity }}
          >
            <h1 className={styles.title}>
              <motion.span 
                className={styles.titleMain}
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0.05em", opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                ENTANGLE
              </motion.span>
              <span className={styles.titleSub}>A QUANTUM ODYSSEY</span>
            </h1>
            
            <p className={styles.description}>
              Explore the real quantum computing.<br />
              One qubit at a time.
            </p>

            <CountdownTimer />

            <div className={styles.actions}>
              <Button href="https://konfhub.com/entangle-a-quantum-odyssey" variant="primary">
                REGISTER NOW
              </Button>
              <Button href="#odyssey" variant="secondary">
                EXPLORE ODYSSEY
              </Button>
              <Button href="#card-generator" variant="outline">
                GENERATE BADGE
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
