CREATE TABLE IF NOT EXISTS contact_rate_limit (
  ip TEXT PRIMARY KEY,
  count INT NOT NULL,
  reset_at TIMESTAMPTZ NOT NULL
);
