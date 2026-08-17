export type OutputType = "text" | "error" | "success" | "info" | "command" | "system";

export interface OutputLine {
  id: string;
  type: OutputType;
  content: string;
  isHtml?: boolean;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
}

export interface CommandResult {
  output: OutputLine[];
  clearTerminal?: boolean;
  resetTerminal?: boolean;
}

export type CommandHandler = (args: string[]) => CommandResult;

export interface Command {
  name: string;
  description: string;
  usage?: string;
  handler: CommandHandler;
  aliases?: string[];
}

// ── content tree (backed by real files under /content, see app/lib/content.ts) ──

export type FileNode =
  | { kind: "folder"; name: string; path: string; children: FileNode[] }
  | { kind: "file"; name: string; path: string; content: string };
