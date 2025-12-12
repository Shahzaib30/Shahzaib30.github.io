import { useEffect, useRef } from 'react'
import { motion as Motion } from 'framer-motion'
import cvFile from './assets/My_CV.pdf'

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
    title: 'TAVI Planning System using Deep Learning',
    year: '2025',
    description:
      'Automated clinical-grade TAVI planning leveraging nnUNet for volumetric segmentation and stent sizing from CTA.',
    tools: ['nnUNet', 'PyTorch', '3D Segmentation', 'Medical Imaging'],
    status: 'In Progress',
  },
  {
    title: 'GrantGenius – AI Grant Matching & Proposal Generator',
    year: '2024',
    description:
      'LLM-powered assistant that surfaces relevant grants and drafts polished proposals with context-aware reasoning.',
    tools: ['Python', 'LangChain', 'LLMs', 'NLP'],
    status: 'Completed',
  },
  {
    title: 'Speech Emotion Recognition System',
    year: '2025',
    description:
      'Accuracy: 90%+. Deep neural architecture that classifies speaker sentiment for safer, more human voice interfaces.',
    tools: ['Audio Processing', 'CNNs', 'PyTorch'],
    status: 'Completed',
  },
  {
    title: 'RankSpotter – Real-time SERP Tracker',
    year: '2025',
    description:
      'Production-grade SERP monitoring stack with React dashboards and a Flask data pipeline, currently scaling to more keywords.',
    tools: ['React', 'Flask', 'PostgreSQL', 'SERP APIs'],
    status: 'Completed',
  },
  {
    title: 'Python Music Player',
    year: '2023',
    description: 'Clean Tkinter desktop app for playlist management and local playback.',
    tools: ['Python', 'Tkinter'],
    status: 'Completed',
  },
  {
    title: 'NLP Mini Projects',
    year: '—',
    description: 'A curated pack of smaller NLP experiments and utilities.',
    tools: ['Coming Soon'],
    status: 'Coming Soon',
  },
  {
    title: 'RAG Chatbot',
    year: '—',
    description: 'Domain-tuned retrieval-augmented chatbot with guardrails.',
    tools: ['Coming Soon'],
    status: 'Coming Soon',
  },
  {
    title: 'AI Resume Reviewer',
    year: '—',
    description: 'Automated feedback loop for stronger AI-ready resumes.',
    tools: ['Coming Soon'],
    status: 'Coming Soon',
  },
]

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

const certifications = ['NLP Certification', 'Data Science Certification']

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
        <Motion.header
          className="space-y-6 pb-14"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
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
              “I’m an AI Engineer focused on building practical and reliable machine learning, NLP, and LLM-based
              solutions. I enjoy creating end-to-end AI systems using Python, PyTorch, LangChain, and modern cloud
              tools. I’ve completed multiple AI projects through Upwork with a 100% Job Success Score, and I love using
              AI to automate workflows, improve efficiency, and create real impact.”
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
          <a
            href={cvFile}
            download="Shahzaib_Shafique_CV.pdf"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#64ffda]/70 bg-[#64ffda]/10 px-5 py-2 text-sm font-semibold text-[#64ffda] shadow-[0_10px_30px_rgba(100,255,218,0.25)] transition hover:-translate-y-0.5 hover:bg-[#64ffda]/20"
          >
            Download CV
            <span aria-hidden="true" className="text-base">
              ↓
            </span>
          </a>
    </Motion.header>

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

        <Section id="projects" eyebrow="Selected Work" title="Projects & Experiments">
          <div className="relative pl-8">
            <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#64ffda] via-emerald-300/40 to-transparent" />
            <div className="space-y-10">
              {projects.map((project, index) => (
                <Motion.article
                  key={project.title}
                  className="relative rounded-3xl border border-white/5 bg-white/10 p-6 shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
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
                  <span className="absolute -left-[33px] top-8 flex h-3 w-3 items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-300/20"></span>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    <p className="font-mono tracking-[0.2em] text-[#64ffda]">{project.year}</p>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[project.status] ?? ''}`}
                    >
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
                </Motion.article>
              ))}
            </div>
          </div>
        </Section>

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

        <Section id="education" eyebrow="Learning" title="Education & Certifications">
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.school} className="flex flex-col gap-1 rounded-2xl border border-white/5 bg-white/10 p-5">
                <p className="text-lg font-semibold text-white">{edu.school}</p>
                <p className="text-sm text-gray-400">{edu.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Certifications</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <span key={cert} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </Section>

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
          <p className="mt-4 text-gray-500"><shahzaibshafique className="me">shahzaibshafique.me</shahzaibshafique> — © 2025</p>
        </Motion.footer>
      </div>
    </div>
  )
}

export default App
