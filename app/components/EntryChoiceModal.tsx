"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./EntryChoiceModal.module.css";

const STORAGE_KEY = "entry-choice-made";

export default function EntryChoiceModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // sessionStorage unavailable (e.g. private browsing) — skip the prompt
    }
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-choice-title"
      onClick={dismiss}
    >
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={dismiss} aria-label="Dismiss and continue">
          ✕
        </button>
        <h2 id="entry-choice-title" className={styles.heading}>
          How would you like to explore?
        </h2>
        <p className={styles.subheading}>
          Pick whichever fits — you can switch anytime from the dock.
        </p>
        <p className={styles.notice}>
          This site is still under active development - I&apos;m hoping to
          have it finished up after my internship wraps at the end of August.
        </p>
        <div className={styles.options}>
          <Link href="/classic" className={styles.option} onClick={dismiss}>
            <span className={styles.optionIcon}>⌘</span>
            <span className={styles.optionTitle}>Classic View</span>
            <span className={styles.optionDesc}>
              Standard resume-style layout — quick to scan, no clicking around.
            </span>
          </Link>
          <button className={styles.option} onClick={dismiss}>
            <span className={styles.optionIcon}>&gt;_</span>
            <span className={styles.optionTitle}>Interactive Site</span>
            <span className={styles.optionDesc}>
              A real terminal, draggable windows, and a file browser.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
