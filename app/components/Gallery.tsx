"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { galleryMedia, type MediaItem } from "../lib/galleryData";

export default function Gallery() {
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  // Shuffle media items once on mount
  const mediaItems = useMemo(() => {
    return [...galleryMedia].sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    // Setup intersection observer for lazy loading images
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src && !img.src) {
              img.src = src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      },
      { rootMargin: '50px' } // Start loading 50px before entering viewport
    );

    // Setup intersection observer for video autoplay
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            // Load video if not loaded yet
            if (video.readyState === 0) {
              video.load();
            }
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

    // Observe all images
    imageRefs.current.forEach((img) => {
      if (img && img.dataset.src) imageObserver.observe(img);
    });

    // Observe all video elements
    videoRefs.current.forEach((video) => {
      if (video) videoObserver.observe(video);
    });

    return () => {
      imageRefs.current.forEach((img) => {
        if (img) imageObserver.unobserve(img);
      });
      videoRefs.current.forEach((video) => {
        if (video) videoObserver.unobserve(video);
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
    // Load first 4 images immediately, lazy load the rest
    const shouldLazyLoad = actualIndex >= 4;
    const fetchPriority = actualIndex < 4 ? "high" : "auto";

    return (
      <div
        key={item.filename}
        className="relative w-full overflow-hidden"
      >
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-gray-100`}>
          {item.type === 'video' ? (
            <video
              ref={(el) => {
                if (el) videoRefs.current.set(item.filename, el);
              }}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              preload="none"
            >
              <source
                src={`/gallery/${item.filename.replace(/\.MOV$/i, '.mp4')}`}
                type="video/mp4"
              />
              <source
                src={`/gallery/${item.filename}`}
                type={item.filename.toLowerCase().endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}
              />
            </video>
          ) : shouldLazyLoad ? (
            <img
              ref={(el) => {
                if (el) imageRefs.current.set(item.filename, el);
              }}
              data-src={`/gallery/${item.filename}`}
              alt=""
              width="4032"
              height="3024"
              className="w-full h-full object-cover object-center scale-[1.8]"
              style={{ minHeight: '100%', minWidth: '100%' }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <img
              src={`/gallery/${item.filename}`}
              alt=""
              width="4032"
              height="3024"
              className="w-full h-full object-cover object-center scale-[1.8]"
              style={{ minHeight: '100%', minWidth: '100%' }}
              loading="eager"
              decoding="auto"
              fetchPriority={fetchPriority as "high" | "auto"}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="relative z-0 bg-white w-full">
      {/* Gallery Grid - Single column on mobile, two columns on desktop */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Mobile: Single Column */}
        <div className="flex flex-col md:hidden w-full">
          {mediaItems.map((item, index) => {
            // Load first 3 images immediately on mobile, lazy load the rest
            const shouldLazyLoad = index >= 3;
            const mobileFetchPriority = index < 3 ? "high" : "auto";

            return (
              <div key={item.filename} className="relative w-full overflow-hidden">
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                  {item.type === 'video' ? (
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current.set(item.filename, el);
                      }}
                      className="w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      preload="none"
                    >
                      <source
                        src={`/gallery/${item.filename.replace(/\.MOV$/i, '.mp4')}`}
                        type="video/mp4"
                      />
                      <source
                        src={`/gallery/${item.filename}`}
                        type={item.filename.toLowerCase().endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}
                      />
                    </video>
                  ) : shouldLazyLoad ? (
                    <img
                      ref={(el) => {
                        if (el) imageRefs.current.set(`mobile-${item.filename}`, el);
                      }}
                      data-src={`/gallery/${item.filename}`}
                      alt=""
                      width="4032"
                      height="3024"
                      className="w-full h-full object-cover object-center scale-[1.8]"
                      style={{ minHeight: '100%', minWidth: '100%' }}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <img
                      src={`/gallery/${item.filename}`}
                      alt=""
                      width="4032"
                      height="3024"
                      className="w-full h-full object-cover object-center scale-[1.8]"
                      style={{ minHeight: '100%', minWidth: '100%' }}
                      loading="eager"
                      decoding="auto"
                      fetchPriority={mobileFetchPriority as "high" | "auto"}
                    />
                  )}
                </div>
              </div>
            );
          })}

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
