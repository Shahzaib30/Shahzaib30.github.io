import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import cvFile from './assets/My_CV.pdf'
import nlpCertificateImage from './assets/nlpcertificate.png'
import dataScienceCertificate from './assets/datascience.pdf'

const headerLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/s-shahzaib' },
  { label: 'GitHub', href: 'https://github.com/Shahzaib30' },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01774fb1bf81238658' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/shahzaib2222' },
  { label: 'Portfolio', href: 'http://www.shahzaibshafique.me' },
  { label: 'Email', href: 'mailto:shahdesigner30@gmail.com' },
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
      'TensorFlow',
      'Scikit-learn',
      'LangChain',
      'LlamaIndex',
      'Hugging Face',
      'NLTK',
      'FastAPI',
      'Flask',
    ],
  },
  {
    title: 'AI Techniques',
    items: [
      'RAG',
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
      'Docker',
      'Git',
      'Linux',
      'VS Code',
      'Jupyter Notebook',
      'Google Colab',
      'Anaconda',
      'Postman',
      'GitHub Actions',
      'MySQL',
      'PostgreSQL',
      'FAISS',
      'Pinecone',
      'MLflow',
      'Weights & Biases',
      'AWS',
      'GCP',
    ],
  },
  {
    title: 'Frontend',
    items: ['React.js', 'HTML', 'CSS','Vue.js','Three.js','Next.js'],
  },
  {
    title: 'Other',
    items: ['Wordpress','SEO','Google Analytics','Figma','Canva',],
  }
]

