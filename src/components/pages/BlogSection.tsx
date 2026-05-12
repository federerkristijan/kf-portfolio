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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <article className="border border-gray-700 rounded-xl overflow-hidden hover:border-gray-400 hover:shadow-lg transition-all h-full flex flex-col">
              {post.cover_image_url && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:underline">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-gray-400 text-base mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                  {post.published_at && (
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  )}
                  {post.reading_time_minutes && (
                    <span>{post.reading_time_minutes} min read</span>
                  )}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
