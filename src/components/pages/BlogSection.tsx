import Link from "next/link";
import type { BlogPost } from "@/db/queries/blog";

type Props = {
  posts: BlogPost[];
};

const BlogSection = ({ posts }: Props) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold mb-8">Blog</h2>
      {posts.length === 0 && (
        <p className="text-gray-400">No posts yet.</p>
      )}
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <article className="border border-gray-700 rounded-xl p-6 hover:border-gray-400 transition-colors">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags?.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:underline">{post.title}</h3>
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
};

export default BlogSection;