const projects = [
  {
    slug: 'tavi-planning-system',
    title: 'TAVI Planning System using Deep Learning',
    year: '2025',
    description:
      'Automated clinical-grade TAVI planning leveraging nnUNet for volumetric segmentation and stent sizing from CTA.',
    tools: ['nnUNet', 'PyTorch', '3D Segmentation', 'Medical Imaging'],
    status: 'In Progress',
    image:
      'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80&sat=-35',
    imageAlt: '3D cardiac visualization rendered from CTA scans',
    github: 'https://github.com/Shahzaib30/tavi-planning-system',
    summary:
      'Building a point-and-click planning cockpit for cardiologists that ingests CTA scans, segments anatomy, and returns precise stent sizing in under five minutes.',
    highlights: [
      'nnUNet + MONAI pipeline with automatic quality checks',
      'Sub-2mm measurement variance on validation datasets',
      'FastAPI microservice deployed on self-hosted GPU node',
    ],
    detailSections: [
      {
        title: 'Problem',
        body: 'Cardiac teams manually traced valve boundaries for every TAVI candidate, which could take over an hour per patient and produced inconsistent sizing.',
      },
      {
        title: 'Solution',
        body: 'Designed a volumetric workflow: DICOM ingestion → nnUNet inference → mesh post-processing → stent sizing heuristics → PDF planning report.',
      },
      {
        title: 'Impact',
        body: 'Pilot sites reduced planning time by 78% while giving surgeons richer visual overlays and an auditable trail per patient.',
      },
    ],
  },
  {
    slug: 'grantgenius',
    title: 'GrantGenius – AI Grant Matching & Proposal Generator',
    year: '2024',
    description:
      'LLM-powered assistant that surfaces relevant grants and drafts polished proposals with context-aware reasoning.',
    tools: ['Python', 'LangChain', 'LLMs', 'NLP'],
    status: 'Completed',
    image:
      'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80&sat=-20',
    imageAlt: 'Team collaborating over grant documents and laptops',
    github: 'https://github.com/Shahzaib30/grantgenius',
    summary:
      'A retrieval-augmented LLM that watches 2,000+ grant feeds, matches opportunities to each NGO, and drafts first-pass proposals with consistent voice.',
    highlights: [
      'Custom embedder fine-tuned on 6 years of successful grants',
      'Insight dashboard built with React + TanStack Table',
      'Guardrailed proposal generation with factuality checks',
    ],
    detailSections: [
      {
        title: 'Discovery',
        body: 'Clients struggled to keep up with rapidly changing funding criteria. We mapped their decision tree to a vector database + eligibility engine.',
      },
      {
        title: 'Automation',
        body: 'Daily cron jobs crawl grant APIs, normalize metadata, and sync embeddings into Pinecone so scoring stays instant.',
      },
      {
        title: 'Results',
        body: 'Average research time fell from 6 hours to 35 minutes per grant and close rates improved by 18% thanks to stronger positioning.',
      },
    ],
  },
  {
    slug: 'speech-emotion-recognition',
    title: 'Speech Emotion Recognition System',
    year: '2025',
    description:
      'Accuracy: 90%+. Deep neural architecture that classifies speaker sentiment for safer, more human voice interfaces.',
    tools: ['Audio Processing', 'CNNs', 'PyTorch'],
    status: 'Completed',
    image:
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80&sat=-15',
    imageAlt: 'Waveform visualizations on dual monitors',
    github: 'https://github.com/Shahzaib30/speech-emotion-recognition',
    summary:
      'Built a multi-task CNN + BiLSTM pipeline that understands tone, urgency, and stress levels from streaming audio for safer IVR agents.',
    highlights: [
      'SpecAugment + mixup for far-field robustness',
      'Self-serve labeling UI for call-center SMEs',
      '99th percentile latency under 150ms on GPU edge nodes',
    ],
    detailSections: [
      {
        title: 'Dataset',
        body: 'Combined open-source corpora (RAVDESS, CREMA-D) with 400 hours of anonymized support calls to balance accents and noise profiles.',
      },
      {
        title: 'Modeling',
        body: 'Stacked 2D CNN front-end for spectrogram features with a BiLSTM decoder plus focal loss to correct class imbalance.',
      },
      {
        title: 'Deployment',
        body: 'Wrapped the model inside TorchScript, served through Triton Inference Server, and streamed classifications into a React ops dashboard.',
      },
    ],
  },
  {
    slug: 'rankspotter-serp-tracker',
    title: 'RankSpotter – Real-time SERP Tracker',
    year: '2025',
    description:
      'Production-grade SERP monitoring stack with React dashboards and a Flask data pipeline, currently scaling to more keywords.',
    tools: ['React', 'Flask', 'PostgreSQL', 'SERP APIs'],
    status: 'Completed',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80&sat=-10',
    imageAlt: 'Analytics dashboard with ranking charts',
    github: 'https://github.com/Shahzaib30/rankspotter',
    summary:
      'Always-on rank tracking with anomaly alerts, competitor overlays, and automatic screenshot evidence per SERP movement.',
    highlights: [
      'Headless Chromium workers capture pixel-perfect SERPs',
      'Multi-tenant RBAC with Supabase Auth',
      'Hourly refresh loop covering 12k keywords',
    ],
    detailSections: [
      {
        title: 'Pipeline',
        body: 'Scheduler fans out to rotating proxies, scrapes SERPs, and normalizes features (position, pixel depth, SERP features) before landing in Postgres.',
      },
      {
        title: 'Product',
        body: 'React dashboard shows sparkline deltas, “share of search” trendlines, and push notifications for dramatic drops.',
      },
      {
        title: 'Business Impact',
        body: 'SEO teams cut diagnosis time from days to minutes and proved ROI with automated weekly PDF digests.',
      },
    ],
  },
  {
    slug: 'python-music-player',
    title: 'Python Music Player',
    year: '2023',
    description: 'Clean Tkinter desktop app for playlist management and local playback.',
    tools: ['Python', 'Tkinter'],
    status: 'Completed',
    image:
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1200&q=80&sat=-12',
    imageAlt: 'Vintage headphones connected to a laptop',
    github: 'https://github.com/Shahzaib30/python-music-player',
    summary:
      'A focused desktop player with waveform previews, queue controls, and keyboard shortcuts for DJs who prefer offline crates.',
    highlights: [
      'Mutagen-powered metadata editing',
      'SQLite library with fuzzy search',
      'Cross-platform packaging via PyInstaller',
    ],
    detailSections: [
      {
        title: 'Interface',
        body: 'Custom Tkinter theme with dark palette, dynamic resizing, and a queue drawer inspired by Ableton.',
      },
      {
        title: 'Features',
        body: 'Drag-and-drop playlists, waveform scrubbing, and auto-saving last session state.',
      },
      {
        title: 'Extendability',
        body: 'Plugin hooks allow users to sync last.fm scrobbles or map MIDI controllers.',
      },
    ],
  },
  {
    slug: 'nlp-mini-projects',
    title: 'NLP Mini Projects',
    year: '—',
    description: 'A curated pack of smaller NLP experiments and utilities.',
    tools: ['Coming Soon'],
    status: 'Coming Soon',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80&sat=-20',
    imageAlt: 'Code editor with highlighted NLP scripts',
    github: 'https://github.com/Shahzaib30/nlp-mini-projects',
    summary: 'Collection of micro-experiments: prompt optimizers, summarizers, and evaluation harnesses.',
    highlights: ['Batch evaluation harness', 'Prompt templating playground'],
    detailSections: [
      {
        title: 'Status',
        body: 'Currently documenting the most reusable snippets before open-sourcing.',
      },
    ],
  },
  {
    slug: 'rag-chatbot',
    title: 'RAG Chatbot',
    year: '—',
    description: 'Domain-tuned retrieval-augmented chatbot with guardrails.',
    tools: ['Coming Soon'],
    status: 'Coming Soon',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80&sat=-10',
    imageAlt: 'Chat interface mockups on a tablet',
    github: 'https://github.com/Shahzaib30/rag-chatbot',
    summary: 'An enterprise-ready assistant with policy guardrails, vector search, and analytics.',
    highlights: ['Private data connectors', 'Realtime guardrail tracing'],
    detailSections: [
      {
        title: 'Status',
        body: 'Currently integrating vendor knowledge bases and access controls.',
      },
    ],
  },
  {
    slug: 'ai-resume-reviewer',
    title: 'AI Resume Reviewer',
    year: '—',
    description: 'Automated feedback loop for stronger AI-ready resumes.',
    tools: ['Coming Soon'],
    status: 'Coming Soon',
    image:
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80&sat=-10',
    imageAlt: 'Printed resumes marked with annotations',
    github: 'https://github.com/Shahzaib30/ai-resume-reviewer',
    summary: 'Uploads a resume, benchmarks it against role descriptions, and outputs quantified improvements.',
    highlights: ['ATS optimization scoring', 'Interview-ready recommendations'],
    detailSections: [
      {
        title: 'Status',
        body: 'Finishing the scoring rubric and UX polish before launch.',
      },
    ],
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
      viewport={{ once: true, amount: 0.3 }}
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
          transition: { duration: 0.5, delay: index * 0.15, ease: 'easeOut' },
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
        <p className="font-medium text-white">AI Engineer</p>
        <p className="text-gray-400">Islamabad, Pakistan</p>
      </div>
      <div className="text-base text-gray-400">
        <p>
          I’m an AI Engineer focused on building practical and reliable machine learning, NLP, and LLM-based solutions.
          I enjoy creating end-to-end AI systems using Python, PyTorch, LangChain, and modern cloud tools. I’ve completed
          multiple AI projects through Upwork with a 100% Job Success Score, and I love using AI to automate workflows,
          improve efficiency, and create real impact.
        </p>
      </div>
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

function ProjectsHighlight() {
  return (
    <Section id="projects" eyebrow="Selected Work" title="Projects & Experiments">
      <div className="relative pl-8">
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
  const { image, imageAlt, summary, highlights = [], detailSections = [], github } = project

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
      {image && (
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/5 bg-white/5">
          <img src={image} alt={imageAlt ?? project.title} className="h-full w-full object-cover" loading="lazy" />
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
        {detailSections.length > 0 ? (
          detailSections.map((section) => (
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
    <Motion.section className="relative mt-6 overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-8 text-gray-200 shadow-[0_25px_80px_rgba(100,255,218,0.05)]" initial="hidden" animate="visible" variants={fadeIn}>
      <div className="absolute inset-0 opacity-20">

      </div>
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-gray-400">Not Found</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">404</h1>
          <p className="mt-4 text-lg text-gray-200">
            The page you were looking for drifted off the roadmap. Let’s guide you back to the most valuable content.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#64ffda]/10 px-5 py-2 font-semibold text-[#64ffda] transition hover:-translate-y-0.5 hover:bg-[#64ffda]/20"
            >
              Back to homepage
              <span aria-hidden="true">↺</span>
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#64ffda] hover:text-[#64ffda]"
            >
              Browse archive
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Quick Map</p>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/10 text-center text-2xl font-bold text-[#64ffda] leading-[3rem]">AI</div>
              <div>
                <p className="font-semibold text-white">AI Case Studies</p>
                <p className="text-gray-400">Deep learning, LLM, and RAG builds.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/10 text-center text-2xl font-bold text-[#64ffda] leading-[3rem]">UX</div>
              <div>
                <p className="font-semibold text-white">Design Systems</p>
                <p className="text-gray-400">Interfaces crafted for clarity.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/10 text-center text-2xl font-bold text-[#64ffda] leading-[3rem]">CV</div>
              <div>
                <p className="font-semibold text-white">Get the Resume</p>
                <p className="text-gray-400">Download the full PDF profile.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion.section>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function HomePage() {
  return (
    <>
      <HeroSection />
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
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 pb-16 pt-10 sm:px-6 lg:px-0">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <SiteFooter />
      </div>
    </div>
  )
}

export default App
