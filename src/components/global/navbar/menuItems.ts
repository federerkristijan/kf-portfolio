'use client'

import { FC } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import clsx from 'clsx';

interface MenuItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  { name: 'Home', href: '/', icon: <FaHome /> },
  { name: 'About', href: '/about', icon: <FaInfoCircle /> },
  { name: 'Contact', href: '/contact', icon: <FaEnvelope /> },
];

const MenuItems: FC = () => {
  return (
    <ul className="flex space-x-4">
      {menuItems.map((item) => (
        <motion.li
          key={item.name}
          whileHover={{ scale: 1.1 }}
          className={clsx('text-gray-800', 'hover:text-blue-500')}
        >
          <a href={item.href} className="flex items-center space-x-2">
            {item.icon}
            <span>{item.name}</span>
          </a>
        </motion.li>
      ))}
    </ul>
  );
};

export default MenuItems;