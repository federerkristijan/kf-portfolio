import { NavbarProps } from '@/types/global';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

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
        <Link
          key={item.name}
          href={item.href}
          className='text-white'
        >
          {iconMap[item.name]}
        </Link>
      ))}
    </div>
  )
}

export default NavigationItems
