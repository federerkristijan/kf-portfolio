export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/db/queries/blog";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { slugify } from "@/lib/slugify";

type Props = {
  params: Promise<{ slug: string }>;
};

// h2/h3 lines outside fenced code blocks, with ids made unique ("intro",
// "intro-2", ...) so repeated heading text still gets its own anchor.
function extractHeadings(content: string) {
  const seen = new Map<string, number>();
  let inFence = false;
  const headings: { level: number; text: string; id: string }[] = [];

  for (const line of content.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence || !/^#{2,3} /.test(line)) continue;

    const level = line.startsWith('### ') ? 3 : 2;
    const text = line.replace(/^#{2,3} /, '');
    const base = slugify(text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    headings.push({ level, text, id: count > 1 ? `${base}-${count}` : base });
  }
  return headings;
}

// Markdown renders headings in document order, so the nth h2/h3 gets the nth id.
function headingComponents(ids: string[]) {
  let index = 0;
  return {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 id={ids[index++]}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 id={ids[index++]}>{children}</h3>
    ),
  };
}

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
        {post.tags?.map((tag) =>
          slugify(tag) ? (
            <Link
              key={tag}
              href={`/blog/tag/${slugify(tag)}`}
              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded hover:bg-gray-700 hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ) : (
            <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
              {tag}
            </span>
          )
        )}
      </div>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-10">
        {post.published_at && (
          <span>{new Date(post.published_at).toLocaleDateString('en-GB')}</span>
        )}
        {!!post.reading_time_minutes && (
          <span>{post.reading_time_minutes} min read</span>
        )}
      </div>
      <div className="flex gap-12">
        <article className="prose prose-invert max-w-none flex-1 min-w-0">
          <ReactMarkdown components={headingComponents(headings.map((h) => h.id))}>
            {post.content}
          </ReactMarkdown>
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
