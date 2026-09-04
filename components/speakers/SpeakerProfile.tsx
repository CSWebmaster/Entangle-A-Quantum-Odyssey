"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./SpeakerProfile.module.css";
import { speakers } from "../../data/speakers";
import { QuantumParticle, OrbitalRing } from "../visuals/QuantumPrimitives";

export default function SpeakerProfile() {
  return (
    <section id="speakers" className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Meet Our Speaker</h2>
        </motion.div>

        <div className={styles.presentationContainer} style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {speakers.map((speaker, index) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeakerCard({ speaker, index }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      className={styles.cardWrapper}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
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
        <div className={styles.imageSection} style={{ transform: "translateZ(30px)" }}>
          <div className={styles.imageWrapper}>
            {speaker.image ? (
              <img 
                src={speaker.image} 
                alt={speaker.name} 
                className={styles.image} 
              />
            ) : (
              <div className={styles.skeleton}>
                <div className={styles.skeletonGeometry}>
                  <motion.div
                    animate={{ rotate: isHovered ? 180 : 0 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <OrbitalRing size={150} color="var(--cyan)" />
                    <OrbitalRing size={200} color="var(--cyan-bright)" borderStyle="dashed" />
                    <QuantumParticle size={6} style={{ top: -15, left: 75 }} />
                  </motion.div>
                </div>
              </div>
            )}
            <div className={styles.imageOverlay} />
          </div>
        </div>
        
        <div className={styles.infoSection} style={{ transform: "translateZ(50px)" }}>
          <h3 className={styles.name}>{speaker.name}</h3>
          <p className={styles.designation}>{speaker.designation}</p>
          <p className={styles.organization}>{speaker.organization}</p>
          {speaker.linkedin && (
            <a 
              href={speaker.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkedinBtn}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
              </svg>
              View LinkedIn Profile
            </a>
          )}
        </div>

        {/* Dynamic Glow */}
        <motion.div 
          className={styles.cardGlow}
          style={{
            x: useTransform(x, [-0.5, 0.5], ["-30%", "30%"]),
            y: useTransform(y, [-0.5, 0.5], ["-30%", "30%"]),
            opacity: isHovered ? 1 : 0.3
          }}
        />
      </div>
    </motion.div>
  );
}
