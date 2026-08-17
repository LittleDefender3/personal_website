"use client";

import { useState } from "react";
import styles from "./PhotosApp.module.css";

// Placeholder photo tiles – each has a gradient and a label.
// Drop real image URLs into `src` later to replace the placeholders.
const PHOTOS = [
  { id: 1, label: "Terminal Portfolio", gradient: "linear-gradient(135deg, #0e0b1a 0%, #b44dff 50%, #00f5ff 100%)" },
  { id: 2, label: "Unity 3D Game", gradient: "linear-gradient(135deg, #07050f 0%, #ff2d78 50%, #b44dff 100%)" },
  { id: 3, label: "Algorithms Viz", gradient: "linear-gradient(135deg, #0a0818 0%, #00f5ff 50%, #39ff14 100%)" },
  { id: 4, label: "Full Stack App", gradient: "linear-gradient(135deg, #070511 0%, #ffb830 50%, #ff2d78 100%)" },
  { id: 5, label: "Perth Skyline", gradient: "linear-gradient(135deg, #0d0b1e 0%, #1a1230 40%, #00f5ff 100%)" },
  { id: 6, label: "Code at Night", gradient: "linear-gradient(135deg, #07050f 0%, #39ff14 40%, #b44dff 100%)" },
  { id: 7, label: "OpenGL Scene", gradient: "linear-gradient(135deg, #050310 0%, #ff2d78 30%, #ffb830 100%)" },
  { id: 8, label: "University Days", gradient: "linear-gradient(135deg, #080614 0%, #b44dff 40%, #ff2d78 100%)" },
];

export default function PhotosApp() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const current = lightbox !== null ? PHOTOS.find((p) => p.id === lightbox) : null;

  return (
    <div className={styles.photos}>
      <div className={styles.grid}>
        {PHOTOS.map((photo) => (
          <button
            key={photo.id}
            className={styles.tile}
            style={{ background: photo.gradient }}
            onClick={() => setLightbox(photo.id)}
            aria-label={`Open ${photo.label}`}
          >
            <span className={styles.tileLabel}>{photo.label}</span>
          </button>
        ))}
      </div>

      {current && (
        <div
          className={styles.lightbox}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
        >
          <div
            className={styles.lightboxInner}
            style={{ background: current.gradient }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.lightboxClose}
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className={styles.lightboxLabel}>{current.label}</div>
            <div className={styles.lightboxHint}>
              Drop a real image here later ✦
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
