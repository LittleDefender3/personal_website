# Terminal Portfolio Website

An interactive **cyberpunk desktop** portfolio — a windowing system with draggable apps, set against a neon Three.js animated background.

---

## ✨ Features

- 🖥️ **Desktop shell** — floating, draggable, resizable windows inspired by cybervixen.dev
- 🗔 **Window manager** — drag by title bar, resize, close/minimize, z-order focus
- ⌨️ **Terminal app** — full interactive CLI with command history, tab autocomplete, and all original commands
- 🌐 **Browser app** — friendly web UI showing about, projects, skills, and contact info
- 📁 **File Explorer app** — click-to-browse folder/file tree with content preview
- 🖼️ **Photos app** — gradient-tile gallery with lightbox (placeholder; drop real images in later)
- 🚢 **Dock/Taskbar** — reopen any closed app; active indicators; centered neon dock
- 🌌 **Three.js background** — starfield + synthwave grid + wireframe shapes (respects `prefers-reduced-motion`)
- 🌆 **Cyberpunk neon aesthetic** — magenta/cyan palette, CRT scanlines, neon glow, glassmorphism
- 📱 **Responsive** — windows go full-screen on narrow/mobile viewports gracefully
- ♿ **Accessible** — ARIA labels, keyboard navigation, screen reader friendly

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/terminal_website_ai_agent.git
cd terminal_website_ai_agent
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_EMAIL` | Your contact email address |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Your GitHub username |
| `NEXT_PUBLIC_GITHUB_REPO` | This repository's name |

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start typing!

---

## 💬 Available Commands

| Command | Description |
|---|---|
| `help` | Display all available commands |
| `about` | Learn about Dylan Hawkins |
| `education` | Educational background at Murdoch University |
| `projects` | List all projects |
| `projects <name>` | Detailed info on a specific project |
| `skills` | Technical skills by category |
| `contact` | Contact information |
| `resume` | Resume / CV information |
| `clear` | Clear the terminal |
| `whoami` | Alias for `about` |
| `ls` | Alias for `projects` |
| `cv` | Alias for `resume` |

**Keyboard shortcuts:**

| Key | Action |
|---|---|
| `Tab` | Autocomplete command |
| `↑` / `↓` | Navigate command history |
| `Ctrl+C` | Cancel current input |
| `Ctrl+L` | Clear terminal |

---

## 🛠️ Customisation

### Adding a new project

Edit `app/lib/commands.ts` and add an entry to the `PROJECTS` array:

```ts
{
  id: "my-project",           // used in "projects my-project"
  title: "My Awesome Project",
  shortDescription: "One-line summary shown in the project list.",
  description: "Full description shown when viewing the project.",
  technologies: ["React", "Python"],
  githubUrl: "https://github.com/you/repo",   // optional
  liveUrl: "https://myproject.com",           // optional
}
```

### Adding a new command

1. Create a `Command` object in `app/lib/commands.ts`
2. Add it to the `ALL_COMMANDS` array — the registry and autocomplete update automatically

---

## 📦 Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [React 19](https://react.dev/) — `useReducer` for terminal state, Context for window manager
- Pure CSS Modules — no external styling libraries
- [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) — animated cyberpunk background
- [react-rnd](https://github.com/bokuweb/react-rnd) — drag + resize for desktop windows (**new in this branch**)

> **No extra setup required** — `npm install && npm run dev` is sufficient. `react-rnd` is a pure JS/React library with no native binaries or peer-install steps.

---

## 📄 License

MIT
