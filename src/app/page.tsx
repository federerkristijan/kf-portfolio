export const dynamic = "force-dynamic";

import HeroSection from "@/components/pages/HeroSection";
import AboutPage from "@/components/pages/AboutPage";
import BlogSection from "@/components/pages/BlogSection";
import { getPosts } from "@/db/queries/blog";

export default async function Page() {
  const posts = await getPosts();

  return (
    <>
      <section>
        <HeroSection title="" subtitle="Fullstack Developer" />
      </section>

      <section>
        <AboutPage />
      </section>

      <section id="blog">
        <BlogSection posts={posts} />
      </section>

    </>
  );
}
