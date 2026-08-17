"use client";

import { useState } from "react";
import { PROJECTS } from "@/app/lib/commands";
import styles from "./BrowserApp.module.css";

type Section = "home" | "projects" | "skills" | "contact";

const SKILLS = {
  "Programming Languages":  ["JavaScript", "TypeScript", "Python", "C#", "C++", "Java", "HTML / CSS", "SQL"],
  "Web Development":        ["React", "Next.js", "Node.js", "Express", "REST APIs", "PostgreSQL", "Tailwind CSS"],
  "Game Development":       ["Unity", "C# Scripting", "OpenGL", "GLSL", "Physics Sim", "Game AI", "3D Modelling"],
  "Tools & Technologies":   ["Git", "Docker", "Linux", "VS Code", "Figma", "GitHub Actions"],
  "Computer Science":       ["Algorithms", "Data Structures", "System Design", "OOP", "Design Patterns"],
  "Currently Learning":     ["WebGL", "WebAssembly", "Rust", "Cloud Architecture"],
};

export default function BrowserApp() {
  const [section, setSection] = useState<Section>("home");

  return (
    <div className={styles.browser}>
      {/* Nav bar */}
      <nav className={styles.nav}>
        {(["home", "projects", "skills", "contact"] as Section[]).map((s) => (
          <button
            key={s}
            className={`${styles.navBtn} ${section === s ? styles.active : ""}`}
            onClick={() => setSection(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className={styles.content}>
        {section === "home" && <HomeSection />}
        {section === "projects" && <ProjectsSection />}
        {section === "skills" && <SkillsSection />}
        {section === "contact" && <ContactSection />}
      </div>
    </div>
  );
}

function HomeSection() {
  return (
    <div className={styles.section}>
      <h1 className={styles.h1}>Dylan Hawkins</h1>
      <p className={styles.subtitle}>Software Engineer · Games Developer</p>
      <p className={styles.location}>📍 Perth, Western Australia</p>
      <span className={styles.badge}>● Open to opportunities</span>
      <div className={styles.bio}>
        <p>
          A passionate software engineer and games developer studying at Murdoch
          University. I love building things that live at the intersection of
          creative design and technical craft — from interactive terminal
          portfolios to 3D game worlds.
        </p>
        <p>
          Driven by curiosity, I&apos;m always experimenting with new
          technologies, pushing creative boundaries, and shipping polished work.
        </p>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <div className={styles.section}>
      <h2 className={styles.h2}>Projects</h2>
      <div className={styles.cards}>
        {PROJECTS.map((p) => (
          <div key={p.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardDesc}>{p.shortDescription}</p>
            <div className={styles.tags}>
              {p.technologies.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                View on GitHub →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <div className={styles.section}>
      <h2 className={styles.h2}>Skills</h2>
      {Object.entries(SKILLS).map(([category, skills]) => (
        <div key={category} className={styles.skillGroup}>
          <h3 className={styles.skillCategory}>{category}</h3>
          <div className={styles.tags}>
            {skills.map((s) => (
              <span key={s} className={styles.tag}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactSection() {
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const github = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  return (
    <div className={styles.section}>
      <h2 className={styles.h2}>Contact</h2>
      <p className={styles.contactIntro}>
        Interested in collaborating or hiring? Reach out below.
      </p>
      {email && (
        <a href={`mailto:${email}`} className={styles.contactItem}>
          <span className={styles.contactIcon}>✉</span>
          <span>{email}</span>
        </a>
      )}
      {github && (
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
        >
          <span className={styles.contactIcon}>⌥</span>
          <span>github.com/{github}</span>
        </a>
      )}
      {!email && !github && (
        <p className={styles.contactNote}>
          Set <code>NEXT_PUBLIC_EMAIL</code> and{" "}
          <code>NEXT_PUBLIC_GITHUB_USERNAME</code> env vars to show contact
          details.
        </p>
      )}
    </div>
  );
}
