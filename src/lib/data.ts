import fs from 'fs/promises';
import path from 'path';
import { SiteData } from './types';
import defaultData from '../data/content.json';

const DATA_PATH = path.join(process.cwd(), 'src/data/content.json');

const DEFAULT_SITE_DATA: SiteData = defaultData as SiteData;

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
