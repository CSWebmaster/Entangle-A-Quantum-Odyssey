"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQSection.module.css";
import { faqData } from "../../data/faq";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>FAQ</h2>
        </div>

        <div className={styles.faqList}>
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className={styles.faqItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button 
                className={styles.questionBtn}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className={styles.question}>{faq.question}</span>
                <span className={`${styles.icon} ${activeIndex === index ? styles.iconOpen : ""}`}>
                  ↓
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.answerContainer}
                  >
                    <p className={styles.answer}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
