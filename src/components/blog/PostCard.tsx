import Link from "next/link";
import type { BlogPost } from "@/db/queries/blog";

type Props = {
  post: BlogPost;
};

export const PostCard = ({ post }: Props) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="border border-gray-700 rounded-xl overflow-hidden hover:border-gray-400 hover:shadow-lg transition-all h-full flex flex-col">
        {post.cover_image_url && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={post.cover_image_url}
              alt={post.title}
              loading="lazy"
              decoding="async"
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
              <span>{new Date(post.published_at).toLocaleDateString('en-GB')}</span>
            )}
            {!!post.reading_time_minutes && (
              <span>{post.reading_time_minutes} min read</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};
