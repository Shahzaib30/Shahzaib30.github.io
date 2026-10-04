import tavi1 from '../assets/images/Tavi procedure project 1.jpeg';
import tavi2 from '../assets/images/Tavi procedure project 2.jpeg';
import tavi3 from '../assets/images/Tavi procedure project 3.jpeg';
import tavi4 from '../assets/images/Tavi procedure project 4.jpeg';
import tavi5 from '../assets/images/Tavi procedure project 5.jpeg';
import tavi6 from '../assets/images/Tavi procedure project 6.jpeg';

import wordpressBestMaineVacation from '../assets/images/wordpress/bestmainevacation.png';
import wordpressLittleAchievers from '../assets/images/wordpress/littleachievers.png';
import wordpressAlberLegal from '../assets/images/wordpress/alberlegal.png';
import wordpressAchieversAba from '../assets/images/wordpress/achieversaba.png';
import wordpressBluebellAba from '../assets/images/wordpress/bluebellaba.png';
import wordpressAttendHc from '../assets/images/wordpress/attendhc.png';

import instacannHomepage from '../assets/images/instacann/instacann_homepage.png';
import instacannFindDispensaries from '../assets/images/instacann/finddispensaries.png';
import instacannDispensariesNear from '../assets/images/instacann/dispensariesnear.png';
import instacannSingleDispensary from '../assets/images/instacann/singledispensary.png';
import instacannAdminListing from '../assets/images/instacann/adminlisting.png';
import instacannNewListing from '../assets/images/instacann/newlisting.png';

import ragOverview from '../assets/images/RAG AGENT/Overview.png';
import ragChat from '../assets/images/RAG AGENT/Chat.png';
import ragDashboardLocked from '../assets/images/RAG AGENT/Dashboard Locked.png';
import ragKnowledgeBase from '../assets/images/RAG AGENT/KnowledgeBase.png';
import ragLeadManagement from '../assets/images/RAG AGENT/LeadManagement.png';
import ragLiveTranscripts from '../assets/images/RAG AGENT/Live Transcripts.png';

import supportAgentUi from '../assets/images/ai-support-agent/ui.png';
import supportAgentDashboard from '../assets/images/ai-support-agent/dashboard.png';
import supportAgentDiscord from '../assets/images/ai-support-agent/discord agent.png';
import supportAgentGrafana from '../assets/images/ai-support-agent/grafana dashboard.png';
import supportAgentSlack from '../assets/images/ai-support-agent/slack_escalation.png';
import supportAgentRagPipeline from '../assets/images/ai-support-agent/rag pipeline.png';

import rankspotter1 from '../assets/images/rankspotter 1.png';
import rankspotter2 from '../assets/images/rankspotter 2.png';

import arch1 from '../assets/images/arch1.jpeg';
import arch2 from '../assets/images/arch1.png';

import musicPlayerScreenshot from '../assets/images/python-music-player/screenshot.png';
import qloraResultsChart from '../assets/images/qlora/results-chart.png';

