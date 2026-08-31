"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import styles from "./OdysseyTimeline.module.css";
import { QuantumParticle, QuantumNode } from "../visuals/QuantumPrimitives";

export default function OdysseyTimeline() {
  const containerRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [activeStage, setActiveStage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveStage(0);
    else if (latest < 0.5) setActiveStage(1);
    else if (latest < 0.75) setActiveStage(2);
    else setActiveStage(3);
  });

  const stages = [
    { title: "CLASSICAL", desc: "The bit. 0 or 1. The foundation of modern computing." },
    { title: "SUPERPOSITION", desc: "The qubit. 0 and 1 simultaneously. Exponential possibilities." },
    { title: "ENTANGLEMENT", desc: "Connected states. Einstein's 'spooky action at a distance'." },
    { title: "SUPREMACY", desc: "Solving the unsolvable. The new era of algorithms." }
  ];

  return (
    <section id="odyssey" ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.eyebrow}>THE JOURNEY</div>
          <h2 className={styles.title}>QUANTUM ODYSSEY</h2>
          <p className={styles.subtitle}>Follow the timeline of computation.</p>
        </motion.div>

        <div className={styles.timeline}>
          {/* Scroll-driven connecting line */}
          <div className={styles.timelineTrack}>
            <motion.div 
              className={styles.timelineFill} 
              style={{ height: lineHeight }} 
            >
              {/* The Traveling Data Packet */}
              <div className={styles.dataPacket}>
                <AnimatePresence mode="wait">
                  {activeStage === 0 && (
                    <motion.div key="stage0" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={styles.packetCenter}>
                      <QuantumParticle size={12} color="var(--cyan-bright)" />
                    </motion.div>
                  )}
                  {activeStage === 1 && (
                    <motion.div key="stage1" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={styles.packetCenter}>
                      <QuantumParticle size={10} color="var(--cyan-bright)" style={{ x: -10 }} />
                      <QuantumParticle size={10} color="var(--cyan)" style={{ x: 10 }} />
                    </motion.div>
                  )}
                  {activeStage === 2 && (
                    <motion.div key="stage2" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={styles.packetCenter}>
                      <QuantumNode size={20} coreColor="var(--cyan-bright)" ringColor="var(--cyan)" style={{ x: -15 }} />
                      <svg width="30" height="2" style={{ position: 'absolute', zIndex: -1 }}>
                        <line x1="0" y1="1" x2="30" y2="1" stroke="var(--cyan)" strokeDasharray="2 2" strokeWidth="2" />
                      </svg>
                        <QuantumNode size={20} coreColor="var(--cyan-bright)" ringColor="var(--cyan)" style={{ x: 15 }} />
                    </motion.div>
                  )}
                  {activeStage === 3 && (
                    <motion.div key="stage3" initial={{ scale: 0, rotate: 0 }} animate={{ scale: 1, rotate: 360 }} exit={{ scale: 0 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className={styles.packetCenter}>
                      <QuantumNode size={24} coreColor="var(--cyan-bright)" ringColor="var(--cyan)" />
                      <QuantumParticle size={6} color="var(--cyan)" style={{ top: -15 }} />
                      <QuantumParticle size={6} color="var(--cyan)" style={{ bottom: -15 }} />
                      <QuantumParticle size={6} color="var(--cyan)" style={{ left: -15 }} />
                      <QuantumParticle size={6} color="var(--cyan)" style={{ right: -15 }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className={styles.stages}>
            {stages.map((stage, index) => {
              const isActive = activeStage >= index;
              return (
                <motion.div 
                  key={index}
                  className={`${styles.stage} ${isActive ? styles.stageActive : ""}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className={styles.stageNode}>
                    <div className={styles.nodeCore} />
                  </div>
                  <div className={styles.stageContent}>
                    <h3 className={styles.stageTitle}>{stage.title}</h3>
                    <p className={styles.stageDesc}>{stage.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
