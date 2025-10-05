"use client";

import { useState } from "react"
import Link from "next/link"

interface Artwork {
  id: number;
  title: string;
  artist: string;
  price: string;
  category: string;
  imageUrl: string;
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: "Meridian",
    artist: "Elena Voss",
    price: "€2,400",
    category: "Painting",
    imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=800&fit=crop"
  },
  {
    id: 2,
    title: "Ephemeral Forms",
    artist: "Marcus Chen",
    price: "€3,200",
    category: "Sculpture",
    imageUrl: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&h=800&fit=crop"
  },
  {
    id: 3,
    title: "Silent Resonance",
    artist: "Aria Mondrian",
    price: "€1,800",
    category: "Print",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=800&fit=crop"
  },
  {
    id: 4,
    title: "Urban Solitude",
    artist: "James Keller",
    price: "€2,900",
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=800&fit=crop"
  },
  {
    id: 5,
    title: "Chromatic Dreams",
    artist: "Sofia Russo",
    price: "€4,100",
    category: "Painting",
    imageUrl: "https://images.unsplash.com/photo-1578926078451-e3e5efb61750?w=800&h=800&fit=crop"
  },
  {
    id: 6,
    title: "Textured Horizons",
    artist: "Liam Zhang",
    price: "€2,650",
    category: "Mixed Media",
    imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=800&fit=crop"
  },
  {
    id: 7,
    title: "Interplay",
    artist: "Nina Bergström",
    price: "€3,500",
    category: "Painting",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop"
  },
  {
    id: 8,
    title: "Void & Form",
    artist: "Thomas Wilde",
    price: "€5,200",
    category: "Sculpture",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop"
  }
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", "Painting", "Sculpture", "Print", "Photography", "Mixed Media"];

  const filteredArtworks = selectedCategory === "All"
    ? artworks
    : artworks.filter(art => art.category === selectedCategory);

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'rgb(251, 249, 237)' }}>
      {/* Minimalist Header */}
      <header className="sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(251, 249, 237, 0.95)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Main Navigation */}
          <div className="flex justify-between items-center py-5 border-b" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
            <Link
              href="/"
              className="font-cormorant text-lg tracking-wide text-gray-900 hover:text-gray-600 transition-colors"
            >
              giulia milesi
            </Link>

            <nav className="hidden md:flex space-x-10">
              <Link href="/" className="font-cormorant text-sm uppercase tracking-wider text-gray-900 hover:text-gray-600 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="font-cormorant text-sm uppercase tracking-wider text-gray-900 hover:text-gray-600 transition-colors">
                Shop
              </Link>
              <Link href="/#about" className="font-cormorant text-sm uppercase tracking-wider text-gray-900 hover:text-gray-600 transition-colors">
                About
              </Link>
            </nav>
          </div>

          {/* Secondary Navigation - Categories */}
          <div className="flex justify-center items-center py-4 border-b" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
            <nav className="flex space-x-8 md:space-x-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`font-cormorant text-sm uppercase tracking-wider transition-all duration-300 relative ${
                    selectedCategory === category
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <span className="absolute -bottom-4 left-0 right-0 h-px bg-gray-900"></span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
        {/* Page Title with Green Accent */}
        <div className="text-center mb-16 md:mb-20">
          <h1
            className="font-alvara-sans text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide"
            style={{ color: 'rgb(20, 154, 57)' }}
          >
            Curated Artworks
          </h1>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-square mb-6 overflow-hidden bg-gray-100">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Product Info - Centered */}
              <div className="text-center space-y-2">
                <h3 className="font-cormorant text-lg md:text-xl text-gray-900">
                  {artwork.title}
                </h3>
                <p className="font-cormorant text-sm text-gray-600">
                  {artwork.artist}
                </p>
                <p className="font-cormorant text-sm text-gray-900 pt-1">
                  {artwork.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 mt-20 border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
        <div className="text-center">
          <p className="font-cormorant text-xs uppercase tracking-wider text-gray-600">
            For inquiries{' '}
            <a
              href="mailto:giulia@giuliamilesi.com"
              className="underline hover:text-gray-900 transition-colors"
            >
              giulia@giuliamilesi.com
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
