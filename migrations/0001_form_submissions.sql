PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS form_submissions (
  id TEXT PRIMARY KEY,
  form_type TEXT NOT NULL CHECK (form_type IN ('application', 'contact', 'investor')),
  email TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS form_submissions_expiry_idx
  ON form_submissions (expires_at);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  unsubscribe_token_hash TEXT NOT NULL UNIQUE,
  subscribed_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS form_email_outbox (
  id TEXT PRIMARY KEY,
  submission_id TEXT REFERENCES form_submissions (id) ON DELETE CASCADE,
  subscriber_id TEXT REFERENCES newsletter_subscribers (id) ON DELETE CASCADE,
  recipient TEXT,
  reply_to TEXT,
  subject TEXT,
  body_text TEXT,
  delivery_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (delivery_status IN ('pending', 'sent', 'failed')),
  attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at INTEGER NOT NULL,
  lease_until INTEGER,
  created_at INTEGER NOT NULL,
  expires_at INTEGER,
  sent_at INTEGER,
  last_error_code TEXT,
  CHECK (
    (submission_id IS NOT NULL AND subscriber_id IS NULL)
    OR (submission_id IS NULL AND subscriber_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS form_email_outbox_pending_idx
  ON form_email_outbox (delivery_status, next_attempt_at, lease_until);

CREATE INDEX IF NOT EXISTS form_email_outbox_expiry_idx
  ON form_email_outbox (expires_at);
