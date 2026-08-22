"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type AppId = "terminal" | "browser" | "files" | "photos";

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WindowManagerContextValue {
  windows: WindowState[];
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  updatePosition: (id: AppId, x: number, y: number) => void;
  updateSize: (id: AppId, width: number, height: number) => void;
  updatePositionAndSize: (id: AppId, x: number, y: number, width: number, height: number) => void;
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(
  null
);

const DEFAULT_WINDOWS: WindowState[] = [
  {
    id: "terminal",
    title: "Terminal",
    icon: ">_",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: -1, // sentinel: center on mount
    y: -1,
    width: 720,
    height: 500,
  },
  {
    id: "browser",
    title: "Browser",
    icon: "◈",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 80,
    y: 60,
    width: 760,
    height: 540,
  },
  {
    id: "files",
    title: "Files",
    icon: "⌗",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 120,
    y: 80,
    width: 680,
    height: 480,
  },
  {
    id: "photos",
    title: "Photos",
    icon: "⬡",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 160,
    y: 100,
    width: 700,
    height: 520,
  },
];

let zCounter = 20;

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>(DEFAULT_WINDOWS);
  const zRef = useRef(zCounter);

  const focusWindow = useCallback((id: AppId) => {
    zRef.current += 1;
    const z = zRef.current;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w))
    );
  }, []);

  const openWindow = useCallback(
    (id: AppId) => {
      zRef.current += 1;
      const z = zRef.current;
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: z }
            : w
        )
      );
    },
    []
  );

  const closeWindow = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  }, []);

  const minimizeWindow = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const updatePosition = useCallback((id: AppId, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const updateSize = useCallback(
    (id: AppId, width: number, height: number) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, width, height } : w))
      );
    },
    []
  );

  const updatePositionAndSize = useCallback(
    (id: AppId, x: number, y: number, width: number, height: number) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, x, y, width, height } : w))
      );
    },
    []
  );

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        updatePosition,
        updateSize,
        updatePositionAndSize,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used inside WindowManagerProvider");
  return ctx;
}
