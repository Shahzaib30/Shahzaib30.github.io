/// <reference types="vite/client" />
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Archive,
  ArrowUpRight,
  BarChart3,
  FileUp,
  Layers3,
  LayoutDashboard,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";
const STORAGE_KEY = "adminToken";

type ViewKey = "overview" | "leads" | "transcripts" | "knowledge";

type LeadRow = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type TranscriptRow = {
  id: number;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
};

type ChatSessionRow = {
  session_id: string;
  session_title: string | null;
  summary: string | null;
  message_count: number;
  created_at: string | null;
  last_activity: string | null;
};

type KnowledgeBaseDocument = {
  id: number;
  original_name: string;
  stored_name: string;
  file_path: string;
  file_type: string;
  created_at: string | null;
  source?: string;
  size?: number;
  can_delete?: boolean;
};

type Metrics = {
  lead_count: number;
  transcript_count: number;
  active_sessions: number;
  knowledge_base_documents: number;
  messages_today: number;
  latest_activity: string | null;
  default_knowledge_base_document?: number;
};

const navItems: Array<{ key: ViewKey; label: string; icon: typeof LayoutDashboard }> = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "leads", label: "Lead management", icon: Users },
  { key: "transcripts", label: "Live transcripts", icon: MessageSquareText },
  { key: "knowledge", label: "Knowledge base", icon: Archive },
];

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<ViewKey>("overview");
  const [adminToken, setAdminToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [metrics, setMetrics] = useState<Metrics>({
    lead_count: 0,
    transcript_count: 0,
    active_sessions: 0,
    knowledge_base_documents: 0,
    messages_today: 0,
    latest_activity: null,
  });
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [transcripts, setTranscripts] = useState<TranscriptRow[]>([]);
  const [sessions, setSessions] = useState<ChatSessionRow[]>([]);
  const [documents, setDocuments] = useState<KnowledgeBaseDocument[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const latestLead = leads[0];
  const latestTranscript = transcripts[0];
  const latestSession = sessions[0];

  const loadDashboard = useCallback(async (tokenToUse: string) => {
    if (!tokenToUse) {
      return;
    }

    setLoading(true);
    setErrorText("");

    try {
      const [metricsResponse, leadsResponse, transcriptsResponse, sessionsResponse, knowledgeBaseResponse] = await Promise.all([
        fetch(`${BACKEND_URL}/admin/metrics`, {
          headers: { "X-Admin-Token": tokenToUse },
        }),
        fetch(`${BACKEND_URL}/admin/leads`, {
          headers: { "X-Admin-Token": tokenToUse },
        }),
        fetch(`${BACKEND_URL}/admin/transcripts`, {
          headers: { "X-Admin-Token": tokenToUse },
        }),
        fetch(`${BACKEND_URL}/admin/sessions`, {
          headers: { "X-Admin-Token": tokenToUse },
        }),
        fetch(`${BACKEND_URL}/admin/knowledge-base`, {
          headers: { "X-Admin-Token": tokenToUse },
        }),
      ]);

      if (metricsResponse.status === 403 || leadsResponse.status === 403 || transcriptsResponse.status === 403 || sessionsResponse.status === 403 || knowledgeBaseResponse.status === 403) {
        throw new Error("Invalid admin token.");
      }

      if (!metricsResponse.ok || !leadsResponse.ok || !transcriptsResponse.ok || !sessionsResponse.ok || !knowledgeBaseResponse.ok) {
        throw new Error("The dashboard data could not be loaded.");
      }

      const metricsData = (await metricsResponse.json()) as Metrics;
      const leadsData = (await leadsResponse.json()) as { leads: LeadRow[] };
      const transcriptsData = (await transcriptsResponse.json()) as { transcripts: TranscriptRow[] };
      const sessionsData = (await sessionsResponse.json()) as { sessions: ChatSessionRow[] };
      const knowledgeBaseData = (await knowledgeBaseResponse.json()) as { documents: KnowledgeBaseDocument[] };

      setMetrics(metricsData);
      setLeads(leadsData.leads ?? []);
      setTranscripts(transcriptsData.transcripts ?? []);
      setSessions(sessionsData.sessions ?? []);
      setDocuments(knowledgeBaseData.documents ?? []);
    } catch (error) {
      const message = error instanceof Error ? error.message : "The dashboard could not be loaded.";
      setErrorText(message);
      setAdminToken("");
      setTokenInput("");
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedToken = localStorage.getItem(STORAGE_KEY) ?? "";
      if (!storedToken) {
        return;
      }

      setAdminToken(storedToken);
      setTokenInput(storedToken);
      void loadDashboard(storedToken);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadDashboard]);

  useEffect(() => {
    if (!adminToken) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void loadDashboard(adminToken);
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, [adminToken, loadDashboard]);

  const apiFetch = async (path: string, options: RequestInit = {}) => {
    return fetch(`${BACKEND_URL}${path}`, {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        "X-Admin-Token": adminToken,
      },
    });
  };

  const unlockDashboard = async () => {
    const trimmedToken = tokenInput.trim();
    if (!trimmedToken) {
      setErrorText("Enter the admin token to continue.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, trimmedToken);
    setAdminToken(trimmedToken);
    setTokenInput(trimmedToken);
    await loadDashboard(trimmedToken);
  };

  const refreshDashboard = async () => {
    if (!adminToken) {
      return;
    }
    await loadDashboard(adminToken);
  };

  const deleteLead = async (leadId: number) => {
    const response = await apiFetch(`/admin/leads/${leadId}`, { method: "DELETE" });
    if (!response.ok) {
      setErrorText("The lead could not be deleted.");
      return;
    }
    await refreshDashboard();
  };

  const uploadKnowledgeBaseFile = async () => {
    if (!uploadFile) {
      setErrorText("Choose a .txt, .md, or .pdf file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);

    const response = await apiFetch("/admin/knowledge-base/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setErrorText(payload.detail ?? "The document could not be uploaded.");
      return;
    }

    setUploadFile(null);
    await refreshDashboard();
  };

  const deleteKnowledgeBaseDocument = async (documentId: number) => {
    const response = await apiFetch(`/admin/knowledge-base/${documentId}`, { method: "DELETE" });
    if (!response.ok) {
      setErrorText("The document could not be deleted.");
      return;
    }
    await refreshDashboard();
  };

  const overviewCards = [
    { label: "Leads", value: metrics.lead_count, icon: Users },
    { label: "Transcripts", value: metrics.transcript_count, icon: MessageSquareText },
    { label: "Active sessions", value: metrics.active_sessions, icon: BarChart3 },
    { label: "KB documents", value: metrics.knowledge_base_documents, icon: Archive },
  ];

  const visibleDocuments = documents;

  const formatTimestamp = (value: string | null | undefined) => {
    if (!value) {
      return "-";
    }

    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) {
      return value;
    }

    return `${parsedDate.toISOString().replace("T", " ").slice(0, 16)} UTC`;
  };

  const formatSessionTitle = (session: ChatSessionRow | undefined) => {
    if (!session) {
      return "No sessions yet";
    }

    return session.session_title?.trim() || `Conversation ${session.session_id.slice(0, 8)}`;
  };

  if (!adminToken) {
    return (
      <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#07070b] text-white">
        <div className="absolute inset-0 " />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.6)] backdrop-blur-3xl md:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-black">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">Admin access</p>
                <h1 className="text-2xl font-semibold text-white">Unlock the dashboard</h1>
              </div>
            </div>

            <p className="mb-6 text-sm leading-7 text-white/55">
              This page is protected by the admin token and exposes lead management, live transcripts, analytics, and knowledge-base controls.
            </p>

            <div className="space-y-3">
              <input
                value={tokenInput}
                onChange={(event) => setTokenInput(event.target.value)}
                type="password"
                placeholder="Enter admin token"
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-400/40"
              />
              <button
                type="button"
                onClick={() => void unlockDashboard()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]"
              >
                <ShieldCheck className="h-4 w-4" />
                Unlock dashboard
              </button>
            </div>

            {errorText ? <p className="mt-4 text-sm text-rose-300">{errorText}</p> : null}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#07070b] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(77,124,255,0.28),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(236,72,153,0.18),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.10),_transparent_38%),linear-gradient(180deg,_#09090f_0%,_#050509_100%)]" />
      <div className="absolute left-[-8rem] top-16 h-72 w-72 rounded-full bg-cyan-400/18 blur-3xl" />
      <div className="absolute right-[-6rem] top-32 h-80 w-80 rounded-full bg-fuchsia-500/16 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1700px] flex-col gap-3 p-3 md:gap-5 md:p-6 lg:flex-row">
        <aside className="hidden w-[290px] shrink-0 flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_35px_90px_rgba(0,0,0,0.55)] backdrop-blur-3xl lg:flex">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-black shadow-[0_20px_40px_rgba(34,211,238,0.16)]">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">Admin console</p>
                <h2 className="text-lg font-semibold text-white">Operations dashboard</h2>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveView(item.key)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      isActive
                        ? "border-cyan-400/30 bg-white/10 text-white shadow-[0_18px_40px_rgba(34,211,238,0.08)]"
                        : "border-white/10 bg-white/5 text-white/65 hover:border-white/20 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
              <div className="mb-3 flex items-center gap-2 text-white/80">
                <RefreshCw className="h-4 w-4 text-cyan-300" />
                Live connection
              </div>
              <p className="text-sm leading-7 text-white/55">
                Every panel is driven by the backend so the dashboard reflects leads, transcripts, and KB files in real time.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void refreshDashboard()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh data
          </button>
        </aside>

        <main className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.05] shadow-[0_40px_120px_rgba(0,0,0,0.62)] backdrop-blur-3xl sm:rounded-[2rem] lg:rounded-[2.25rem]">
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:gap-4 sm:px-5 md:px-8"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">Admin dashboard</p>
              <h1 className="mt-1 text-lg font-semibold leading-tight text-white sm:text-xl md:text-2xl lg:text-3xl">Lead management, transcripts, analytics, and KB control</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => void refreshDashboard()}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </button>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                  setAdminToken("");
                  setTokenInput("");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Lock
              </button>
            </div>
          </motion.header>

          <div className="border-b border-white/10 px-3 py-3 lg:hidden sm:px-4">
            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveView(item.key)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs transition ${
                      isActive
                        ? "border-cyan-400/30 bg-white/10 text-white"
                        : "border-white/10 bg-white/5 text-white/65"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-6">
            {loading ? <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">Loading dashboard data...</div> : null}
            {errorText ? <div className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{errorText}</div> : null}

            {activeView === "overview" ? (
              <div className="min-h-0 space-y-6 overflow-y-auto pr-1">
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {overviewCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
                      >
                        <div className="mb-4 flex items-center justify-between text-white/65">
                          <span className="text-sm">{card.label}</span>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-3xl font-semibold text-white">{card.value}</div>
                      </motion.div>
                    );
                  })}
                </section>

                <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
                  <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/35">Performance metrics</p>
                        <h2 className="mt-1 text-xl font-semibold text-white">System activity</h2>
                      </div>
                      <BarChart3 className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div className="space-y-4 text-sm text-white/65">
                      <div className="flex items-center justify-between">
                        <span>Messages today</span>
                        <span className="font-medium text-white">{metrics.messages_today}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400"
                          style={{ width: `${Math.min(100, metrics.messages_today * 6 + 18)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Response coverage</span>
                        <span className="font-medium text-white">{metrics.transcript_count ? Math.min(100, Math.round((metrics.active_sessions / Math.max(metrics.transcript_count, 1)) * 100)) : 0}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                          style={{ width: `${metrics.transcript_count ? Math.min(100, Math.round((metrics.active_sessions / Math.max(metrics.transcript_count, 1)) * 100)) : 0}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Knowledge base docs</span>
                        <span className="font-medium text-white">{metrics.knowledge_base_documents}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/35">Latest activity</p>
                        <h2 className="mt-1 text-xl font-semibold text-white">Freshest records</h2>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-fuchsia-300" />
                    </div>
                    <div className="space-y-4 text-sm text-white/68">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-white/40">Latest lead</p>
                        <p className="mt-1 font-medium text-white">{latestLead ? latestLead.name : "No leads yet"}</p>
                        <p className="mt-1 text-white/55">{latestLead ? latestLead.email : "Lead table is empty."}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-white/40">Latest transcript</p>
                        <p className="mt-1 font-medium text-white">{formatSessionTitle(latestSession)}</p>
                        <p className="mt-1 line-clamp-3 text-white/55">{latestTranscript ? latestTranscript.content : "Conversation logs will appear here as users chat."}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-white/40">Latest KB update</p>
                        <p className="mt-1 font-medium text-white">{visibleDocuments[0]?.original_name ?? "business_info.txt"}</p>
                        <p className="mt-1 text-white/55">{formatTimestamp(metrics.latest_activity) ?? "Waiting for backend activity."}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : null}

            {activeView === "leads" ? (
              <section className="min-h-0 flex-1 rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">Lead management</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">Captured contacts</h2>
                  </div>
                  <Users className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="min-h-0 overflow-hidden rounded-[1.5rem] border border-white/10">
                  <div className="max-h-[calc(100dvh-18rem)] overflow-auto">
                    <table className="min-w-[760px] divide-y divide-white/10 text-left text-sm">
                      <thead className="bg-white/5 text-white/45">
                        <tr>
                          <th className="px-4 py-3 font-medium">Name</th>
                          <th className="px-4 py-3 font-medium">Email</th>
                          <th className="px-4 py-3 font-medium">Message</th>
                          <th className="px-4 py-3 font-medium">Created</th>
                          <th className="px-4 py-3 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {leads.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-white/45">
                              No leads captured yet.
                            </td>
                          </tr>
                        ) : (
                          leads.map((lead) => (
                            <tr key={lead.id} className="bg-white/[0.02] hover:bg-white/[0.04]">
                              <td className="px-4 py-4 font-medium text-white">{lead.name}</td>
                              <td className="px-4 py-4 text-white/65">{lead.email}</td>
                              <td className="px-4 py-4 text-white/55">
                                <span className="block max-w-xl truncate">{lead.message}</span>
                              </td>
                              <td className="px-4 py-4 text-white/50">{formatTimestamp(lead.created_at)}</td>
                              <td className="px-4 py-4">
                                <button
                                  type="button"
                                  onClick={() => void deleteLead(lead.id)}
                                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/65 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-200"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            ) : null}

            {activeView === "transcripts" ? (
              <section className="min-h-0 flex-1 rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">Live chat transcripts</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">Recent conversation logs</h2>
                  </div>
                  <MessageSquareText className="h-5 w-5 text-fuchsia-300" />
                </div>
                <div className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {sessions.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/45 md:col-span-2 xl:col-span-3">
                      No sessions yet.
                    </div>
                  ) : (
                    sessions.map((session) => (
                      <div key={session.session_id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-medium text-white">{formatSessionTitle(session)}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/35">{session.message_count} messages</p>
                        <p className="mt-1 text-xs text-white/50">{formatTimestamp(session.last_activity)}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="min-h-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
                  <div className="max-h-[calc(100dvh-16rem)] overflow-y-auto p-4 md:p-5">
                    <div className="grid gap-4 lg:grid-cols-2">
                  {transcripts.length === 0 ? (
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-white/45 lg:col-span-2">
                      No transcript entries yet.
                    </div>
                  ) : (
                    transcripts.map((transcript) => (
                      <article key={transcript.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">Session</p>
                            <h3 className="mt-1 text-sm font-semibold text-white">{formatSessionTitle(sessions.find((session) => session.session_id === transcript.session_id))}</h3>
                            <p className="mt-1 text-[11px] text-white/40">{transcript.session_id.slice(0, 12)}</p>
                          </div>
                          <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.25em] ${transcript.role === "assistant" ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200" : "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200"}`}>
                            {transcript.role}
                          </span>
                        </div>
                        <p className="line-clamp-5 whitespace-pre-wrap text-sm leading-7 text-white/65">{transcript.content}</p>
                        <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-white/30">{formatTimestamp(transcript.created_at)}</p>
                      </article>
                    ))
                  )}
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {activeView === "knowledge" ? (
              <section className="min-h-0 space-y-5 overflow-y-auto pr-1">
                <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
                  <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/35">Knowledge base management</p>
                        <h2 className="mt-1 text-xl font-semibold text-white">Upload new sources</h2>
                      </div>
                      <FileUp className="h-5 w-5 text-emerald-300" />
                    </div>

                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 px-4 py-10 text-center transition hover:border-cyan-400/35 hover:bg-white/8">
                      <input
                        type="file"
                        accept=".txt,.md,.pdf"
                        className="hidden"
                        onChange={(event) => setUploadFile(event.target.files?.[0] ?? null)}
                      />
                      <Archive className="mb-3 h-8 w-8 text-cyan-300" />
                      <p className="text-sm font-medium text-white">Drop a PDF or text file here</p>
                      <p className="mt-2 text-xs text-white/45">Upload a new doc to refresh the assistant knowledge base.</p>
                    </label>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
                      <p className="text-white/85">Selected file</p>
                      <p className="mt-1 truncate">{uploadFile ? uploadFile.name : "No file selected"}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => void uploadKnowledgeBaseFile()}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]"
                    >
                      <FileUp className="h-4 w-4" />
                      Upload and refresh
                    </button>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/35">Knowledge base files</p>
                        <h2 className="mt-1 text-xl font-semibold text-white">Current documents</h2>
                      </div>
                      <Layers3 className="h-5 w-5 text-fuchsia-300" />
                    </div>

                    <div className="space-y-3">
                      {visibleDocuments.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/45">
                          No documents loaded yet.
                        </div>
                      ) : (
                        visibleDocuments.map((document) => (
                          <div key={`${document.id}-${document.original_name}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-medium text-white">{document.original_name}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/35">{document.file_type}</p>
                                <p className="mt-2 text-sm text-white/55">{document.source === "default" ? "Default knowledge base file." : "Uploaded file."}</p>
                              </div>
                              {document.can_delete ? (
                                <button
                                  type="button"
                                  onClick={() => void deleteKnowledgeBaseDocument(document.id)}
                                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/65 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-200"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Delete
                                </button>
                              ) : (
                                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200">Protected</span>
                              )}
                            </div>
                            <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-white/30">
                              {document.size ? `${Math.round(document.size / 1024)} KB` : "Size unavailable"}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}