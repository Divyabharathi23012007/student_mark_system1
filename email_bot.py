import imaplib
import email
import mysql.connector
import time

# ── Email Configuration ───────────────────────
EMAIL = "dividheekshi25@gmail.com"
PASSWORD = "tcilflsplodwvppb"
IMAP_SERVER = "imap.gmail.com"
SECRET_SUBJECT = "sqlexec"

# ── MySQL Connection ──────────────────────────
db = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="Maha246",
    database="student_marks_db"
)
cursor = db.cursor()

# ── Function to Extract Email Body ────────────
def get_email_body(msg):
    """Extract plain text from email."""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain" and not part.get("Content-Disposition"):
                return part.get_payload(decode=True).decode().strip()
    else:
        return msg.get_payload(decode=True).decode().strip()
    return ""

# ── Execute SQL Command ───────────────────────
def execute_sql(query):
    """Execute allowed SQL commands."""
    try:
        query = query.strip()
        allowed_commands = ("INSERT", "UPDATE", "DELETE", "SELECT")

        if not query.upper().startswith(allowed_commands):
            print("❌ Unauthorized SQL command.")
            return

        cursor.execute(query)

        if query.upper().startswith("SELECT"):
            results = cursor.fetchall()
            print("📊 Query Results:")
            for row in results:
                print(row)
        else:
            db.commit()
            print("✅ SQL Executed Successfully.")

    except Exception as e:
        print("❌ SQL Execution Error:", e)

# ── Check Only Specific Emails ────────────────
def check_email():
    """Check Gmail for unread SQL command emails."""
    try:
        print("📡 Connecting to Gmail...")

        mail = imaplib.IMAP4_SSL(IMAP_SERVER)
        mail.login(EMAIL, PASSWORD)
        mail.select("inbox")

        # Fetch only unread emails with the secret subject
        status, messages = mail.search(
            None,
            f'(UNSEEN SUBJECT "{SECRET_SUBJECT}")'
        )

        email_ids = messages[0].split()

        if not email_ids:
            print("📭 No new SQL command emails found.")
        else:
            print(f"📨 {len(email_ids)} new email(s) found.")

        for eid in email_ids:
            _, msg_data = mail.fetch(eid, "(RFC822)")
            raw_email = msg_data[0][1]
            msg = email.message_from_bytes(raw_email)

            subject = msg["Subject"]
            sender = msg["From"]

            print(f"\n📩 Email from: {sender}")
            print(f"📌 Subject: {subject}")

            if subject.strip().lower() != SECRET_SUBJECT.lower():
                print("⏭️ Skipping unauthorized email.")
                continue

            sql_query = get_email_body(msg)
            print("📝 SQL Command:", sql_query)

            execute_sql(sql_query)

            # Mark email as read
            mail.store(eid, "+FLAGS", "\\Seen")

        mail.logout()

    except Exception as e:
        print("❌ Email Error:", e)

# ── Main Program ──────────────────────────────
if __name__ == "__main__":
    print("🚀 Email-to-MySQL Bot Started...")
    print("📨 Waiting for SQL command emails...\n")

    try:
        while True:
            check_email()
            time.sleep(5)  # Check every 5 seconds
    except KeyboardInterrupt:
        print("\n🛑 Bot Stopped by User.")
    finally:
        cursor.close()
        db.close()
        print("🔒 Database connection closed.")