import Link from "next/link";
import { getPosts } from "@/db/queries/blog";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">Blog</h1>
      {posts.length === 0 && (
        <p className="text-gray-400">No posts yet.</p>
      )}
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <article className="border border-gray-700 rounded-xl p-6 hover:border-gray-400 transition-colors">
              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags?.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-semibold mb-2 group-hover:underline">{post.title}</h2>
              {post.excerpt && <p className="text-gray-400 mb-4">{post.excerpt}</p>}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {post.published_at && (
                  <span>{new Date(post.published_at).toLocaleDateString()}</span>
                )}
                {post.reading_time_minutes && (
                  <span>{post.reading_time_minutes} min read</span>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
