import type { Metadata } from "next";
import Link from "next/link";
import {
  getGithubRepoUrl,
  parseTitledFile,
  readContentDir,
  readContentFile,
} from "@/app/lib/content";
import { PROJECTS } from "@/app/lib/commands";
import { renderBlocks, renderExperience, splitHeader } from "./textBlocks";
import styles from "./classic.module.css";

export const metadata: Metadata = {
  title: "Dylan Hawkins — Resume",
  description:
    "Standard resume-style overview of Dylan Hawkins — Software Engineer and Games Developer.",
};

const NAV = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function ClassicPage() {
  const repoUrl = getGithubRepoUrl();

  const bio = splitHeader(readContentFile("about/bio.txt"));
  const education = splitHeader(readContentFile("about/education.txt"));
  const experience = readContentFile("experience/experience.md");
  const skills = readContentDir("skills").map((f) => parseTitledFile(f.content));
  const contact = splitHeader(readContentFile("contact/contact.txt"));
  const resume = readContentFile("resume/resume.txt");

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <h1 className={styles.name}>{bio.header.Name}</h1>
            <p className={styles.title}>{bio.header.Title}</p>
            <p className={styles.meta}>
              {bio.header.Location}
              {bio.header.Status && (
                <>
                  {" "}
                  · <span className={styles.status}>{bio.header.Status}</span>
                </>
              )}
            </p>
          </div>
          <Link href="/" className={styles.switchBtn}>
            ⌘ Open interactive site
          </Link>
        </div>
        <nav className={styles.nav} aria-label="Section navigation">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main className={styles.content}>
        <section id="about" className={styles.section}>
          <h2 className={styles.heading}>About</h2>
          {renderBlocks(bio.rest)}

          <h3 className={styles.groupHeading}>Education</h3>
          <p className={styles.paragraph}>
            <strong>{education.header.Degree}</strong> — {education.header.Majors}
            <br />
            {education.header.Institution} · {education.header.Duration}
          </p>
          {renderBlocks(education.rest)}
        </section>

        <section id="experience" className={styles.section}>
          <h2 className={styles.heading}>Experience</h2>
          {renderExperience(experience)}
        </section>

        <section id="projects" className={styles.section}>
          <h2 className={styles.heading}>Projects</h2>
          <div className={styles.projectGrid}>
            {PROJECTS.map((p) => (
              <article key={p.id} className={styles.projectCard}>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                <p className={styles.paragraph}>{p.shortDescription}</p>
                <div className={styles.tagRow}>
                  {p.technologies.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                      GitHub ↗
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                      Live ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className={styles.section}>
          <h2 className={styles.heading}>Skills</h2>
          <div className={styles.skillsGrid}>
            {skills.map((s) => (
              <div key={s.title} className={styles.skillGroup}>
                <h4 className={styles.subHeading}>{s.title}</h4>
                <div className={styles.tagRow}>
                  {s.body.split(",").map((t) => (
                    <span key={t} className={styles.tag}>
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <h2 className={styles.heading}>Contact</h2>
          <dl className={styles.contactList}>
            {Object.entries(contact.header).map(([k, v]) => (
              <div key={k} className={styles.contactRow}>
                <dt>{k}</dt>
                <dd>
                  <a
                    href={v.startsWith("http") ? v : `mailto:${v}`}
                    target={v.startsWith("http") ? "_blank" : undefined}
                    rel={v.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={styles.inlineLink}
                  >
                    {v}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          {renderBlocks(contact.rest)}

          <h3 className={styles.groupHeading}>Resume</h3>
          {renderBlocks(resume, 1)}
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          Every section on this page is generated from real files in the repo&apos;s{" "}
          <a href={`${repoUrl}/tree/main/content`} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
            content/
          </a>{" "}
          directory — browse them on{" "}
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
            GitHub
          </a>{" "}
          or via the Files app on the{" "}
          <Link href="/" className={styles.inlineLink}>
            interactive site
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
