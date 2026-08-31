"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./CursorLight.module.css";

export default function CursorLight() {
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth physics spring for silky smooth lag/follow
  const springX = useSpring(mouseX, { stiffness: 180, damping: 25, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 25, mass: 0.6 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <div className={styles.cursorGlowContainer} aria-hidden="true">
      {/* Broad Quantum Spotlight Glow */}
      <motion.div
        className={styles.cursorSpotlight}
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />
    </div>
  );
}
