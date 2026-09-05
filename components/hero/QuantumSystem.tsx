"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./QuantumSystem.module.css";
interface HeroSphereProps {
  type: "blue" | "cyan";
  size?: number;
}

function Hero3DQubitSphere({ type, size = 190 }: HeroSphereProps) {
  return (
    <motion.div 
      className={styles.heroSphere3DWrapper}
      style={{ width: size, height: size }}
      animate={{
        rotateY: type === "blue" ? [0, 360] : [360, 0],
        rotateX: type === "blue" ? [18, -18, 18] : [-18, 18, -18],
      }}
      transition={{
        rotateY: { duration: 28, repeat: Infinity, ease: "linear" },
        rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* 3D Multi-Axis Wireframe Orbital Rings */}
      <div className={`${styles.sphereRing3D} ${styles.sphereRingEquator}`} />
      <div className={`${styles.sphereRing3D} ${styles.sphereRingMeridianX}`} />
      <div className={`${styles.sphereRing3D} ${styles.sphereRingMeridianY}`} />
      <div className={`${styles.sphereRing3D} ${styles.sphereRingDiagonal1}`} />
      <div className={`${styles.sphereRing3D} ${styles.sphereRingDiagonal2}`} />

      {/* 3D Dirac Notation State Poles */}
      <div className={styles.poleTop}>
        <span className={styles.poleLabel}>|0⟩</span>
      </div>
      <div className={styles.poleBottom}>
        <span className={styles.poleLabel}>|1⟩</span>
      </div>

      {/* 3D Orbiting Quantum Photons on Tilted Planes */}
      <motion.div 
        className={styles.orbitingPhotonTrack1}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      >
        <div className={styles.orbitingPhoton} />
      </motion.div>
      <motion.div 
        className={styles.orbitingPhotonTrack2}
        animate={{ rotateZ: [360, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
      >
        <div className={styles.orbitingPhoton} />
      </motion.div>

      {/* Central 3D Volumetric Plasma Core */}
      <div className={type === "blue" ? styles.sphere3DCoreBlue : styles.sphere3DCoreCyan}>
        <div className={styles.sphere3DSpecular} />
        <div className={styles.sphere3DInnerGlow} />
      </div>

      {/* Outer Volumetric Atmosphere Aura */}
      <div className={type === "blue" ? styles.sphere3DAuraBlue : styles.sphere3DAuraCyan} />
    </motion.div>
  );
}

export default function QuantumSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance GPU-accelerated motion values (zero React state re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const rotateX = useTransform(springY, [-1, 1], [-14, 14]);
  const rotateY = useTransform(springX, [-1, 1], [-14, 14]);
  const posX = useTransform(springX, [-1, 1], [18, -18]);
  const posY = useTransform(springY, [-1, 1], [18, -18]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* 3D Perspective Stage */}
      <motion.div 
        className={styles.perspectiveLayer}
        style={{
          rotateX,
          rotateY,
          x: posX,
          y: posY,
          willChange: "transform",
        }}
      >
        <div className={styles.quantumFraming}>
          {/* Left 3D Qubit Sphere */}
          <div className={styles.qubitLeft}>
            <Hero3DQubitSphere type="blue" size={190} />
          </div>
          
          {/* Quantum State Exchange Laser Beam */}
          <svg className={styles.entanglementAxis} viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="exchangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.8" />
                <stop offset="50%" stopColor="var(--cyan-bright)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity="0.8" />
              </linearGradient>
              <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Base Line */}
            <line x1="100" y1="100" x2="900" y2="100" stroke="url(#exchangeGrad)" strokeWidth="3" filter="url(#laserGlow)" opacity="0.8" />

            {/* High-speed Data Carrier Track */}
            <motion.path 
              d="M 100,100 L 900,100" 
              stroke="#FFFFFF" 
              strokeWidth="1.5" 
              strokeDasharray="8 16"
              animate={{ strokeDashoffset: [0, -48] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Harmonic Entanglement Sine Wave */}
            <motion.path 
              d="M 100,100 Q 300,70 500,100 T 900,100" 
              fill="none" 
              stroke="var(--cyan)" 
              strokeWidth="1.5" 
              opacity="0.5"
              animate={{ 
                d: [
                  "M 100,100 Q 300,60 500,100 T 900,100",
                  "M 100,100 Q 300,140 500,100 T 900,100",
                  "M 100,100 Q 300,60 500,100 T 900,100"
                ] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Bidirectional Quantum Exchange Photons */}
            <motion.circle 
              cy="100" 
              r="6" 
              fill="#FFFFFF" 
              filter="url(#laserGlow)"
              animate={{ cx: [150, 850], opacity: [0, 1, 1, 0], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle 
              cy="100" 
              r="5" 
              fill="var(--cyan-bright)" 
              filter="url(#laserGlow)"
              animate={{ cx: [850, 150], opacity: [0, 1, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
            />
          </svg>

          {/* Right 3D Qubit Sphere */}
          <div className={styles.qubitRight}>
            <Hero3DQubitSphere type="cyan" size={190} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}



