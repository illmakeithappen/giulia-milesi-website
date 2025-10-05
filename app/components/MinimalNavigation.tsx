"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MinimalNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled || pathname !== "/"
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Name */}
          <Link
            href="/"
            className={`font-allura text-5xl font-normal tracking-tight transition-colors duration-300 ${
              isScrolled || pathname !== "/" ? "text-gray-900" : "text-white"
            }`}
          >
            GM
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-cormorant text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                  isScrolled || pathname !== "/"
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-[1px] ${
                      isScrolled || pathname !== "/" ? "bg-gray-900" : "bg-white"
                    }`}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden relative w-8 h-8 flex flex-col justify-center items-center ${
              isScrolled || pathname !== "" ? "text-gray-900" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1px] transition-all duration-300 ${
                isScrolled || pathname !== "/" ? "bg-gray-900" : "bg-white"
              } ${isMobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`}
            />
            <span
              className={`block w-6 h-[1px] mt-1.5 transition-all duration-300 ${
                isScrolled || pathname !== "/" ? "bg-gray-900" : "bg-white"
              } ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-[1px] mt-1.5 transition-all duration-300 ${
                isScrolled || pathname !== "/" ? "bg-gray-900" : "bg-white"
              } ${isMobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-20 bg-white shadow-lg transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="px-4 py-8 space-y-4">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-cormorant text-lg tracking-[0.1em] text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}