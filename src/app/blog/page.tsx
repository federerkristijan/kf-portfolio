export const dynamic = "force-dynamic";

import { getPosts } from "@/db/queries/blog";
import { PostGrid } from "@/components/blog/PostGrid";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">Blog</h1>
      <PostGrid posts={posts} />
    </div>
  );
}
