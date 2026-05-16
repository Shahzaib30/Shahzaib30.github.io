import tavi1 from '../assets/images/Tavi procedure project 1.jpeg';
import tavi2 from '../assets/images/Tavi procedure project 6.jpeg';
import abadirectory1 from '../assets/images/NEXT JS 1.png';
import abadirectory2 from '../assets/images/NEXT JS 5.png';
import wordpress1 from '../assets/images/wordpress 1.png';
import wordpress2 from '../assets/images/wordpress 2.png';
import deep_transformers1 from '../assets/images/Deep Neural Network transformers 1.png';
import deep_transformers2 from '../assets/images/Deep Neural Network 3.png';
import rag_chat from '../assets/images/RAG AGENT/Chat.png';
import rag_dashboard from '../assets/images/RAG AGENT/Overview.png';
import rankspotter1 from '../assets/images/rankspotter 1.png';
import rankspotter2 from '../assets/images/rankspotter 2.png';
import deep3 from '../assets/images/Deep Neural Network 3.png';
import arch1 from '../assets/images/arch1.jpeg';
import arch2 from '../assets/images/arch1.png';

const projects = [
  {
    slug: 'enterprise-rag-lead-gen',
    title: 'Enterprise RAG System & Lead-Generation AI Agent',
    year: '2026',
    description: 'Autonomous multi-agent backend engine integrated with portable micro-frontend web widgets and real-time database tracking dashboards.',
    tools: ['FastAPI', 'LangGraph', 'PostgreSQL', 'PgVector', 'Vanilla JS', 'React'],
    status: 'Completed',
    image: rag_chat,
    images: [rag_chat, rag_dashboard],
    imageAlt: 'Enterprise RAG system interface with live admin data streaming',
    summary: 'A portable, cross-platform micro-frontend chat widget designed to inject seamlessly into third-party web environments (WordPress, React) via an asynchronous script snippet. Email me to get a live interactive sandbox demo. You can see it implemented in my personal Website Portfolio by Chat Widget at Right bottom corner.',
    caseStudy: {
      problem: 'Enterprise business portals experience severe conversion drop-offs due to traditional high-friction web forms. Concurrently, native AI integrations often suffer from context drift, state tracking failures over dynamic multi-turn sessions, security leaks of internal knowledge bases, and layout reflow bugs when executed inside third-party content management systems like WordPress.',
      solution: 'Architected a completely decoupled system featuring a sandboxed, vanilla asynchronous script micro-frontend that mounts onto a target application. The widget securely communicates with a stateful Python backend powered by LangGraph state machines. Implemented structured intent routing logic to instantly separate casual greetings from complex queries, dynamic context window management to preserve multi-turn history, and advanced semantic RAG pipelines using dense vector database arrays.',
      impact: 'Delivers a highly secure lead-generation infrastructure that accurately parses unstructured customer data, handles conversational state variables flawlessly, and generates automated session titles. Business owners get complete operational transparency via an isolated, token-authenticated admin control panel tracking PostgreSQL lead metrics, system connection latencies, and end-to-end user transcripts with zero layout interference.'
    },
    highlights: [
      'LangGraph-driven state machines for robust intent routing',
      'Secure admin dashboard with live PostgreSQL metrics',
      'Sandboxed JS widget with zero layout reflow impact',
    ],
  },
  {
    slug: 'tavi-planning-system',
    title: 'TAVI Planning System using Deep Learning',
    year: '2026',
    description: 'Automated clinical-grade TAVI pre-surgical planning platform leveraging custom nnUNet architectures for high-precision 3D volumetric segmentation. You can Email me to request a case study video demo.',
    tools: ['nnUNet', 'PyTorch', '3D Segmentation', 'Medical Imaging', 'Hugging Face'],
    status: 'Completed',
    images: [tavi1, tavi2],
    imageAlt: '3D cardiac visualization and aortic annulus extraction rendered from CTA scans',
    summary: 'A point-and-click planning cockpit for cardiologists that processes raw CTA DICOM datasets, segments complex anatomical structural boundaries, and outputs sub-millimeter prosthetic valve sizing variables. Email me to request a case study video demo.',
    caseStudy: {
      problem: 'Surgical preparation teams spent hours manually isolating complex boundaries across hundreds of 2D cross-sectional Computed Tomography Angiography (CTA) slices for Transcatheter Aortic Valve Implantation (TAVI) candidates. This manual measurement loop introduced high human error risks, subjective geometric calculation variations, and critical alignment discrepancies when determining prosthetic valve diameters.',
      solution: 'Developed an automated deep learning pipeline that processes multi-format raw DICOM medical files. Configured a custom volumetric nnUNet semantic segmentation model optimized to extract precise 3D topological representations of the aortic root and heart valves. Built mesh post-processing topology checks to remove pixel noise, designed customized geometric sizing heuristics for spatial alignment tracking, and integrated open-weight language models via Hugging Face to process structural dimensions into comprehensive diagnostic reporting text.',
      impact: 'Successfully achieved sub-2mm measurement variances on validation datasets compared to expert gold-standard ground truths. The platform completely eliminated manual scanning overheads, optimized pre-surgical structural planning cycle latencies by over 75%, and provided cardiac surgeons with highly accurate, auditable 3D anatomical overlays and automated diagnostic reporting drafts.'
    },
    highlights: [
      'nnUNet-based volumetric segmentation with automated QA',
      'Sub-2mm measurement variance versus expert annotations',
      'Auto-generated clinical reporting using LLMs',
    ],
  },
  {
    slug: 'sql-nexus',
    title: 'SQL-NEXUS — Agentic DB Query Generator',
    year: '2026',
    description: 'Agentic workflow converting conversational English text queries into structured database operations programmatically.',
    tools: ['Python', 'LLMs', 'SQL', 'Schema Analysis', 'Guardrails'],
    status: 'In Progress',
    images: [],
    imageAlt: 'Agent converting natural language to SQL command flows',
    github: 'https://github.com/Shahzaib30/SQL-NEXUS',
    summary: 'An advanced agentic database interface parsing plain-text prompts into secure executable statements via continuous loop validation layers. Email me to get a demo.',
    caseStudy: {
      problem: 'Operational stakeholders and non-technical business analytics teams face critical data bottlenecks when waiting on manual SQL script compilation. Conversely, opening raw database interfaces to generic automated interfaces introduces catastrophic risks of malicious SQL injection vectors, syntax compilation structural crashes, and unintended database state execution errors.',
      solution: 'Engineered a highly intelligent, schema-aware agentic runtime that interprets plain English text queries using semantic intent matching. The pipeline maps queries against a serialized database metadata cache, generates candidate SQL scripts, and applies an iterative multi-stage syntax correction loop. The system validates syntax correctness against strict rule boundaries, schema constraints, and predefined security guardrails before processing elements.',
      impact: 'Enables reliable, zero-code data extraction capabilities for operational business users while protecting critical production database tables from unauthorized schema manipulation. The system effectively reduces analytical data request loops from days down to fractions of a second while outputting transparent, human-readable execution steps for technical compliance audits.'
    },
    highlights: [
      'Schema-aware structural prompt compilation paths',
      'Multi-stage iterative SQL query correction loops',
      'Rigorous execution safety boundaries and constraints'
    ]
  },
  {
    slug: 'rankspotter-serp-tracker',
    title: 'RankSpotter – Real-time SERP Tracker',
    year: '2025',
    description: 'Production-grade keyword rank monitoring infrastructure featuring scalable asynchronous data pipelines and React control surfaces.',
    tools: ['React', 'Flask', 'PostgreSQL', 'Scraping Engines', 'Supabase'],
    status: 'In Progress',
    images: [rankspotter1, rankspotter2],
    imageAlt: 'Analytics interface charting localized search visibility indexes and position deltas',
    summary: 'Continuous rank analytics stack with automated volatility alert mechanics, contextual competitor maps, and immutable tracking proof captures. Email me to get a demo.',
    caseStudy: {
      problem: 'Search engine optimization teams struggle to establish clear visibility adjustments due to slow manual tracking processes, silent algorithmic search placement adjustments, and extensive proxy connection throttling limits. Traditional scraping architectures frequently drop performance when handling complex dynamic web elements and anti-bot data verification locks.',
      solution: 'Engineered an (always-on) keyword rank monitoring ecosystem driven by a highly scalable, asynchronous Flask data pipeline backend. Configured a distributed scraping worker pool managing headless Chromium microservices across rotating proxy networks to capture pixel-perfect search engine results pages (SERPs). Integrated multi-tenant role-based access control (RBAC) via Supabase Auth and coupled it with an automated PostgreSQL storage loop tracking layout variations.',
      impact: 'Successfully managed continuous data capture cycles covering over 12,000 tracked keywords, instantly pushing anomaly alerts, competitor trend overlays, and immutable layout screenshot evidence to users. Replaced labor-intensive tracking checks with responsive React data dashboards, driving down total technical visibility assessment time from days to a few seconds.'
    },
    highlights: [
      'Distributed headless workers managed via proxy networks',
      'Granular data tables highlighting structural site features',
      'Robust multi-tenant separation engines via Supabase'
    ],
  },
  {
    slug: 'speech-emotion-recognition',
    title: 'Speech Emotion Recognition System',
    year: '2025',
    description: 'Deep neural acoustic architecture classifying spoken sentiment vectors with 90%+ testing accuracy scores.',
    tools: ['Audio Processing', 'CNNs', 'BiLSTM', 'PyTorch', 'Triton Server'],
    status: 'Completed',
    images: [deep3],
    imageAlt: 'Acoustic waveform spectrogram visualizations processed inside feature mapping nodes',
    github: 'https://github.com/Shahzaib30/Speech-Emotion-Recognition-Using-Deep-Learning',
    summary: 'Built a multi-task CNN + BiLSTM pipeline that extracts tone, emotional velocity, and physiological stress signatures from live audio streams. Email me to get a demo.',
    caseStudy: {
      problem: 'Automated telephonic contact systems and conversational voice user interfaces operate blindly without understanding customer frustration levels. Traditional sentiment modeling approaches rely strictly on text transcripts, completely missing crucial physiological stress indicators, urgent tonal velocities, and acoustic amplitude inflections embedded within audio streams.',
      solution: 'Developed a high-fidelity multi-task deep neural architecture combining a 2D Convolutional Neural Network (CNN) front-end with a Bidirectional Long Short-Term Memory (BiLSTM) sequential decoder layer. Transformed raw streaming audio into detailed mel-spectrogram feature maps, applying SpecAugment data transformations and channel-noise mixing parameters to insulate the network against acoustic hardware variations, accent types, and field environment distortions.',
      impact: 'Achieved a verified 90%+ diagnostic classification accuracy score across foundational audio datasets (RAVDESS, CREMA-D) and real call samples. The model handles severe data distribution class imbalances via targeted focal loss functions and runs ultra-low 99th percentile inference latencies below 150ms using a specialized Triton Inference Server deployment architecture.'
    },
    highlights: [
      'SpecAugment processing built in for channel robustness',
      'Custom acoustic parsing UI optimized for call metrics',
      'Sub-150ms inference processing ranges on GPU nodes'
    ],
  },
  {
    slug: 'ai-resume-reviewer',
    title: 'AI Resume Reviewer',
    year: '2026',
    description: 'Automated linguistic evaluation platform evaluating professional texts against ATS filtering scoring parameters.',
    tools: ['Python', 'LLMs', 'Information Extraction', 'NLP UI'],
    status: 'In Progress',
    imageAlt: 'Linguistic evaluation dashboard annotating resumes with compliance scoring markers',
    summary: 'Parses raw resume documents, maps structural data bounds against target requirements, and suggests explicit text optimization changes. Email me to get a demo.',
    caseStudy: {
      problem: 'Top-tier candidates frequently face early automated rejections within enterprise applicant filtering tools due to minor structural document parsing errors. Unoptimized resume styling formats, low-density semantic technical descriptions, and implicit phrasing gaps often prevent human evaluators from accurately recognizing relevant skill configurations.',
      solution: 'Designed a comprehensive text layout processing engine that extracts unformatted data fields from multiple file extensions. The pipeline isolates distinct linguistic blocks, evaluating document structure density parameters against customizable candidate matrices. Integrated customized information extraction routines that systematically score text sections for keyword distribution, strong action-verb alignment, and quantified milestone reporting patterns.',
      impact: 'Builds an analytical, data-driven optimization layer that scores candidate material with highly transparent adjustment parameters. The application processes raw files to generate high-priority contextual rewrites, localized ATS compatibility updates, and interview-readiness metrics, transforming typical black-box evaluation systems into an explicit self-serve roadmap.'
    },
    highlights: [
      'Quantified ATS structural parsing metric engines',
      'Algorithmic career track formatting recommendations',
      'Automated semantic segment alignment analytics'
    ],
  },
  {
    slug: 'arch-ai-setup',
    title: 'Arch AI Setup (Hyprland & Dotfiles)',
    year: '2026',
    description: 'Arch Linux AI setup with Hyprland, custom dotfiles, and lightweight QML widgets for an optimized workstation environment.',
    tools: ['Linux', 'Hyprland', 'QML', 'Shell Scripting'],
    status: 'Public',
    images: [arch1, arch2],
    imageAlt: 'Desktop setup screenshots and dotfiles preview',
    summary: 'A highly optimized, reproducible Unix installation layer maximizing multi-task window layout speed and local machine learning execution loops. Email me to get a demo.',
    caseStudy: {
      problem: 'Heavy, bloated out-of-the-box operating system environments consume massive amounts of system memory and processor threads. This configuration creates micro-stutters, degrades local code rendering speeds, and bottlenecks localized execution loops when training dense deep learning architectures and processing continuous GPU background tasks.',
      solution: 'Engineered a lightweight, keyboard-centric workstation layer running on the Arch Linux core base, utilizing the fast Hyprland Wayland compositor for graphic tiling management. Built a systematic framework of reproducible configuration settings, custom shell scripts, and optimized environment wrappers that isolate background rendering priorities and establish high-throughput hardware processing layouts.',
      impact: 'Reduces baseline operational system memory usage to minimal thresholds, freeing vital processing resources directly for local neural network optimization loops. Delivers an ergonomic developer environment that enables rapid script testing cycles, seamless multi-monitor telemetry display management, and fast portable deployment setups.'
    }
  },
  {
    slug: 'python-music-player',
    title: 'Python Music Player',
    year: '2023',
    description: 'Clean desktop application for local media directory indexation, metadata collection, and fluid audio tracking mechanisms.',
    tools: ['Python', 'Tkinter', 'SQLite', 'Mutagen'],
    status: 'Completed',
    imageAlt: 'Desktop interface panel handling local file playback queues and media organization metrics',
    github: 'https://github.com/Shahzaib30/music-player-in-python-Gui',
    summary: 'A clean standalone desktop tool designed for local cataloging, audio tag indexing, and playback execution. Email me to get a demo.',
    caseStudy: {
      problem: 'Mainstream content streaming engines introduce massive framework application bloat, rely on continuous internet connectivity, and lack high-performance internal indexing utilities for organizing vast, disconnected local audio directories without encountering tracking data corruption.',
      solution: 'Developed a responsive desktop media management tool using a highly optimized Python architecture. Configured an internal SQLite indexing model to index file system directories, integrated Mutagen metadata extraction hooks to parse complex file tags, and structured custom event listeners inside a lightweight Tkinter dark-palette UI interface.',
      impact: 'Delivered a lightning-fast, zero-network desktop application that scans, updates, and searches through massive local music databases instantly. Achieved absolute data state preservation across system reboots, ensuring localized playlists, directory configurations, and track parameters load cleanly with zero memory overhead.'
    }
  },
  {
    slug: 'wordpress-custom-websites',
    title: 'WordPress Custom Websites',
    year: '2026',
    description: 'Custom WordPress website builds focused on performance, modern layouts, SEO structure, and simple editing workflows for clients.',
    tools: ['WordPress', 'Elementor', 'SEO', 'UI Design', 'Performance'],
    status: 'Public',
    image: wordpress1,
    images: [wordpress1, wordpress2],
    imageAlt: 'Custom WordPress website design and homepage layout preview',
    summary: 'A portfolio of custom WordPress builds designed to look clean, load fast, and give business owners an easy editing experience without needing technical knowledge. The work focuses on converting plain content into polished client websites with structured pages, responsive sections, and SEO-friendly layout decisions. I handle the visual direction, spacing, sections, and content presentation so the site feels modern and professional while still being easy for the client to manage after launch. The goal is to reduce friction for small businesses that want a stronger online presence without the overhead of a complex custom application. This project category also reflects my ability to work across both design and implementation, combining practical website strategy with front-end polish, speed improvements, and content organization. It is built for real-world client delivery rather than just experimentation, and it demonstrates how I adapt WordPress into a more refined, branded solution for service businesses, agencies, and personal brands.',
    caseStudy: {
      problem: 'Many WordPress websites are built quickly with generic templates, weak visual hierarchy, and poor page performance, which makes it hard for businesses to stand out or convert visitors. Clients often struggle with editing content later because the structure is too messy or overly technical.',
      solution: 'Designed and customized WordPress websites with a cleaner layout system, responsive section structure, and client-friendly editing flow. I focused on balancing design quality with practical maintainability so each site can be updated easily without breaking the layout. The build process emphasizes reusable sections, strong typography, and SEO-aware organization.',
      impact: 'The result is a set of websites that feel more professional, load more smoothly, and are easier for non-technical clients to manage. Businesses get a stronger online presence, better presentation of services, and a website structure that supports growth instead of getting in the way.'
    },
    highlights: [
      'Custom client-friendly WordPress layouts',
      'SEO-aware structure and responsive design',
      'Fast editing workflow for non-technical users'
    ]
  },
  {
    slug: 'deep-neural-networks',
    title: 'Deep Neural Networks & Transformers',
    year: '2026',
    description: 'Research and experimentation hub focused on deep neural network architectures, transformers, attention mechanisms, and practical evaluation workflows.',
    tools: ['Python', 'PyTorch', 'Transformers', 'Hugging Face', 'Metrics'],
    status: 'In Progress',
    images: [deep_transformers1, deep_transformers2],
    imageAlt: 'Neural network experimentation workspace with transformer models and training logs',
    github: 'https://github.com/Shahzaib30/Transformers',
    links: [
      {
        label: 'Deep Neural Network Repo',
        href: 'https://github.com/Shahzaib30/Deep-Neural-Network',
      },
      {
        label: 'Transformers Repo',
        href: 'https://github.com/Shahzaib30/Transformers',
      },
    ],
    summary: 'A fast-prototyping collection used to test deep neural network training routines, transformer stacks, evaluation matrices, and model layer metrics. Email me to get a demo.',
    caseStudy: {
      problem: 'Machine learning engineers often run into performance regressions when building custom neural and language pipelines because they lack structured testing protocols, standardized code components, and objective, data-backed metrics to measure trade-offs between accuracy, latency, and stability. Transformer models are especially sensitive to tokenization choices, attention depth, data quality, and training configuration, which makes experimentation hard to compare without a disciplined setup.',
      solution: 'Built a focused research repository for deep neural networks and transformer-based experiments using Python and PyTorch. The project organizes model prototypes, training utilities, evaluation scripts, and experiment tracking patterns so every run can be compared fairly. I used Hugging Face components to test different attention-based architectures, batch evaluation routines, and structured text datasets, while keeping the code modular enough to swap backbones, hyperparameters, and metrics without rewriting the entire pipeline.',
      impact: 'The result is an organized AI experimentation hub that replaces guesswork with reproducible logs, cleaner model comparisons, and reusable training patterns. It speeds up iteration on transformer-based systems, makes debugging easier, and gives me a dependable foundation for future production-grade NLP and deep learning work. Instead of isolated notebooks or one-off scripts, the repository behaves like a structured engineering lab for testing modern neural architectures.'
    },
    highlights: [
      'Transformer and attention architecture experiments',
      'Reproducible training and evaluation workflows',
      'Reusable deep learning research scaffolding'
    ]
  }
];

export default projects;