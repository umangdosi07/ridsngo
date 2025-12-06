import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { ngoInfo } from '../../data/mock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/programs', label: 'Programs' },
    { path: '/impact', label: 'Impact' },
    { path: '/get-involved', label: 'Get Involved' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/news', label: 'News' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-terracotta-700 to-terracotta-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href={`tel:${ngoInfo.phone}`} className="flex items-center gap-1 hover:text-terracotta-100 transition-colors">
              <Phone size={14} />
              <span>{ngoInfo.phone}</span>
            </a>
            <span className="hidden sm:inline">|</span>
            <a href={`mailto:${ngoInfo.email}`} className="hidden sm:block hover:text-terracotta-100 transition-colors">
              {ngoInfo.email}
            </a>
          </div>
          <Link to="/admin/login" className="hover:text-terracotta-100 transition-colors">
            Admin Login
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-terracotta-600 to-ochre-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading text-lg font-bold text-stone-800 leading-tight">
                {ngoInfo.shortName}
              </h1>
              <p className="text-xs text-stone-500">Rajasthan Integrated Development Society</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-terracotta-50 text-terracotta-700'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <Link to="/donate" className="hidden sm:block">
              <Button className="bg-gradient-to-r from-terracotta-600 to-terracotta-500 hover:from-terracotta-700 hover:to-terracotta-600 text-white shadow-lg shadow-terracotta-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-terracotta-500/30 hover:-translate-y-0.5">
                <Heart size={16} className="mr-2" />
                Donate Now
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-stone-100 pt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-terracotta-50 text-terracotta-700'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/donate"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2"
              >
                <Button className="w-full bg-gradient-to-r from-terracotta-600 to-terracotta-500 text-white">
                  <Heart size={16} className="mr-2" />
                  Donate Now
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
