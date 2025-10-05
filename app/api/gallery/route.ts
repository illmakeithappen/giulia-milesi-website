import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const galleryPath = path.join(process.cwd(), 'public', 'gallery');

  try {
    const files = fs.readdirSync(galleryPath);

    const mediaFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.webm'].includes(ext);
      })
      .map(file => {
        const ext = path.extname(file).toLowerCase();
        const isVideo = ['.mp4', '.mov', '.webm'].includes(ext);

        return {
          filename: file,
          type: isVideo ? 'video' : 'image'
        };
      });

    return NextResponse.json(mediaFiles);
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return NextResponse.json([]);
  }
}
