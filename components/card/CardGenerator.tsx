"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./CardGenerator.module.css";
import Button from "../ui/Button";
import { generateCardCanvas, exportCard, IdentityRole } from "../../lib/card/engine";
import { QuantumParticle, OrbitalRing } from "../visuals/QuantumPrimitives";

interface CardGeneratorProps {
  role?: IdentityRole;
}

export default function CardGenerator({ role = "participant" }: CardGeneratorProps) {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!previewContainerRef.current) return;
    const rect = previewContainerRef.current.getBoundingClientRect();
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
    x.set(0);
    y.set(0);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large. Max size is 5MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  const updatePreview = async () => {
    if (canvasRef.current) {
      await generateCardCanvas({ name, photoUrl, role }, canvasRef.current);
    }
  };

  useEffect(() => {
    updatePreview();
  }, [name, photoUrl, role]);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      if (canvasRef.current) {
        await generateCardCanvas({ name, photoUrl, role }, canvasRef.current);
        exportCard(canvasRef.current, `entangle-${role}-${name || "card"}.png`);
      }
    } catch (err) {
      console.error("Failed to generate card:", err);
      alert("Failed to generate card. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>YOUR NAME</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>PHOTO</label>
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/webp" 
            className={styles.fileInput}
            ref={fileInputRef}
            onChange={handlePhotoUpload}
          />
          <Button 
            variant="secondary" 
            onClick={() => fileInputRef.current?.click()}
            className={styles.uploadBtn}
          >
            {photoUrl ? "CHANGE PHOTO" : "UPLOAD PHOTO"}
          </Button>
          <p className={styles.helperText}>Recommended: Square face photo, max 5MB</p>
        </div>

        <div className={styles.actions}>
          <Button 
            variant="primary" 
            onClick={handleDownload}
            disabled={isGenerating || !name}
            className={styles.downloadBtn}
          >
            {isGenerating ? "GENERATING..." : "DOWNLOAD PNG"}
          </Button>
        </div>
      </div>

      <div className={styles.previewSection}>
        <p className={styles.previewLabel}>LIVE PREVIEW</p>
        <motion.div 
          className={styles.perspectiveWrapper}
          ref={previewContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
        >
          <motion.div 
            className={styles.canvasWrapper}
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d" 
            }}
          >
            <canvas 
              ref={canvasRef} 
              className={styles.canvas} 
              style={{ width: "100%", height: "auto", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,175,196,0.2)" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
