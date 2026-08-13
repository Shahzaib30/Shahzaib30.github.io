# Backend

This folder contains the FastAPI service that powers the chatbot, lead capture, admin dashboard data, and knowledge-base operations.

## What it does

- Serves the streaming chat endpoint used by the frontend.
- Persists leads, transcripts, and sessions in PostgreSQL.
- Loads the default knowledge base from `app/docs/business_info.txt`.
- Accepts TXT, MD, and PDF uploads for knowledge-base expansion.
- Refreshes the retrieval stack after knowledge-base changes.

## Requirements

- Python 3.10+.
- PostgreSQL reachable through `DATABASE_URL`.
- Ollama with the default local models used in `app/logic.py`.

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string.
- `ADMIN_API_TOKEN` - Token required by the admin endpoints.

## Install and Run

```bash
python -m venv .venv
```

Activate the virtual environment, then install dependencies:

```bash
pip install -r requirements.txt
```

Start the API:

```bash
uvicorn app.main:app --reload --port 8000
```

## Main Endpoints

- `GET /health` - Health check.
- `POST /chat` - Streaming RAG chat.
- `POST /leads` - Lead capture.
- `GET /admin/metrics` - Dashboard metrics.
- `GET /admin/leads` - Lead listing.
- `GET /admin/transcripts` - Transcript listing.
- `GET /admin/sessions` - Session listing.
- `GET /admin/knowledge-base` - Knowledge-base documents.
- `POST /admin/knowledge-base/upload` - Upload a document.
- `DELETE /admin/leads/{lead_id}` - Delete a lead.
- `DELETE /admin/knowledge-base/{document_id}` - Delete a document.

## Data Storage

- PostgreSQL tables are initialized automatically on startup.
- Uploaded documents are stored in `app/knowledge_base_uploads/`.
- Vector index files are stored in `app/vector_db/`.
