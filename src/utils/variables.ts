import { Project, Skill } from "@/types/global";
import Livepad from "@/assets/Livepad.png";
import Inklusion from "@/assets/Inklusion.png";
import DasaHink from "@/assets/DasaHink.png";
import CannaSmokeHere from "@/assets/CannaSmokeHere.png";
import WildGoatRide from "@/assets/WildGoatRide.png";
import BubbleLogo from "@/assets/BubbleLogo.png";

export const heroSection = {
  title: "Fullstack Developer",
  subtitle: "I'm a passionate code creator and language enthusiast, weaving innovation into the digital realm of possibilities. Always open to a new challenge and learning and exploring new technologies, I'm a firm believer in the power of collaboration and teamwork. I'm a self-taught developer with a strong knowledge in JavaScript, Next.js, Typescript, Python, Django and Sanity.io. I'm always looking for opportunities to learn and grow, and I'm excited to see where my journey takes me.",
};

export const aboutVars = {
  title: 'About',
  description:
    "I'm a passionate code creator and language enthusiast, weaving innovation into the digital realm of possibilities. Always open to a new challenge and learning and exploring new technologies, I'm a firm believer in the power of collaboration and teamwork. I'm a self-taught developer with a strong knowledge in JavaScript, Next.js, Typescript, Python, Django and Sanity.io. I'm always looking for opportunities to learn and grow, and I'm excited to see where my journey takes me.",
};

export const skills: Skill[] = [
  {
    title: 'JavaScript',
  },
  {
    title: 'TypeScript',
  },
  {
    title: 'Figma',
  },
  {
    title: 'React',
  },
  {
    title: 'MySQL',
  },
  {
    title: 'Node.js',
  },
  {
    title: 'Python',
  },
  {
    title: 'Django',
  },
  {
    title: 'Github'
  },
  {
    title: 'Vercel'
  },
  {
    title: 'Scrum'
  },
  {
    title: 'Next.js'
  },
  {
    title: 'Sanity.io'
  },
  {
    title: 'TailwindCSS'
  },
  {
    title: 'Prisma'
  },
  {
    title: 'DigitalOcean',
  },
];

export const quote = "Failure is an opportunity to learn and thrive."

export const projectsTitles = {
  title: 'Projects',
  subtitle: 'A collection of projects I have worked on',
};

export const projectsVars: Project[] = [
  {
    title: 'Wild Goad Ride',
    description:
      'An interactive and responsive web app developed with the Bubble no-code full-stack platform. Integrates Google Analytics for tracking and PayPal for secure payments. Features custom workflows, responsive UI, and performance optimizations for a reliable, efficient user experience, ensuring high scalability.',
    image: WildGoatRide.src,
    url: 'https://wildgoatride.com/',
    icons: [BubbleLogo.src, 'SiGoogleanalytics']
  },
  {
    title: 'Canna Smoke Here',
    description:
      'An interactive and responsive web app that geolocates all schools, kindergartens, and playgrounds in Germany, allowing users to compare their location with nearby educational institutions and recreational areas. The tech stack includes Next.js 14, TypeScript, TailwindCSS, OpenStreetMaps, and Google Analytics.',
    image: CannaSmokeHere.src,
    url: 'https://www.cannasmokehere.de/',
    icons: ['TbBrandNextjs', 'SiTailwindcss', 'SiTypescript', 'SiVercel', 'FaFigma', 'DiGithub', 'SiOpenstreetmap', 'SiGoogleanalytics']
  },
  {
    title: 'Livepad',
    description:
      'Product management for the Agile team project involved integrating and implementing user authentication for the existing website, as well as further developing the app with various Etherpad plugins. The tech stack included Node.js, Next.js, TypeScript, TailwindCSS, i18next, DigitalOcean, Vercel, Docker, Sanity.io, Prisma, MySQL, Planetscale, Figma, and GitHub',
    image: Livepad.src,
    url: 'https://www.livepad.org/',
    icons: ['FaNodeJs', 'TbBrandNextjs', 'SiTailwindcss', 'SiTypescript', 'DiNodejs', 'DiDigitalOcean', 'SiVercel', 'DiDocker', 'FaFigma', 'DiGithub', 'SiPrisma', 'DiMysql', 'SiSanity']
  },
  {
    title: 'Inklusion Bühnenreif',
    description:
      'Servicing, updating, and managing a Wix website. Administering the Meta Business Suite and creating social media content with a focus on accessibility, particularly through the use of alternative text. Developing educational materials for team members on web technologies and providing technical support.',
    image: Inklusion.src,
    url: 'https://www.inklusion-buehnenreif.de/',
    icons: ['FaMailchimp', 'FaWix', 'FaCss3', 'FaMeta']
  }
];
