import type { Command, CommandResult, OutputLine, Project } from "./types";

let _idCounter = 0;
function uid(): string {
  return `line-${Date.now()}-${_idCounter++}`;
}

// ── output helpers ───────────────────────────────────────────────────────

function text(content: string): OutputLine {
  return { id: uid(), type: "text", content };
}
function success(content: string): OutputLine {
  return { id: uid(), type: "success", content };
}
function err(content: string): OutputLine {
  return { id: uid(), type: "error", content };
}
function info(content: string): OutputLine {
  return { id: uid(), type: "info", content };
}
function html(content: string): OutputLine {
  return { id: uid(), type: "text", content, isHtml: true };
}
function ok(lines: OutputLine[]): CommandResult {
  return { output: lines };
}

// ── project data ────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: "terminal-portfolio",
    title: "Terminal Portfolio Website",
    shortDescription:
      "Interactive CLI-style portfolio built with Next.js, React, TypeScript & Tailwind CSS.",
    description: [
      "A personal website built to showcase my projects in more depth than a resume",
      "can — the goal is to keep my CV short and concise while letting recruiters dig",
      "into the details here.",
      "",
      "Unlike most personal sites, this one has a terminal-like feel: you type",
      "commands and it responds the way a real terminal would. A \"Classic\" view",
      "is also available from the bottom dock, for anyone who'd rather skim a",
      "standard website layout without clicking around.",
      "",
      "Technical highlights:",
      "  • Next.js App Router with TypeScript throughout",
      "  • Command registry pattern for easily adding new commands",
      "  • Tab-autocomplete, command history, ASCII welcome screen, CRT scanlines",
      "  • Content (bio, experience, projects, skills) lives in the repo's",
      "    content/ directory, so it's readable directly on GitHub too",
      "  • Responsive design with mobile-first approach",
      "  • Accessible: ARIA labels, keyboard-only navigation, screen reader support",
    ].join("\n"),
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://www.dylanhawkins.dev",
    githubUrl:
      process.env.NEXT_PUBLIC_GITHUB_USERNAME &&
      process.env.NEXT_PUBLIC_GITHUB_REPO
        ? `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/${process.env.NEXT_PUBLIC_GITHUB_REPO}`
        : undefined,
  },
  {
    id: "carer-tech",
    title: "CaRER Tech — Cognition App for Dementia Care",
    shortDescription:
      "Web app for clinicians to assign cognitive minigames & track patient progress.",
    description: [
      "Developed under the guidance of Psychology Professor Hamid Sohrabi. Clinicians",
      "assign patients cognitive minigames; the data gathered is shown back to patients",
      "so they can track how their cognition is improving, and lets clinicians adjust",
      "difficulty and target specific cognitive domains and sub-domains.",
      "",
      "I was team lead — owning client communication, deadlines, and (as the team's",
      "most experienced Unix user) setting up local development infrastructure so the",
      "rest of the team could focus on UI and gameplay. Ran everything from a",
      "university-hosted VM: Docker, Supabase and Node.js for the site and database,",
      "with local dev certificates to emulate deployment before shipping. Unity WebGL",
      "powers the cognition minigames, communicating over secure sockets.",
    ].join("\n"),
    technologies: ["JavaScript", "Node.js", "Docker", "Supabase", "TypeScript", "Unity WebGL"],
  },
  {
    id: "vr-courtroom",
    title: "VR Multiplayer Court Room — AFP",
    shortDescription:
      "VR courtroom simulation built with the Australian Federal Police for witness cross-examination.",
    description: [
      "Built alongside the Australian Federal Police: a VR multiplayer courtroom",
      "where participants can talk and interact to simulate a real cross-examination.",
      "",
      "To keep it realistic we included random ambient audio and disruptions, gave",
      "different roles different powers (e.g. a judge calling voir dire), and — since",
      "courts differ by state, country and level (magistrate, district, supreme) —",
      "designed the system modularly, so adding a new court is as simple as loading a",
      "model and configuring which roles hold which powers.",
    ].join("\n"),
    technologies: ["Unity", "VR", "Multiplayer Networking", "C#"],
  },
  {
    id: "game-engine",
    title: "Custom Game Engine (OpenGL & C++)",
    shortDescription:
      "From-scratch game engine applying proper design patterns for rendering, physics & input.",
    description: [
      "Developed a game engine from scratch to demonstrate skills built up across my",
      "degree — applying design patterns like Façade to hide how physics, rendering,",
      "input management, AI movement and animation all work under the hood, so any",
      "piece (e.g. swapping OpenGL for Vulkan) can be replaced without touching the",
      "rest of the engine.",
      "",
      "Exposes a Lua scripting layer so engine users just create entities and attach",
      "components — e.g. a player gets a mesh, material, box collider and transform",
      "component — giving game developers maximum freedom without ever touching the",
      "engine's source code.",
    ].join("\n"),
    technologies: ["C++", "OpenGL", "Lua", "Design Patterns"],
  },
  {
    id: "unix-shell",
    title: "Unix Shell with Client-Server Architecture",
    shortDescription:
      "A custom Unix shell in pure C, including a server-client mode for cross-shell communication.",
    description: [
      "Built my own shell in Linux as part of my degree, written in pure C, including",
      "a server-client architecture so shells can communicate with each other.",
      "",
      "Forks child processes to run tasks concurrently, implements custom commands",
      "that behave like their real shell counterparts, and passes through any command",
      "without a custom definition so users can still access all standard shell",
      "utilities (including full manual pages). Also supports running commands",
      "simultaneously (&&) and storing/navigating command history.",
    ].join("\n"),
    technologies: ["C", "Unix", "Systems Programming", "Networking"],
  },
  {
    id: "ml-neural-networks",
    title: "Machine Learning — Neural Networks",
    shortDescription:
      "CNN for image analysis and a fraud-detection network on an intentionally unbalanced dataset.",
    description: [
      "Built as part of Advanced Machine Learning and Artificial Intelligence studies.",
      "",
      "First assignment: a Convolutional Neural Network (CNN) using PyTorch to",
      "analyse images. Second assignment: a neural network trained on obfuscated",
      "data to identify fraudulent credit card transactions — using an intentionally",
      "unbalanced dataset to mimic real-world conditions, where fraud is rare",
      "relative to legitimate transactions.",
    ].join("\n"),
    technologies: ["Python", "PyTorch", "Neural Networks", "Data Analysis"],
  },
];

