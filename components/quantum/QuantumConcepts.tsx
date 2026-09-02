"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./QuantumConcepts.module.css";
import { quantumConcepts } from "../../data/event";
import { QuantumParticle, OrbitalRing, QuantumNode, InterferenceVisual } from "../visuals/QuantumPrimitives";

const InteractiveCard = ({ concept, index }: { concept: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.cardContainer}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div className={styles.card}>
        <div className={styles.visualContainer} style={{ transform: "translateZ(40px)" }}>
          {/* Animated Internal Visuals */}
          {concept.id === "qubits" && (
            <div className={styles.visualWrapper} style={{ perspective: 600 }}>
              <motion.div style={{ position: 'relative', width: 60, height: 60, transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isHovered ? 360 : 0, rotateX: 20 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
                <QuantumNode size={40} style={{ left: 10, top: 10 }} />
                <OrbitalRing size={80} borderStyle="dashed" strokeWidth={1} style={{ left: -10, top: -10, transform: 'rotateX(60deg)' }} />
                <OrbitalRing size={80} borderStyle="solid" strokeWidth={1} style={{ left: -10, top: -10, transform: 'rotateY(60deg)' }} />
              </motion.div>
            </div>
          )}
          
          {concept.id === "superposition" && (
            <div className={styles.visualWrapper} style={{ perspective: 600 }}>
               <motion.div style={{ position: 'relative', width: 60, height: 60, transformStyle: 'preserve-3d' }}
                 animate={{ rotateY: isHovered ? [0, 180, 360] : [0, 0, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                 <motion.div 
                   animate={{ x: [-15, 15, -15], z: [20, -20, 20], opacity: [0.8, 0.4, 0.8] }} 
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   style={{ position: 'absolute', top: 0, left: 0 }}>
                   <OrbitalRing size={60} color="var(--cyan-bright)" />
                 </motion.div>
                 <motion.div 
                   animate={{ x: [15, -15, 15], z: [-20, 20, -20], opacity: [0.4, 0.8, 0.4] }} 
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   style={{ position: 'absolute', top: 0, left: 0 }}>
                   <OrbitalRing size={60} color="var(--cyan)" />
                 </motion.div>
               </motion.div>
            </div>
          )}

          {concept.id === "entanglement" && (
            <div className={styles.visualWrapper} style={{ perspective: 600 }}>
               <motion.div style={{ position: 'relative', width: 100, height: 40, transformStyle: 'preserve-3d' }}
                 animate={{ rotateZ: isHovered ? 180 : 0, rotateX: isHovered ? 20 : 0 }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                 <motion.div 
                   animate={{ scale: [1, 1.4, 1], z: [0, 30, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   style={{ position: 'absolute', left: 0, top: 14 }}>
                   <QuantumParticle size={12} color="var(--cyan-bright)" blur={15} />
                 </motion.div>
                 
                 <svg width="100" height="40" style={{ position: 'absolute', top: 0, left: 0 }}>
                   <motion.path 
                     d="M 10 20 Q 50 40 90 20" 
                     stroke="var(--cyan)" 
                     strokeWidth="2"
                     fill="none"
                     strokeDasharray="4 4"
                     animate={{ strokeDashoffset: [0, -20], d: ["M 10 20 Q 50 40 90 20", "M 10 20 Q 50 0 90 20", "M 10 20 Q 50 40 90 20"] }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   />
                 </svg>

                 <motion.div 
                   animate={{ scale: [1.4, 1, 1.4], z: [30, 0, 30] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   style={{ position: 'absolute', right: 0, top: 14 }}>
                   <QuantumParticle size={12} color="var(--teal)" blur={15} />
                 </motion.div>
               </motion.div>
            </div>
          )}

          {concept.id === "interference" && (
            <div className={styles.visualWrapper} style={{ perspective: 600 }}>
                <motion.div style={{ position: 'relative', width: 60, height: 60, transformStyle: 'preserve-3d' }}
                  animate={{ rotateX: 60, rotateZ: isHovered ? 360 : 0 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                  <InterferenceVisual isHovered={isHovered} />
                  {/* Add more 3D rings to interference */}
                  <motion.div style={{ position: 'absolute', top: -10, left: -10, border: '1px solid var(--cyan-bright)', width: 80, height: 80, borderRadius: '50%' }} animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5], z: [0, 40, 0] }} transition={{ duration: 3, repeat: Infinity }} />
                </motion.div>
            </div>
          )}

          {concept.id === "circuits" && (
            <div className={styles.visualWrapper} style={{ perspective: 600 }}>
              <motion.div style={{ position: 'relative', width: 100, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}>
                <svg width="100" height="60" style={{ position: 'absolute', top: 0, left: 0 }}>
                  <line x1="5" y1="30" x2="95" y2="30" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.5" />
                  <rect x="36" y="16" width="28" height="28" rx="4" fill="#071D33" stroke="var(--cyan-bright)" strokeWidth="1.5" />
                  <text x="50" y="35" fill="var(--cyan-bright)" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">H</text>
                </svg>
                <motion.div
                  style={{ position: 'absolute', top: 27, left: 8, width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan-bright)', boxShadow: '0 0 8px var(--cyan-bright)' }}
                  animate={{ x: [0, 80, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          )}

          {concept.id === "algorithms" && (
            <div className={styles.visualWrapper} style={{ perspective: 600 }}>
              <motion.div style={{ position: 'relative', width: 80, height: 60, transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                  <motion.rect x="12" y="32" width="8" height="18" rx="2" fill="var(--cyan)" opacity="0.5"
                    animate={{ height: [18, 30, 18], y: [32, 20, 32] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                  <motion.rect x="28" y="22" width="8" height="28" rx="2" fill="var(--cyan)" opacity="0.7"
                    animate={{ height: [28, 14, 28], y: [22, 36, 22] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
                  <motion.rect x="44" y="12" width="8" height="38" rx="2" fill="var(--cyan-bright)" opacity="0.95"
                    animate={{ height: [38, 42, 38], y: [12, 8, 12] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
                  <motion.rect x="60" y="26" width="8" height="24" rx="2" fill="var(--teal)" opacity="0.6"
                    animate={{ height: [24, 16, 24], y: [26, 34, 26] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }} />
                  <line x1="5" y1="52" x2="75" y2="52" stroke="var(--cyan)" strokeWidth="1" strokeOpacity="0.4" />
                </svg>
              </motion.div>
            </div>
          )}
        </div>

        <h3 className={styles.cardTitle} style={{ transform: "translateZ(30px)" }}>{concept.title}</h3>
        <p className={styles.cardDescription} style={{ transform: "translateZ(20px)" }}>{concept.description}</p>
        
        {/* Glow effect that follows mouse */}
        <motion.div 
          className={styles.cardGlow}
          style={{
            x: useTransform(x, [-0.5, 0.5], ["-50%", "50%"]),
            y: useTransform(y, [-0.5, 0.5], ["-50%", "50%"]),
            opacity: isHovered ? 1 : 0
          }}
        />
      </div>
    </motion.div>
  );
};

export default function QuantumConcepts() {
  return (
    <section id="concepts" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>QUANTUM CONCEPTS</h2>
        </div>

        <div className={styles.grid}>
          {quantumConcepts.map((concept, index) => (
            <InteractiveCard key={concept.id} concept={concept} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
