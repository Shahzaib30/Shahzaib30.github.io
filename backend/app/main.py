import asyncio
import json
import os
import shutil
from contextlib import asynccontextmanager
from pathlib import Path
from typing import AsyncGenerator
from uuid import uuid4

from fastapi import FastAPI, File, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langchain_core.messages import AIMessage, HumanMessage

from .database import (
    count_session_messages,
    delete_knowledge_base_document,
    delete_lead,
    get_chat_session,
    get_dashboard_metrics,
    initialize_db,
    list_chat_sessions,
    list_knowledge_base_documents,
    list_leads,
    get_session_messages,
    list_transcripts,
    save_knowledge_base_document,
    save_lead,
    save_transcript,
    set_chat_session_title,
)
from .logic import DOCS_PATH, UPLOADS_PATH, app_graph, generate_session_title, initialize_rag, refresh_knowledge_base


ADMIN_API_TOKEN = os.getenv("ADMIN_API_TOKEN", "admin")
ALLOWED_UPLOAD_EXTENSIONS = {".txt", ".md", ".pdf"}


def _extract_response_text(graph_state) -> str:
    messages = graph_state.get("messages", []) if isinstance(graph_state, dict) else []
    for message in reversed(messages):
        if isinstance(message, AIMessage):
            return message.content
        if isinstance(message, dict) and message.get("type") == "ai":
            return message.get("content", "")
    return ""


def _chunk_text(text: str, chunk_size: int = 80):
    for start in range(0, len(text), chunk_size):
        yield text[start : start + chunk_size]


def _maybe_generate_session_title(session_id: str) -> None:
    session = get_chat_session(session_id)
    if session and session.get("session_title"):
        return

    if count_session_messages(session_id, role="user") < 2:
        return

    session_messages = get_session_messages(session_id, limit=8)
    conversation_messages = []
    for row in session_messages:
        if row.get("role") == "user":
            conversation_messages.append(HumanMessage(content=row.get("content", "")))
        else:
            conversation_messages.append(AIMessage(content=row.get("content", "")))

    if not conversation_messages:
        return

    title = generate_session_title(conversation_messages)
    set_chat_session_title(session_id, title, summary=None)


def _require_admin_token(admin_token: str | None) -> None:
    if not ADMIN_API_TOKEN:
        raise HTTPException(status_code=503, detail="ADMIN_API_TOKEN is not configured on the server.")

    if admin_token != ADMIN_API_TOKEN:
        raise HTTPException(status_code=403, detail="Invalid admin token.")