// ── command handlers ───────────────────────────────────────────────────────

const helpCmd: Command = {
  name: "help",
  description: "Display all available commands",
  handler: () =>
    ok([
      text(""),
      success("┌───────────────────────────────────────────────────────┐"),
      success("│                  AVAILABLE COMMANDS                   │"),
      success("└───────────────────────────────────────────────────────┘"),
      text(""),
      info("  COMMANDS"),
      text(""),
      html(
        `  <span class="t-name">help</span>                    <span class="t-desc">Display this help message</span>`
      ),
      html(
        `  <span class="t-name">about</span>                   <span class="t-desc">Learn about Dylan Hawkins</span>`
      ),
      html(
        `  <span class="t-name">education</span>               <span class="t-desc">Educational background, scholarships & certificates</span>`
      ),
      html(
        `  <span class="t-name">experience</span>              <span class="t-desc">Work & IT-related experience</span>`
      ),
      html(
        `  <span class="t-name">projects</span>                <span class="t-desc">List all projects</span>`
      ),
      html(
        `  <span class="t-name">projects &lt;name&gt;</span>         <span class="t-desc">Detailed info on a specific project</span>`
      ),
      html(
        `  <span class="t-name">skills</span>                  <span class="t-desc">View categorised technical skills</span>`
      ),
      html(
        `  <span class="t-name">contact</span>                 <span class="t-desc">Get in touch</span>`
      ),
      html(
        `  <span class="t-name">resume</span>                  <span class="t-desc">Resume / CV information</span>`
      ),
      html(
        `  <span class="t-name">clear</span>                   <span class="t-desc">Clear the terminal</span>`
      ),
      html(
        `  <span class="t-name">reset</span>                   <span class="t-desc">Clear the terminal and show the welcome message again</span>`
      ),
      text(""),
      info("  ALIASES"),
      text(""),
      html(
        `  <span class="t-name">whoami</span>                  <span class="t-desc">Alias for about</span>`
      ),
      html(
        `  <span class="t-name">ls</span>                      <span class="t-desc">Alias for projects</span>`
      ),
      html(
        `  <span class="t-name">cv</span>                      <span class="t-desc">Alias for resume</span>`
      ),
      text(""),
      info("  SHORTCUTS"),
      text(""),
      html(
        `  <span class="t-name">Tab</span>                     <span class="t-desc">Autocomplete command</span>`
      ),
      html(
        `  <span class="t-name">↑ / ↓</span>                  <span class="t-desc">Navigate command history</span>`
      ),
      html(
        `  <span class="t-name">Ctrl+L</span>                  <span class="t-desc">Clear the terminal</span>`
      ),
      text(""),
    ]),
};

