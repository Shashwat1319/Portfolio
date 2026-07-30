export const projects = [
  {
    id: 1,
    title: "Client Project Tracker",
    description:
      "A full-stack project management application that helps users track clients, manage tasks, and monitor project progress through an intuitive dashboard. Features secure data handling, CRUD operations, and efficient workflow management.",
    github: "https://github.com/Shashwat1319/ProjectTracker",
    live: "https://projectrackerr.netlify.app/",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    category: "fullstack",
  },
  {
    id: 2,
    title: "Aura AI",
    description:
      "An AI-powered marketing tool that converts product URLs into high-quality, platform-specific content including Instagram captions, Facebook posts, Pinterest pins, and YouTube descriptions. Designed to help creators generate engaging content instantly using modern LLMs.",
    live: "https://aura-virid-iota-kappa.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "GROQ AI", "MongoDB"],
    category: "ai",
  },
  {
    id: 3,
    title: "AutoDev",
    description:
      "A free open-source toolkit that analyzes GitHub profiles (score out of 100), generates polished profile READMEs in multiple styles, and includes a CLI tool for automated git commits. Comes with a Chrome extension to display scores directly on GitHub profile pages. No login required.",
    github: "https://github.com/Shashwat1319/autodev-agent",
    live: "https://autodev-kappa.vercel.app",
    tech: ["Next.js 14", "TypeScript", "Node.js", "Tailwind CSS", "Chrome Extension", "GitHub API", "Vercel"],
    category: "tools",
  },
]

export const projectCategories = [
  { value: "all", label: "All Projects" },
  { value: "fullstack", label: "Full Stack" },
  { value: "ai", label: "AI & ML" },
  { value: "tools", label: "Tools" },
]
