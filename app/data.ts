export interface Project {
  id: number;
  title: string;
  description: string;
  technologies?: string[];
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
  name: "Your Name",
  title: "Software Developer",
  bio: "Your bio text here. Tell people about yourself, your interests, and what you do.",
  location: "Your Location",
  yearsOfExperience: 0,
};

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java"]
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
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Terminal Portfolio",
    description: "A unique portfolio website with terminal and normal view modes",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://website-sand-seven.vercel.app",
    github: "https://github.com/LittleDefender3/personal_website"
  },
  // Add more projects here
];

export const contactInfo: ContactInfo = {
  email: "dw.hwkns+dev@gmail.com",
  github: "github.com/LittleDefender3",
  linkedin: "linkedin.com/in/username",
  website: "https://dylanhawkins.dev"
};