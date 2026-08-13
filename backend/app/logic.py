import os
import re
from pathlib import Path
from typing import Annotated, List, TypedDict
from langchain_community.document_loaders import TextLoader
from langchain_community.retrievers import BM25Retriever
from langchain_core.documents import Document
from langchain_core.messages import AIMessage, BaseMessage, HumanMessage
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_openai import ChatOpenAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, StateGraph
from langgraph.graph.message import add_messages

try:
    from pypdf import PdfReader
except Exception:  # pragma: no cover - optional dependency guard
    PdfReader = None

from .database import save_lead
class GraphState(TypedDict, total=False):
    messages: Annotated[List[BaseMessage], add_messages]
    context: str
    retrieved_docs: List[Document]
    route: str
    next_route: str
    lead_saved: bool
    lead_name: str
    lead_email: str

BASE_DIR = Path(__file__).resolve().parent
DOCS_PATH = BASE_DIR / "docs" / "business_info.txt"
UPLOADS_PATH = BASE_DIR / "knowledge_base_uploads"
VECTOR_DB_PATH = BASE_DIR / "vector_db"

Embedding_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
LLM_MODEL = "deepseek-chat"
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
DEEPSEEK_BASE_URL = "https://api.deepseek.com"

embeddings = HuggingFaceEmbeddings(model_name=Embedding_MODEL)
def _create_vectorstore() -> Chroma:
    return Chroma(
        collection_name="customer_support_kb",
        embedding_function=embeddings,
        persist_directory=str(VECTOR_DB_PATH),
    )


vectorstore = _create_vectorstore()

llm = ChatOpenAI(model=LLM_MODEL, api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)

bm25_retriever: BM25Retriever | None = None
knowledge_base_docs: list[Document] = []


def _allowed_knowledge_base_file(path: Path) -> bool:
    return path.suffix.lower() in {".txt", ".md", ".pdf"}


def _load_pdf_documents(path: Path) -> list[Document]:
    if PdfReader is None:
        raise RuntimeError("PDF support is unavailable. Install the pypdf package.")

    reader = PdfReader(str(path))
    documents: list[Document] = []
    for page_number, page in enumerate(reader.pages, start=1):
        page_content = page.extract_text() or ""
        if page_content.strip():
            documents.append(
                Document(
                    page_content=page_content,
                    metadata={
                        "source": str(path),
                        "file_name": path.name,
                        "file_type": path.suffix.lower().lstrip("."),
                        "page": page_number,
                    },
                )
            )
    return documents


def _load_text_documents(path: Path) -> list[Document]:
    loader = TextLoader(str(path), encoding="utf-8")
    documents = loader.load()
    for document in documents:
        document.metadata.update(
            {
                "source": str(path),
                "file_name": path.name,
                "file_type": path.suffix.lower().lstrip("."),
            }
        )
    return documents


def _load_source_documents(path: Path) -> list[Document]:
    if not path.exists() or not path.is_file() or not _allowed_knowledge_base_file(path):
        return []

    if path.suffix.lower() == ".pdf":
        return _load_pdf_documents(path)
    return _load_text_documents(path)


def _discover_knowledge_base_sources() -> list[Path]:
    sources: list[Path] = [DOCS_PATH]
    if UPLOADS_PATH.exists():
        sources.extend(sorted(path for path in UPLOADS_PATH.iterdir() if path.is_file()))
    return sources


def _reset_vectorstore_with_documents(documents: list[Document]) -> None:
    global vectorstore

    vectorstore = _create_vectorstore()
    try:
        existing_ids = vectorstore.get().get("ids", [])
        if existing_ids:
            vectorstore.delete(ids=existing_ids)
    except Exception:
        pass

    if documents:
        vectorstore.add_documents(documents)


def refresh_knowledge_base() -> None:
    """Reload the retrievers and vector store from the default docs and uploaded files."""

    global bm25_retriever, knowledge_base_docs

    UPLOADS_PATH.mkdir(parents=True, exist_ok=True)

    source_documents: list[Document] = []
    for source_path in _discover_knowledge_base_sources():
        source_documents.extend(_load_source_documents(source_path))

    if not source_documents:
        knowledge_base_docs = []
        bm25_retriever = None
        _reset_vectorstore_with_documents([])
        return

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    splits = text_splitter.split_documents(source_documents)
    knowledge_base_docs = splits
    _reset_vectorstore_with_documents(splits)

    bm25_retriever = BM25Retriever.from_documents(splits)
    bm25_retriever.k = 4

