import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { Send, MessageCircle, X } from "lucide-react";
import "../styles/chat-widget.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef(null);
  const eventSourceRef = useRef(null);
  const hasMessages = messages.length > 0;

  // Initialize session ID on mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem("chat_session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("chat_session_id", newSessionId);
      setSessionId(newSessionId);
    }

    // Load chat history
    const storedMessages = localStorage.getItem("chat_messages");
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (e) {
        console.error("Failed to load chat history:", e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || !sessionId) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage, id: Date.now() }]);
    setLoading(true);

    try {
      // Close previous event source if it exists
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let assistantMessage = "";
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const messageId = Date.now();
      setMessages((prev) => [...prev, { role: "assistant", content: "", id: messageId, streaming: true }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                assistantMessage += data.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastMsg = updated[updated.length - 1];
                  if (lastMsg.id === messageId) {
                    lastMsg.content = assistantMessage;
                  }
                  return updated;
                });
              }
              if (data.done) {
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastMsg = updated[updated.length - 1];
                  if (lastMsg.id === messageId) {
                    lastMsg.streaming = false;
                  }
                  return updated;
                });
              }
            } catch (e) {
              // Ignore JSON parse errors from incomplete data
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't process your message. Please try again.",
          id: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, sessionId]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(100,155,118,0.96),rgba(20,184,166,0.9))] text-[#071018] shadow-[0_18px_50px_rgba(100,255,218,0.24)] transition-shadow hover:shadow-[0_22px_65px_rgba(100,255,218,0.32)]"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 flex h-[78vh] max-h-[720px] w-[min(92vw,28rem)] flex-col overflow-hidden rounded-[1.85rem] border border-white/10  shadow-[0_30px_90px_rgba(0,0,0,0.58)] backdrop-blur-3xl"
          >
            <div className="pointer-events-none absolute inset-0 transparent_35%)]" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(100,255,218,0.2),rgba(96,165,250,0.18))] text-cyan-200 shadow-[0_12px_28px_rgba(100,255,218,0.08)]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold tracking-wide text-white">Chat with AI</h3>
                  <p className="text-xs text-white/45">Portfolio assistant • RAG powered</p>
                </div>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/55 transition hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Messages Container */}
            <div className="chat-widget-scroll relative z-10 flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
              {!hasMessages ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[calc(78vh-11rem)] flex-col items-center justify-center px-3 text-center"
                >
                  <div className="mb-4 rounded-full border border-cyan-300/15 bg-[radial-gradient(circle,rgb(81,195,172),rgb(81,195,172))] p-4 shadow-[0_0_40px_rgba(100,255,218,0.08)]">
                    <MessageCircle className="h-8 w-8 text-cyan-200" />
                  </div>
                  <h4 className="mb-2 text-lg font-medium tracking-wide text-white">Start a conversation</h4>
                  <p className="max-w-xs text-sm leading-6 text-white/48">Ask about my work, services, AI projects, or portfolio details.</p>
                </motion.div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[1.15rem] px-4 py-3 text-sm leading-7 shadow-[0_12px_30px_rgba(0,0,0,0.18)] ${
                        message.role === "user"
                          ? "rounded-br-sm border border-cyan-300/15 bg-[linear-gradient(135deg,rgb(81,195,172))] text-[#061018]"
                          : "rounded-bl-sm border border-white/10 bg-white/[0.05] text-white/88 backdrop-blur-xl"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <div className="chat-markdown">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        message.content
                      )}
                      {message.streaming && (
                        <span className="inline-flex items-center gap-1 align-middle ml-2 chat-typing-inline">
                          <span className="chat-typing-dot" />
                          <span className="chat-typing-dot chat-typing-dot-delay-1" />
                          <span className="chat-typing-dot chat-typing-dot-delay-2" />
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="relative z-10 border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-3 backdrop-blur-xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/32 outline-none transition focus:border-cyan-300/35 focus:bg-white/[0.08] disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  className="flex items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgb(81,195,172))] px-4 text-[#07131d] transition disabled:opacity-90"
                  aria-label="Send message"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-1 chat-send-loading" aria-label="Assistant is responding">
                      <span className="chat-typing-dot chat-typing-dot-dark" />
                      <span className="chat-typing-dot chat-typing-dot-dark chat-typing-dot-delay-1" />
                      <span className="chat-typing-dot chat-typing-dot-dark chat-typing-dot-delay-2" />
                    </span>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
