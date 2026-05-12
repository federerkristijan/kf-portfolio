import HeroSection from "@/components/pages/HeroSection";
import ContactSection from "@/components/pages/ContactSection";
import AboutPage from "@/components/pages/AboutPage";
import BlogSection from "@/components/pages/BlogSection";
import { getContact } from "@/db/queries/contact";
import { getPosts } from "@/db/queries/blog";

export default async function Page() {
  const [contact, posts] = await Promise.all([getContact(), getPosts()]);

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

      <section id="contact">
        {contact && <ContactSection contact={contact} />}
      </section>
    </>
  );
}