const aboutCmd: Command = {
  name: "about",
  description: "Learn about Dylan Hawkins",
  aliases: ["whoami"],
  handler: () =>
    ok([
      text(""),
      success("╔═══════════════════════════════════════════════════════╗"),
      success("║                      ABOUT ME                        ║"),
      success("╚═══════════════════════════════════════════════════════╝"),
      text(""),
      html(`  <span class="t-key">Name</span>      Dylan Hawkins`),
      html(
        `  <span class="t-key">Title</span>     Computer Science & Games Technology Student`
      ),
      html(
        `  <span class="t-key">Status</span>    <span class="t-open">● Open to opportunities</span>`
      ),
      text(""),
      info("  PROFILE"),
      text(""),
      text(
        "  Accomplished Computer Science and Games Technology student, seeking to"
      ),
      text(
        "  join an industry-leading software architecture team. I'm passionate about"
      ),
      text(
        "  developing systems that have a net positive impact on the world and the"
      ),
      text(
        "  people in it — it's my personal mission to leave the world better than I"
      ),
      text("  found it, and I want to join a company that shares that mission."),
      text(""),
      info("  LEADERSHIP & ETHICS"),
      text(""),
      text(
        "  I'm a strong advocate for the ACS Code of Ethics. As team lead on the"
      ),
      text(
        "  CaRER Tech project (a cognition-based app for dementia patients), I"
      ),
      text(
        "  prioritised public interest and privacy by implementing secure data"
      ),
      text("  structures and backend environments (Docker, Supabase, Row Level"),
      text("  Security)."),
      text(""),
      text(
        "  Under Academic Chair/Unit Coordinator Shri Rai, I served as PASS Leader"
      ),
      text(
        "  for Data Structures and Abstractions, and Student Mentor for the same"
      ),
      text(
        "  unit plus Foundations of Programming — teaching new concepts directly to"
      ),
      text("  students using both depth of knowledge and a love for teaching."),
      text(""),
      info('  Type "experience" for my work history or "projects" to see my work.'),
      text(""),
    ]),
};

const educationCmd: Command = {
  name: "education",
  description: "View educational background, scholarships & certificates",
  handler: () =>
    ok([
      text(""),
      success("╔═══════════════════════════════════════════════════════╗"),
      success("║                     EDUCATION                        ║"),
      success("╚═══════════════════════════════════════════════════════╝"),
      text(""),
      html(`  <span class="t-key">Degree</span>       Bachelor of Information Technology`),
      html(
        `  <span class="t-key">Majors</span>       Computer Science & Games Technology`
      ),
      html(`  <span class="t-key">Institution</span>  Murdoch University`),
      html(`  <span class="t-key">Duration</span>     2023 – 2026</span>`),
      text(""),
      info("  SCHOLARSHIPS"),
      text(""),
      html(`  <span class="t-bullet">▸</span> ACS Intern Scholarship — for internship at 21st Century Software`),
      text(""),
      info("  CERTIFICATES"),
      text(""),
      html(`  <span class="t-bullet">▸</span> Microsoft DP-900 (Azure Data Fundamentals)`),
      html(`  <span class="t-bullet">▸</span> WA Certificate of Education — North Albany SHS`),
      html(`  <span class="t-bullet">▸</span> Certificate III in Retail (SIR30216) — Kentucky Fried Chicken Pty Ltd`),
      html(`  <span class="t-bullet">▸</span> Citizenship of the Year 2020 — North Albany SHS`),
      text(""),
      info('  Type "experience" to see how I\'ve applied this, or "projects" for my work.'),
      text(""),
    ]),
};

