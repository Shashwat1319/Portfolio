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
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Aura AI",
    description:
      "An AI-powered marketing tool that converts product URLs into high-quality, platform-specific content including Instagram captions, Facebook posts, Pinterest pins, and YouTube descriptions. Designed to help creators generate engaging content instantly using modern LLMs.",
    live: "https://aura-virid-iota-kappa.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "GROQ AI", "MongoDB"],
    category: "ai",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
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
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "SmartGahr",
    description:
      "Revenue-generating automated lead generation system built with zero investment. Integrates Google Forms, Sheets, and WhatsApp for instant lead capture, local SEO driving 10-20 qualified leads/month, and automated WhatsApp status marketing for brand visibility.",
    live: "https://smartgahr.com",
    tech: ["Google Forms", "Google Sheets", "WhatsApp Business API", "Local SEO", "Automation"],
    category: "tools",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
  },
]

export const projectCategories = [
  { value: "all", label: "All Projects" },
  { value: "fullstack", label: "Full Stack" },
  { value: "ai", label: "AI & ML" },
  { value: "tools", label: "Tools" },
]
