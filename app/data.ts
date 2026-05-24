export interface Project {
  id: number;
  title: string;
  description: string;
  tools?: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  website?: string;
}

export const aboutInfo = {
  name: "Dylan Hawkins",
  title: "Software Developer",
  bio: "TODO: Add bio",
  location: "Perth, Australia (Currently, open to moving)",
  yearsOfExperience: 7,
};

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["C++", "C", "SQL", "Python", "Java", "TypeScript", "JavaScript"]
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "REST APIs"]
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Docker"]
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Terminal Portfolio",
    description: "A unique portfolio website with terminal and normal view modes",
    tools: ["NextJS", "React", "TypeScript", "Tailwind CSS"],
    link: "https://dylanhawkins.dev",
    github: "https://github.com/LittleDefender3/personal_website"
  },
  {
    id: 2,
    title: "Project Two",
    description: "template",
    tools: ["template", "template"],
    link: "link",
    github: "repo"
  }
];

export const contactInfo: ContactInfo = {
  email: "dw.hwkns+dev@gmail.com",
  github: "github.com/LittleDefender3",
  linkedin: "linkedin.com/in/dylanhawkinsau",
  website: "https://dylanhawkins.dev"
};