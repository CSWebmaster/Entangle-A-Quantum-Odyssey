"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Background3DElements.module.css";

/* -------------------------------------------------------------
 * 1. 3D Wireframe Bloch Sphere (Anchored & Smoothly Spinning in Place)
 * ------------------------------------------------------------- */
interface SphereProps {
  initialStyle: React.CSSProperties;
  size?: "regular" | "small" | "micro";
  coreType?: "cyan" | "gold" | "violet" | "blue";
  rotateYDuration?: number;
  reverse?: boolean;
}

function AnchoredBlochSphere({ 
  initialStyle,
  size = "regular",
  coreType = "cyan", 
  rotateYDuration = 32, 
  reverse = false 
}: SphereProps) {
  const sizeClass = 
    size === "micro" 
      ? styles.blochSphereMicro 
      : size === "small" 
      ? styles.blochSphereSmall 
      : "";

  const ringThemeClass = 
    coreType === "gold"
      ? styles.ringGold
      : coreType === "violet"
      ? styles.ringViolet
      : coreType === "blue"
      ? styles.ringBlue
      : "";

  const coreClass = 
    coreType === "gold" 
      ? styles.sphereCoreGold 
      : coreType === "violet" 
      ? styles.sphereCoreViolet 
      : coreType === "blue"
      ? styles.sphereCoreBlue
      : styles.sphereCore;

  return (
    <div className={styles.elementAnchor} style={initialStyle}>
      <div style={{ transform: "rotateX(20deg) rotateZ(12deg)", transformStyle: "preserve-3d" }}>
        <motion.div
          className={`${styles.blochSphere3D} ${sizeClass}`}
          animate={{
            rotateY: reverse ? [360, 0] : [0, 360],
          }}
          transition={{
            rotateY: { duration: rotateYDuration, repeat: Infinity, ease: "linear" },
          }}
        >
          <div className={`${styles.ring3D} ${styles.ringX} ${ringThemeClass}`} />
          <div className={`${styles.ring3D} ${styles.ringY} ${ringThemeClass}`} />
          <div className={`${styles.ring3D} ${styles.ringZ} ${ringThemeClass} ${styles.ringSolid}`} />
          <div className={coreClass} />
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 2. 3D Floating Qubit Cube (Anchored & Spinning Steadily in Place)
 * ------------------------------------------------------------- */
interface CubeProps {
  initialStyle: React.CSSProperties;
  size?: "regular" | "mini";
  theme?: "cyan" | "gold" | "violet";
  faces: { front: string; back: string; right: string; left: string; top: string; bottom: string };
  rotateYDuration?: number;
  reverse?: boolean;
}

function AnchoredQubitCube({
  initialStyle,
  size = "regular",
  theme = "cyan",
  faces,
  rotateYDuration = 26,
  reverse = false,
}: CubeProps) {
  const cubeSizeClass = size === "mini" ? styles.cubeMini : "";
  const faceThemeClass = 
    theme === "gold" 
      ? styles.faceGold 
      : theme === "violet" 
      ? styles.faceViolet 
      : "";

  return (
    <div className={styles.elementAnchor} style={initialStyle}>
      <div style={{ transform: "rotateX(22deg) rotateZ(-10deg)", transformStyle: "preserve-3d" }}>
        <motion.div
          className={`${styles.cube3D} ${cubeSizeClass}`}
          animate={{
            rotateY: reverse ? [360, 0] : [0, 360],
          }}
          transition={{
            rotateY: { duration: rotateYDuration, repeat: Infinity, ease: "linear" },
          }}
        >
          <div className={`${styles.face} ${faceThemeClass} ${styles.front}`}>{faces.front}</div>
          <div className={`${styles.face} ${faceThemeClass} ${styles.back}`}>{faces.back}</div>
          <div className={`${styles.face} ${faceThemeClass} ${styles.right}`}>{faces.right}</div>
          <div className={`${styles.face} ${faceThemeClass} ${styles.left}`}>{faces.left}</div>
          <div className={`${styles.face} ${faceThemeClass} ${styles.top}`}>{faces.top}</div>
          <div className={`${styles.face} ${faceThemeClass} ${styles.bottom}`}>{faces.bottom}</div>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 3. 3D Quantum Diamond Crystal (Anchored Wireframe)
 * ------------------------------------------------------------- */
interface DiamondProps {
  initialStyle: React.CSSProperties;
  rotateDuration?: number;
  reverse?: boolean;
}

function AnchoredDiamond({
  initialStyle,
  rotateDuration = 22,
  reverse = false,
}: DiamondProps) {
  return (
    <div className={styles.elementAnchor} style={initialStyle}>
      <div style={{ transform: "rotateX(25deg)", transformStyle: "preserve-3d" }}>
        <motion.div
          className={styles.diamond3D}
          animate={{
            rotateY: reverse ? [360, 0] : [0, 360],
          }}
          transition={{
            rotateY: { duration: rotateDuration, repeat: Infinity, ease: "linear" },
          }}
        >
          <div className={styles.diamondRing1} />
          <div className={styles.diamondRing2} />
          <div className={styles.diamondCore} />
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 4. Quantum Dirac Ket Badge (Anchored Mathematical Chip)
 * ------------------------------------------------------------- */
interface KetBadgeProps {
  initialStyle: React.CSSProperties;
  symbol: string;
  theme?: "cyan" | "gold" | "violet";
}

function AnchoredKetBadge({
  initialStyle,
  symbol,
  theme = "cyan",
}: KetBadgeProps) {
  const themeClass = 
    theme === "gold" 
      ? styles.ketBadgeGold 
      : theme === "violet" 
      ? styles.ketBadgeViolet 
      : "";

  return (
    <div className={styles.elementAnchor} style={initialStyle}>
      <div className={`${styles.ketBadge} ${themeClass}`}>
        <motion.div 
          className={styles.ketOrbitRing}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        <span>{symbol}</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Main Background 3D Elements Canvas
 * ------------------------------------------------------------- */
export default function Background3DElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.sceneContainer}>
      <div className={styles.perspectiveStage}>
        {/* =========================================================
            SECTION 1: Why Attend Area (top: 2% - 17%)
            ========================================================= */}
        <AnchoredQubitCube
          initialStyle={{ top: "3%", left: "3%" }}
          faces={{ front: "|0⟩", back: "|1⟩", right: "|+⟩", left: "|-⟩", top: "|i⟩", bottom: "|ψ⟩" }}
          rotateYDuration={24}
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "6%", right: "3%" }}
          size="regular"
          coreType="cyan"
          rotateYDuration={28}
        />
        <AnchoredKetBadge
          initialStyle={{ top: "9%", left: "5%" }}
          symbol="|ψ⟩"
          theme="cyan"
        />
        <AnchoredQubitCube
          initialStyle={{ top: "12%", right: "4%" }}
          size="mini"
          theme="gold"
          faces={{ front: "|1⟩", back: "|0⟩", right: "H", left: "X", top: "Z", bottom: "✦" }}
          rotateYDuration={26}
          reverse={true}
        />
        <AnchoredDiamond
          initialStyle={{ top: "15%", left: "2%" }}
          rotateDuration={20}
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "17%", right: "2%" }}
          size="small"
          coreType="gold"
          rotateYDuration={32}
          reverse={true}
        />

        {/* =========================================================
            SECTION 2: Quantum Concepts Area (top: 19% - 33%)
            ========================================================= */}
        <AnchoredKetBadge
          initialStyle={{ top: "20%", left: "4%" }}
          symbol="|Φ⁺⟩"
          theme="violet"
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "23%", right: "3%" }}
          size="small"
          coreType="cyan"
          rotateYDuration={34}
        />
        <AnchoredQubitCube
          initialStyle={{ top: "26%", left: "2%" }}
          size="mini"
          theme="cyan"
          faces={{ front: "|i⟩", back: "|-i⟩", right: "|1⟩", left: "|0⟩", top: "H", bottom: "ψ" }}
          rotateYDuration={28}
        />
        <AnchoredDiamond
          initialStyle={{ top: "28%", right: "4%" }}
          rotateDuration={24}
          reverse={true}
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "31%", left: "4%" }}
          size="micro"
          coreType="violet"
          rotateYDuration={26}
        />
        <AnchoredKetBadge
          initialStyle={{ top: "33%", right: "2%" }}
          symbol="|+⟩"
          theme="gold"
        />

        {/* =========================================================
            SECTION 3: Odyssey Timeline Area (top: 35% - 50%)
            ========================================================= */}
        <AnchoredQubitCube
          initialStyle={{ top: "36%", left: "3%" }}
          size="regular"
          theme="gold"
          faces={{ front: "|+⟩", back: "|-⟩", right: "X", left: "Z", top: "|1⟩", bottom: "|0⟩" }}
          rotateYDuration={30}
          reverse={true}
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "39%", right: "3%" }}
          size="regular"
          coreType="cyan"
          rotateYDuration={36}
        />
        <AnchoredKetBadge
          initialStyle={{ top: "42%", left: "5%" }}
          symbol="ħ"
          theme="cyan"
        />
        <AnchoredDiamond
          initialStyle={{ top: "45%", right: "4%" }}
          rotateDuration={22}
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "48%", left: "2%" }}
          size="small"
          coreType="gold"
          rotateYDuration={38}
        />
        <AnchoredQubitCube
          initialStyle={{ top: "51%", right: "2%" }}
          size="mini"
          theme="violet"
          faces={{ front: "0", back: "1", right: "H", left: "Z", top: "X", bottom: "✦" }}
          rotateYDuration={26}
        />

        {/* =========================================================
            SECTION 4: Speakers Area (top: 53% - 67%)
            ========================================================= */}
        <AnchoredKetBadge
          initialStyle={{ top: "54%", left: "4%" }}
          symbol="⟨0|1⟩"
          theme="gold"
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "57%", right: "3%" }}
          size="small"
          coreType="violet"
          rotateYDuration={30}
          reverse={true}
        />
        <AnchoredDiamond
          initialStyle={{ top: "60%", left: "2%" }}
          rotateDuration={26}
          reverse={true}
        />
        <AnchoredQubitCube
          initialStyle={{ top: "62%", right: "4%" }}
          size="regular"
          theme="cyan"
          faces={{ front: "|0⟩", back: "|1⟩", right: "H", left: "Z", top: "X", bottom: "✦" }}
          rotateYDuration={28}
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "65%", left: "3%" }}
          size="regular"
          coreType="gold"
          rotateYDuration={34}
        />
        <AnchoredKetBadge
          initialStyle={{ top: "67%", right: "2%" }}
          symbol="|Ψ⁻⟩"
          theme="cyan"
        />

        {/* =========================================================
            SECTION 5: Schedule Area (top: 69% - 83%)
            ========================================================= */}
        <AnchoredDiamond
          initialStyle={{ top: "70%", left: "4%" }}
          rotateDuration={20}
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "73%", right: "3%" }}
          size="micro"
          coreType="cyan"
          rotateYDuration={28}
        />
        <AnchoredQubitCube
          initialStyle={{ top: "76%", left: "2%" }}
          size="mini"
          theme="gold"
          faces={{ front: "|1⟩", back: "|0⟩", right: "|i⟩", left: "|+⟩", top: "Z", bottom: "ψ" }}
          rotateYDuration={30}
          reverse={true}
        />
        <AnchoredKetBadge
          initialStyle={{ top: "78%", right: "4%" }}
          symbol="⊗"
          theme="violet"
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "81%", left: "3%" }}
          size="small"
          coreType="blue"
          rotateYDuration={32}
        />
        <AnchoredQubitCube
          initialStyle={{ top: "83%", right: "2%" }}
          size="regular"
          theme="violet"
          faces={{ front: "Q", back: "U", right: "B", left: "I", top: "T", bottom: "✦" }}
          rotateYDuration={32}
        />

        {/* =========================================================
            SECTION 6: FAQ & Footer Area (top: 85% - 98%)
            ========================================================= */}
        <AnchoredKetBadge
          initialStyle={{ top: "86%", left: "4%" }}
          symbol="Ψ"
          theme="cyan"
        />
        <AnchoredDiamond
          initialStyle={{ top: "88%", right: "3%" }}
          rotateDuration={24}
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "91%", left: "2%" }}
          size="micro"
          coreType="gold"
          rotateYDuration={30}
          reverse={true}
        />
        <AnchoredQubitCube
          initialStyle={{ top: "93%", right: "4%" }}
          size="mini"
          theme="cyan"
          faces={{ front: "|0⟩", back: "|1⟩", right: "H", left: "X", top: "Y", bottom: "Z" }}
          rotateYDuration={28}
        />
        <AnchoredKetBadge
          initialStyle={{ top: "95%", left: "3%" }}
          symbol="|i⟩"
          theme="violet"
        />
        <AnchoredBlochSphere
          initialStyle={{ top: "97%", right: "2%" }}
          size="small"
          coreType="cyan"
          rotateYDuration={34}
        />

        {/* 3D Grid Floor */}
        <div className={styles.gridFloor3D} />
      </div>
    </div>
  );
}
