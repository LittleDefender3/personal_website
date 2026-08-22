"use client";

import { useEffect, useState, type ReactNode } from "react";
import { type AppId, type WindowState, useWindowManager } from "./WindowManager";
import styles from "./AppWindow.module.css";

interface AppWindowProps {
  id: AppId;
  children: ReactNode;
}

interface TitleBarProps {
  id: AppId;
  win: WindowState;
  onMinimize: (id: AppId) => void;
  onClose: (id: AppId) => void;
}

function TitleBar({ id, win, onMinimize, onClose }: TitleBarProps) {
  return (
    <div className={styles.titleBar}>
      <span className={styles.titleIcon}>{win.icon}</span>
      <span className={styles.titleText}>{win.title}</span>
      <div className={styles.titleButtons}>
        <button
          className={`${styles.titleBtn} ${styles.minimizeBtn}`}
          onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
          aria-label={`Minimize ${win.title}`}
        >
          <span>—</span>
        </button>
        <button
          className={`${styles.titleBtn} ${styles.closeBtn}`}
          onClick={(e) => { e.stopPropagation(); onClose(id); }}
          aria-label={`Close ${win.title}`}
        >
          <span>✕</span>
        </button>
      </div>
    </div>
  );
}

export default function AppWindow({ id, children }: AppWindowProps) {
  const { windows, focusWindow, closeWindow, minimizeWindow } = useWindowManager();
  const win = windows.find((w) => w.id === id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  if (!win || !win.isOpen || win.isMinimized) return null;

  // isMobile is derived from state, no hydration mismatch
  if (isMobile) {
    return (
      <div
        className={styles.mobileWindow}
        style={{ zIndex: win.zIndex }}
        onMouseDown={() => focusWindow(id)}
      >
        <TitleBar id={id} win={win} onMinimize={minimizeWindow} onClose={closeWindow} />
        <div className={styles.content}>{children}</div>
      </div>
    );
  }

  return (
    <div
      className={styles.popupWrap}
      style={{ zIndex: win.zIndex }}
      onMouseDown={() => focusWindow(id)}
    >
      <div className={styles.window}>
        <TitleBar id={id} win={win} onMinimize={minimizeWindow} onClose={closeWindow} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
