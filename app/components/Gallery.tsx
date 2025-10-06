"use client";

import { useState, useEffect, useRef } from "react";

interface MediaItem {
  filename: string;
  type: 'image' | 'video';
}

export default function Gallery() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  useEffect(() => {
    // Get all media files from the gallery directory
    const loadMedia = async () => {
      try {
        const response = await fetch('/api/gallery');
        const files = await response.json();

        // Shuffle the array for random distribution
        const shuffled = [...files].sort(() => Math.random() - 0.5);
        setMediaItems(shuffled);
      } catch (error) {
        console.error('Error loading media:', error);
      }
    };

    loadMedia();
  }, []);

  useEffect(() => {
    // Setup intersection observer for video autoplay
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay might be blocked, ignore the error
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // Play when 50% of video is visible
    );

    // Observe all video elements
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [mediaItems]);

  // Split items into two columns - 60% left, 40% right
  const leftColumn = mediaItems.filter((_, index) => index % 2 === 0);
  const rightColumn = mediaItems.filter((_, index) => index % 2 === 1);

  // Varying aspect ratios for offset effect - mix of portrait, square, and landscape
  const getAspectRatio = (index: number) => {
    const ratios = [
      'aspect-[4/5]',   // portrait
      'aspect-square',   // square
      'aspect-[5/4]',   // landscape
      'aspect-[3/4]',   // portrait
      'aspect-[16/10]', // wide landscape
      'aspect-[4/3]',   // landscape
      'aspect-[5/6]',   // portrait
      'aspect-[6/5]',   // landscape
    ];
    return ratios[index % ratios.length];
  };

  const renderMediaItem = (item: MediaItem, index: number, isLeftColumn: boolean) => {
    const actualIndex = isLeftColumn ? index * 2 : index * 2 + 1;
    const aspectRatio = getAspectRatio(actualIndex);

    return (
      <div
        key={item.filename}
        className="relative overflow-hidden"
      >
        <div className={`relative w-full ${aspectRatio} overflow-hidden`}>
          {item.type === 'video' ? (
            <video
              ref={(el) => {
                if (el) videoRefs.current.set(item.filename, el);
              }}
              src={`/gallery/${item.filename}`}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={`/gallery/${item.filename}`}
              alt=""
              className="w-full h-full object-cover scale-[1.8]"
              loading="lazy"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white w-full">
      {/* Gallery Grid - Single column on mobile, two columns on desktop */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Mobile: Single Column */}
        <div className="flex flex-col md:hidden w-full">
          {mediaItems.map((item, index) => (
            <div key={item.filename} className="relative overflow-hidden">
              <div className="relative w-full aspect-square overflow-hidden">
                {item.type === 'video' ? (
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current.set(item.filename, el);
                    }}
                    src={`/gallery/${item.filename}`}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={`/gallery/${item.filename}`}
                    alt=""
                    className="w-full h-full object-cover scale-[1.8]"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          ))}

          {/* Mobile CV Section */}
          <div className="p-8 pb-12 bg-[rgb(240,244,248)]">
            <div className="max-w-md mx-auto space-y-8">
              {/* Welcome Note */}
              <div className="space-y-4">
                <h2 className="font-permanent-marker text-3xl lowercase">welcome</h2>
                <p className="font-cormorant text-lg leading-relaxed text-gray-700">
                  Thank you for visiting my creative space. Here you'll find a curated collection of my work, exploring the intersection of art, culture, and contemporary expression.
                </p>
              </div>

              {/* CV Section */}
              <div className="space-y-6 border-t border-gray-200 pt-8">
                <h3 className="font-permanent-marker text-2xl lowercase">about me</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-cormorant font-semibold text-lg">Education</h4>
                    <p className="font-cormorant text-gray-600">MA in Art History, Bocconi University</p>
                    <p className="font-cormorant text-gray-600">BA in Contemporary Art, Milan</p>
                  </div>

                  <div>
                    <h4 className="font-cormorant font-semibold text-lg">Experience</h4>
                    <p className="font-cormorant text-gray-600">Art Consultant & Curator, 2020-Present</p>
                    <p className="font-cormorant text-gray-600">Gallery Director, Spazio Arte, 2018-2020</p>
                  </div>

                  <div>
                    <h4 className="font-cormorant font-semibold text-lg">Specialization</h4>
                    <p className="font-cormorant text-gray-600">Contemporary Art & Emerging Artists</p>
                    <p className="font-cormorant text-gray-600">Private Collection Curation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Two Columns */}
        <>
          {/* Left Column - 55% */}
          <div className="hidden md:flex w-[55%] flex-col">
            {leftColumn.map((item, index) => renderMediaItem(item, index, true))}
          </div>

          {/* Right Column - 45% */}
          <div className="hidden md:flex w-[45%] flex-col">
            {rightColumn.map((item, index) => renderMediaItem(item, index, false))}

            {/* Spacer to position CV text for perfect bottom scroll alignment */}
            <div className="h-[60vh] bg-white" />

            {/* Welcome Note and CV Section */}
            <div className="p-12 pb-12 bg-white">
              <div className="max-w-md space-y-8">
                {/* Welcome Note */}
                <div className="space-y-4">
                  <h2 className="font-permanent-marker text-3xl lowercase">welcome</h2>
                  <p className="font-cormorant text-lg leading-relaxed text-gray-700">
                    Thank you for visiting my creative space. Here you'll find a curated collection of my work, exploring the intersection of art, culture, and contemporary expression.
                  </p>
                </div>

                {/* CV Section */}
                <div className="space-y-6 border-t border-gray-200 pt-8">
                  <h3 className="font-permanent-marker text-2xl lowercase">about me</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-cormorant font-semibold text-lg">Education</h4>
                      <p className="font-cormorant text-gray-600">MA in Art History, Bocconi University</p>
                      <p className="font-cormorant text-gray-600">BA in Contemporary Art, Milan</p>
                    </div>

                    <div>
                      <h4 className="font-cormorant font-semibold text-lg">Experience</h4>
                      <p className="font-cormorant text-gray-600">Art Consultant & Curator, 2020-Present</p>
                      <p className="font-cormorant text-gray-600">Gallery Director, Spazio Arte, 2018-2020</p>
                    </div>

                    <div>
                      <h4 className="font-cormorant font-semibold text-lg">Specialization</h4>
                      <p className="font-cormorant text-gray-600">Contemporary Art & Emerging Artists</p>
                      <p className="font-cormorant text-gray-600">Private Collection Curation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
}
