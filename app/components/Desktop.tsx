"use client";

import AppWindow from "./AppWindow";
import Taskbar from "./Taskbar";
import Terminal from "./Terminal";
import BrowserApp from "./apps/BrowserApp";
import FileExplorerApp from "./apps/FileExplorerApp";
import PhotosApp from "./apps/PhotosApp";
import CreditsApp from "./apps/CreditsApp";
import EntryChoiceModal from "./EntryChoiceModal";
import type { FileNode } from "@/app/lib/types";
import styles from "./Desktop.module.css";

interface DesktopProps {
  files: FileNode[];
  repoUrl: string;
}

export default function Desktop({ files, repoUrl }: DesktopProps) {
  return (
    <div className={styles.desktop}>
      {/* Floating windows */}
      <AppWindow id="terminal">
        <Terminal />
      </AppWindow>
      <AppWindow id="browser">
        <BrowserApp />
      </AppWindow>
      <AppWindow id="files">
        <FileExplorerApp files={files} repoUrl={repoUrl} />
      </AppWindow>
      <AppWindow id="photos">
        <PhotosApp />
      </AppWindow>
      <AppWindow id="credits">
        <CreditsApp />
      </AppWindow>

      {/* Dock */}
      <Taskbar />

      <EntryChoiceModal />
    </div>
  );
}
