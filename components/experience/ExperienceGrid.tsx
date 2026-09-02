"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./ExperienceGrid.module.css";
import { OrbitalRing, QuantumParticle, QuantumBook, QuantumFlask, QuantumCircuitMini, QuantumSignal, QuantumCompass, QuantumEntangledNodes, QuantumOrbitalAnimation } from "../visuals/QuantumPrimitives";

const experiences = [
  { id: "e1", title: "LEARN", desc: "Understand quantum mechanics without advanced math.", Visual: QuantumBook },
  { id: "e2", title: "EXPERIMENT", desc: "Interactive sessions with real quantum simulators.", Visual: QuantumFlask },
  { id: "e4", title: "INTERACT", desc: "Engage with leading researchers in the field.", Visual: QuantumSignal },
  { id: "e5", title: "EXPLORE", desc: "Discover how qubits change computation.", Visual: QuantumCompass },
  { id: "e6", title: "CONNECT", desc: "Network with like-minded pioneers.", Visual: QuantumEntangledNodes },
];

const InteractiveExperienceCard = ({ exp, index }: { exp: any, index: number }) => {
  const Visual = exp.Visual;
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div className={styles.card}>
        <div className={styles.iconContainer} style={{ transform: "translateZ(40px)" }}>
          <QuantumOrbitalAnimation isHovered={isHovered} radius={50} particleCount={3} speed={3}>
            <div style={{ transform: isHovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.3s ease" }}>
              <Visual isHovered={isHovered} />
            </div>
          </QuantumOrbitalAnimation>
        </div>
        
        <h3 className={styles.cardTitle} style={{ transform: "translateZ(30px)" }}>{exp.title}</h3>
        <p className={styles.cardDesc} style={{ transform: "translateZ(20px)" }}>{exp.desc}</p>
        
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

export default function ExperienceGrid() {
  return (
    <section id="experience" className={styles.section}>
      {/* Background Ambient Quantum Elements */}
      <div className={styles.backgroundLayer}>
        <div className={styles.ambientGlowLeft} />
        <div className={styles.ambientGlowRight} />
        <div className={styles.ambientGlowBottom} />
        
        {/* Subtle Ambient Quantum Orbit 1 */}
        <motion.div 
          style={{ position: "absolute", top: "20%", left: "8%", opacity: 0.25, pointerEvents: "none" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <OrbitalRing size={320} color="var(--cyan)" borderStyle="dashed" />
          <QuantumParticle size={6} color="var(--cyan-bright)" style={{ top: -3, left: 160 }} />
        </motion.div>

        {/* Subtle Ambient Quantum Orbit 2 */}
        <motion.div 
          style={{ position: "absolute", bottom: "18%", right: "7%", opacity: 0.22, pointerEvents: "none" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        >
          <OrbitalRing size={360} color="var(--blue-light)" />
          <OrbitalRing size={240} color="var(--cyan)" borderStyle="dashed" />
          <QuantumParticle size={5} color="var(--cyan)" style={{ bottom: -3, right: 120 }} />
        </motion.div>
      </div>

      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>THE EXPERIENCE</h2>
        </motion.div>

        <div className={styles.grid}>
          {experiences.map((exp, index) => (
            <InteractiveExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom Quantum State Rail in the dark blue area */}
      <motion.div 
        className={styles.bottomStateRail}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span>|0⟩</span>
        <div className={styles.stateTrackLine} />
        <div className={styles.nodeDot} />
        <div className={styles.stateTrackLine} />
        <span>[ H ]</span>
        <div className={styles.stateTrackLine} />
        <div className={styles.nodeDot} />
        <div className={styles.stateTrackLine} />
        <span>|ψ⟩</span>
      </motion.div>
    </section>
  );
}
