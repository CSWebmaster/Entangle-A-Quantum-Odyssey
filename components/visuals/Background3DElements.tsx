"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Background3DElements.module.css";

interface SphereProps {
  initialStyle: React.CSSProperties;
  coreType?: "cyan" | "gold";
  rotateXDuration?: number;
  rotateYDuration?: number;
  reverse?: boolean;
}

function DraggableBlochSphere({ 
  initialStyle, 
  coreType = "cyan", 
  rotateXDuration = 35, 
  rotateYDuration = 35, 
  reverse = false 
}: SphereProps) {
  return (
    <motion.div
      className={styles.draggableWrapper}
      style={initialStyle}
      drag
      dragMomentum={true}
      dragElastic={0.05}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.22, cursor: "grabbing" }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={styles.blochSphere3D}
        animate={{
          rotateX: reverse ? [360, 0] : [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          rotateX: { duration: rotateXDuration, repeat: Infinity, ease: "linear" },
          rotateY: { duration: rotateYDuration, repeat: Infinity, ease: "linear" },
        }}
      >
        <div className={`${styles.ring3D} ${styles.ringX}`} />
        <div className={`${styles.ring3D} ${styles.ringY}`} />
        <div className={`${styles.ring3D} ${styles.ringZ}`} />
        <div className={coreType === "gold" ? styles.sphereCoreGold : styles.sphereCore} />
      </motion.div>
    </motion.div>
  );
}

interface CubeProps {
  initialStyle: React.CSSProperties;
  faces: { front: string; back: string; right: string; left: string; top: string; bottom: string };
  rotateXDuration?: number;
  rotateYDuration?: number;
  reverse?: boolean;
}

function DraggableQubitCube({
  initialStyle,
  faces,
  rotateXDuration = 22,
  rotateYDuration = 28,
  reverse = false,
}: CubeProps) {
  return (
    <motion.div
      className={styles.draggableWrapper}
      style={initialStyle}
      drag
      dragMomentum={true}
      dragElastic={0.05}
      whileHover={{ scale: 1.15 }}
      whileDrag={{ scale: 1.3, cursor: "grabbing" }}
      whileTap={{ scale: 0.92 }}
    >
      <motion.div
        className={styles.cube3D}
        animate={{
          rotateX: reverse ? [360, 0] : [0, 360],
          rotateY: reverse ? [360, 0] : [0, 360],
        }}
        transition={{
          rotateX: { duration: rotateXDuration, repeat: Infinity, ease: "linear" },
          rotateY: { duration: rotateYDuration, repeat: Infinity, ease: "linear" },
        }}
      >
        <div className={`${styles.face} ${styles.front}`}>{faces.front}</div>
        <div className={`${styles.face} ${styles.back}`}>{faces.back}</div>
        <div className={`${styles.face} ${styles.right}`}>{faces.right}</div>
        <div className={`${styles.face} ${styles.left}`}>{faces.left}</div>
        <div className={`${styles.face} ${styles.top}`}>{faces.top}</div>
        <div className={`${styles.face} ${styles.bottom}`}>{faces.bottom}</div>
      </motion.div>
    </motion.div>
  );
}

export default function Background3DElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.sceneContainer}>
      {/* 3D Perspective Stage */}
      <div className={styles.perspectiveStage}>
        {/* Why Attend area elements */}
        <DraggableQubitCube
          initialStyle={{ top: "4%", left: "4%" }}
          faces={{ front: "|0⟩", back: "|1⟩", right: "|+⟩", left: "|-⟩", top: "|i⟩", bottom: "|ψ⟩" }}
          rotateXDuration={18}
          rotateYDuration={24}
        />
        <DraggableQubitCube
          initialStyle={{ top: "8%", right: "3%" }}
          faces={{ front: "|1⟩", back: "|0⟩", right: "H", left: "X", top: "Z", bottom: "✦" }}
          rotateXDuration={22}
          rotateYDuration={28}
          reverse={true}
        />
        <DraggableBlochSphere
          initialStyle={{ top: "14%", left: "2%" }}
          coreType="cyan"
          rotateXDuration={32}
          rotateYDuration={32}
        />

        {/* Quantum Concepts area elements */}
        <DraggableBlochSphere
          initialStyle={{ top: "24%", right: "3%" }}
          coreType="gold"
          rotateXDuration={38}
          rotateYDuration={38}
          reverse={true}
        />
        <DraggableQubitCube
          initialStyle={{ top: "32%", left: "3%" }}
          faces={{ front: "|i⟩", back: "|-i⟩", right: "|1⟩", left: "|0⟩", top: "H", bottom: "ψ" }}
          rotateXDuration={20}
          rotateYDuration={26}
        />

        {/* Odyssey Timeline area elements */}
        <DraggableQubitCube
          initialStyle={{ top: "42%", right: "4%" }}
          faces={{ front: "|+⟩", back: "|-⟩", right: "X", left: "Z", top: "|1⟩", bottom: "|0⟩" }}
          rotateXDuration={25}
          rotateYDuration={30}
          reverse={true}
        />
        <DraggableBlochSphere
          initialStyle={{ top: "50%", left: "2%" }}
          coreType="gold"
          rotateXDuration={42}
          rotateYDuration={42}
        />

        {/* Speakers area elements */}
        <DraggableBlochSphere
          initialStyle={{ top: "60%", right: "3%" }}
          coreType="cyan"
          rotateXDuration={36}
          rotateYDuration={36}
          reverse={true}
        />
        <DraggableQubitCube
          initialStyle={{ top: "68%", left: "3%" }}
          faces={{ front: "|0⟩", back: "|1⟩", right: "H", left: "Z", top: "X", bottom: "✦" }}
          rotateXDuration={22}
          rotateYDuration={28}
        />

        {/* Schedule & FAQ area elements */}
        <DraggableBlochSphere
          initialStyle={{ top: "78%", right: "2%" }}
          coreType="gold"
          rotateXDuration={40}
          rotateYDuration={40}
        />
        <DraggableQubitCube
          initialStyle={{ top: "86%", left: "3%" }}
          faces={{ front: "|1⟩", back: "|0⟩", right: "|i⟩", left: "|+⟩", top: "Z", bottom: "ψ" }}
          rotateXDuration={24}
          rotateYDuration={30}
          reverse={true}
        />
        <DraggableQubitCube
          initialStyle={{ top: "93%", right: "4%" }}
          faces={{ front: "Q", back: "U", right: "B", left: "I", top: "T", bottom: "✦" }}
          rotateXDuration={26}
          rotateYDuration={32}
        />

        {/* 3D Grid Floor */}
        <div className={styles.gridFloor3D} />
      </div>
    </div>
  );
}
