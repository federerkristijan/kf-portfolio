'use client';

import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold">Welcome to My Website</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/about" className="text-blue-500 hover:underline">About</a>
            </li>
            <li>
              <a href="/contact" className="text-blue-500 hover:underline">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="p-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Hello There!</h2>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <p className="text-gray-700">
              I'm a passionate developer with experience in building dynamic applications.
            </p>
          </motion.div>
        </section>
      </main>
      
      <footer className="p-4 bg-gray-200 text-center">
        <FaUserCircle className="inline-block" /> Created by Your Name
      </footer>
    </div>
  );
};

export default HomePage;