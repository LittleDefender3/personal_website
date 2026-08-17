import fs from "node:fs";
import path from "node:path";
import type { FileNode } from "./types";

// Server-only: reads the real, git-tracked /content directory so the Files
// app and the classic view render the same files a visitor can browse on
// GitHub. Do not import this from a "use client" module.

const CONTENT_ROOT = path.join(process.cwd(), "content");

const TOP_LEVEL_ORDER = [
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
  "resume",
];

function titleCase(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function readDir(absDir: string, relDir: string): FileNode[] {
  const entries = fs.readdirSync(absDir, { withFileTypes: true });
  const dirs = entries
    .filter((e) => e.isDirectory())
    .sort((a, b) => {
      if (relDir === "") {
        const ai = TOP_LEVEL_ORDER.indexOf(a.name.toLowerCase());
        const bi = TOP_LEVEL_ORDER.indexOf(b.name.toLowerCase());
        if (ai !== -1 && bi !== -1) return ai - bi;
      }
      return a.name.localeCompare(b.name);
    });
  const files = entries
    .filter((e) => e.isFile() && e.name.toLowerCase() !== "readme.md")
    .sort((a, b) => a.name.localeCompare(b.name));

  const folderNodes: FileNode[] = dirs.map((d) => {
    const rel = relDir ? `${relDir}/${d.name}` : d.name;
    return {
      kind: "folder",
      name: titleCase(d.name),
      path: `content/${rel}`,
      children: readDir(path.join(absDir, d.name), rel),
    };
  });

  const fileNodes: FileNode[] = files.map((f) => {
    const rel = relDir ? `${relDir}/${f.name}` : f.name;
    return {
      kind: "file",
      name: f.name,
      path: `content/${rel}`,
      content: fs.readFileSync(path.join(absDir, f.name), "utf-8").trimEnd(),
    };
  });

  return [...folderNodes, ...fileNodes];
}

/** The full /content tree, for the Files app. */
export function getContentTree(): FileNode[] {
  return readDir(CONTENT_ROOT, "");
}

/** Read a single file under /content, e.g. "about/bio.txt". */
export function readContentFile(relPath: string): string {
  return fs.readFileSync(path.join(CONTENT_ROOT, relPath), "utf-8").trim();
}

/** List the files directly inside a /content subdirectory, e.g. "skills". */
export function readContentDir(
  relDir: string
): { name: string; path: string; content: string }[] {
  const absDir = path.join(CONTENT_ROOT, relDir);
  return fs
    .readdirSync(absDir, { withFileTypes: true })
    .filter((e) => e.isFile())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((e) => ({
      name: e.name,
      path: `content/${relDir}/${e.name}`,
      content: fs.readFileSync(path.join(absDir, e.name), "utf-8").trim(),
    }));
}

/** Splits a "# Title\n\nbody" file into its title and remaining body. */
export function parseTitledFile(content: string): { title: string; body: string } {
  const match = content.match(/^#\s+(.+)\n+([\s\S]*)$/);
  if (!match) return { title: content, body: "" };
  return { title: match[1].trim(), body: match[2].trim() };
}

export function getGithubRepoUrl(): string {
  const user = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "LittleDefender3";
  const repo =
    process.env.NEXT_PUBLIC_GITHUB_REPO || "terminal_website_ai_agent";
  return `https://github.com/${user}/${repo}`;
}

export function getGithubFileUrl(relPath: string): string {
  return `${getGithubRepoUrl()}/blob/main/${relPath}`;
}
