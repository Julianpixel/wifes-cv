'use server';

import { getSiteData } from '@/lib/data';
import { SiteData } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const GITHUB_OWNER = 'Julianpixel';
const GITHUB_REPO = 'wifes-cv';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function commitToGitHub(filePath: string, content: string | Buffer, message: string) {
  if (!GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN not found, skipping GitHub sync.');
    return null;
  }

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
  
  // 1. Get the current file SHA (if it exists)
  let sha = '';
  try {
    const getRes = await fetch(url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }
  } catch (e) { /* File might not exist */ }

  // 2. Commit the new content
  const base64Content = typeof content === 'string' 
    ? Buffer.from(content).toString('base64') 
    : content.toString('base64');

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: base64Content,
      sha: sha || undefined,
    }),
  });

  return res.ok;
}

export async function updateSiteAction(data: Partial<SiteData>) {
  const currentData = await getSiteData();
  const newData = { ...currentData, ...data };

  // Sync to local for dev
  const DATA_PATH = path.join(process.cwd(), 'src/data/content.json');
  try { await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2)); } catch(e) {}

  // Sync to GitHub for production/persistence
  await commitToGitHub('src/data/content.json', JSON.stringify(newData, null, 2), 'chore: update site content from admin');

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `public/uploads/${filename}`;
    
    // 1. Local Save (Dev)
    const localDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(localDir, { recursive: true });
    await fs.writeFile(path.join(localDir, filename), buffer);

    // 2. GitHub Sync (Prod)
    const success = await commitToGitHub(filePath, buffer, `assets: upload image ${filename}`);

    return { 
      success: true, 
      url: `/uploads/${filename}`,
      synced: !!success
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: 'Failed to upload image' };
  }
}
