import pool from "@/lib/db";

// Shared across all serverless instances: one row per IP, reset when the
// window expires. Expired rows are pruned on each call, so the table stays small.
export async function hitRateLimit(
  ip: string,
  max: number,
  windowSeconds: number
): Promise<boolean> {
  await pool.query("DELETE FROM contact_rate_limit WHERE reset_at < NOW()");

  const { rows } = await pool.query<{ count: number }>(
    `INSERT INTO contact_rate_limit (ip, count, reset_at)
     VALUES ($1, 1, NOW() + make_interval(secs => $2))
     ON CONFLICT (ip) DO UPDATE SET count = contact_rate_limit.count + 1
     RETURNING count`,
    [ip, windowSeconds]
  );
  return rows[0].count <= max;
}
