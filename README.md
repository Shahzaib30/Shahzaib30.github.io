<<<<<<< HEAD
# Shahzaib30.github.io
=======
## Shahzaib Shafique — Minimal AI Portfolio

A handcrafted React + Vite portfolio for Shahzaib Shafique, inspired by the clarity of brittanychiang.com. The site highlights AI-focused work with a dark, minimal aesthetic, TailwindCSS utilities, and Framer Motion scroll-triggered animations.

### ✨ Features
- Dark, centered layout (~800px max width) with smooth scrolling and soft shadows
- Hero, skills grid, timeline-style projects, experience, education, certifications, and footer
- Status badges for each project (Completed, In Progress, Coming Soon)
- Framer Motion fade/slide effects as sections enter the viewport
- Responsive TailwindCSS design with a single accent color (#64FFDA)

### 🧱 Tech Stack
- React 19 with Vite
- TailwindCSS v4 + `@tailwindcss/vite`
- Framer Motion for micro-interactions
- ESLint (flat config) for code quality

### 🚀 Getting Started
Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

### 🛠 Customization Tips
- Update copy, skills, and projects inside `src/App.jsx` — all content lives in structured arrays.
- Tailwind tokens and fonts are defined in `src/index.css`. Tweak the accent color, shadows, or typography there.
- Animations can be tuned via the `fadeIn` variants in `App.jsx`.

### 🌐 Deployment
1. Run `npm run build` to generate the static assets inside `dist/`.
2. Upload the `dist/` folder to your host of choice (Netlify, Vercel, Cloudflare Pages, etc.).
3. Point the `A`/`AAAA` records for `shahzaibshafique.me` to your host and configure HTTPS.
4. The site already exposes `robots.txt` and `sitemap.xml`, and `index.html` ships with canonical + Open Graph metadata for the domain.

Once deployed, verify https://shahzaibshafique.me/ loads over HTTPS and that `/sitemap.xml` is accessible for search engines.

### 📄 License

This project is personal to Shahzaib Shafique. Please do not redistribute the branding or copy without permission.
>>>>>>> f9a82ce (initial commit)
