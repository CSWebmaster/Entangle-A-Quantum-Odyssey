"use client";

import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  children: React.ReactNode;
}

export default function Button({ 
  variant = "primary", 
  href, 
  children, 
  className = "",
  ...props 
}: ButtonProps) {
  const rootClass = `${styles.btn} ${styles[variant]} ${className}`;

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={rootClass}>
          {children}
          {variant === "primary" && <ArrowUpRight size={18} className={styles.icon} />}
        </a>
      );
    }
    return (
      <Link href={href} className={rootClass}>
        {children}
        {variant === "primary" && <ArrowUpRight size={18} className={styles.icon} />}
      </Link>
    );
  }

  return (
    <button className={rootClass} {...props}>
      {children}
    </button>
  );
}
