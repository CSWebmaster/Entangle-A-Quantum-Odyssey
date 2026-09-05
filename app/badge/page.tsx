"use client";

import React from "react";
import Link from "next/link";
import styles from "./BadgePage.module.css";
import CardGenerator from "@/components/card/CardGenerator";

export default function BadgePage() {
  return (
    <main className={styles.main}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.backLink}>
          ← BACK TO ODYSSEY
        </Link>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>ODYSSEY IDENTITY</h1>
          <p className={styles.subtitle}>Generate and download your official participant badge card.</p>
        </div>

        <CardGenerator role="participant" />
      </div>
    </main>
  );
}
