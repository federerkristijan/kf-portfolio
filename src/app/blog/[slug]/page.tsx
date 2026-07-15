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

function nodeText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join('');
  if (node && typeof node === 'object' && 'props' in (node as object))
    return nodeText((node as React.ReactElement).props.children);
  return '';
}

const headingComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 id={slugify(nodeText(children))}>{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 id={slugify(nodeText(children))}>{children}</h3>
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.content);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {post.cover_image_url && (
        <figure className="mb-8">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-auto rounded-xl"
          />
          {post.cover_image_caption && (
            <figcaption className="mt-3 text-sm text-gray-500 italic text-center">
              {post.cover_image_caption}
            </figcaption>
          )}
        </figure>
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
      {post.sources && post.sources.length > 0 && (
        <section className="mt-12 border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-4">Sources</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            {post.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white underline underline-offset-2"
                >
                  {source.label ?? source.title ?? source.name ?? source.text ?? source.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
