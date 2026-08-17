"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Rnd } from "react-rnd";
import { type AppId, type WindowState, useWindowManager } from "./WindowManager";
import styles from "./AppWindow.module.css";

interface AppWindowProps {
  id: AppId;
  children: ReactNode;
}

const TASKBAR_HEIGHT = 56;

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
  const { windows, focusWindow, closeWindow, minimizeWindow, updatePositionAndSize } =
    useWindowManager();
  const win = windows.find((w) => w.id === id);
  const initialized = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Center on first mount if sentinel values (-1 means unset)
  useEffect(() => {
    if (!initialized.current && win && win.x === -1) {
      initialized.current = true;
      const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const x = Math.max(20, Math.round((vw - win.width) / 2));
      const y = Math.max(20, Math.round((vh - TASKBAR_HEIGHT - win.height) / 2));
      updatePositionAndSize(id, x, y, win.width, win.height);
    }
  }, [id, win, updatePositionAndSize]);

  const handleMouseDown = useCallback(() => {
    focusWindow(id);
  }, [focusWindow, id]);

  if (!win || !win.isOpen || win.isMinimized) return null;

  // isMobile is derived from state, no hydration mismatch
  if (isMobile) {
    return (
      <div
        className={styles.mobileWindow}
        style={{ zIndex: win.zIndex }}
        onMouseDown={handleMouseDown}
      >
        <TitleBar id={id} win={win} onMinimize={minimizeWindow} onClose={closeWindow} />
        <div className={styles.content}>{children}</div>
      </div>
    );
  }

  const safeX = win.x === -1 ? 0 : win.x;
  const safeY = win.y === -1 ? 0 : win.y;

  return (
    <Rnd
      position={{ x: safeX, y: safeY }}
      size={{ width: win.width, height: win.height }}
      minWidth={320}
      minHeight={240}
      bounds="window"
      dragHandleClassName={styles.titleBar}
      style={{ zIndex: win.zIndex, position: "fixed" }}
      onDragStop={(_e, d) => {
        updatePositionAndSize(id, d.x, d.y, win.width, win.height);
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        updatePositionAndSize(
          id,
          position.x,
          position.y,
          ref.offsetWidth,
          ref.offsetHeight
        );
      }}
      onMouseDown={handleMouseDown}
      enableResizing={{
        bottom: true,
        bottomLeft: true,
        bottomRight: true,
        left: true,
        right: true,
        top: false,
        topLeft: false,
        topRight: false,
      }}
    >
      <div className={styles.window} style={{ width: "100%", height: "100%" }}>
        <TitleBar id={id} win={win} onMinimize={minimizeWindow} onClose={closeWindow} />
        <div className={styles.content}>{children}</div>
      </div>
    </Rnd>
  );
}
