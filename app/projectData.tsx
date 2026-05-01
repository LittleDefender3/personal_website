export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectTag = {
  label: string;
  variant:
    | "nextjs"
    | "react"
    | "node"
    | "python"
    | "ml"
    | "tailwind"
    | "vercel"
    | "default";
};


export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription?: string;

  tags?: ProjectTag[];

  // Optional content
  links?: ProjectLink[];          // e.g. Source, Live Demo, Case Study
  demoVideoUrl?: string;          // e.g. mp4 file url
  demoEmbedUrl?: string;          // e.g. YouTube/Vimeo embed url
};

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Portfolio Website",
    shortDescription: "This site! Built with Next.js and deployed on Vercel.",
    longDescription: `Longer explanation goes here. Add what you learned, challenges, etc.`,
    tags: [
        { label: "Next.js", variant: "nextjs" },
        { label: "React", variant: "react" },
        { label: "Tailwind", variant: "tailwind" },
        { label: "Vercel", variant: "vercel" },
        ],
    links: [
      { label: "View Source", href: "https://github.com/USER/REPO" },
    ],
  },
  {
    id: "project-one",
    title: "Project One",
    shortDescription: "Description of your amazing project goes here.",
    longDescription: "Add more details later. This can be multiple paragraphs.",
    tags: [
        { label: "Next.js", variant: "nextjs" },
        { label: "React", variant: "react" },
        { label: "Tailwind", variant: "tailwind" },
        { label: "Vercel", variant: "vercel" },
        ],
    // Example: embed video later
    // demoEmbedUrl: "https://www.youtube.com/embed/VIDEO_ID"
  },
];