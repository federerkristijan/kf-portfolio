export const dynamic = "force-dynamic";

import Contact from "@/components/pages/Contact";
import ContactSection from "@/components/pages/ContactSection";
import { getContact } from "@/db/queries/contact";

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Contact />
        {contact && <ContactSection contact={contact} />}
      </div>
    </>
  );
}
