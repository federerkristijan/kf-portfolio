import pool from "@/lib/db";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[] | null;
  reading_time_minutes: number | null;
  featured: boolean;
  views: number;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getPosts(): Promise<BlogPost[]> {
  const { rows } = await pool.query<BlogPost>(
    "SELECT * FROM blog ORDER BY published_at DESC"
  );
  return rows;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { rows } = await pool.query<BlogPost>(
    "SELECT * FROM blog WHERE slug = $1 LIMIT 1",
    [slug]
  );
  return rows[0] ?? null;
}
