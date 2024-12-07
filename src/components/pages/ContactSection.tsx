import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const ContactSection = () => {
  return (
    <div className="contact-section mt-12 p-8 bg-gray-800 text-white rounded-xl shadow-lg">
      <h2 className="contact-title text-3xl font-semibold text-center mb-6">
        Get in Touch
      </h2>
      <p className="contact-description text-center mb-6">
        I&apos;m always open to new opportunities and collaborations. Feel free to
        reach out through my social media channels.
      </p>
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
        {/* Add more social links as needed */}
      </div>
    </div>
  );
};

export default ContactSection;
