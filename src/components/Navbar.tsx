import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Helper function to dynamically load Google Fonts
export const loadGoogleFont = (fontName) => {
  const formattedFontName = fontName.replace(/\s+/g, '+'); // Replace spaces with '+'
  const fontLink = `https://fonts.googleapis.com/css2?family=${formattedFontName}&display=swap`;

  // Check if the font is already loaded
  if (!document.querySelector(`link[href="${fontLink}"]`)) {
    const link = document.createElement('link');
    link.href = fontLink;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const { isEditor } = useAuth();

  // Load Google Font for Navbar items
  useEffect(() => {
    loadGoogleFont('Emilys Candy');
    loadGoogleFont('Fredericka the Great');
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Team', href: '/team' },
    { name: 'Hackathon', href: '/hackathon' },
    { name: 'Join Us', href: '/recruitment' },
    { name: 'Contact', href: '/contact' },
     // Hackathon button links directly to the Overview page
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <span
                className={`text-4xl font-bold transition-all duration-300 ${
                  scrolled ? 'text-amber-400' : 'text-amber-400'
                }`}
                style={{
                  fontFamily: "'Fredericka the Great', feeling", // Example font for the logo
                }}
              >
                ABC Club
              </span>
            </Link>
          </div>

          {/* Menu button - moved to the right */}
          <div className="absolute right-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-all duration-300 ${
                scrolled ? 'text-amber-400' : 'text-amber-400'
              } hover:text-amber-300`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      <div
        className={`absolute w-full transform transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        } ${scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-black'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap justify-center items-center gap-4 lg:gap-6">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <Link
                  to={item.href}
                  className={`text-center py-2 px-4 text-lg font-medium transform transition-all duration-500 ${
                    location.pathname === item.href
                      ? 'text-amber-400'
                      : 'text-white hover:text-amber-400'
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    fontFamily: "'Emilys Candy', cursive", // Apply the loaded font here
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Link
                to="/login"
                className="text-center py-2 px-6 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"
                style={{
                  fontFamily: "'Emilys Candy', cursive", // Apply the loaded font here
                }}
                onClick={() => setIsOpen(false)}
              >
                {isEditor ? 'Dashboard' : 'Login'}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
