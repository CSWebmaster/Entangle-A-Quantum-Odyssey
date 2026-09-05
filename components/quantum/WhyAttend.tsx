"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./WhyAttend.module.css";
import { QuantumBook, QuantumEntangledNodes, QuantumCertificate, QuantumFlask, OrbitalRing, QuantumParticle, QuantumGrid } from "../visuals/QuantumPrimitives";

const BENEFITS = [
  { id: "learn", label: "LEARNING", text: "Understand quantum concepts from leading experts without advanced math." },
  { id: "network", label: "NETWORKING", text: "Connect with researchers, pioneers and fellow quantum enthusiasts." },
  { id: "certificate", label: "CERTIFICATES", text: "Receive official IEEE certification to showcase your quantum computing journey." },
  { id: "swags", label: "SWAGS", text: "Earn exclusive quantum odyssey merchandise and goodies." },
];

export default function WhyAttend() {
  return (
    <section id="about" className={styles.section}>
      {/* Luminous Quantum Background Visuals */}
      <div className={styles.backgroundLayer}>
        <motion.div 
          className={styles.bgOrbital1}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <OrbitalRing size={450} color="rgba(0, 175, 196, 0.18)" borderStyle="dashed" />
          <OrbitalRing size={300} color="rgba(2, 132, 199, 0.12)" />
          <QuantumParticle size={8} color="var(--cyan-bright)" style={{ top: 20, left: 220 }} />
        </motion.div>

        <motion.div 
          className={styles.bgOrbital2}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <OrbitalRing size={550} color="rgba(0, 175, 196, 0.15)" borderStyle="dashed" />
          <OrbitalRing size={380} color="rgba(234, 168, 20, 0.12)" />
          <QuantumParticle size={8} color="var(--gold-bright)" style={{ bottom: 30, right: 260 }} />
        </motion.div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>WHY ATTEND THE EVENT?</h2>
        </div>

        <div className={styles.grid}>
          {BENEFITS.map((b, index) => {
            let IconComponent;
            if (b.id === 'learn') IconComponent = QuantumBook;
            else if (b.id === 'network') IconComponent = QuantumEntangledNodes;
            else if (b.id === 'certificate') IconComponent = QuantumCertificate;
            else IconComponent = QuantumFlask;

            return (
              <motion.div
                key={b.id}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.visualContainer} style={{ perspective: 400, display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                   <motion.div whileHover={{ scale: 1.1 }}>
                     <IconComponent isHovered={true} />
                   </motion.div>
                </div>
                <h3 className={styles.cardTitle}>{b.label}</h3>
                <p className={styles.cardText}>{b.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
