export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/db/queries/blog";
import { TableOfContents } from "@/components/blog/TableOfContents";

type Props = {
  params: Promise<{ slug: string }>;
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function extractHeadings(content: string) {
  return content
    .split('\n')
    .filter((line) => /^#{2,3} /.test(line))
    .map((line) => {
      const level = line.startsWith('### ') ? 3 : 2;
      const text = line.replace(/^#{2,3} /, '');
      return { level, text, id: slugify(text) };
    });
}

const headingComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => {
    const text = String(children);
    return <h2 id={slugify(text)}>{children}</h2>;
  },
  h3: ({ children }: { children?: React.ReactNode }) => {
    const text = String(children);
    return <h3 id={slugify(text)}>{children}</h3>;
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.content);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
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
          <span>{new Date(post.published_at).toLocaleDateString('en-GB')}</span>
        )}
        {post.reading_time_minutes && (
          <span>{post.reading_time_minutes} min read</span>
        )}
      </div>
      <div className="flex gap-12">
        <article className="prose prose-invert max-w-none flex-1 min-w-0">
          <ReactMarkdown components={headingComponents}>{post.content}</ReactMarkdown>
        </article>
        <TableOfContents headings={headings} />
      </div>
    </div>
  );
}
