"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./GlobalQuantumField.module.css";
import { QuantumParticle, OrbitalRing } from "../visuals/QuantumPrimitives";

interface Qubit {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function GlobalQuantumField() {
  const [qubits, setQubits] = useState<Qubit[]>([]);

  useEffect(() => {
    // Generate random stable positions for some background qubits only on the client
    setQubits(
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // vw
        y: Math.random() * 100, // vh
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  return (
    <div className={styles.quantumField}>
      {/* Global Blueprint Grid */}
      <div className={styles.globalGrid} />
      <div className={styles.radialVignette} />
    </div>
  );
}