const experienceCmd: Command = {
  name: "experience",
  description: "Work & IT-related experience",
  handler: () =>
    ok([
      text(""),
      success("╔═══════════════════════════════════════════════════════╗"),
      success("║                    EXPERIENCE                        ║"),
      success("╚═══════════════════════════════════════════════════════╝"),
      text(""),
      info("  IT / TECHNICAL"),
      text(""),
      html(`  <span class="t-ptitle">Intern — 21st Century Software</span>`),
      text(
        "  8-week internship (ACS scholarship) on the IZBR team, developing IZBR"
      ),
      text(
        "  (mainframe software) for IBM z/OS. Learned ISPF panels, JCL job"
      ),
      text(
        "  submission and z/OS fundamentals from scratch, then wrote FVT tests"
      ),
      text(
        "  in an in-house PyTest + TN3270-emulator suite driving live mainframe"
      ),
      text(
        "  panels, based on user stories I authored and had peer-reviewed. Used"
      ),
      text("  Jira, Confluence and BitBucket throughout."),
      text(""),
      html(`  <span class="t-ptitle">PASS Leader — Data Structures & Abstractions (ICT283), Murdoch University</span>`),
      text(
        "  Design & facilitate activities reinforcing correct program design,"
      ),
      text(
        "  following established C++ and design-pattern references. Recommended"
      ),
      text(
        "  by the Unit Coordinator after topping the 2025 cohort in this unit."
      ),
      text(""),
      html(`  <span class="t-ptitle">Student Mentor — ICT283 & Foundations of Programming (ICT159), Murdoch University</span>`),
      text(
        "  Selected on technical ability to assist teaching in-classroom —"
      ),
      text(
        "  answering questions, offering a second perspective, and explaining"
      ),
      text(
        "  the reasoning behind design decisions to build stronger fundamentals."
      ),
      text(""),
      html(`  <span class="t-ptitle">Student IT Helpdesk — Murdoch University</span>`),
      text(
        "  Helped stand up a brand-new student-run IT service desk, building"
      ),
      text(
        "  internal documentation standards and common-issue resolution guides"
      ),
      text("  still used as the desk's foundation today."),
      text(""),
      info("  OTHER EXPERIENCE"),
      text(""),
      html(`  <span class="t-bullet">▸</span> Student Ambassador — Murdoch University (2023 – Current)`),
      html(`  <span class="t-bullet">▸</span> Customer & Food Service Team Member — KFC Albany (2019 – Current)`),
      html(`  <span class="t-bullet">▸</span> Decant Team Member — Kmart (2023 – 2025)`),
      text(""),
      info('  Type "projects" for detailed technical projects.'),
      text(""),
    ]),
};

const projectsCmd: Command = {
  name: "projects",
  description: "List all projects, or view details with: projects <name>",
  usage: "projects [project-id]",
  aliases: ["ls"],
  handler: (args) => {
    // Show specific project ──────────────────────────────────────────────
    if (args.length > 0) {
      const query = args.join(" ").toLowerCase();
      const index = Number(query);
      const project = Number.isInteger(index)
        ? PROJECTS[index - 1]
        : PROJECTS.find(
            (p) =>
              p.id === query ||
              p.id.includes(query) ||
              p.title.toLowerCase().includes(query)
          );

      if (!project) {
        return ok([
          text(""),
          err(`  Project "${args.join(" ")}" not found.`),
          text(""),
          info("  Available projects:"),
          text(""),
          ...PROJECTS.map((p) =>
            html(
              `  <span class="t-name">${p.id.padEnd(28)}</span><span class="t-desc">${p.shortDescription}</span>`
            )
          ),
          text(""),
          info('  Example: projects terminal-portfolio'),
          text(""),
        ]);
      }

      const techTags = project.technologies
        .map((t) => `<span class="t-tag">${t}</span>`)
        .join("  ");

      return ok([
        text(""),
        success(`╔═══════════════════════════════════════════════════════╗`),
        success(
          `║  ${project.title
            .toUpperCase()
            .substring(0, 51)
            .padEnd(51)}  ║`
        ),
        success(`╚═══════════════════════════════════════════════════════╝`),
        text(""),
        info("  TECHNOLOGIES"),
        html(`  ${techTags}`),
        text(""),
        info("  DESCRIPTION"),
        text(""),
        ...project.description.split("\n").map((l) => text(`  ${l}`)),
        text(""),
        ...(project.githubUrl
          ? [
              html(
                `  <span class="t-key">GitHub</span>  <a class="t-link" href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">${project.githubUrl}</a>`
              ),
            ]
          : []),
        ...(project.liveUrl
          ? [
              html(
                `  <span class="t-key">Live</span>    <a class="t-link" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">${project.liveUrl}</a>`
              ),
            ]
          : []),
        text(""),
      ]);
    }

    // List all projects ─────────────────────────────────────────────────
    return ok([
      text(""),
      success("╔═══════════════════════════════════════════════════════╗"),
      success("║                     PROJECTS                         ║"),
      success("╚═══════════════════════════════════════════════════════╝"),
      text(""),
      ...PROJECTS.flatMap((p, i) => [
        html(
          `  <span class="t-num">[${i + 1}]</span>  <span class="t-ptitle">${p.title}</span>`
        ),
        html(`       <span class="t-desc">${p.shortDescription}</span>`),
        html(
          `       ${p.technologies
            .map((t) => `<span class="t-tag">${t}</span>`)
            .join("  ")}`
        ),
        html(
          `       <span class="t-dim">projects ${p.id}</span>`
        ),
        text(""),
      ]),
      info('  Type "projects <id>" for full details.'),
      text(""),
    ]);
  },
};

