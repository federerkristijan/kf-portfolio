import type { BlogPost } from "@/db/queries/blog";
import { PostCard } from "@/components/blog/PostCard";

type Props = {
  posts: BlogPost[];
};

export const PostGrid = ({ posts }: Props) => {
  if (posts.length === 0) {
    return <p className="text-gray-400">No posts yet.</p>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),20rem))] justify-center gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
