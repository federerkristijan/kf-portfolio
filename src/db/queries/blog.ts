import { cache } from "react";
import pool from "@/lib/db";
import { slugify } from "@/lib/slugify";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  cover_image_caption: string | null;
  tags: string[] | null;
  sources:
    | { url: string; label?: string; title?: string; name?: string; text?: string }[]
    | null;
  reading_time_minutes: number | null;
  featured: boolean;
  views: number;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

// Drafts (published_at NULL) and scheduled posts stay hidden.
const PUBLISHED = "published_at IS NOT NULL AND published_at <= NOW()";

export async function getPosts(): Promise<BlogPost[]> {
  const { rows } = await pool.query<BlogPost>(
    `SELECT * FROM blog WHERE ${PUBLISHED} ORDER BY published_at DESC`
  );
  return rows;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { rows } = await pool.query<BlogPost>(
    `SELECT * FROM blog WHERE slug = $1 AND ${PUBLISHED} LIMIT 1`,
    [slug]
  );
  return rows[0] ?? null;
}

// Tags are free text without their own slug column, so matching goes through
// slugify — the same function that builds the tag links. Cached per request,
// since the tag page calls it from both generateMetadata and the page.
export const getPostsByTag = cache(async (
  tagSlug: string
): Promise<{ tag: string; posts: BlogPost[] } | null> => {
  const posts = (await getPosts()).filter((post) =>
    post.tags?.some((tag) => slugify(tag) === tagSlug)
  );
  if (posts.length === 0) return null;

  const tag = posts[0].tags!.find((t) => slugify(t) === tagSlug)!;
  return { tag, posts };
});
