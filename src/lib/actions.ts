'use server';

import { saveSiteData, getSiteData } from '@/lib/data';
import { SiteData } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function updateSiteAction(data: Partial<SiteData>) {
  const currentData = await getSiteData();
  const newData = { ...currentData, ...data };
  await saveSiteData(newData);
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

    // Sanitize filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Ensure directory exists (just in case)
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    return { 
      success: true, 
      url: `/uploads/${filename}` 
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: 'Failed to upload image' };
  }
}
