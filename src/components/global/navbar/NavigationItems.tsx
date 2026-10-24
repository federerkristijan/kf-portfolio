import { NavbarProps } from '@/types/global';
import { ReactElement } from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const iconMap: Record<string, ReactElement> = {
  'LinkedIn': <FiLinkedin />,
  'GitHub': <FiGithub />,
};

const NavigationItems = ({ menuItems}: NavbarProps ) => {
  return (
    <div className='nav-icons flex gap-16 text-6xl'>
      {menuItems?.map((item) => (
        <a
          key={item.title}
          href={item.url}
          className='text-white'
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.title}
        >
          {iconMap[item.title]}
        </a>
      ))}
    </div>
  )
}

export default NavigationItems
