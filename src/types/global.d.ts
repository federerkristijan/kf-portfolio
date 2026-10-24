import { StaticImageData } from "next/image";
declare module "*.css";

export interface AboutPagePayload {
  title: string;
  description: string;
  image?: StaticImageData;
  skills?: string[];
}

export interface HeroSectionPayload {
  subtitle: string;
}

export interface MenuItem {
  title: string;
  url: string;
}

export interface NavbarProps {
  menuItems?: MenuItem[];
}