const projects = [
  {
    slug: 'instacann-cannabis-directory',
    title: 'InstaCann — Cannabis Discovery Directory',
    year: '2026',
    description: 'Live, production directory platform for discovering cannabis dispensaries, deals, and products — Next.js frontend with a FastAPI backend, deployed and serving real users at instacann.com.',
    tools: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Prometheus', 'Grafana'],
    status: 'Completed',
    images: [instacannHomepage, instacannFindDispensaries, instacannDispensariesNear, instacannSingleDispensary, instacannAdminListing, instacannNewListing],
    imageAlt: 'InstaCann homepage, dispensary search, listing detail, and business dashboard',
    links: [{ label: 'Live Site', href: 'https://instacann.com' }],
    summary: 'A production dispensary directory that lets people search cannabis businesses, deals, and products by location, with a tiered listing system (Free, Pro, Professional) for business owners. Live at instacann.com.',
    caseStudy: {
      problem: 'Cannabis consumers have no single trustworthy place to discover nearby dispensaries, current deals, and product availability, while dispensary owners lack an affordable way to get discovered online given the restrictions most ad platforms place on the industry.',
      solution: 'Built a decoupled directory platform with a Next.js/TypeScript frontend for fast, SEO-friendly browsing by city and state, and a FastAPI backend handling listings, search, and business data, backed by PostgreSQL with Redis caching. Business owners can claim and upgrade listings through Free, Pro, and Professional tiers for increased visibility. The full stack is containerized with Docker and monitored with Prometheus and Grafana.',
      impact: 'Runs in production today, serving real dispensary searches by location with daily-updated listings, and gives small cannabis businesses a dedicated discovery channel instead of relying on generic directories or restricted ad platforms.'
    },
    highlights: [
      'Live production platform at instacann.com',
      'Next.js + FastAPI directory with location-based search',
      'Tiered business listings (Free / Pro / Professional)'
    ],
  },
  {
    slug: 'made-multi-agent-decision-engine',
    title: 'MADE — Multi-Agent Decision Engine',
    year: '2026',
    description: 'In-progress multi-agent system orchestrating 5 specialist agents through a LangGraph state machine with crash recovery and human-in-the-loop gating.',
    tools: ['LangGraph', 'LangSmith', 'FastAPI', 'Next.js', 'Redis', 'ChromaDB', 'PostgreSQL', 'E2B Sandbox'],
    status: 'In Progress',
    images: [],
    imageAlt: 'Multi-agent decision engine architecture with specialist agents and consensus voting',
    github: 'https://github.com/Shahzaib30/Multi-Agent-Decision-Engine',
    summary: 'A multi-agent decision system under active development — 5 specialist agents (Research, Reasoning, Critic, Risk, Synthesizer) coordinated via a LangGraph state machine, being built in phases from agents through orchestration, consensus, infrastructure, observability, and finally the Next.js dashboard. Email me to get a demo of the current build.',
    caseStudy: {
      problem: 'Complex decision-making tasks like financial analysis and competitive intelligence require synthesizing multiple perspectives, weighing conflicting evidence, and escalating high-stakes calls to a human — something a single LLM call handles poorly and without auditability.',
      solution: 'Building a LangGraph state machine that coordinates 5 specialist agents running concurrently, with a custom consensus engine using structured debate protocols and confidence-weighted voting. The architecture layers in three-tier memory (Redis working memory, ChromaDB episodic, PostgreSQL decision store), an E2B sandbox and Tavily search as agent tools, human-in-the-loop Slack gating for high-risk decisions, and full observability via OpenTelemetry, Prometheus, and Grafana. Development follows 6 phases: agents, orchestration, consensus, infrastructure, platform, and the live-streaming frontend.',
      impact: 'The backend orchestration, consensus engine, and memory layers are implemented and runnable via docker-compose; the Next.js dashboard with live agent streaming is the current focus. Goal: auditable, multi-perspective decisions instead of single-shot LLM guesses, with automatic escalation when agent confidence is low.'
    },
    highlights: [
      '5-agent LangGraph state machine with crash recovery',
      'Confidence-weighted consensus engine with structured debate',
      'Three-tier memory and full OpenTelemetry/Prometheus/Grafana observability'
    ],
  },
  {
    slug: 'qlora-rag-hybrid-llm',
    title: 'QLoRA Fine-tuned LLM with RAG Hybrid Integration',
    year: '2026',
    description: 'In-progress benchmark of a QLoRA 4-bit fine-tuned Mistral-7B against a RAG-augmented hybrid configuration on 100k real doctor-patient conversations.',
    tools: ['Python', 'PyTorch', 'QLoRA', 'PEFT', 'TRL', 'Hugging Face', 'LangChain', 'ChromaDB', 'RAGAS', 'FastAPI'],
    status: 'In Progress',
    images: [qloraResultsChart],
    imageAlt: 'Benchmark chart comparing base, fine-tuned, and fine-tuned+RAG configurations on ROUGE-L, BERTScore, and latency',
    github: 'https://github.com/Shahzaib30/QLora-Rag-Chatbot',
    summary: 'Fine-tuned Mistral-7B-Instruct on 100k real doctor-patient conversations (ChatDoctor-HealthCareMagic-100k) using QLoRA 4-bit quantization, then built a benchmark harness comparing the base model, the fine-tuned model, and a fine-tuned+RAG hybrid on medical Q&A. Email me to get a demo.',
    caseStudy: {
      problem: 'Full fine-tuning of a 7B-parameter model is GPU-memory-prohibitive for most teams, and it is unclear upfront whether fine-tuning, retrieval-augmented generation, or a hybrid of both gives the best domain accuracy for a medical Q&A use case.',
      solution: 'Fine-tuned Mistral-7B-Instruct with QLoRA 4-bit quantization (rank 16, alpha 32), cutting GPU memory requirements by roughly 75% versus full fine-tuning and making it trainable on Kaggle\'s dual T4 GPUs. Built an evaluation harness (ROUGE-L, BERTScore, RAGAS, latency) comparing three configurations: the base model, the QLoRA fine-tuned model, and fine-tuned+hybrid BM25/dense RAG with a BGE reranker.',
      impact: 'Initial benchmarks show QLoRA fine-tuning alone delivers the largest jump in answer quality (ROUGE-L 0.135 → 0.188, BERTScore F1 0.835 → 0.852), while layering RAG on top added latency without a clear quality gain on this evaluation set — a concrete, measured answer to "fine-tune vs. RAG vs. both" rather than a guess. Benchmarking and the RAGAS faithfulness pass are still being extended.'
    },
    highlights: [
      '75% GPU memory reduction via QLoRA 4-bit quantization',
      'Controlled benchmark: base vs. fine-tuned vs. fine-tuned+RAG',
      'Fine-tuning alone gave the biggest measured accuracy gain so far'
    ],
  },
  {
    slug: 'enterprise-rag-lead-gen',
    title: 'Enterprise RAG System & Lead-Generation AI Agent',
    year: '2026',
    description: 'Autonomous RAG backend integrated with a portable micro-frontend chat widget and a real-time admin dashboard for leads, transcripts, and knowledge base control.',
    tools: ['FastAPI', 'LangGraph', 'LangChain', 'PostgreSQL', 'PgVector', 'Next.js', 'React'],
    status: 'Completed',
    images: [ragOverview, ragChat, ragDashboardLocked, ragKnowledgeBase, ragLeadManagement, ragLiveTranscripts],
    imageAlt: 'Enterprise RAG system chat widget and admin dashboard',
    github: 'https://github.com/Shahzaib30/advanced-rag-assistant',
    summary: 'A portable, cross-platform micro-frontend chat widget designed to inject seamlessly into third-party web environments (WordPress, React) via an asynchronous script snippet. You can see it implemented live on this portfolio — the chat widget at the bottom-right corner. Email me to get a live interactive sandbox demo.',
    caseStudy: {
      problem: 'Enterprise business portals experience severe conversion drop-offs due to traditional high-friction web forms. Concurrently, native AI integrations often suffer from context drift, state tracking failures over dynamic multi-turn sessions, security leaks of internal knowledge bases, and layout reflow bugs when executed inside third-party content management systems like WordPress.',
      solution: 'Architected a decoupled system featuring a sandboxed, vanilla asynchronous script micro-frontend that mounts onto a target application. The widget communicates with a stateful Python backend powered by LangGraph-routed RAG. Implemented structured intent routing to separate casual greetings from complex queries, dynamic context window management to preserve multi-turn history, and semantic RAG over a persistent, admin-editable knowledge base.',
      impact: 'Delivers a secure lead-generation widget that parses unstructured customer data, handles conversational state flawlessly, and generates automated session titles. Business owners get complete operational transparency via a token-authenticated admin console tracking PostgreSQL lead metrics, live transcripts, and knowledge-base uploads with zero layout interference on the host page.'
    },
    highlights: [
      'LangGraph-routed RAG pipeline with a persistent knowledge base',
      'Token-authenticated admin dashboard with live leads and transcripts',
      'Sandboxed JS widget with zero layout reflow impact',
    ],
  },
  {
    slug: 'ai-support-agent',
    title: 'AI Support Agent — Multi-Channel RAG with Human-in-the-Loop',
    year: '2026',
    description: 'Production-grade AI customer support system serving Web, Discord, WhatsApp, and Telegram from one channel-agnostic pipeline with hybrid RAG and Slack-based human escalation.',
    tools: ['FastAPI', 'FAISS', 'BM25', 'PostgreSQL', 'Redis', 'n8n', 'Next.js', 'Docker', 'Prometheus', 'Grafana'],
    status: 'Completed',
    images: [supportAgentUi, supportAgentDashboard, supportAgentDiscord, supportAgentGrafana, supportAgentSlack, supportAgentRagPipeline],
    imageAlt: 'AI support agent chat UI, admin dashboard, Discord bot, Grafana metrics, Slack escalation, and RAG pipeline',
    github: 'https://github.com/Shahzaib30/ai-support-agent',
    links: [{ label: 'Watch Demo', href: 'https://youtu.be/OLsJ4h6FXnM?si=YQyzQk7WxpNimjY7' }],
    summary: 'A channel-agnostic AI support pipeline that answers customers on Web, Discord, WhatsApp, and Telegram using hybrid RAG (FAISS dense + BM25 sparse, RRF-fused, cross-encoder reranked), and automatically escalates low-confidence or frustrated conversations to a human over Slack. Email me to get a demo.',
    caseStudy: {
      problem: 'Support bots that only do single-pass vector search miss exact keyword matches, and most have no safety net — they keep answering confidently even when the customer is frustrated or the retrieval confidence is low, with no path back to a human.',
      solution: 'Built a single core.agent pipeline consumed by four channel connectors (Web, Discord, WhatsApp, Telegram), each normalizing its payload into one shared message shape. Retrieval runs a 4-stage pipeline: query condensation, parallel dense (FAISS) and sparse (BM25) search fused via Reciprocal Rank Fusion, then cross-encoder reranking before generation. An explicit conversation-state machine (ai_active → human_pending → human_active → resolved) escalates to a Slack thread on explicit request, three consecutive negative-sentiment messages, or low retrieval confidence, and relays the agent reply back to the original channel via n8n.',
      impact: 'Delivers grounded answers instead of hallucinated ones, with webhook idempotency, Redis-cached responses, and full Prometheus/Grafana observability across 8 containerized services — turning a typical black-box chatbot into an auditable, human-backed support system.'
    },
    highlights: [
      'Hybrid FAISS + BM25 retrieval with RRF fusion and cross-encoder reranking',
      'Explicit state machine with Slack human-in-the-loop escalation',
      'One agent, four channels — Web, Discord, WhatsApp, Telegram'
    ],
  },
  {
    slug: 'tavi-planning-system',
    title: 'TAVI-Net — AI Pre-Operative Planning for TAVI',
    year: '2026',
    description: 'Uploads a cardiac CT scan and returns an automatic 3D segmentation, annulus/valve measurements, and an LLM-assisted review — research/educational, not a certified medical device.',
    tools: ['PyTorch', 'MONAI', '3D U-Net', 'React Three Fiber', 'Ollama', 'FastAPI', 'Docker'],
    status: 'Completed',
    images: [tavi1, tavi2, tavi3, tavi4, tavi5, tavi6],
    imageAlt: 'TAVI-Net landing page, interactive 3D segmentation viewer, and analysis results',
    github: 'https://github.com/Shahzaib30/tavi-planning-system',
    summary: 'Upload a raw cardiac CT volume (.nii.gz) and TAVI-Net segments the aorta, aortic root, valve, left ventricle, and annulus with a 3D U-Net trained on MONAI, reconstructs an interactive 3D mesh viewable in the browser, and produces an LLM-assisted clinical summary via a local Ollama model. Research/educational project — not for clinical use. Email me to request a demo video.',
    caseStudy: {
      problem: 'Surgical preparation teams spend hours manually isolating anatomical boundaries across hundreds of CT slices for TAVI candidates — a manual process with high human-error risk, subjective geometric variation, and alignment discrepancies when sizing prosthetic valves.',
      solution: 'Built a 3D U-Net (MONAI) trained on the TAVRP-PL dataset (578 CT scans derived from TotalSegmentator) to segment 8 anatomical classes, then measures annulus diameter and screens for aortic stenosis from the resulting mask. Segmentations are reconstructed into a lightweight .glb mesh rendered with an interactive React Three Fiber viewer — rotate, zoom, and inspect directly in the browser. A local Ollama model (phi3:mini) turns the raw measurements into a clinician-readable review, with a deterministic rule-based fallback if the LLM is unavailable. The API contract is typed with Pydantic and covered by a pytest suite; the whole stack ships via Docker Compose.',
      impact: 'Reaches a mean Dice of 0.849 across five structures on held-out test scans (aorta 0.944, left ventricle 0.918), with the large structures segmenting very well and the smaller valve/annulus structures — which cover only a few hundred voxels — scoring lower, as expected. Turns a multi-hour manual measurement workflow into an upload-and-review loop, with the LLM review giving surgeons a readable summary alongside the raw numbers.'
    },
    highlights: [
      '3D U-Net (MONAI) segmentation — mean Dice 0.849 across 5 structures',
      'Interactive React Three Fiber 3D viewer for the segmented mesh',
      'Local LLM (Ollama) clinical review with a deterministic fallback'
    ],
  },
  {
    slug: 'rankspotter-serp-tracker',
    title: 'RankSpotter – Real-time SERP Tracker',
    year: '2025',
    description: 'Production-grade keyword rank monitoring infrastructure featuring scalable asynchronous data pipelines and React control surfaces — live at rankspotter.com.',
    tools: ['React', 'Flask', 'PostgreSQL', 'Scraping Engines', 'Supabase'],
    status: 'Completed',
    images: [rankspotter1, rankspotter2],
    imageAlt: 'Analytics interface charting localized search visibility indexes and position deltas',
    links: [{ label: 'Live Site', href: 'https://rankspotter.com' }],
    summary: 'Continuous rank analytics stack with automated volatility alert mechanics, contextual competitor maps, and immutable tracking proof captures. Live at rankspotter.com — email me to get a demo of the full dashboard.',
    caseStudy: {
      problem: 'Search engine optimization teams struggle to establish clear visibility adjustments due to slow manual tracking processes, silent algorithmic search placement adjustments, and extensive proxy connection throttling limits. Traditional scraping architectures frequently drop performance when handling complex dynamic web elements and anti-bot data verification locks.',
      solution: 'Engineered an always-on keyword rank monitoring ecosystem driven by a highly scalable, asynchronous Flask data pipeline backend. Configured a distributed scraping worker pool managing headless Chromium microservices across rotating proxy networks to capture pixel-perfect search engine results pages (SERPs). Integrated multi-tenant role-based access control (RBAC) via Supabase Auth and coupled it with an automated PostgreSQL storage loop tracking layout variations.',
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
    images: [],
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
    slug: 'arch-ai-setup',
    title: 'Arch AI Setup (Hyprland & Dotfiles)',
    year: '2026',
    description: 'Arch Linux AI setup with Hyprland, custom dotfiles, and lightweight QML widgets for an optimized workstation environment.',
    tools: ['Linux', 'Hyprland', 'QML', 'Shell Scripting'],
    status: 'Public',
    images: [arch1, arch2],
    imageAlt: 'Arch Linux Hyprland desktop and dotfiles repository preview',
    github: 'https://github.com/Shahzaib30/arch-ai-setup',
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
    tools: ['Python', 'CustomTkinter', 'Pygame'],
    status: 'Completed',
    images: [musicPlayerScreenshot],
    imageAlt: 'Desktop music player interface with playback controls and playlist',
    github: 'https://github.com/Shahzaib30/music-player-in-python-Gui',
    summary: 'A clean, beginner-friendly standalone desktop music player built with Python, CustomTkinter, and Pygame — folder-based library loading with play, pause, next, and previous controls. Email me to get a demo.',
    caseStudy: {
      problem: 'Mainstream content streaming engines introduce massive framework application bloat, rely on continuous internet connectivity, and lack simple, hackable playback tools for people who just want to point an app at a folder of local MP3s.',
      solution: 'Developed a responsive desktop media player using Python, CustomTkinter for a modern-looking UI, and Pygame for audio playback. The app loads an entire folder of MP3s, lets the user double-click or select-and-play a track, and move between tracks with Next/Previous — with a graceful fallback to text buttons if icon assets are missing.',
      impact: 'A lightweight, zero-network desktop application that plays local music libraries instantly with a clean, modern interface, built as an approachable example of a complete Python desktop app for beginners.'
    }
  },
  {
    slug: 'wordpress-custom-websites',
    title: 'Custom WordPress Websites & SEO',
    year: '2026',
    description: 'Custom WordPress website builds for real clients — ABA therapy providers, home care, legal, and travel — focused on performance, modern layouts, and SEO structure.',
    tools: ['WordPress', 'Elementor', 'SEO', 'UI Design', 'Performance'],
    status: 'Public',
    image: wordpressBestMaineVacation,
    images: [wordpressBestMaineVacation, wordpressLittleAchievers, wordpressAlberLegal, wordpressAchieversAba, wordpressBluebellAba, wordpressAttendHc],
    imageAlt: 'Custom WordPress client website homepages',
    links: [
      { label: 'Best Maine Vacation', href: 'https://bestmainevacation.com' },
      { label: 'Little Achievers ABA', href: 'https://littleachieversaba.com' },
      { label: 'Alber Legal', href: 'https://alberlegal.com' },
      { label: 'Achievers ABA Therapy', href: 'https://achieversaba.com' },
      { label: 'Bluebell ABA', href: 'https://bluebellaba.com' },
      { label: 'Attend HomeCare', href: 'https://attendhc.com' },
    ],
    summary: 'A portfolio of custom WordPress builds for real clients — including Bluebell ABA, Little Achievers, Achievers ABA Therapy, The Alber Firm (legal), Attend HomeCare, and Best Maine Vacation (travel) — designed to look clean, load fast, and give business owners an easy editing experience without needing technical knowledge. I handle the visual direction, spacing, sections, and content presentation so each site feels modern and professional while still being easy for the client to manage after launch.',
    caseStudy: {
      problem: 'Many WordPress websites are built quickly with generic templates, weak visual hierarchy, and poor page performance, which makes it hard for businesses to stand out or convert visitors. Clients often struggle with editing content later because the structure is too messy or overly technical.',
      solution: 'Designed and customized WordPress websites across healthcare (ABA therapy), legal, home care, and travel niches, with a cleaner layout system, responsive section structure, and client-friendly editing flow. I focused on balancing design quality with practical maintainability so each site can be updated easily without breaking the layout, emphasizing reusable sections, strong typography, and SEO-aware organization.',
      impact: 'The result is a set of live client websites that feel more professional, load more smoothly, and are easier for non-technical clients to manage — giving each business a stronger online presence and a site structure that supports growth instead of getting in the way.'
    },
    highlights: [
      'Live client sites across healthcare, legal, and travel niches',
      'SEO-aware structure and responsive design',
      'Fast editing workflow for non-technical users'
    ]
  }
];

export default projects;
