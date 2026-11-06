# Shashwat Srivastava – Portfolio

Welcome to my personal portfolio, showcasing my skills, projects, and experience as a **Full-Stack & Backend Engineer**. Built with React 18 + Vite + Tailwind CSS v4.

## Live

[https://shashwat-srivastava.netlify.app](https://shashwat-srivastava.netlify.app)

---

## Tech Stack

**Frontend:** React 18, Tailwind CSS v4, Framer Motion, react-router-dom v7  
**Tools:** Vite, Git, EmailJS, SweetAlert2, react-helmet-async  
**DevOps:** Netlify (config in [`netlify.toml`](netlify.toml) — SPA fallback + cache/security headers incl. CSP), GitHub Actions CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml): `npm ci` → audit → lint → build → verify) + Dependabot, Node.js 22

---

## Featured Projects

### 1. **Client Project Tracker**
A full-stack MERN app for tracking client projects, tasks, and deadlines with an intuitive dashboard. Features CRUD operations and secure data handling.  
**Tech:** React, Node.js, Express.js, MongoDB  
**Live:** [projectrackerr.netlify.app](https://projectrackerr.netlify.app/) · **Code:** [github.com/Shashwat1319/ProjectTracker](https://github.com/Shashwat1319/ProjectTracker)

### 2. **Aura AI**
AI-powered marketing tool that converts product URLs into platform-specific content (Instagram, Facebook, Pinterest, YouTube descriptions) using GROQ LLMs.  
**Tech:** Next.js, Tailwind CSS, Node.js, Express.js, GROQ AI, MongoDB  
**Live:** [aura-virid-iota-kappa.vercel.app](https://aura-virid-iota-kappa.vercel.app/)

### 3. **AutoDev**
Open-source toolkit that analyzes GitHub profiles (score out of 100), generates polished READMEs in multiple styles, and includes a CLI for automated git commits. Chrome extension displays scores directly on GitHub profile pages. No login required.  
**Tech:** Next.js 14, TypeScript, Node.js, Tailwind CSS, Chrome Extension, GitHub API  
**Live:** [autodev-kappa.vercel.app](https://autodev-kappa.vercel.app) · **Code:** [github.com/Shashwat1319/autodev-agent](https://github.com/Shashwat1319/autodev-agent)

### 4. **SmartGahr**
Revenue-generating Amazon deals platform: automated pipeline converting products into 180+ deals across 6 formats, serverless click-tracking redirector with bot detection (Netlify Edge Functions), and an SEO site with 38 programmatic deal pages + JSON-LD.  
**Tech:** Netlify Edge Functions, JavaScript, JSON-LD, SEO Automation, Amazon PA-API, Node.js  
**Live:** [smartgahr.netlify.app](https://smartgahr.netlify.app/) · **Channel:** [t.me/smartgahr](https://t.me/smartgahr)

---

## About Me

Full-Stack & Backend Engineer based in Lucknow, India. I specialize in architecting robust MERN applications, building scalable APIs, and automating complex data-driven workflows. B-Tech in Computer Science.

- **Email:** [shaswatsrivastava1319@gmail.com](mailto:shaswatsrivastava1319@gmail.com)
- **LinkedIn:** [linkedin.com/in/shashwatsrivastava131](https://www.linkedin.com/in/shashwatsrivastava131/)
- **GitHub:** [github.com/Shashwat1319](https://github.com/Shashwat1319)
- **X/Twitter:** [x.com/Shashwat8965](https://x.com/Shashwat8965)

---

## Local Development

```bash
cd client
npm ci              # reproducible install from package-lock.json (what CI runs)
cp .env.example .env   # Windows: copy .env.example .env
npm run dev
```

### Environment variables

Only the contact form needs configuration — three EmailJS keys, documented in
[`client/.env.example`](client/.env.example):

| Variable | Purpose |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service id |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template id |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

Without them everything else works; submitting the form shows a
"Contact form not configured" warning instead of failing silently.

Build: `npm run build` · Preview: `npm run preview` · Lint: `npm run lint`

---

## Support

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/shashwatsrivastava)

---

Crafted with care and code.
