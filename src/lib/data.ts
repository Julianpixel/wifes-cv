import fs from 'fs/promises';
import path from 'path';
import { SiteData } from './types';
import defaultData from '../data/content.json';

const DATA_PATH = path.join(process.cwd(), 'src/data/content.json');

// THE ABSOLUTE FALLBACK
const FINAL_SAFETY_NET: SiteData = {
  theme: 'tropical',
  typography: 'Inter',
  profile: {
    name: "Karolina Ramirez",
    role: "Administradora Turística",
    bio: "Especialista en gestión de destinos.",
    image: "/bg-photo.jpg",
    email: "correo@ejemplo.com",
    location: "San Pedro de Macorís, RD",
    socials: {}
  },
  sections: {
    hero: true,
    about: true,
    services: true,
    portfolio: true,
    testimonials: true,
    process: true,
    cta: true,
    contact: true
  },
  services: [],
  projects: [],
  testimonials: [],
  appearance: {
    borderRadius: 'medium',
    primaryColor: '#0ea5e9'
  }
};

export async function getSiteData(): Promise<SiteData> {
  // Priority 1: The static import (most reliable on Vercel)
  if (defaultData && defaultData.sections) {
    return defaultData as unknown as SiteData;
  }

  // Priority 2: The FS read (only for local dev/sync)
  try {
    const fileContents = await fs.readFile(DATA_PATH, 'utf8');
    const parsed = JSON.parse(fileContents);
    if (parsed && parsed.profile) return parsed;
  } catch (error) {
    console.warn('FS read failed in getSiteData, ignoring.');
  }

  // Priority 3: The hardcoded safety net
  return FINAL_SAFETY_NET;
}

export async function saveSiteData(data: SiteData): Promise<void> {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving site data:', error);
    throw error;
  }
}
