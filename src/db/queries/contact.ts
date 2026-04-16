import pool from "@/lib/db";

export type ContactData = {
  email: string;
  phone: string;
  address: string;
};

export async function getContact(): Promise<ContactData | null> {
  const { rows } = await pool.query<ContactData>(
    "SELECT email, phone, address FROM contact LIMIT 1"
  );
  return rows[0] ?? null;
}
