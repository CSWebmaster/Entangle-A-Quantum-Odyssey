"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./VolunteerPage.module.css";
import CardGenerator from "@/components/card/CardGenerator";
import Button from "@/components/ui/Button";

export default function VolunteerPage() {
  const [accessCode, setAccessCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedName, setVerifiedName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError(null);

    try {
      const res = await fetch("/api/volunteer/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode }),
      });

      const data = await res.json();

      if (res.ok && data.verified) {
        setVerifiedName(data.name);
      } else {
        setError(data.error || "Verification failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.backLink}>← BACK TO ODYSSEY</Link>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>VOLUNTEER PORTAL</h1>
          <p className={styles.subtitle}>Verify your identity to generate your official volunteer card.</p>
        </div>

        {!verifiedName ? (
          <div className={styles.verificationCard}>
            <form onSubmit={handleVerify} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>ACCESS CODE</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="e.g. V-12345"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  required
                />
              </div>
              
              {error && <p className={styles.error}>{error}</p>}
              
              <Button type="submit" variant="primary" disabled={isVerifying || !accessCode}>
                {isVerifying ? "VERIFYING..." : "VERIFY IDENTITY"}
              </Button>
            </form>
          </div>
        ) : (
          <div className={styles.generatorSection}>
            <div className={styles.successMessage}>
              <span className={styles.successIcon}>✓</span>
              <span>Identity verified: <strong>{verifiedName}</strong></span>
            </div>
            
            {/* 
              We pass the verifiedName to the CardGenerator. 
              The CardGenerator will use this name if we pre-fill it, or we can just let them type it.
              For this implementation, the backend dictates the role as "volunteer" and the user is authorized.
            */}
            <CardGenerator role="volunteer" />
          </div>
        )}
      </div>
    </main>
  );
}
