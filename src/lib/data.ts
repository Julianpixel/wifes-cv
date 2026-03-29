import fs from 'fs/promises';
import path from 'path';
import { SiteData } from './types';

const DATA_PATH = path.join(process.cwd(), 'src/data/content.json');

export async function getSiteData(): Promise<SiteData> {
  try {
    const fileContents = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading site data:', error);
    // Fallback or rethrow
    throw error;
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
