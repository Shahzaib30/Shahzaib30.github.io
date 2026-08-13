import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()
DB_URL = os.getenv("DATABASE_URL")


def get_connection():
    """Establishes a connection to the PostgreSQL database using the URL from environment variables."""

    if not DB_URL:
        print("DATABASE_URL is not configured.")
        return None

    try:
        return psycopg2.connect(DB_URL)
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None


def initialize_db():
    """Creates the tables required by the chat, admin, and knowledge-base flows."""

    conn = get_connection()
    if conn is None:
        return

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS lead (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_transcript (
                id SERIAL PRIMARY KEY,
                session_id VARCHAR(255) NOT NULL,
                role VARCHAR(32) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_session (
                id SERIAL PRIMARY KEY,
                session_id VARCHAR(255) NOT NULL UNIQUE,
                session_title VARCHAR(255),
                summary TEXT,
                message_count INTEGER NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS knowledge_base_document (
                id SERIAL PRIMARY KEY,
                original_name VARCHAR(255) NOT NULL,
                stored_name VARCHAR(255) NOT NULL,
                file_path TEXT NOT NULL UNIQUE,
                file_type VARCHAR(32) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
        conn.commit()
        print("Database initialized successfully.")
    finally:
        cursor.close()
        conn.close()


def save_lead(name, email, message):
    """Saves a lead to the database."""

    conn = get_connection()
    if conn is None:
        return False

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO lead (name, email, message)
            VALUES (%s, %s, %s);
            """,
            (name, email, message),
        )
        conn.commit()
        return True
    except Exception as e:
        print(f"Error saving lead: {e}")
        return False
    finally:
        cursor.close()
        conn.close()


def list_leads(limit: int = 200):
    conn = get_connection()
    if conn is None:
        return []

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            SELECT id, name, email, message, created_at
            FROM lead
            ORDER BY created_at DESC, id DESC
            LIMIT %s;
            """,
            (limit,),
        )
        columns = [column[0] for column in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]
    finally:
        cursor.close()
        conn.close()


def delete_lead(lead_id: int) -> bool:
    conn = get_connection()
    if conn is None:
        return False

    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM lead WHERE id = %s;", (lead_id,))
        conn.commit()
        return cursor.rowcount > 0
    finally:
        cursor.close()
        conn.close()


def save_transcript(session_id: str, role: str, content: str) -> bool:
    conn = get_connection()
    if conn is None:
        return False

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO chat_transcript (session_id, role, content)
            VALUES (%s, %s, %s);
            """,
            (session_id, role, content),
        )
        cursor.execute(
            """
            INSERT INTO chat_session (session_id, message_count, last_activity)
            VALUES (%s, 1, CURRENT_TIMESTAMP)
            ON CONFLICT (session_id)
            DO UPDATE SET
                message_count = chat_session.message_count + 1,
                last_activity = CURRENT_TIMESTAMP;
            """,
            (session_id,),
        )
        conn.commit()
        return True
    except Exception as e:
        print(f"Error saving transcript: {e}")
        return False
    finally:
        cursor.close()
        conn.close()


def count_session_messages(session_id: str, role: str | None = None) -> int:
    conn = get_connection()
    if conn is None:
        return 0

    cursor = conn.cursor()
    try:
        if role is None:
            cursor.execute(
                """
                SELECT COUNT(*)
                FROM chat_transcript
                WHERE session_id = %s;
                """,
                (session_id,),
            )
        else:
            cursor.execute(
                """
                SELECT COUNT(*)
                FROM chat_transcript
                WHERE session_id = %s AND role = %s;
                """,
                (session_id, role),
            )
        row = cursor.fetchone()
        return int(row[0]) if row else 0
    finally:
        cursor.close()
        conn.close()


def get_session_messages(session_id: str, limit: int = 8):
    conn = get_connection()
    if conn is None:
        return []

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            SELECT role, content, created_at
            FROM chat_transcript
            WHERE session_id = %s
            ORDER BY created_at DESC, id DESC
            LIMIT %s;
            """,
            (session_id, limit),
        )
        columns = [column[0] for column in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return list(reversed(rows))
    finally:
        cursor.close()
        conn.close()


def get_chat_session(session_id: str):
    conn = get_connection()
    if conn is None:
        return None

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            SELECT session_id, session_title, summary, message_count, created_at, last_activity
            FROM chat_session
            WHERE session_id = %s;
            """,
            (session_id,),
        )
        row = cursor.fetchone()
        if row is None:
            return None
        columns = [column[0] for column in cursor.description]
        return dict(zip(columns, row))
    finally:
        cursor.close()
        conn.close()


def list_chat_sessions(limit: int = 100):
    conn = get_connection()
    if conn is None:
        return []

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            SELECT session_id, session_title, summary, message_count, created_at, last_activity
            FROM chat_session
            ORDER BY COALESCE(last_activity, created_at) DESC, id DESC
            LIMIT %s;
            """,
            (limit,),
        )
        columns = [column[0] for column in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]
    finally:
        cursor.close()
        conn.close()


def set_chat_session_title(session_id: str, session_title: str, summary: str | None = None):
    conn = get_connection()
    if conn is None:
        return None

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO chat_session (session_id, session_title, summary, message_count, last_activity)
            VALUES (%s, %s, %s, 0, CURRENT_TIMESTAMP)
            ON CONFLICT (session_id)
            DO UPDATE SET
                session_title = EXCLUDED.session_title,
                summary = COALESCE(EXCLUDED.summary, chat_session.summary),
                last_activity = CURRENT_TIMESTAMP
            RETURNING session_id, session_title, summary, message_count, created_at, last_activity;
            """,
            (session_id, session_title, summary),
        )
        row = cursor.fetchone()
        conn.commit()
        if row is None:
            return None
        columns = [column[0] for column in cursor.description]
        return dict(zip(columns, row))
    finally:
        cursor.close()
        conn.close()


def list_transcripts(limit: int = 200):
    conn = get_connection()
    if conn is None:
        return []

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            SELECT id, session_id, role, content, created_at
            FROM chat_transcript
            ORDER BY created_at DESC, id DESC
            LIMIT %s;
            """,
            (limit,),
        )
        columns = [column[0] for column in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]
    finally:
        cursor.close()
        conn.close()


def save_knowledge_base_document(original_name: str, stored_name: str, file_path: str, file_type: str):
    conn = get_connection()
    if conn is None:
        return None

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO knowledge_base_document (original_name, stored_name, file_path, file_type)
            VALUES (%s, %s, %s, %s)
            RETURNING id, original_name, stored_name, file_path, file_type, created_at;
            """,
            (original_name, stored_name, file_path, file_type),
        )
        row = cursor.fetchone()
        conn.commit()
        if row is None:
            return None
        columns = [column[0] for column in cursor.description]
        return dict(zip(columns, row))
    finally:
        cursor.close()
        conn.close()


def list_knowledge_base_documents():
    conn = get_connection()
    if conn is None:
        return []

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            SELECT id, original_name, stored_name, file_path, file_type, created_at
            FROM knowledge_base_document
            ORDER BY created_at DESC, id DESC;
            """
        )
        columns = [column[0] for column in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]
    finally:
        cursor.close()
        conn.close()


