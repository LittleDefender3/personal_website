"use client";

import Link from "next/link";
import { useWindowManager, type AppId } from "./WindowManager";
import styles from "./Taskbar.module.css";

const APPS: { id: AppId; icon: string; label: string }[] = [
  { id: "terminal", icon: ">_", label: "Terminal" },
  { id: "browser",  icon: "◈",  label: "Browser"  },
  { id: "files",    icon: "⌗",  label: "Files"    },
  { id: "photos",   icon: "⬡",  label: "Photos"   },
];

export default function Taskbar() {
  const { windows, openWindow, focusWindow } = useWindowManager();

  function handleAppClick(id: AppId) {
    const win = windows.find((w) => w.id === id);
    if (!win) return;
    if (win.isOpen && !win.isMinimized) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  }

  return (
    <nav className={styles.taskbar} aria-label="Desktop dock">
      {APPS.map(({ id, icon, label }) => {
        const win = windows.find((w) => w.id === id);
        const active = win?.isOpen && !win.isMinimized;
        return (
          <button
            key={id}
            className={`${styles.dockBtn} ${active ? styles.active : ""}`}
            onClick={() => handleAppClick(id)}
            title={label}
            aria-label={label}
          >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
            {active && <span className={styles.dot} aria-hidden="true" />}
          </button>
        );
      })}
      <div className={styles.divider} aria-hidden="true" />
      <Link
        href="/classic"
        className={styles.dockBtn}
        title="Classic — standard resume-style view"
        aria-label="Switch to classic view"
      >
        <span className={styles.icon}>⌘</span>
        <span className={styles.label}>Classic</span>
      </Link>
    </nav>
  );
}
