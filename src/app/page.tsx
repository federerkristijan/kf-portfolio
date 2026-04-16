import HeroSection from "@/components/pages/HeroSection";
import ContactSection from "@/components/pages/ContactSection";
import AboutPage from "@/components/pages/AboutPage";
import { getContact } from "@/db/queries/contact";

export default async function Page() {
  const contact = await getContact();

  return (
    <>
      <section>
        <HeroSection title="" subtitle="Fullstack Developer" />
      </section>

      <section>
        <AboutPage />
      </section>

      <section id="contact">
        {contact && <ContactSection contact={contact} />}
      </section>
    </>
  );
}