def _serialize_default_document() -> dict[str, object]:
    size = DOCS_PATH.stat().st_size if DOCS_PATH.exists() else 0
    return {
        "id": 0,
        "original_name": DOCS_PATH.name,
        "stored_name": DOCS_PATH.name,
        "file_path": str(DOCS_PATH),
        "file_type": DOCS_PATH.suffix.lower().lstrip("."),
        "created_at": None,
        "source": "default",
        "size": size,
        "can_delete": False,
    }


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Initialize resources on startup and clean up on shutdown."""

    initialize_db()
    initialize_rag()
    yield


app = FastAPI(
    title="AI Customer Support Chatbot",
    description="A chatbot that uses RAG to provide customer support based on a knowledge base.",
    lifespan=lifespan,
    version="1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


class ChatRequest(BaseModel):
    message: str
    session_id: str = "default-session"


class LeadRequest(BaseModel):
    name: str
    email: str
    message: str


@app.get("/health")
async def health_check():
    db_status = "ok"
    try:
        from .database import get_connection

        conn = get_connection()
        if conn is None:
            db_status = "unavailable"
        else:
            conn.close()
    except Exception:
        db_status = "unavailable"

    return {
        "status": "online",
        "database": db_status,
        "knowledge_base": "loaded" if DOCS_PATH.exists() else "missing",
        "admin_token_configured": bool(ADMIN_API_TOKEN),
    }


@app.post("/chat")
async def chat(request: ChatRequest):
    async def event_generator():
        session_id = request.session_id or "default-session"
        save_transcript(session_id, "user", request.message)

        try:
            config = {"configurable": {"thread_id": session_id}}
            graph_state = await asyncio.to_thread(
                app_graph.invoke,
                {"messages": [HumanMessage(content=request.message)]},
                config,
            )
            response_text = _extract_response_text(graph_state) or "No answer could be generated."
            save_transcript(session_id, "assistant", response_text)
            _maybe_generate_session_title(session_id)

            for chunk in _chunk_text(response_text):
                yield f"data: {json.dumps({'text': chunk})}\n\n"
            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as exc:
            error_text = f"I could not generate a response right now. {exc}"
            save_transcript(session_id, "assistant", error_text)
            yield f"data: {json.dumps({'text': error_text})}\n\n"
            yield f"data: {json.dumps({'done': True})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@app.post("/leads")
async def save_lead_endpoint(req: LeadRequest):
    """Endpoint to save lead information to the database."""

    save_lead(req.name, req.email, req.message)
    return {"message": "Lead information saved successfully."}


@app.get("/admin/leads")
async def admin_list_leads(x_admin_token: str | None = Header(default=None, alias="X-Admin-Token")):
    _require_admin_token(x_admin_token)
    return {"leads": list_leads(limit=500)}


@app.delete("/admin/leads/{lead_id}")
async def admin_delete_lead(lead_id: int, x_admin_token: str | None = Header(default=None, alias="X-Admin-Token")):
    _require_admin_token(x_admin_token)
    deleted = delete_lead(lead_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Lead not found.")
    return {"message": "Lead deleted successfully."}


@app.get("/admin/transcripts")
async def admin_list_transcripts(x_admin_token: str | None = Header(default=None, alias="X-Admin-Token")):
    _require_admin_token(x_admin_token)
    return {"transcripts": list_transcripts(limit=500)}


@app.get("/admin/sessions")
async def admin_list_sessions(x_admin_token: str | None = Header(default=None, alias="X-Admin-Token")):
    _require_admin_token(x_admin_token)
    return {"sessions": list_chat_sessions(limit=500)}


@app.get("/admin/metrics")
async def admin_metrics(x_admin_token: str | None = Header(default=None, alias="X-Admin-Token")):
    _require_admin_token(x_admin_token)
    metrics = get_dashboard_metrics()
    metrics["default_knowledge_base_document"] = 1 if DOCS_PATH.exists() else 0
    metrics["knowledge_base_documents"] = metrics.get("knowledge_base_documents", 0) + metrics["default_knowledge_base_document"]
    return metrics


@app.get("/admin/knowledge-base")
async def admin_knowledge_base(x_admin_token: str | None = Header(default=None, alias="X-Admin-Token")):
    _require_admin_token(x_admin_token)
    uploaded_documents = list_knowledge_base_documents()
    documents = [_serialize_default_document()]
    for document in uploaded_documents:
        documents.append(
            {
                **document,
                "source": "upload",
                "size": Path(document["file_path"]).stat().st_size if Path(document["file_path"]).exists() else 0,
                "can_delete": True,
            }
        )
    return {"documents": documents}


@app.post("/admin/knowledge-base/upload")
async def admin_upload_knowledge_base(
    file: UploadFile = File(...),
    x_admin_token: str | None = Header(default=None, alias="X-Admin-Token"),
):
    _require_admin_token(x_admin_token)

    upload_name = Path(file.filename or "knowledge-base-document").name
    upload_extension = Path(upload_name).suffix.lower()
    if upload_extension not in ALLOWED_UPLOAD_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only .txt, .md, and .pdf files are supported.")

    UPLOADS_PATH.mkdir(parents=True, exist_ok=True)
    stored_name = f"{uuid4().hex}_{upload_name}"
    destination = UPLOADS_PATH / stored_name

    try:
        with destination.open("wb") as output_file:
            shutil.copyfileobj(file.file, output_file)
        saved_document = save_knowledge_base_document(
            original_name=upload_name,
            stored_name=stored_name,
            file_path=str(destination),
            file_type=upload_extension.lstrip("."),
        )
        refresh_knowledge_base()
        if saved_document is None:
            raise HTTPException(status_code=500, detail="The document could not be stored.")
        return {"document": saved_document}
    finally:
        await file.close()


@app.delete("/admin/knowledge-base/{document_id}")
async def admin_delete_knowledge_base_document(
    document_id: int,
    x_admin_token: str | None = Header(default=None, alias="X-Admin-Token"),
):
    _require_admin_token(x_admin_token)

    removed_document = delete_knowledge_base_document(document_id)
    if removed_document is None:
        raise HTTPException(status_code=404, detail="Document not found.")

    file_path = Path(removed_document["file_path"])
    if file_path.exists():
        file_path.unlink()

    refresh_knowledge_base()
    return {"message": "Document deleted successfully."}