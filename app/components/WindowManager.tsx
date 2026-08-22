"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type AppId = "terminal" | "browser" | "files" | "photos" | "credits";

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface WindowManagerContextValue {
  windows: WindowState[];
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
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
  },
  {
    id: "browser",
    title: "Browser",
    icon: "◈",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
  },
  {
    id: "files",
    title: "Files",
    icon: "⌗",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
  },
  {
    id: "photos",
    title: "Photos",
    icon: "⬡",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
  },
  {
    id: "credits",
    title: "Credits",
    icon: "©",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
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

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
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
