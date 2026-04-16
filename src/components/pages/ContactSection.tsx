import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import type { ContactData } from "@/db/queries/contact";

type Props = {
  contact: ContactData;
};

const ContactSection = ({ contact }: Props) => {
  return (
    <div className="contact-section mt-12 p-8 bg-gray-800 text-white rounded-xl shadow-lg">
      <h2 className="contact-title text-3xl font-semibold text-center mb-6">
        Get in Touch
      </h2>
      <p className="contact-description text-center mb-6">
        I&apos;m always open to new opportunities and collaborations. Feel free to
        reach out through my social media channels.
      </p>
      <div className="flex flex-col items-center gap-2 mb-6 text-sm">
        <span>{contact.email}</span>
        <span>{contact.phone}</span>
        <span>{contact.address}</span>
      </div>
      <div className="contact-icons">
        <Link
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={20} />
        </Link>
        <Link
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={20} />
        </Link>
        <Link
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter size={20} />
        </Link>
      </div>
    </div>
  );
};

export default ContactSection;
