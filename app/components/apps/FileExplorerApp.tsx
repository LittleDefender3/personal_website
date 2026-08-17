"use client";

import { useState } from "react";
import type { FileNode } from "@/app/lib/types";
import styles from "./FileExplorerApp.module.css";

interface FileExplorerAppProps {
  files: FileNode[];
  repoUrl: string;
}

function flatten(items: FileNode[]): { path: string; item: FileNode }[] {
  return items.flatMap((item) =>
    item.kind === "folder"
      ? [{ path: item.path, item }, ...flatten(item.children)]
      : [{ path: item.path, item }]
  );
}

export default function FileExplorerApp({ files, repoUrl }: FileExplorerAppProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(files.filter((f) => f.kind === "folder").slice(0, 1).map((f) => f.path))
  );
  const [selected, setSelected] = useState<string | null>(null);

  function toggleFolder(path: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  const flat = flatten(files);
  const selectedItem = selected ? flat.find((f) => f.path === selected)?.item : null;

  return (
    <div className={styles.explorer}>
      {/* Sidebar tree */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>Files</div>
        <Tree items={files} expanded={expanded} selected={selected} onToggle={toggleFolder} onSelect={setSelected} />
        <a
          className={styles.repoLink}
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View repo on GitHub ↗
        </a>
      </div>

      {/* Preview pane */}
      <div className={styles.preview}>
        {selectedItem && selectedItem.kind === "file" ? (
          <>
            <div className={styles.previewHeader}>
              <span>{selectedItem.path}</span>
              <a
                className={styles.githubLink}
                href={`${repoUrl}/blob/main/${selectedItem.path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub ↗
              </a>
            </div>
            <pre className={styles.previewContent}>{selectedItem.content}</pre>
          </>
        ) : (
          <div className={styles.previewEmpty}>
            Select a file to view its contents
          </div>
        )}
      </div>
    </div>
  );
}

function Tree({
  items,
  expanded,
  selected,
  onToggle,
  onSelect,
}: {
  items: FileNode[];
  expanded: Set<string>;
  selected: string | null;
  onToggle: (path: string) => void;
  onSelect: (path: string) => void;
}) {
  return (
    <ul className={styles.tree}>
      {items.map((item) => {
        const isExpanded = expanded.has(item.path);
        const isSelected = selected === item.path;
        if (item.kind === "folder") {
          return (
            <li key={item.path}>
              <button
                className={`${styles.treeItem} ${styles.folder} ${isSelected ? styles.selected : ""}`}
                onClick={() => { onToggle(item.path); onSelect(item.path); }}
              >
                <span className={styles.arrow}>{isExpanded ? "▾" : "▸"}</span>
                <span className={styles.folderIcon}>⌗</span>
                <span>{item.name}</span>
              </button>
              {isExpanded && (
                <div className={styles.children}>
                  <Tree items={item.children} expanded={expanded} selected={selected} onToggle={onToggle} onSelect={onSelect} />
                </div>
              )}
            </li>
          );
        }
        return (
          <li key={item.path}>
            <button
              className={`${styles.treeItem} ${styles.file} ${isSelected ? styles.selected : ""}`}
              onClick={() => onSelect(item.path)}
            >
              <span className={styles.fileIcon}>≡</span>
              <span>{item.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
