"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./Background3DElements.module.css";

export default function Background3DElements() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Smooth 3D parallax scroll transforms
  const rotateX = useSpring(useTransform(scrollY, [0, 3000], [12, -12]), { stiffness: 40, damping: 20 });
  const rotateY = useSpring(useTransform(scrollY, [0, 3000], [-8, 20]), { stiffness: 40, damping: 20 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.sceneContainer}>
      {/* 3D Perspective Stage */}
      <motion.div 
        className={styles.perspectiveStage}
        style={{
          rotateX,
          rotateY,
        }}
      >
        {/* 3D Wireframe Bloch Sphere 1 */}
        <motion.div 
          className={styles.blochSphere3D}
          style={{ top: '15%', left: '6%' }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className={`${styles.ring3D} ${styles.ringX}`} />
          <div className={`${styles.ring3D} ${styles.ringY}`} />
          <div className={`${styles.ring3D} ${styles.ringZ}`} />
          <div className={styles.sphereCore} />
        </motion.div>

        {/* 3D Wireframe Bloch Sphere 2 */}
        <motion.div 
          className={styles.blochSphere3D}
          style={{ top: '60%', right: '5%' }}
          animate={{
            rotateX: [360, 0],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className={`${styles.ring3D} ${styles.ringX}`} />
          <div className={`${styles.ring3D} ${styles.ringY}`} />
          <div className={`${styles.ring3D} ${styles.ringZ}`} />
          <div className={styles.sphereCoreGold} />
        </motion.div>

        {/* 3D Floating Quantum Qubit Cube 1 */}
        <motion.div 
          className={styles.cube3D}
          style={{ top: '32%', right: '14%' }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            y: [-15, 15, -15]
          }}
          transition={{
            rotateX: { duration: 22, repeat: Infinity, ease: "linear" },
            rotateY: { duration: 28, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className={`${styles.face} ${styles.front}`}>|0⟩</div>
          <div className={`${styles.face} ${styles.back}`}>|1⟩</div>
          <div className={`${styles.face} ${styles.right}`}>H</div>
          <div className={`${styles.face} ${styles.left}`}>X</div>
          <div className={`${styles.face} ${styles.top}`}>Z</div>
          <div className={`${styles.face} ${styles.bottom}`}>ψ</div>
        </motion.div>

        {/* 3D Floating Quantum Qubit Cube 2 */}
        <motion.div 
          className={styles.cube3D}
          style={{ top: '78%', left: '10%' }}
          animate={{
            rotateX: [360, 0],
            rotateY: [0, 360],
            y: [15, -15, 15]
          }}
          transition={{
            rotateX: { duration: 26, repeat: Infinity, ease: "linear" },
            rotateY: { duration: 32, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className={`${styles.face} ${styles.front}`}>Q</div>
          <div className={`${styles.face} ${styles.back}`}>U</div>
          <div className={`${styles.face} ${styles.right}`}>B</div>
          <div className={`${styles.face} ${styles.left}`}>I</div>
          <div className={`${styles.face} ${styles.top}`}>T</div>
          <div className={`${styles.face} ${styles.bottom}`}>✦</div>
        </motion.div>

        {/* 3D Grid Floor */}
        <div className={styles.gridFloor3D} />
      </motion.div>
    </div>
  );
}