const skillsCmd: Command = {
  name: "skills",
  description: "View technical skills by category",
  handler: () =>
    ok([
      text(""),
      success("╔═══════════════════════════════════════════════════════╗"),
      success("║                  TECHNICAL SKILLS                    ║"),
      success("╚═══════════════════════════════════════════════════════╝"),
      text(""),
      info("  LANGUAGES"),
      html(
        `  <span class="t-tag">C++</span>  <span class="t-tag">C</span>  <span class="t-tag">Python</span>  <span class="t-tag">Java</span>  <span class="t-tag">JavaScript</span>  <span class="t-tag">TypeScript</span>  <span class="t-tag">JCL</span>`
      ),
      text(""),
      info("  WEB & BACKEND"),
      html(
        `  <span class="t-tag">Node.js</span>  <span class="t-tag">HTML/CSS</span>  <span class="t-tag">MySQL</span>  <span class="t-tag">PostgreSQL</span>  <span class="t-tag">Docker</span>  <span class="t-tag">Supabase</span>`
      ),
      text(""),
      info("  GAME DEVELOPMENT & GRAPHICS"),
      html(
        `  <span class="t-tag">Unity</span>  <span class="t-tag">OpenGL</span>  <span class="t-tag">Library Facading (glm, assimp)</span>`
      ),
      text(""),
      info("  MACHINE LEARNING"),
      html(
        `  <span class="t-tag">PyTorch</span>  <span class="t-tag">Neural Network Architecture</span>`
      ),
      text(""),
      info("  MAINFRAME"),
      html(
        `  <span class="t-tag">z/OS Basics</span>  <span class="t-tag">ISPF Panels</span>  <span class="t-tag">JCL</span>  <span class="t-tag">Log Analysis</span>`
      ),
      text(""),
      info("  TOOLS & PRACTICES"),
      html(
        `  <span class="t-tag">Unix Terminals</span>  <span class="t-tag">Git CLI</span>  <span class="t-tag">GitHub</span>  <span class="t-tag">BitBucket</span>  <span class="t-tag">Jira</span>  <span class="t-tag">Confluence</span>  <span class="t-tag">Catch2</span>  <span class="t-tag">PyTest</span>`
      ),
      text(""),
      info("  DESIGN"),
      html(
        `  <span class="t-tag">Gang of Four Design Patterns</span>  <span class="t-tag">Façade Pattern</span>  <span class="t-tag">System Design</span>`
      ),
      text(""),
    ]),
};

const contactCmd: Command = {
  name: "contact",
  description: "Get contact information",
  handler: () => {
    const email = process.env.NEXT_PUBLIC_EMAIL ?? "dw.hwkns@gmail.com";
    const github = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

    return ok([
      text(""),
      success("╔═══════════════════════════════════════════════════════╗"),
      success("║                    CONTACT ME                        ║"),
      success("╚═══════════════════════════════════════════════════════╝"),
      text(""),
      text(
        "  I'm actively seeking software engineering opportunities."
      ),
      text("  Feel free to reach out!"),
      text(""),
      html(
        `  <span class="t-key">Email</span>     <a class="t-link" href="mailto:${email}">${email}</a>`
      ),
      html(
        `  <span class="t-key">Website</span>   <a class="t-link" href="https://www.dylanhawkins.dev" target="_blank" rel="noopener noreferrer">dylanhawkins.dev</a>`
      ),
      ...(github
        ? [
            html(
              `  <span class="t-key">GitHub</span>    <a class="t-link" href="https://github.com/${github}" target="_blank" rel="noopener noreferrer">github.com/${github}</a>`
            ),
          ]
        : []),
      html(
        `  <span class="t-key">LinkedIn</span>  <a class="t-link" href="https://www.linkedin.com/in/dylanhawkinsau/" target="_blank" rel="noopener noreferrer">linkedin.com/in/dylanhawkinsau</a>`
      ),
      text(""),
      info("  Reference details are available on request — reach out via email"),
      info("  and I'm happy to provide them."),
      text(""),
      info("  Typical response time: 24–48 hours."),
      text(""),
    ]);
  },
};

