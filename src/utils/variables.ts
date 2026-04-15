export interface Project {
  id: number;
  title: string;
  icons: string[];
  url: string;
}

export const projectsVars: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    icons: ['FiGithub'],
    url: 'https://github.com/myusername/portfolio-website'
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    icons: ['FiGithub'],
    url: 'https://github.com/myusername/ecommerce-platform'
  }
];
