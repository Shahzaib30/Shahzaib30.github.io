import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import cvFile from './assets/Shahzaib-Shafique_AI-Engineer.pdf'
import nlpCertificateImage from './assets/nlpcertificate.png'
import dataScienceCertificate from './assets/datascience.pdf'
import ScrollToTop from './scrollToTop.jsx'
import Dashboard from './components/dashboard'
import ChatWidget from './components/ChatWidget'; 
import tavi1 from './assets/images/Tavi procedure project 1.jpeg'
import tavi2 from './assets/images/Tavi procedure project 4.jpeg'

import grant1 from './assets/images/NEXT JS 1.png'
import next3 from './assets/images/NEXT JS 3.png'
import deep1 from './assets/images/Deep Neural Network.png'
import deep_transformers from './assets/images/Deep Neural Network transformers 1.png'
import mine2 from './assets/images/mine 2.png'
import mine4 from './assets/images/mine 4.png'
import rag_chat from './assets/images/RAG AGENT/Chat.png'
import projects from './data/projectsData.js'

const headerLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/s-shahzaib' },
  { label: 'GitHub', href: 'https://github.com/Shahzaib30' },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01774fb1bf81238658' },
  { label: 'Fiverr', href: 'https://www.fiverr.com/s/KeQKyQV' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/shahdesigner30/' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/shahzaib2222' },
  { label: 'Email', href: 'mailto:shahzaibshafique.dev@gmail.com' },
]

const skills = [
  {
    title: 'Languages',
    items: ['Python', 'SQL', 'C++', 'JavaScript'],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      'PyTorch',
      'Flaske',
      'FastAPI',
      'React.js',
      'Next.js',
      'LangChain',
      'Hugging Face',
      'nnUNet',
      'Scikit-learn',
      'Numpy & Pandas',
    ],
  },
  {
    title: 'AI Techniques',
    items: [
      'Generative AI & LLMs',
      'RAG',
      'Deep Learning & Neural Networks',
      '3D Image Segmentation- MONAI & nnUNet',
      'Fine-tuning (LoRA)',
      'Embeddings',
      'Vector Databases',
      'Prompt Engineering',
      'Model Deployment',
    ],
  },
  {
    title: 'Tools',
    items: [
      'Git & GitHub',
      'Docker',
      'PostgreSQL',
      'MySQL',
      'Linux',
      'AWS',
      'Postman',
      'PG Vector',
      'FAISS',
      'VS Code & Jupyter',

    ],
  },
  {
    title: 'Frontend',
    items: ['React.js', 'HTML', 'CSS','Vue.js','Three.js','Next.js','Tailwind'],
  },
  {
    title: 'Other',
    items: ['Wordpress','SEO','Google Analytics','Figma','Canva','REST APIs','Agile Methodologies'],
  }
]

const upworkProfileUrl = 'https://www.upwork.com/freelancers/~01774fb1bf81238658'

const upworkReviews = [
  {
    quote:
      "He is my top freelancer. We've been working together for a year now and will continue. Sheikh is my number one 'go to' guy... pleasant, honest, and improving all the time.",
    client: 'Enterprise Web & Client Infrastructure Client',
  },
  {
    quote:
      'Sheikh did a great job helping with the website and creating AI images. He always delivers hard work and top-quality goods. Will definitely hire again.',
    client: 'Automation & Digital Optimization Client',
  },
  {
    quote:
      'I am very pleased with Sheikh\'s work and his attention to detail. He is turning out to be a fine member of my team. Generates accurate jobs, as usual.',
    client: 'Systems & Operations Management Client',
  },
  {
    quote:
      'Was great to work with! Prompt in communication, quick, good value, and brought good professional insight as well as great willingness to change and adapt to our needs.',
    client: 'Global Product Delivery Client',
  },
]

const projectLookup = Object.fromEntries(projects.map((project) => [project.slug, project]))
const featuredProjects = projects.slice(0, 3)

const experiences = [
  {
    role: 'Upwork — AI, Web Development & SEO',
    period: '2022 – Present',
    summary:
      '100% Job Success. Delivered ML models, NLP systems, automation tools, and client-centered solutions.',
  },
  {
    role: 'Data Science Intern — Digital Empowerment Network',
    period: '6 Months',
    summary: 'Built ML models, EDA dashboards, and decision-ready analytics.',
  },
  {
    role: 'NLP Intern — Elevvo Pathways',
    period: '1 Month',
    summary: 'Developed sentiment pipelines, preprocessing flows, and evaluation suites.',
  },
]

const education = [
  {
    school: 'BS Artificial Intelligence — NUML Islamabad',
    detail: '3.5 CGPA',
  },
  {
    school: 'Intermediate & Matric — FG Public School and College Bagh',
    detail: '80%',
  },
]

