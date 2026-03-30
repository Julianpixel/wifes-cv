import fs from 'fs/promises';
import path from 'path';
import { SiteData } from './types';

const DATA_PATH = path.join(process.cwd(), 'src/data/content.json');

const DEFAULT_SITE_DATA: SiteData = {
  profile: {
    name: "Karolina",
    role: "Administradora de Empresas Turísticas",
    bio: "Especialista en gestión de destinos y experiencias de viaje.",
    image: "/bg-photo.jpg",
    email: "correo@ejemplo.com",
    location: "San Pedro de Macorís, RD",
    socials: {}
  },
  theme: 'tropical',
  typography: 'Open Sans' as any, // Defaulting to something safe if not exact match
  appearance: {
    borderRadius: 'large',
    primaryColor: '#0ea5e9'
  },
  sections: {
    hero: true,
    about: true,
    services: true,
    portfolio: true,
    process: true,
    testimonials: true,
    cta: true,
    contact: true
  },
  services: [],
  projects: [],
  testimonials: []
};

export async function getSiteData(): Promise<SiteData> {
  try {
    const fileContents = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('CRITICAL: Using fallback data due to error reading content.json:', error);
    return DEFAULT_SITE_DATA;
  }
}

export async function saveSiteData(data: SiteData): Promise<void> {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving site data:', error);
    throw error;
  }
}
