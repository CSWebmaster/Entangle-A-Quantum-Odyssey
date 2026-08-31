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
      {/* Circuit Traces */}
      <svg className={styles.circuitLayer} viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <path d="M 0,20 L 15,20 L 25,30 L 50,30" className={styles.trace} />
        <path d="M 100,60 L 80,60 L 70,50 L 40,50" className={styles.trace} />
        <path d="M 50,0 L 50,15 L 60,25 L 60,40" className={styles.trace} />
      </svg>

      {/* Autonomous Qubits */}
      {qubits.map((q) => (
        <motion.div
          key={q.id}
          className={styles.qubitNode}
          style={{ left: `${q.x}vw`, top: `${q.y}vh` }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: q.duration,
            repeat: Infinity,
            delay: q.delay,
            ease: "easeInOut",
          }}
        >
          <QuantumParticle size={q.size} color="var(--cyan)" blur={4} />
          {q.size > 4 && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ position: 'absolute', top: q.size / 2, left: q.size / 2 }}
            >
              <OrbitalRing size={q.size * 6} color="rgba(0,175,196,0.1)" />
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Data Transfer Simulation */}
      <motion.div
        className={styles.dataPacket}
        animate={{
          left: ["0vw", "15vw", "25vw", "50vw"],
          top: ["200px", "200px", "300px", "300px"],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <QuantumParticle size={3} color="var(--cyan-bright)" blur={8} />
      </motion.div>
      
      <motion.div
        className={styles.dataPacket}
        animate={{
          left: ["100vw", "80vw", "70vw", "40vw"],
          top: ["600px", "600px", "500px", "500px"],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          delay: 5,
          ease: "linear"
        }}
      >
        <QuantumParticle size={3} color="var(--teal)" blur={8} />
      </motion.div>
    </div>
  );
}
