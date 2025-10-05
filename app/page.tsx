"use client";

import { useEffect, useState } from "react"

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Add fade in effect when page loads
    setTimeout(() => setIsLoaded(true), 100);

    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-black">
      {/* Video Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <div
          className="absolute inset-0 scale-110"
          style={{
            transform: `scale(1.1) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src="/sample-video-optimized.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          {/* Name with authentic signature font and animation */}
          <div className={`${isLoaded ? 'animate-signature-write' : 'opacity-0'}`}>
            <h1
              className="font-allura text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-normal text-white mb-6 cursor-default transition-all duration-500"
              style={{
                transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
                letterSpacing: '-0.08em',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.1)',
                filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.2))',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              Giulia Milesi
            </h1>
          </div>

          {/* Subtitle with delayed animation - smaller and more subtle */}
          <div className={`transition-all duration-[2000ms] delay-[2500ms] ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <p className="font-cormorant text-base md:text-lg lg:text-xl font-light tracking-[0.4em] uppercase text-white/70">
              Art Consultant
            </p>
          </div>

          {/* Scroll Indicator - Very subtle */}
          <div className={`absolute bottom-16 transition-all duration-[3000ms] delay-[3000ms] ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="animate-bounce">
              <svg
                className="w-4 h-4 text-white/40"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section id="portfolio" className="bg-white py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="font-satisfy text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
              Curated Collection
            </h2>
            <p className="font-cormorant text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Discover exceptional artworks from contemporary masters and emerging talents,
              carefully selected for discerning collectors.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { id: 1, title: "Abstract Expressionism", artist: "Various Artists" },
              { id: 2, title: "Contemporary Sculpture", artist: "Selected Works" },
              { id: 3, title: "Modern Photography", artist: "Curated Collection" },
              { id: 4, title: "Digital Art", artist: "New Media" },
              { id: 5, title: "Mixed Media", artist: "Featured Artists" },
              { id: 6, title: "Fine Art Prints", artist: "Limited Editions" }
            ].map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden cursor-pointer aspect-square bg-gray-100"
              >
                <img
                  src={`https://source.unsplash.com/800x800/?art,gallery,${item.id}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-cormorant text-2xl text-white mb-2 font-medium">{item.title}</h3>
                    <p className="font-cormorant text-lg text-white/80">{item.artist}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-kaushan text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
              Services
            </h2>
            <p className="font-cormorant text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive art consultancy services tailored to your collection goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="font-cormorant text-2xl text-gray-900 mb-4 font-semibold">Art Curation</h3>
              <p className="font-cormorant text-lg text-gray-600 leading-relaxed">
                Thoughtful selection of artworks that reflect your aesthetic vision and investment objectives
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-cormorant text-2xl text-gray-900 mb-4 font-semibold">Collection Management</h3>
              <p className="font-cormorant text-lg text-gray-600 leading-relaxed">
                Professional oversight of your art collection including documentation and conservation
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-cormorant text-2xl text-gray-900 mb-4 font-semibold">Advisory Services</h3>
              <p className="font-cormorant text-lg text-gray-600 leading-relaxed">
                Expert guidance on acquisitions, valuations, and strategic collection development
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-alex-brush text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-8">
            Let's Connect
          </h2>
          <p className="font-cormorant text-xl md:text-2xl text-gray-600 mb-12">
            Begin your journey into the world of contemporary art
          </p>
          <div className="flex justify-center space-x-12">
            <a
              href="mailto:giulia@giuliamilesi.com"
              className="group font-cormorant text-lg text-gray-900 hover:text-gray-600 transition-colors duration-300"
            >
              <span className="relative">
                Email
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </a>
            <a
              href="https://instagram.com/giuliamilesi"
              target="_blank"
              rel="noopener noreferrer"
              className="group font-cormorant text-lg text-gray-900 hover:text-gray-600 transition-colors duration-300"
            >
              <span className="relative">
                Instagram
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </a>
            <a
              href="https://linkedin.com/in/giuliamilesi"
              target="_blank"
              rel="noopener noreferrer"
              className="group font-cormorant text-lg text-gray-900 hover:text-gray-600 transition-colors duration-300"
            >
              <span className="relative">
                LinkedIn
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}