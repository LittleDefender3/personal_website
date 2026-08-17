# Terminal Portfolio Website

Interactive CLI-style portfolio built with Next.js, React, TypeScript & Tailwind CSS.

A personal website built to showcase my projects in more depth than a resume
can — the goal is to keep my CV short and concise while letting recruiters dig
into the details here.

Unlike most personal sites, this one has a terminal-like feel: you type
commands and it responds the way a real terminal would. A "Classic" view is
also available from the bottom dock, for anyone who'd rather skim a standard
website layout without clicking around.

Technical highlights:
  - Next.js App Router with TypeScript throughout
  - Command registry pattern for easily adding new commands
  - Tab-autocomplete, command history, ASCII welcome screen, CRT scanlines
  - Content (bio, experience, projects, skills) lives in the repo's
    `content/` directory, so it's readable directly on GitHub too
  - Responsive design with mobile-first approach
  - Accessible: ARIA labels, keyboard-only navigation, screen reader support

Technologies: Next.js, React, TypeScript, Tailwind CSS
