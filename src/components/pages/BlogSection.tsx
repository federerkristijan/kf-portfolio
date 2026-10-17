import type { BlogPost } from "@/db/queries/blog";
import { PostGrid } from "@/components/blog/PostGrid";

type Props = {
  posts: BlogPost[];
};

const BlogSection = ({ posts }: Props) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold mb-8">Blog</h2>
      <PostGrid posts={posts} />
    </div>
  );
};

export default BlogSection;
