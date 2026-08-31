"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export const QuantumParticle = ({ size = 6, color = "var(--cyan-bright)", blur = 10, ...props }: HTMLMotionProps<"div"> & { size?: number, color?: string, blur?: number }) => (
  <motion.div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: color,
      boxShadow: `0 0 ${blur}px ${color}`,
      position: "absolute",
    }}
    {...props}
  />
);

export const OrbitalRing = ({ size = 200, color = "var(--orbital-ring-color, rgba(0, 175, 196, 0.35))", borderStyle = "solid", strokeWidth = 1, ...props }: HTMLMotionProps<"div"> & { size?: number, color?: string, borderStyle?: string, strokeWidth?: number }) => (
  <motion.div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      border: `${strokeWidth}px ${borderStyle} ${color}`,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -size / 2,
      marginLeft: -size / 2,
    }}
    {...props}
  />
);

export const QuantumNode = ({ size = 24, coreColor = "var(--cyan)", ringColor = "var(--cyan)", ...props }: HTMLMotionProps<"div"> & { size?: number, coreColor?: string, ringColor?: string }) => (
  <motion.div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      border: `2px solid ${ringColor}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
    }}
    {...props}
  >
    <div style={{ width: size / 3, height: size / 3, borderRadius: "50%", backgroundColor: coreColor }} />
  </motion.div>
);

export const QuantumGrid = ({ opacity = 0.05 }) => (
  <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", opacity }}>
    <defs>
      <pattern id="q-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#q-grid)" />
  </svg>
);

/* --- V2 3D EXPERIENCE ICONS (AUTONOMOUS) --- */

export const QuantumBook = ({ isHovered = false }) => {
  const duration = isHovered ? 8 : 4; // Slow down on hover
  return (
    <div style={{ position: 'relative', width: 40, height: 40, perspective: 200, transformStyle: 'preserve-3d' }}>
      <motion.div
        style={{ position: 'absolute', width: 30, height: 40, border: '1px solid var(--cyan)', borderRight: 'none', borderRadius: '4px 0 0 4px', left: 5, top: 0 }}
        animate={{ rotateY: [-20, -10, -20] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ position: 'absolute', width: 30, height: 40, border: '1px solid var(--cyan)', borderLeft: 'none', borderRadius: '0 4px 4px 0', right: 5, top: 0 }}
        animate={{ rotateY: [20, 10, 20] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ position: 'absolute', width: 2, height: 2, background: 'var(--cyan-bright)', borderRadius: '50%', top: 20, left: 20 }}
        animate={{ y: [-10, -30, -10], opacity: [0, 1, 0] }}
        transition={{ duration: isHovered ? 4 : 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export const QuantumFlask = ({ isHovered = false }) => (
  <div style={{ position: 'relative', width: 40, height: 40 }}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
      <path d="M15 10 L15 5 L25 5 L25 10 L35 35 L5 35 Z" />
      <motion.path 
        d="M10 25 Q20 20 30 25" 
        stroke="var(--cyan-bright)" 
        animate={{ d: ["M10 25 Q20 20 30 25", "M10 25 Q20 30 30 25", "M10 25 Q20 20 30 25"] }} 
        transition={{ duration: isHovered ? 4 : 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
    <motion.div
      style={{ position: 'absolute', width: 3, height: 3, background: 'var(--cyan-bright)', borderRadius: '50%', top: 20, left: 18 }}
      animate={{ y: [0, -25], opacity: [1, 0] }}
      transition={{ duration: isHovered ? 3 : 1.5, repeat: Infinity, ease: 'easeOut' }}
    />
  </div>
);

export const QuantumCircuitMini = ({ isHovered = false }) => (
  <div style={{ position: 'relative', width: 40, height: 40 }}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
      <path d="M5 20 L15 20 L25 10 L35 10" />
      <path d="M15 20 L25 30 L35 30" />
      <circle cx="15" cy="20" r="2" fill="var(--bg-navy)" />
      <circle cx="25" cy="10" r="2" fill="var(--bg-navy)" />
      <circle cx="25" cy="30" r="2" fill="var(--bg-navy)" />
    </svg>
    <motion.div
      style={{ position: 'absolute', width: 4, height: 4, background: 'var(--cyan-bright)', borderRadius: '50%', top: -2, left: -2 }}
      animate={{ x: [5, 15, 25, 35], y: [20, 20, 10, 10], opacity: [0, 1, 1, 0] }}
      transition={{ duration: isHovered ? 4 : 2, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

export const QuantumSignal = ({ isHovered = false }) => (
  <div style={{ position: 'relative', width: 40, height: 40 }}>
    <motion.div style={{ position: 'absolute', left: 5, top: 18, width: 4, height: 4, borderRadius: '50%', background: 'var(--cyan)' }} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: isHovered ? 3 : 1.5, repeat: Infinity }} />
    <motion.div style={{ position: 'absolute', right: 5, top: 18, width: 4, height: 4, borderRadius: '50%', background: 'var(--cyan)' }} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: isHovered ? 3 : 1.5, repeat: Infinity, delay: 0.75 }} />
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--cyan-bright)" strokeWidth="1">
      <motion.path
        d="M10 20 Q15 10 20 20 T30 20"
        animate={{ d: ["M10 20 Q15 10 20 20 T30 20", "M10 20 Q15 30 20 20 T30 20", "M10 20 Q15 10 20 20 T30 20"] }}
        transition={{ duration: isHovered ? 3 : 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  </div>
);

export const QuantumCompass = ({ isHovered = false }) => (
  <div style={{ position: 'relative', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <motion.div
      style={{ position: 'absolute', width: 30, height: 30, border: '1px dashed var(--cyan)', borderRadius: '50%' }}
      animate={{ rotate: 360 }}
      transition={{ duration: isHovered ? 16 : 8, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      style={{ position: 'absolute', width: 2, height: 20, background: 'var(--cyan-bright)' }}
      animate={{ rotate: [0, 45, -20, 0] }}
      transition={{ duration: isHovered ? 6 : 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

export const QuantumEntangledNodes = ({ isHovered = false }) => (
  <div style={{ position: 'relative', width: 40, height: 40 }}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="rgba(0,175,196,0.4)" strokeWidth="1" strokeDasharray="2 2">
      <line x1="10" y1="30" x2="30" y2="10" />
    </svg>
    <motion.div
      style={{ position: 'absolute', width: 8, height: 8, background: 'var(--cyan)', borderRadius: '50%', bottom: 6, left: 6 }}
      animate={{ scale: [1, 1.5, 1], boxShadow: ['0 0 0px var(--cyan)', '0 0 10px var(--cyan)', '0 0 0px var(--cyan)'] }}
      transition={{ duration: isHovered ? 4 : 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      style={{ position: 'absolute', width: 8, height: 8, background: 'var(--cyan-bright)', borderRadius: '50%', top: 6, right: 6 }}
      animate={{ scale: [1, 1.5, 1], boxShadow: ['0 0 0px var(--cyan)', '0 0 10px var(--cyan)', '0 0 0px var(--cyan)'] }}
      transition={{ duration: isHovered ? 4 : 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

/* --- NEW FINAL PRIMITIVES --- */

export const InterferenceVisual = ({ isHovered = false }) => (
  <div style={{ position: 'relative', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {/* Concentric expanding ripples that interfere */}
    <motion.div
      style={{ position: 'absolute', width: 10, height: 10, border: '1px solid var(--cyan-bright)', borderRadius: '50%', left: 5 }}
      animate={{ scale: [1, 4, 1], opacity: [0.8, 0, 0.8] }}
      transition={{ duration: isHovered ? 6 : 3, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      style={{ position: 'absolute', width: 10, height: 10, border: '1px solid var(--teal)', borderRadius: '50%', right: 5 }}
      animate={{ scale: [1, 4, 1], opacity: [0.8, 0, 0.8] }}
      transition={{ duration: isHovered ? 6 : 3, repeat: Infinity, ease: 'linear', delay: 0.5 }}
    />
  </div>
);

export const QuantumCalendar = ({ isHovered = false }) => (
  <div style={{ position: 'relative', width: 40, height: 40 }}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
      <rect x="8" y="10" width="24" height="22" rx="2" />
      <path d="M12 6 L12 10 M28 6 L28 10 M8 16 L32 16" />
      <circle cx="20" cy="24" r="2" fill="var(--cyan-bright)" />
    </svg>
    <motion.div
      style={{ position: 'absolute', top: 22, left: 10, width: 2, height: 2, background: 'var(--text-white)', borderRadius: '50%' }}
      animate={{ x: [0, 18, 0], opacity: [0, 1, 0] }}
      transition={{ duration: isHovered ? 4 : 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

export const QuantumClock = ({ isHovered = false }) => (
  <div style={{ position: 'relative', width: 40, height: 40 }}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
      <circle cx="20" cy="20" r="12" />
    </svg>
    <motion.div
      style={{ position: 'absolute', top: 20, left: 20, width: 8, height: 1.5, background: 'var(--cyan-bright)', transformOrigin: '0% 50%' }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: isHovered ? 12 : 6, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      style={{ position: 'absolute', top: 20, left: 20, width: 5, height: 2, background: 'var(--teal)', transformOrigin: '0% 50%' }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: isHovered ? 120 : 60, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

export const QuantumLocation = ({ isHovered = false }) => (
  <div style={{ position: 'relative', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
      <path d="M20 8 C14.477 8 10 12.477 10 18 C10 25.5 20 34 20 34 C20 34 30 25.5 30 18 C30 12.477 25.523 8 20 8 Z" />
      <circle cx="20" cy="18" r="3" fill="var(--cyan-bright)" stroke="none" />
    </svg>
    <motion.div
      style={{ position: 'absolute', top: 18, left: 20, width: 1, height: 1, border: '1px solid var(--cyan-bright)', borderRadius: '50%' }}
      animate={{ scale: [1, 15, 1], opacity: [1, 0, 1] }}
      transition={{ duration: isHovered ? 4 : 2, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

/* REUSABLE QUANTUM ORBITAL SYSTEM */
export const QuantumOrbitalAnimation = ({
  children,
  isHovered = false,
  radius = 50,
  particleCount = 2,
  speed = 4,
}: {
  children?: React.ReactNode;
  isHovered?: boolean;
  radius?: number;
  particleCount?: number;
  speed?: number;
}) => {
  const currentSpeed = isHovered ? speed * 2 : speed;

  return (
    <div style={{ position: 'relative', width: radius * 2, height: radius * 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Central Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>

      {/* Orbit Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: currentSpeed * 4, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <OrbitalRing size={radius * 1.8} borderStyle="dashed" strokeWidth={1} color="rgba(0,175,196,0.3)" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: currentSpeed * 5, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <OrbitalRing size={radius * 1.4} borderStyle="solid" strokeWidth={1} color="rgba(0,175,196,0.15)" />
      </motion.div>

      {/* Travelling Particles */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: currentSpeed, 
            repeat: Infinity, 
            ease: 'linear', 
            delay: (currentSpeed / particleCount) * i 
          }}
        >
          <QuantumParticle size={4} blur={8} style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }} />
        </motion.div>
      ))}

      {/* Pulse Field */}
      <motion.div
        style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,175,196,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: currentSpeed, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};
