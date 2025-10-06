"use client";

import { useEffect, useState } from "react"
import Gallery from "./components/Gallery"

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    // Add fade in effect when page loads
    setTimeout(() => setIsLoaded(true), 100);

    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    // Track scroll position to hide elements at bottom on mobile
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        setIsAtBottom(false);
        return;
      }

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      // Check if we're within 300px of the bottom (increased for earlier fade)
      const isBottom = scrollHeight - scrollTop - clientHeight < 300;
      setIsAtBottom(isBottom);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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
              src="/IMG_6964.MOV"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

        {/* Expanding Circle Menu */}
        {/* Menu Circle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`fixed top-8 right-8 md:top-12 md:right-12 z-50 w-20 h-20 md:w-28 md:h-28 rounded-full bg-white transition-all md:duration-300 duration-150 hover:scale-110 ${isMenuOpen ? 'opacity-0 scale-0' : isAtBottom ? 'opacity-0 md:opacity-100' : isLoaded ? 'opacity-100' : 'opacity-0'} flex items-center justify-center`}
          style={{
            transitionDelay: isMenuOpen ? '0ms' : '1500ms',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            mixBlendMode: 'difference',
          }}
        >
          <span className="font-permanent-marker text-xl md:text-2xl text-black lowercase">menu</span>
        </button>

        {/* Expanding Circle Background - Liquid Zoom Effect */}
        <div
          className={`fixed rounded-full transition-all w-20 h-20 md:w-28 md:h-28 top-8 right-8 md:top-12 md:right-12 ${isMenuOpen ? 'z-40' : '-z-10 opacity-0'}`}
          style={{
            backgroundColor: 'rgb(240, 244, 248)',
            transform: isMenuOpen ? 'scale(40)' : 'scale(1)',
            transformOrigin: 'center center',
            transition: isMenuOpen
              ? 'transform 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.1s ease-out'
              : 'transform 0.6s cubic-bezier(0.6, 0.04, 0.98, 0.335), opacity 0.3s ease-in 0.4s',
          }}
        />

        {/* Full-Screen Menu Content */}
        <div className={`fixed inset-0 z-40 flex items-center justify-end transition-all duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 md:top-12 md:right-12 w-20 h-20 md:w-28 md:h-28 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              transitionDelay: isMenuOpen ? '400ms' : '0ms',
            }}
          >
            <span className="font-permanent-marker text-xl md:text-2xl lowercase">close</span>
          </button>

          {/* Menu Items - Right Aligned */}
          <nav className="pr-12 md:pr-24 lg:pr-32" style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}>
            <ul className="flex flex-col space-y-6 md:space-y-10 items-end text-right">
              <li style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }} className={`transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <a
                  href="#work"
                  className="font-alvara-sans text-3xl md:text-5xl lg:text-6xl text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  work
                </a>
              </li>
              <li style={{ transitionDelay: isMenuOpen ? '500ms' : '0ms' }} className={`transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <a
                  href="#events"
                  className="font-alvara-sans text-3xl md:text-5xl lg:text-6xl text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  events & talks
                </a>
              </li>
              <li style={{ transitionDelay: isMenuOpen ? '600ms' : '0ms' }} className={`transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <a
                  href="#consulting"
                  className="font-alvara-sans text-3xl md:text-5xl lg:text-6xl text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  consulting
                </a>
              </li>
              <li style={{ transitionDelay: isMenuOpen ? '700ms' : '0ms' }} className={`transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <a
                  href="#about"
                  className="font-alvara-sans text-3xl md:text-5xl lg:text-6xl text-gray-900 hover:text-gray-600 transition-colors duration-300 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  about
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Clickable Circle Navigation - Lower Left */}
        <a
          href="/shop"
          className={`fixed bottom-8 left-8 md:bottom-12 md:left-12 z-50 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white transition-all md:duration-300 duration-150 hover:scale-110 ${isAtBottom ? 'opacity-0 md:opacity-100' : isLoaded ? 'opacity-100' : 'opacity-0'} flex items-center justify-center`}
          style={{
            transitionDelay: '1800ms',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            mixBlendMode: 'difference',
          }}
        >
          <span className="font-permanent-marker text-3xl md:text-4xl text-black lowercase">shop</span>
        </a>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          {/* Name with artsy font and animation - now sticky */}
          <div
            className={`fixed top-1/2 md:top-[70%] left-8 md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 z-[100] transition-all duration-300 ${isAtBottom ? 'opacity-0 md:opacity-100' : isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: typeof window !== 'undefined' && window.innerWidth >= 768
                ? `translate(calc(-50% + ${mousePosition.x * 0.2}px), calc(-50% + ${mousePosition.y * 0.2}px))`
                : 'translate(0, -50%)',
              filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.2))',
            }}
          >
            <h1
              className="font-permanent-marker text-7xl md:text-[9rem] lg:text-[13rem] xl:text-[15rem] mb-6 leading-tight lowercase text-left md:text-center"
              style={{
                WebkitTextStroke: '4px white',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                transform: 'rotate(-3deg) skewY(-2deg)',
                letterSpacing: '0.08em',
              }}
            >
              giulia<br />milesi
            </h1>
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

      {/* Gallery Section */}
      <Gallery />

    </main>
  );
}