"use client";

import React from "react";
import styles from "./CardGeneratorSection.module.css";
import CardGenerator from "./CardGenerator";
import Button from "../ui/Button";

export default function CardGeneratorSection() {
  return (
    <section id="card-generator" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>ODYSSEY IDENTITY</h2>
          <p className={styles.subtitle}>Generate your official participant card.</p>
        </div>

        <CardGenerator role="participant" />
      </div>
    </section>
  );
}
