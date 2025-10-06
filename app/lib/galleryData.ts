// Static gallery media list - update this when adding/removing media files
export interface MediaItem {
  filename: string;
  type: 'image' | 'video';
}

export const galleryMedia: MediaItem[] = [
  { filename: 'IMG_1886.jpg', type: 'image' },
  { filename: 'IMG_2110.jpg', type: 'image' },
  { filename: 'IMG_2130.jpg', type: 'image' },
  { filename: 'IMG_2132.jpg', type: 'image' },
  { filename: 'IMG_3852.jpg', type: 'image' },
  { filename: 'IMG_4489.jpg', type: 'image' },
  { filename: 'IMG_4973.jpg', type: 'image' },
  { filename: 'IMG_4974.jpg', type: 'image' },
  { filename: 'IMG_5965.mp4', type: 'video' },
  { filename: 'IMG_6042.mp4', type: 'video' },
  { filename: 'IMG_6066.jpg', type: 'image' },
  { filename: 'IMG_6067.mp4', type: 'video' },
  { filename: 'IMG_6072.jpg', type: 'image' },
  { filename: 'IMG_7041.mp4', type: 'video' },
  { filename: 'IMG_7526.mp4', type: 'video' },
  { filename: 'IMG_7532.mp4', type: 'video' },
];
