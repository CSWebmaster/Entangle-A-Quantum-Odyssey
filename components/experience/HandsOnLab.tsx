"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./HandsOnLab.module.css";
import { QuantumParticle } from "../visuals/QuantumPrimitives";

export default function HandsOnLab() {
  const topics = [
    "QUBITS",
    "SUPERPOSITION",
    "QUANTUM GATES",
    "MEASUREMENT",
    "SIMULATION"
  ];

  return (
    <section id="lab" className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.contentArea}>
          <div className={styles.eyebrow}>HANDS-ON</div>
          <h2 className={styles.title}>
            BUILD YOUR FIRST<br/>
            <span className={styles.highlight}>QUANTUM CIRCUIT</span>
          </h2>
          <p className={styles.description}>
            Experience what it's like to build and run operations on real quantum hardware directly from your browser.
          </p>
          
          <ul className={styles.topicList}>
            {topics.map((topic, index) => (
              <motion.li 
                key={index} 
                className={styles.topicItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.topicBullet} />
                {topic}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className={styles.visualArea}>
          <div className={styles.circuitLab}>
            
            <div className={styles.labGrid} />

            <svg className={styles.circuitSvg} viewBox="0 0 400 300">
              {/* Qubit Lines */}
              <text x="30" y="105" fill="var(--blue-soft)" fontSize="14" fontFamily="var(--font-mono)">q0</text>
              <path d="M 50 100 L 350 100" stroke="var(--cyan)" strokeWidth="1" fill="none" opacity="0.4" />
              
              <text x="30" y="205" fill="var(--blue-soft)" fontSize="14" fontFamily="var(--font-mono)">q1</text>
              <path d="M 50 200 L 350 200" stroke="var(--cyan)" strokeWidth="1" fill="none" opacity="0.4" />
              
              {/* Hadamard Gate */}
              <rect x="120" y="80" width="40" height="40" rx="4" fill="var(--bg-navy)" stroke="var(--cyan-bright)" strokeWidth="1" />
              <text x="140" y="105" fill="var(--cyan-bright)" fontSize="18" fontFamily="var(--font-mono)" textAnchor="middle">H</text>

              {/* CNOT Gate */}
              <circle cx="230" cy="100" r="6" fill="var(--cyan-bright)" />
              <path d="M 230 100 L 230 200" stroke="var(--cyan-bright)" strokeWidth="1" />
              <circle cx="230" cy="200" r="15" fill="var(--bg-navy)" stroke="var(--cyan-bright)" strokeWidth="1" />
              <path d="M 215 200 L 245 200" stroke="var(--cyan-bright)" strokeWidth="1" />
              <path d="M 230 185 L 230 215" stroke="var(--cyan-bright)" strokeWidth="1" />

              {/* Measurement symbols */}
              <rect x="310" y="85" width="30" height="30" rx="2" fill="var(--bg-navy)" stroke="var(--blue-soft)" strokeWidth="1" />
              <path d="M 315 105 Q 325 90 335 105" fill="none" stroke="var(--blue-soft)" strokeWidth="1" />
              <path d="M 325 105 L 330 95" stroke="var(--text-white)" strokeWidth="1" />
              
              <rect x="310" y="185" width="30" height="30" rx="2" fill="var(--bg-navy)" stroke="var(--blue-soft)" strokeWidth="1" />
              <path d="M 315 205 Q 325 190 335 205" fill="none" stroke="var(--blue-soft)" strokeWidth="1" />
              <path d="M 325 205 L 330 195" stroke="var(--text-white)" strokeWidth="1" />
            </svg>

            {/* Flowing Data Particles */}
            <motion.div 
              style={{ position: 'absolute', top: 96, left: 0 }}
              animate={{ x: [50, 140, 230, 325], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <QuantumParticle size={8} blur={8} color="var(--cyan-bright)" />
            </motion.div>

            <motion.div 
              style={{ position: 'absolute', top: 196, left: 0 }}
              animate={{ x: [50, 230, 325], opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            >
              <QuantumParticle size={8} color="var(--cyan)" blur={8} />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