const certifications = [
  {
    title: 'NLP Certification',
    href: nlpCertificateImage,
    format: 'PNG',
  },
  {
    title: 'Data Science Certification',
    href: dataScienceCertificate,
    format: 'PDF',
  },
]

const statusStyles = {
  Completed:
    'border-emerald-400/40 bg-emerald-400/10 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  'In Progress':
    'border-amber-400/40 bg-amber-400/10 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.15)]',
  Public:
    'border-cyan-400/40 bg-cyan-400/10 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
  'Coming Soon':
    'border-cyan-400/40 bg-cyan-400/5 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.12)]',
}

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}



function Section({ id, eyebrow, title, children }) {
  return (
    <Motion.section
      id={id}
      className="py-10 sm:py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeIn}
    >
      <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      <div className="mt-6 text-base text-gray-300 sm:text-lg">{children}</div>
    </Motion.section>
  )
}

function ProjectCard({ project, index = 0, compact = false }) {
  const cardStyles = compact
    ? 'bg-white/5 shadow-[0_15px_50px_rgba(0,0,0,0.35)]'
    : 'bg-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)]'

  const isComingSoon = project.status === 'Coming Soon'
  const isLinkable = !isComingSoon

  return (
    <Motion.article
      className={`relative rounded-3xl border border-white/5 p-6 ${cardStyles} ${
        isLinkable ? 'transition hover:-translate-y-1 hover:border-[#64ffda]/20 hover:shadow-[0_30px_90px_rgba(100,255,218,0.05)]' : ''
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.05, ease: 'easeOut' },
        },
      }}
    >
      {isLinkable ? (
        <Link
          to={`/projects/${project.slug}`}
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#64ffda]"
        >
          <CardContent project={project} />
        </Link>
      ) : (
        <CardContent project={project} comingSoon />
      )}
    </Motion.article>
  )
}

function CardContent({ project, comingSoon = false }) {
  return (
    <>
      <span className="absolute -left-[33px] top-8 hidden h-3 w-3 items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-300/20 sm:flex" />
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
        <p className="font-mono tracking-[0.2em] text-[#64ffda]">{project.year}</p>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[project.status] ?? ''}`}>
          {project.status}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
      <p className="mt-3 text-gray-300">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {project.tools.map((tool) => (
          <span key={tool} className="rounded-full bg-white/5 px-3 py-1 text-gray-200">
            {tool}
          </span>
        ))}
      </div>
      {comingSoon && (
        <p className="mt-6 text-sm font-medium text-gray-500">Case study coming soon</p>
      )}
    </>
  )
}

function ProjectStatusLegend() {
  return (
    <div className="mt-6 flex flex-wrap gap-3 text-xs">
      {Object.entries(statusStyles).map(([status, style]) => (
        <span
          key={status}
          className={`flex items-center gap-2 rounded-full border px-3 py-1 font-semibold ${style}`}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          {status}
        </span>
      ))}
    </div>
  )
}

