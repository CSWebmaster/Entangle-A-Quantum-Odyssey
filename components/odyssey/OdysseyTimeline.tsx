"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import styles from "./OdysseyTimeline.module.css";
import { QuantumParticle, QuantumNode, OrbitalRing } from "../visuals/QuantumPrimitives";

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
    { 
      id: "classical",
      title: "CLASSICAL BIT", 
      dirac: "|0⟩ / |1⟩",
      formula: "Bit ∈ {0, 1}",
      desc: "Discrete deterministic computation. A bit is fixed strictly to zero or one at any instance.",
      renderQubitVisual: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 32,
              height: 32,
              borderRadius: '4px',
              border: '2px solid var(--cyan)',
              background: 'rgba(0,175,196,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 'bold',
              color: 'var(--cyan-bright)'
            }}
          >
            0
          </motion.div>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>⟶</span>
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            style={{
              width: 32,
              height: 32,
              borderRadius: '4px',
              border: '2px solid var(--gold)',
              background: 'rgba(234,168,20,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 'bold',
              color: 'var(--gold-bright)'
            }}
          >
            1
          </motion.div>
        </div>
      )
    },
    { 
      id: "superposition",
      title: "SUPERPOSITION QUBIT", 
      dirac: "|+⟩",
      formula: "|ψ⟩ = α|0⟩ + β|1⟩",
      desc: "Simultaneous linear combination of orthogonal states on the Bloch Sphere before observation.",
      renderQubitVisual: () => (
        <div style={{ position: 'relative', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <OrbitalRing size={50} color="var(--cyan)" borderStyle="dashed" />
          <OrbitalRing size={36} color="var(--cyan-bright)" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <QuantumParticle size={8} color="var(--cyan-bright)" style={{ top: 0, left: 26 }} />
            <QuantumParticle size={8} color="var(--gold-bright)" style={{ bottom: 0, left: 26 }} />
          </motion.div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--cyan-bright)' }}>|+⟩</span>
        </div>
      )
    },
    { 
      id: "entanglement",
      title: "ENTANGLED QUBIT PAIR", 
      dirac: "|Φ⁺⟩",
      formula: "(|00⟩ + |11⟩)/√2",
      desc: "Correlated Bell State pair where measuring one qubit instantaneously dictates the state of its partner.",
      renderQubitVisual: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative' }}>
          {/* Qubit A */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'relative' }}
          >
            <QuantumNode size={28} coreColor="var(--cyan-bright)" ringColor="var(--cyan)" />
          </motion.div>

          {/* Entanglement Bridge */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.9, 1.1, 0.9] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 50,
              height: 2,
              background: 'linear-gradient(90deg, var(--cyan-bright), var(--gold-bright))',
              boxShadow: '0 0 10px var(--cyan-bright)',
            }}
          />

          {/* Qubit B */}
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'relative' }}
          >
            <QuantumNode size={28} coreColor="var(--gold-bright)" ringColor="var(--gold)" />
          </motion.div>
        </div>
      )
    },
    { 
      id: "supremacy",
      title: "QUANTUM SUPREMACY", 
      dirac: "|ψ_N⟩",
      formula: "2^N State Space",
      desc: "Exponential parallel exploration of 2^N states solving problems intractable for classical supercomputers.",
      renderQubitVisual: () => (
        <div style={{ position: 'relative', width: 70, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <OrbitalRing size={60} color="var(--cyan-bright)" borderStyle="dashed" />
            <QuantumParticle size={6} color="var(--cyan)" style={{ top: 2, left: 32 }} />
            <QuantumParticle size={6} color="var(--cyan-bright)" style={{ bottom: 2, left: 32 }} />
            <QuantumParticle size={6} color="var(--gold)" style={{ left: 2, top: 32 }} />
            <QuantumParticle size={6} color="var(--gold-bright)" style={{ right: 2, top: 32 }} />
          </motion.div>
          <QuantumNode size={22} coreColor="var(--cyan-bright)" ringColor="var(--gold-bright)" />
        </div>
      )
    }
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
          <p className={styles.subtitle}>Follow the timeline of computation from bits to multi-qubit supremacy.</p>
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
                  key={stage.id}
                  className={`${styles.stage} ${isActive ? styles.stageActive : ""}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Dirac Node along centerline */}
                  <div className={styles.stageNodeQubit}>
                    {stage.dirac}
                  </div>

                  {/* Qubit Stage Card */}
                  <div className={styles.qubitCard}>
                    <div className={styles.qubitHeader}>
                      <span className={styles.qubitStateTag}>{stage.dirac}</span>
                      <span className={styles.qubitFormula}>{stage.formula}</span>
                    </div>

                    <h3 className={styles.stageTitle}>{stage.title}</h3>
                    <p className={styles.stageDesc}>{stage.desc}</p>

                    <div className={styles.qubitVisualWrapper}>
                      {stage.renderQubitVisual()}
                    </div>
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
