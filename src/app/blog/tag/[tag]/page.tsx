export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByTag } from "@/db/queries/blog";
import { PostGrid } from "@/components/blog/PostGrid";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const result = await getPostsByTag(tag);
  return { title: result ? `Posts tagged "${result.tag}"` : "Tag not found" };
}

export default async function BlogTagPage({ params }: Props) {
  const { tag } = await params;
  const result = await getPostsByTag(tag);

  if (!result) notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
        ← All posts
      </Link>
      <h1 className="text-4xl font-bold mt-4 mb-10">
        Posts tagged &ldquo;{result.tag}&rdquo;
      </h1>
      <PostGrid posts={result.posts} />
    </div>
  );
}