BUSINESS_KEYWORDS = {
    "service",
    "services",
    "price",
    "pricing",
    "package",
    "packages",
    "booking",
    "book",
    "available",
    "availability",
    "delivery",
    "support",
    "revision",
    "revisions",
    "tour",
    "tours",
    "cabin",
    "cabins",
    "lake",
    "breakfast",
    "pet",
    "pets",
    "amenities",
    "activity",
    "activities",
}

GREETING_PATTERNS = (
    r"\bhi\b",
    r"\bhello\b",
    r"\bhey\b",
    r"\bgood (morning|afternoon|evening)\b",
)

EMAIL_PATTERN = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
NAME_PATTERNS = (
    re.compile(r"(?:my name is|i am|i'm|this is|name is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})", re.IGNORECASE),
    re.compile(r"name\s*[:=]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})", re.IGNORECASE),
)


def _tokenize(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", text.lower())


def _document_key(document: Document) -> str:
    source = document.metadata.get("source", "") if document.metadata else ""
    return f"{source}::{document.page_content.strip()}"


def _format_history(messages: List[BaseMessage]) -> str:
    formatted_messages = []
    for message in messages:
        if isinstance(message, AIMessage):
            role = "Assistant"
        elif isinstance(message, HumanMessage):
            role = "User"
        else:
            role = message.type.title()
        formatted_messages.append(f"{role}: {message.content}")
    return "\n".join(formatted_messages)


def _latest_user_message(messages: List[BaseMessage]) -> str:
    for message in reversed(messages):
        if isinstance(message, HumanMessage):
            return message.content
    return messages[-1].content if messages else ""


def _conversation_text(messages: List[BaseMessage]) -> str:
    return "\n".join(message.content for message in messages)


def _is_greeting(text: str) -> bool:
    normalized = text.lower().strip()
    return any(re.search(pattern, normalized) for pattern in GREETING_PATTERNS)


def _is_business_question(text: str) -> bool:
    normalized = text.lower()
    return any(keyword in normalized for keyword in BUSINESS_KEYWORDS)


def _compose_session_title_from_text(text: str) -> str:
    tokens = [token for token in re.findall(r"[A-Za-z0-9]+", text) if len(token) > 2]
    stopwords = {
        "the",
        "and",
        "for",
        "with",
        "that",
        "this",
        "from",
        "your",
        "about",
        "what",
        "how",
        "can",
        "you",
        "are",
        "our",
        "will",
        "have",
        "been",
        "does",
        "doesnt",
        "give",
        "given",
        "new",
        "document",
        "pdf",
        "file",
        "help",
    }
    keywords = []
    seen = set()
    for token in tokens:
        normalized = token.lower()
        if normalized in stopwords or normalized in seen:
            continue
        seen.add(normalized)
        keywords.append(token.capitalize())
        if len(keywords) == 3:
            break

    if len(keywords) >= 2:
        return " ".join(keywords[:3])
    if keywords:
        return f"{keywords[0]} Chat"
    return "Support Chat"


def generate_session_title(messages: List[BaseMessage]) -> str:
    recent_messages = messages[-4:]
    conversation = _format_history(recent_messages)
    prompt = f"""
Create a concise 2-3 word title for this customer support conversation.
Return only the title text.

Conversation:
{conversation}

Title:
""".strip()

    try:
        raw_title = llm.invoke(prompt)
        title = raw_title if isinstance(raw_title, str) else getattr(raw_title, "content", str(raw_title))
        cleaned = re.sub(r"[^A-Za-z0-9\s'-]", "", title).strip()
        words = [word for word in cleaned.split() if word]
        if len(words) >= 2:
            return " ".join(words[:3])
        if len(words) == 1:
            return f"{words[0].title()} Chat"
    except Exception:
        pass

    return _compose_session_title_from_text(conversation)


def _extract_contact_details(messages: List[BaseMessage]) -> tuple[str, str]:
    conversation = _conversation_text(messages)
    email_match = EMAIL_PATTERN.search(conversation)
    email = email_match.group(0) if email_match else ""

    name = ""
    for pattern in NAME_PATTERNS:
        name_match = pattern.search(conversation)
        if name_match:
            name = " ".join(name_match.group(1).split()).strip()
            break

    if not name and email:
        disallowed_tokens = {
            "hi",
            "hello",
            "hey",
            "thanks",
            "thank",
            "you",
            "yes",
            "no",
            "okay",
            "ok",
            "email",
            "name",
            "my",
            "is",
            "am",
            "im",
        }
        for line in reversed([line.strip() for line in conversation.splitlines() if line.strip()]):
            if EMAIL_PATTERN.search(line):
                continue
            cleaned_line = re.sub(r"[^A-Za-z\s'-]", "", line).strip()
            words = [word for word in cleaned_line.split() if word]
            lowered_words = {word.lower() for word in words}
            if any(token in lowered_words for token in disallowed_tokens):
                continue
            if 2 <= len(words) <= 4 and all(word.isalpha() for word in words):
                name = " ".join(words)
                break

    return name, email


def _route_after_lead_capture(state: GraphState) -> str:
    if state.get("next_route"):
        return state["next_route"]
    return "fallback_response"


def _generate_query_variants(query: str) -> List[str]:
    variants = [query.strip()]
    words = [word for word in _tokenize(query) if len(word) > 2]

    if len(words) >= 4:
        variants.append(" ".join(words[:8]))

    if len(words) >= 3:
        key_terms = [
            word
            for word in words
            if word not in {"what", "how", "when", "where", "why", "can", "could", "would", "should", "please", "tell", "about", "give", "show", "need"}
        ]
        if key_terms:
            variants.append(" ".join(key_terms[:6]))

    deduped_variants = []
    seen = set()
    for variant in variants:
        normalized = variant.lower().strip()
        if normalized and normalized not in seen:
            deduped_variants.append(variant.strip())
            seen.add(normalized)
    return deduped_variants[:4]


def _hybrid_retrieve(query: str, max_results: int = 6) -> List[Document]:
    if not knowledge_base_docs:
        return []

    query_variants = _generate_query_variants(query)
    candidate_map: dict[str, dict[str, object]] = {}

    def _add_candidate(document: Document, source: str, rank: int, variant_index: int) -> None:
        key = _document_key(document)
        bucket = candidate_map.setdefault(
            key,
            {
                "document": document,
                "sources": set(),
                "best_rank": rank,
                "variant_hits": set(),
                "hit_count": 0,
            },
        )
        bucket["sources"].add(source)  # type: ignore[index]
        bucket["variant_hits"].add(variant_index)  # type: ignore[index]
        bucket["hit_count"] = int(bucket["hit_count"]) + 1  # type: ignore[index]
        bucket["best_rank"] = min(int(bucket["best_rank"]), rank)  # type: ignore[index]

    for variant_index, variant in enumerate(query_variants):
        vector_hits = vectorstore.similarity_search(variant, k=4)
        lexical_hits = bm25_retriever.invoke(variant) if bm25_retriever is not None else []

        for rank, document in enumerate(vector_hits):
            _add_candidate(document, "vector", rank, variant_index)

        for rank, document in enumerate(lexical_hits):
            _add_candidate(document, "lexical", rank, variant_index)

    query_tokens = set(_tokenize(query))
    ranked_documents: list[tuple[float, Document]] = []

    for candidate in candidate_map.values():
        document = candidate["document"]  # type: ignore[assignment]
        content_tokens = set(_tokenize(document.page_content))
        token_overlap = len(query_tokens & content_tokens) / max(len(query_tokens), 1)
        source_bonus = 0.25 if "vector" in candidate["sources"] else 0.0  # type: ignore[index]
        lexical_bonus = 0.2 if "lexical" in candidate["sources"] else 0.0  # type: ignore[index]
        hit_bonus = float(candidate["hit_count"]) * 0.35  # type: ignore[arg-type]
        variant_bonus = len(candidate["variant_hits"]) * 0.15  # type: ignore[arg-type]
        rank_penalty = float(candidate["best_rank"]) * 0.05  # type: ignore[arg-type]

        score = (token_overlap * 2.0) + source_bonus + lexical_bonus + hit_bonus + variant_bonus - rank_penalty
        ranked_documents.append((score, document))

    ranked_documents.sort(key=lambda item: item[0], reverse=True)
    return [document for _, document in ranked_documents[:max_results]]


def _build_prompt(messages: List[BaseMessage], context: str) -> str:
    recent_messages = messages[-8:]
    conversation_history = _format_history(recent_messages[:-1])
    latest_user_message = _latest_user_message(recent_messages)

    return f"""
You are the AI assistant on Shahzaib Shafique's portfolio website. You know Shahzaib's background, skills, experience, and projects, and you answer visitor questions about him naturally and confidently, like a knowledgeable colleague — not like a document search tool.

Rules:
- Never say "based on the knowledge base", "the context provided", "the document says", or any similar phrase about your source. Just state the facts directly.
- Speak about Shahzaib in the third person, as an assistant representing him.
- If you genuinely don't know something, say so plainly (e.g. "I don't have that detail — you can ask Shahzaib directly at shahzaibshafique.dev@gmail.com") without mentioning documents or context.
- Keep answers concise and conversational.

Reference information about Shahzaib:
{context}

Recent conversation:
{conversation_history if conversation_history else 'No prior conversation.'}

Current user question:
{latest_user_message}

Answer:
""".strip()


def router_node(state: GraphState):
    """Route greetings away from RAG, and send all other user questions into retrieval."""
    latest_message = _latest_user_message(state.get("messages", []))
    all_messages = state.get("messages", [])
    lead_name, lead_email = _extract_contact_details(all_messages)

    if lead_name and lead_email and not state.get("lead_saved"):
        if _is_business_question(latest_message):
            next_route = "retrieve_context"
        elif _is_greeting(latest_message):
            next_route = "greet_user"
        else:
            next_route = "fallback_response"
        return {
            "route": "lead_qualify",
            "next_route": next_route,
            "lead_name": lead_name,
            "lead_email": lead_email,
        }

    normalized_latest = latest_message.lower().strip()
    is_short_greeting = _is_greeting(latest_message) and len(normalized_latest.split()) <= 2 and not any(char.isdigit() for char in normalized_latest)

    if is_short_greeting:
        return {"route": "greet_user"}

    return {"route": "retrieve_context"}


def lead_qualify_node(state: GraphState):
    """Persist a qualified lead in PostgreSQL when both name and email are present."""
    lead_name = state.get("lead_name", "").strip()
    lead_email = state.get("lead_email", "").strip()

    if lead_name and lead_email and not state.get("lead_saved"):
        save_lead(lead_name, lead_email, _latest_user_message(state.get("messages", [])))
        print(f"Lead captured: {lead_name} <{lead_email}>")
        return {"lead_saved": True}

    return {"lead_saved": bool(state.get("lead_saved"))}


def greet_user_node(state: GraphState):
    """Respond to greetings without running a retrieval search."""
    return {
        "messages": [
            AIMessage(content="Hi! How can I help with the business today?")
        ]
    }


def fallback_response_node(state: GraphState):
    """Handle non-business messages without running RAG."""
    return {
        "messages": [
            AIMessage(content="I can help with business questions, bookings, pricing, and support. What would you like to know?")
        ]
    }

def initialize_rag() -> None:
    """Initializes the vector store and lexical retriever from the default docs plus uploads."""

    refresh_knowledge_base()
    print("RAG vector store and lexical retriever initialized successfully.")

def retrieve_docs(state: GraphState):
    """Step 1: Expand the query, retrieve from vector and lexical stores, then rerank results."""
    user_query = _latest_user_message(state["messages"])
    documents = _hybrid_retrieve(user_query)
    context = "\n\n".join(document.page_content for document in documents)
    return {"context": context, "retrieved_docs": documents}

def generate_answer(state: GraphState):
    """Step 2: Answer with the retrieved context and the preserved conversation state."""
    prompt = _build_prompt(state["messages"], state.get("context", ""))
    response = llm.invoke(prompt)
    response_text = response if isinstance(response, str) else getattr(response, "content", str(response))
    return {"messages": [AIMessage(content=response_text)]}

workflow = StateGraph(GraphState)
workflow.add_node("router", router_node)
workflow.add_node("lead_qualify", lead_qualify_node)
workflow.add_node("greet_user", greet_user_node)
workflow.add_node("retrieve_context", retrieve_docs)
workflow.add_node("generate_answer", generate_answer)
workflow.add_node("fallback_response", fallback_response_node)

workflow.set_entry_point("router")
workflow.add_conditional_edges(
    "router",
    lambda state: state["route"],
    {
        "lead_qualify": "lead_qualify",
        "greet_user": "greet_user",
        "retrieve_context": "retrieve_context",
        "fallback_response": "fallback_response",
    },
)
workflow.add_conditional_edges(
    "lead_qualify",
    _route_after_lead_capture,
    {
        "greet_user": "greet_user",
        "retrieve_context": "retrieve_context",
        "fallback_response": "fallback_response",
    },
)
workflow.add_edge("greet_user", END)
workflow.add_edge("fallback_response", END)
workflow.add_edge("retrieve_context", "generate_answer")
workflow.add_edge("generate_answer", END)

app_graph = workflow.compile(checkpointer=MemorySaver())

try:
    print("\nLangGraph structure:")
    app_graph.get_graph().print_ascii()
except Exception as exc:
    print(f"Could not print LangGraph ASCII graph: {exc}")