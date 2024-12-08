import { NavbarProps } from '@/types/global';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import Link from 'next/link';

const iconMap: Record<string, JSX.Element> = {
  'Mail': <FiMail />,
  'LinkedIn': <FiLinkedin />,
  'GitHub': <FiGithub />,
};

const NavigationItems = ({ menuItems}: NavbarProps ) => {
  const navigation = menuItems?.map((menuItem) => {
    return {
      name: menuItem.title,
      href: menuItem.url,
    }
  });

  return (
    <div className='nav-icons flex gap-16 text-6xl'>
      {navigation?.map((item) => (
        item.name === 'Mail' ? (
          <Link
            key={item.name}
            href="/contact"
            className='text-white'
          >
            {iconMap[item.name]}
          </Link>
        ) : (
          <a
            key={item.name}
            href={item.href}
            className='text-white'
            target="_blank"
            rel="noopener noreferrer"
          >
            {iconMap[item.name]}
          </a>
        )
      ))}
    </div>
  )
}

export default NavigationItems