function HeroSection() {
  return (
    <Motion.header className="space-y-6 pb-14" initial="hidden" animate="visible" variants={fadeIn}>
      <p className="text-xs uppercase tracking-[0.5em] text-gray-500">Portfolio</p>
      <h1 className="text-4xl font-semibold text-white sm:text-5xl">
        Shahzaib Shafique<span className="text-[#64ffda]">.</span>
      </h1>
      <div className="text-lg text-gray-300 sm:text-xl">
        <p className="font-medium text-white">AI Engineer & Full-Stack Developer</p>
        <p className="text-gray-400">Islamabad, Pakistan</p>
      </div>
      <div className="text-base text-gray-400">
        <p>
          I bridge the gap between cutting-edge Artificial Intelligence and robust web architecture. Based in Islamabad, I build intelligent, AI-powered applications using Python and PyTorch, alongside scalable, SEO-friendly web platforms using Next.js, React, and Flask. Whether you need a custom generative AI model or a high-performance SaaS platform from scratch, I deliver clean code and clear communication.
        </p>
      </div>

{/*
      <div className="rounded-xl shadow-lg border-0 border-gray-200 overflow-hidden aspect-video max-w-2xl my-8">
  <iframe 
    width="100%" 
    height="100%" 
    src="https://www.youtube.com/embed/y9dq0YsXfZ0" 
    title="Shahzaib Shafique | Freelance AI Engineer & Full-Stack Web Developer" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen
    className="w-full h-full"
  ></iframe>
</div>  */}

      <div className="flex flex-wrap gap-3 text-sm">
        {headerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <a
          href={cvFile}
          download="Shahzaib_Shafique_CV.pdf"
          className="inline-flex items-center gap-2 rounded-full border border-[#64ffda]/70 bg-[#64ffda]/10 px-5 py-2 font-semibold text-[#64ffda] shadow-[0_10px_30px_rgba(100,255,218,0.25)] transition hover:-translate-y-0.5 hover:bg-[#64ffda]/20"
        >
          Download CV
          <span aria-hidden="true" className="text-base">
            ↓
          </span>
        </a>
      </div>
    </Motion.header>
  )
}

function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Capabilities" title="Skills & Focus Areas">
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-white/5 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">{group.title}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ReviewsSection() {
  return (
    <Section id="reviews" eyebrow="Social Proof" title="Upwork Client Reviews">
      <div className="grid gap-4 sm:grid-cols-2">
        {upworkReviews.map((review, index) => (
          <a
            key={`${review.client}-${index}`}
            href={upworkProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#64ffda]/40 hover:bg-white/[0.08]"
          >
            <p className="text-sm font-semibold tracking-[0.15em] text-amber-300">5.0 • ★★★★★</p>
            <p className="mt-3 text-sm leading-7 text-gray-200">"{review.quote}"</p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gray-400">{review.client}</p>
            <p className="mt-3 text-xs font-medium text-[#64ffda] transition group-hover:text-[#8fffe6]">View on Upwork →</p>
          </a>
        ))}
      </div>
    </Section>
  )
}

function ProjectsHighlight() {
  return (
    <Section id="projects" eyebrow="Selected Work" title="Projects & Experiments">
      <div className="relative pl-0 md:pl-8">
        <span className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-[#64ffda] via-emerald-300/40 to-transparent sm:block" />
        <div className="space-y-10">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} compact />
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
        <p>Click any project to dive into the dedicated case study page.</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
        >
          Browse the archive
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  )
}

function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Journey" title="Experience">
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.role} className="rounded-2xl border border-white/5 bg-white/10 p-6 shadow-inner shadow-black/30">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xl font-semibold text-white">{exp.role}</p>
              <p className="text-sm font-mono uppercase tracking-[0.3em] text-gray-500">{exp.period}</p>
            </div>
            <p className="mt-3 text-gray-300">{exp.summary}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function EducationSection() {
  return (
    <Section id="education" eyebrow="Learning" title="Education">
      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.school} className="flex flex-col gap-1 rounded-2xl border border-white/5 bg-white/10 p-5">
            <p className="text-lg font-semibold text-white">{edu.school}</p>
            <p className="text-sm text-gray-400">{edu.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function CertificationsSection() {
  return (
    <Section id="certifications" eyebrow="Validation" title="Certifications">
      <div className="flex flex-wrap gap-3">
        {certifications.map((cert) => (
          <a
            key={cert.title}
            href={cert.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
          >
            {cert.title}
            <span className="text-xs text-gray-500">{cert.format}</span>
          </a>
        ))}
      </div>
    </Section>
  )
}

function ProjectsPage() {
  const activeProjects = projects.filter((project) => project.status !== 'Coming Soon')
  const upcomingProjects = projects.filter((project) => project.status === 'Coming Soon')

  return (
    <div className="flex-1">
      <Motion.section className="py-10" initial="hidden" animate="visible" variants={fadeIn}>
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Project Archive</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">All Projects & Experiments</h1>
        <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
          Every build, experiment, and prototype that keeps my stack sharp. Completed launches are listed first,
          followed by upcoming drops currently in the lab.
        </p>
        <ProjectStatusLegend />
      </Motion.section>

      <div className="space-y-4">
        {activeProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {upcomingProjects.length > 0 && (
        <Section id="upcoming" eyebrow="Soon" title="On the Roadmap">
          <div className="space-y-6">
            {upcomingProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

function ProjectDetailPage() {
  const { slug } = useParams()
  const project = slug ? projectLookup[slug] : null
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    if (!selectedImage) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  useEffect(() => {
    if (!selectedImage) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedImage])

  if (!project) {
    return (
      <Motion.section className="py-20" initial="hidden" animate="visible" variants={fadeIn}>
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Project</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Project not found</h1>
        <p className="mt-4 text-gray-400">The case study you’re looking for doesn’t exist yet.</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link
            to="/"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
          >
            ← Back home
          </Link>
          <Link
            to="/projects"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
          >
            Browse archive
          </Link>
        </div>
      </Motion.section>
    )
  }

  const isComingSoon = project.status === 'Coming Soon'
  const { image, imageAlt, summary, highlights = [], detailSections = [], caseStudy, github, links = [] } = project

  const details = detailSections.length
    ? detailSections
    : caseStudy
      ? [
          { title: 'Problem', body: caseStudy.problem },
          { title: 'Solution', body: caseStudy.solution },
          { title: 'Impact', body: caseStudy.impact },
        ].filter((section) => Boolean(section.body))
      : []

  const imageGallery = (Array.isArray(project.images) && project.images.length > 0
    ? project.images
    : image
      ? [image]
      : []
  ).slice(0, 2)

  return (
    <Motion.section className="py-10" initial="hidden" animate="visible" variants={fadeIn}>
      <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Case Study</p>
      <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{project.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-400">
        <span className="font-mono tracking-[0.2em] text-[#64ffda]">{project.year}</span>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[project.status] ?? ''}`}>
          {project.status}
        </span>
      </div>
      {imageGallery.length > 0 && (
        <div className={`mt-8 grid gap-4 ${imageGallery.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          {imageGallery.map((src, idx) => (
            <button
              key={`${project.slug}-image-${idx}`}
              type="button"
              onClick={() => setSelectedImage(src)}
              className="overflow-hidden rounded-3xl border border-white/5 bg-white/5 transition hover:-translate-y-0.5 hover:border-[#64ffda]/30 hover:shadow-[0_20px_60px_rgba(100,255,218,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#64ffda]"
            >
              <img
                src={src}
                alt={imageAlt ? `${imageAlt} (${idx + 1})` : `${project.title} screenshot ${idx + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
      <p className="mt-8 text-lg text-gray-200">{summary ?? project.description}</p>
      <div className="mt-6 flex flex-wrap gap-2 text-xs">
        {project.tools.map((tool) => (
          <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-200">
            {tool}
          </span>
        ))}
      </div>
      {!isComingSoon && highlights.length > 0 && (
        <ul className="mt-8 space-y-3 text-sm text-gray-300">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#64ffda]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-10 space-y-6 text-base text-gray-300">
        {details.length > 0 ? (
          details.map((section) => (
            <div key={`${project.slug}-${section.title}`}>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">{section.title}</p>
              <p className="mt-2 text-gray-200">{section.body}</p>
            </div>
          ))
        ) : (
          <p>
            I’m still polishing the full breakdown for this build. Check back soon for architecture notes, dataset
            choices, and deployment lessons.
          </p>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
          role="presentation"
        >
          <div
            className="relative w-[70vw] max-w-5xl"
            style={{ maxHeight: '70vh' }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Project image preview"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -right-3 -top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white transition hover:border-[#64ffda] hover:text-[#64ffda]"
              aria-label="Close image preview"
            >
              ×
            </button>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/90 shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
              <img
                src={selectedImage}
                alt={imageAlt ?? project.title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
          >
            View on GitHub
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
          >
            {link.label}
          </a>
        ))}
        <Link
          to="/projects"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
        >
          Archive
        </Link>
        <Link
          to="/"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
        >
          ← Back home
        </Link>
      </div>
    </Motion.section>
  )
}

function NotFoundPage() {
  return (
    <Motion.section className="py-20" initial="hidden" animate="visible" variants={fadeIn}>
      <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Not Found</p>
      <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">This page drifted off.</h1>
      <p className="mt-4 max-w-xl text-gray-400">
        The URL you entered doesn’t exist. Head back to the homepage or explore the project archive.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link
          to="/"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
        >
          ← Back home
        </Link>
        <Link
          to="/projects"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200 transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
        >
          Browse projects
        </Link>
      </div>
    </Motion.section>
  )
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <ReviewsSection />
      <SkillsSection />
      <ProjectsHighlight />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
    </>
  )
}

function SiteFooter() {
  return (
    <Motion.footer
      className="mt-auto border-t border-white/5 pt-8 text-sm text-gray-500"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="flex flex-wrap items-center gap-3 text-gray-400">
        {headerLinks.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-[#64ffda]" target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
      <p className="mt-4 text-gray-500">
        <span>shahzaibshafique.me</span> — © 2025
      </p>
    </Motion.footer>
  )
}

function App() {
  const glowRef = useRef(null)
  const location = useLocation()
  const isDashboardRoute = location.pathname.startsWith('/dashboard')

  useEffect(() => {
    const glowEl = glowRef.current
    if (!glowEl) return

    const handlePointerMove = (event) => {
      glowEl.style.left = `${event.clientX}px`
      glowEl.style.top = `${event.clientY}px`
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div className="min-h-screen text-gray-100" style={{ backgroundColor: 'var(--page-bg)' }}>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div
        className={isDashboardRoute
          ? 'flex min-h-screen w-full flex-col'
          : 'mx-auto flex min-h-screen max-w-3xl flex-col px-5 pb-16 pt-10 sm:px-6 lg:px-0'}
      >
        <ScrollToTop />  {/* for scroll to above */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {!isDashboardRoute ? <SiteFooter /> : null}
      </div>
      {/* <ChatWidget /> */}
    </div>
  )
}

export default App
