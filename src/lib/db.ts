import { Pool } from "pg";

// Supabase signs its server certificate with its own CA, so verification
// needs that CA explicitly. Escaped newlines are restored in case the secret
// was stored on a single line.
const ca = process.env.DATASE_CA_CERT?.replace(/\\n/g, "\n");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { ca, rejectUnauthorized: true },
});

export default pool;
