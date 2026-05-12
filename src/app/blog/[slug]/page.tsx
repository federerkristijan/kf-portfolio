import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/db/queries/blog";

type Props = {
  params: { slug: string };
};

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="w-full h-64 object-cover rounded-xl mb-8"
        />
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags?.map((tag) => (
          <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-10">
        {post.published_at && (
          <span>{new Date(post.published_at).toLocaleDateString()}</span>
        )}
        {post.reading_time_minutes && (
          <span>{post.reading_time_minutes} min read</span>
        )}
      </div>
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}
