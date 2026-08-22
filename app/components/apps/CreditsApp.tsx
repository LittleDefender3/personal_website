"use client";

import styles from "./CreditsApp.module.css";

const ASSET_CREDITS = [
  {
    title: "Medieval Fantasy Book",
    author: "Pixel",
    authorUrl: "https://sketchfab.com/stefan.lengyel1",
    role: "3D model — the book/castle diorama behind everything on this site",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl:
      "https://sketchfab.com/3d-models/medieval-fantasy-book-06d5a80a04fc4c5ab552759e9a97d91a",
  },
];

const BUILT_WITH = [
  { name: "Next.js", url: "https://nextjs.org" },
  { name: "React", url: "https://react.dev" },
  { name: "TypeScript", url: "https://www.typescriptlang.org" },
  { name: "Three.js", url: "https://threejs.org" },
  { name: "React Three Fiber", url: "https://docs.pmnd.rs/react-three-fiber" },
  { name: "@react-three/drei", url: "https://github.com/pmndrs/drei" },
];

export default function CreditsApp() {
  return (
    <div className={styles.credits}>
      <div className={styles.section}>
        <h1 className={styles.h1}>Credits</h1>
        <p className={styles.intro}>
          This site leans on some great open assets and open-source tools. Here&apos;s
          what&apos;s doing the heavy lifting.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.h2}>3D Assets</h2>
        <div className={styles.cards}>
          {ASSET_CREDITS.map((c) => (
            <div key={c.title} className={styles.card}>
              <div className={styles.cardTitle}>{c.title}</div>
              <div className={styles.cardMeta}>
                by{" "}
                <a href={c.authorUrl} target="_blank" rel="noopener noreferrer">
                  {c.author}
                </a>{" "}
                ·{" "}
                <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">
                  {c.license}
                </a>
              </div>
              <div className={styles.cardDesc}>{c.role}</div>
              <a
                className={styles.link}
                href={c.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View source on Sketchfab →
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.h2}>Built With</h2>
        <div className={styles.tags}>
          {BUILT_WITH.map((t) => (
            <a
              key={t.name}
              className={styles.tag}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
