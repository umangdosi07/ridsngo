import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { galleryImages } from '../data/mock';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Community', 'Women', 'Education', 'Tribal', 'Healthcare'];

  const filteredImages = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-ochre-900">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1601689892697-b64daa00ff6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxydXJhbCUyMEluZGlhJTIwY29tbXVuaXR5fGVufDB8fHx8MTc2NTA1NjU5M3ww&ixlib=rb-4.1.0&q=85"
            alt="Gallery"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 to-stone-900/70" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-ochre-500/20 text-ochre-300 rounded-full text-sm font-medium mb-6">
              Our Gallery
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Moments of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ochre-400 to-terracotta-400"> Impact</span>
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed">
              A visual journey through our work in communities across rural Rajasthan.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === category
                    ? 'bg-terracotta-600 text-white shadow-lg shadow-terracotta-500/25'
                    : 'bg-white text-stone-600 hover:bg-stone-100 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative group cursor-pointer overflow-hidden rounded-xl shadow-lg ${
                  index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                    index === 0 || index === 5 ? 'h-full min-h-[300px] md:min-h-[400px]' : 'h-48 md:h-56'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="px-2 py-1 bg-terracotta-500 text-white text-xs rounded-full">
                    {image.category}
                  </span>
                  <h3 className="text-white font-medium mt-2">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </Button>
          <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="px-3 py-1 bg-terracotta-500 text-white text-sm rounded-full">
                {selectedImage.category}
              </span>
              <h3 className="text-white text-xl font-heading font-bold mt-2">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-terracotta-600 to-ochre-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Want to See Our Work in Person?
          </h2>
          <p className="text-terracotta-100 text-lg mb-8">
            Visit our programs and witness the impact firsthand
          </p>
          <Button size="lg" className="bg-white text-terracotta-700 hover:bg-white/90">
            Schedule a Visit
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
