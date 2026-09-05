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
        {/* 3D Floating Quantum Qubit Cube 1 (Picked up to the top Why Attend area) */}
        <DraggableQubitCube
          initialStyle={{ top: "6%", right: "4%" }}
          faces={{ front: "|0⟩", back: "|1⟩", right: "|+⟩", left: "|-⟩", top: "|i⟩", bottom: "|ψ⟩" }}
          rotateXDuration={20}
          rotateYDuration={26}
        />

        {/* 3D Wireframe Bloch Sphere 1 (Why Attend / Concepts margin) */}
        <DraggableBlochSphere
          initialStyle={{ top: "15%", left: "3%" }}
          coreType="cyan"
          rotateXDuration={35}
          rotateYDuration={35}
        />

        {/* 3D Floating Quantum Qubit Cube 2 (Quantum Concepts margin) */}
        <DraggableQubitCube
          initialStyle={{ top: "30%", left: "4%" }}
          faces={{ front: "|1⟩", back: "|0⟩", right: "H", left: "X", top: "Z", bottom: "✦" }}
          rotateXDuration={22}
          rotateYDuration={28}
        />

        {/* 3D Wireframe Bloch Sphere 2 (Odyssey Timeline margin) */}
        <DraggableBlochSphere
          initialStyle={{ top: "46%", right: "3%" }}
          coreType="gold"
          rotateXDuration={45}
          rotateYDuration={45}
          reverse={true}
        />

        {/* 3D Floating Quantum Qubit Cube 3 (Speaker / Schedule margin) */}
        <DraggableQubitCube
          initialStyle={{ top: "64%", right: "4%" }}
          faces={{ front: "|0⟩", back: "|1⟩", right: "X", left: "Z", top: "H", bottom: "ψ" }}
          rotateXDuration={26}
          rotateYDuration={32}
          reverse={true}
        />

        {/* 3D Wireframe Bloch Sphere 3 (Schedule / FAQ margin) */}
        <DraggableBlochSphere
          initialStyle={{ top: "78%", left: "3%" }}
          coreType="cyan"
          rotateXDuration={40}
          rotateYDuration={40}
          reverse={true}
        />

        {/* 3D Floating Quantum Qubit Cube 4 (FAQ margin) */}
        <DraggableQubitCube
          initialStyle={{ top: "90%", left: "4%" }}
          faces={{ front: "|1⟩", back: "|0⟩", right: "|i⟩", left: "|+⟩", top: "Z", bottom: "✦" }}
          rotateXDuration={24}
          rotateYDuration={30}
        />

        {/* 3D Grid Floor */}
        <div className={styles.gridFloor3D} />
      </div>
    </div>
  );
}
