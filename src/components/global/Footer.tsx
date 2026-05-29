import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-12 p-8 bg-gray-800 text-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <Link
          href="/contact"
          className="text-3xl font-semibold hover:text-indigo-400 transition-colors"
        >
          Get in Touch
        </Link>
        <p className="text-center text-gray-400">
          I&apos;m always open to new opportunities and collaborations.
        </p>
        <div className="flex gap-6">
          <Link
            href="https://www.linkedin.com/in/kristijan-federer/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-indigo-400 transition-colors"
          >
            <FaLinkedin size={24} />
          </Link>
          <Link
            href="https://github.com/federerkristijan"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-indigo-400 transition-colors"
          >
            <FaGithub size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