def delete_knowledge_base_document(document_id: int):
    conn = get_connection()
    if conn is None:
        return None

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            DELETE FROM knowledge_base_document
            WHERE id = %s
            RETURNING id, original_name, stored_name, file_path, file_type, created_at;
            """,
            (document_id,),
        )
        row = cursor.fetchone()
        conn.commit()
        if row is None:
            return None
        columns = [column[0] for column in cursor.description]
        return dict(zip(columns, row))
    finally:
        cursor.close()
        conn.close()


def get_dashboard_metrics():
    conn = get_connection()
    if conn is None:
        return {
            "lead_count": 0,
            "transcript_count": 0,
            "active_sessions": 0,
            "knowledge_base_documents": 0,
            "messages_today": 0,
            "latest_activity": None,
        }

    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            SELECT
                (SELECT COUNT(*) FROM lead) AS lead_count,
                (SELECT COUNT(*) FROM chat_transcript) AS transcript_count,
                (SELECT COUNT(DISTINCT session_id) FROM chat_transcript) AS active_sessions,
                (SELECT COUNT(*) FROM knowledge_base_document) AS knowledge_base_documents,
                (SELECT COUNT(*) FROM chat_transcript WHERE created_at::date = CURRENT_DATE) AS messages_today,
                (SELECT MAX(created_at) FROM chat_transcript) AS latest_activity;
            """
        )
        row = cursor.fetchone()
        if row is None:
            return {
                "lead_count": 0,
                "transcript_count": 0,
                "active_sessions": 0,
                "knowledge_base_documents": 0,
                "messages_today": 0,
                "latest_activity": None,
            }

        columns = [column[0] for column in cursor.description]
        return dict(zip(columns, row))
    finally:
        cursor.close()
        conn.close()