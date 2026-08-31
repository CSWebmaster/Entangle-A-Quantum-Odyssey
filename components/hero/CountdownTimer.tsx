"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./CountdownTimer.module.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  // Target: 8 September 2026, 2:00 PM (14:00:00 IST / local)
  const targetDate = new Date("2026-09-08T14:00:00+05:30").getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className={styles.labelWrapper}>
        <span className={styles.liveIndicator} />
        <span className={styles.timerLabel}>COUNTDOWN</span>
      </div>

      <div className={styles.timerGrid}>
        <div className={styles.timeBox}>
          <span className={styles.timeValue}>{pad(timeLeft.days)}</span>
          <span className={styles.timeUnit}>Days</span>
        </div>

        <span className={styles.colon}>:</span>

        <div className={styles.timeBox}>
          <span className={styles.timeValue}>{pad(timeLeft.hours)}</span>
          <span className={styles.timeUnit}>Hours</span>
        </div>

        <span className={styles.colon}>:</span>

        <div className={styles.timeBox}>
          <span className={styles.timeValue}>{pad(timeLeft.minutes)}</span>
          <span className={styles.timeUnit}>Minutes</span>
        </div>

        <span className={styles.colon}>:</span>

        <div className={styles.timeBox}>
          <span className={styles.timeValue}>{pad(timeLeft.seconds)}</span>
          <span className={styles.timeUnit}>Seconds</span>
        </div>
      </div>
    </motion.div>
  );
}