const resumeCmd: Command = {
  name: "resume",
  description: "Resume / CV information",
  aliases: ["cv"],
  handler: () => {
    const email = process.env.NEXT_PUBLIC_EMAIL ?? "dw.hwkns@gmail.com";

    return ok([
      text(""),
      success("╔═══════════════════════════════════════════════════════╗"),
      success("║                    RESUME / CV                       ║"),
      success("╚═══════════════════════════════════════════════════════╝"),
      text(""),
      text("  My resume covers:"),
      text(""),
      html(`  <span class="t-bullet">▸</span> Bachelor of IT (Computer Science & Games Technology) — Murdoch University`),
      html(`  <span class="t-bullet">▸</span> Internship at 21st Century Software (mainframe / z/OS software)`),
      html(`  <span class="t-bullet">▸</span> Technical skills across languages, web, ML, mainframe & game dev`),
      html(`  <span class="t-bullet">▸</span> Project portfolio — type "projects" to explore`),
      html(`  <span class="t-bullet">▸</span> Work & teaching experience — type "experience" to explore`),
      text(""),
      info("  Request my full resume / CV & cover letter by emailing:"),
      html(
        `  <a class="t-link" href="mailto:${email}?subject=Resume%20Request">${email}</a>`
      ),
      text(""),
      info('  Reference contact details are provided on request, not published here.'),
      text(""),
    ]);
  },
};

const clearCmd: Command = {
  name: "clear",
  description: "Clear the terminal screen",
  handler: () => ({ output: [], clearTerminal: true }),
};

const resetCmd: Command = {
  name: "reset",
  description: "Clear the terminal and show the welcome message again",
  handler: () => ({ output: [], clearTerminal: true, resetTerminal: true }),
};

// ── registry ──────────────────────────────────────────────────────────────

const ALL_COMMANDS: Command[] = [
  helpCmd,
  aboutCmd,
  educationCmd,
  experienceCmd,
  projectsCmd,
  skillsCmd,
  contactCmd,
  resumeCmd,
  clearCmd,
  resetCmd,
];

export const commandRegistry = new Map<string, Command>();

for (const cmd of ALL_COMMANDS) {
  commandRegistry.set(cmd.name, cmd);
  for (const alias of cmd.aliases ?? []) {
    commandRegistry.set(alias, cmd);
  }
}

export function getAllCommandNames(): string[] {
  return Array.from(commandRegistry.keys()).sort();
}

export function executeCommand(raw: string): CommandResult {
  const trimmed = raw.trim();
  if (!trimmed) return { output: [] };

  const [name, ...args] = trimmed.split(/\s+/);
  const cmd = commandRegistry.get(name.toLowerCase());

  if (!cmd) {
    return {
      output: [
        err(`  bash: ${name}: command not found`),
        info('  Type "help" to see available commands.'),
      ],
    };
  }

  return cmd.handler(args);
}

// ── welcome message ────────────────────────────────────────────────────────

export function getWelcomeLines(): OutputLine[] {
  return [
    success(""),
    success("  ██████╗ ██╗   ██╗██╗      █████╗ ███╗   ██╗"),
    success("  ██╔══██╗╚██╗ ██╔╝██║     ██╔══██╗████╗  ██║"),
    success("  ██║  ██║ ╚████╔╝ ██║     ███████║██╔██╗ ██║"),
    success("  ██║  ██║  ╚██╔╝  ██║     ██╔══██║██║╚██╗██║"),
    success("  ██████╔╝   ██║   ███████╗██║  ██║██║ ╚████║"),
    success("  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝"),
    text(""),
    info("  Dylan Hawkins — Computer Science & Games Technology Student"),
    text("  Bachelor of Information Technology · Murdoch University"),
    text(""),
    text('  Type "help" to explore available commands.'),
    text('  Type "about" to learn more about me.'),
    text(""),
    { id: uid(), type: "system", content: "  ─────────────────────────────────────────────────────" },
    text(""),
  ];
}
