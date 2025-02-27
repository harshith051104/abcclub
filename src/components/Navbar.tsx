import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import ChangePassword from './ChangePassword';

// Helper function to dynamically load Google Fonts
export const loadGoogleFont = (fontName: string) => {
  const formattedFontName = fontName.replace(/\s+/g, '+');
  const fontLink = `https://fonts.googleapis.com/css2?family=${formattedFontName}&display=swap`;

  if (!document.querySelector(`link[href="${fontLink}"]`)) {
    const link = document.createElement('link');
    link.href = fontLink;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
};

// Add this new function to load custom font
const loadCustomFont = () => {
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Anurati';
      src: url('public/fonts/Anurati-Regular.otf') format('opentype');
      font-weight: normal;
      font-style: normal;
    }
  `;
  document.head.appendChild(style);
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const location = useLocation();
  const { isEditor, logout } = useAuth();
  
  // Add refs for navbar and profile menu
  const navbarRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Load Google Font for Navbar items
  useEffect(() => {
    loadGoogleFont('Emilys Candy');
    loadCustomFont();
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

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close navbar if click is outside
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }

      // Close profile menu when clicking outside (original implementation)
      const profileMenu = document.getElementById('profile-menu');
      const profileButton = document.getElementById('profile-button');
      if (
        profileMenu &&
        !profileMenu.contains(event.target as Node) &&
        !profileButton?.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Include Hackathon in base navigation for everyone
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Team', href: '/team' },
    { name: 'Hackathon', href: '/hackathon' },
    { name: 'Join Us', href: '/recruitment' },
    { name: 'Contact', href: '/contact' },
    
  ];

  // Get the user data if available
  const registeredUser = localStorage.getItem('registeredUser');
  const userData = registeredUser ? JSON.parse(registeredUser) : null;
  const userRole = localStorage.getItem('userRole');

  // Function to get display name based on role
  const getDisplayName = () => {
    if (!userData) return '';
    if (userRole === 'admin') return 'ABC Club';
    return userData.name || userData.email;
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* Menu Button - Left on mobile */}
            <div className="sm:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-1.5 transition-all duration-300 text-amber-400 hover:text-amber-300"
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* ABC Club - Left */}
            <div className="sm:relative absolute left-0 right-0 mx-auto sm:mx-0 w-fit">
              <Link to="/" className="block">
                <span
                  className={`text-4xl font-bold transition-all duration-300 ${
                    scrolled ? 'text-amber-400' : 'text-amber-400'
                  }`}
                  style={{
                    fontFamily: "'Anurati', sans-serif",
                    letterSpacing: '0.0em',
                    fontSize: '2.5rem',
                    fontWeight: 'normal',
                    textTransform: 'uppercase'
                  }}
                >
                  ABC
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Centered with proper spacing */}
            <div className="hidden sm:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center justify-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-center py-2 px-1 text-xl font-medium transition-all duration-300 ${
                      location.pathname === item.href
                        ? 'text-amber-400'
                        : 'text-white hover:text-amber-400'
                    }`}
                    style={{
                      fontFamily: "'Emilys Candy', cursive"
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Profile and Login - Right side */}
            <div className="flex items-center">
              {userRole ? (
                <div className="relative">
                  <button
                    id="profile-button"
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setIsOpen(false);
                    }}
                    className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
                      scrolled ? 'bg-amber-400/10' : 'bg-amber-400/10'
                    } hover:bg-amber-400/20`}
                  >
                    <User className="text-amber-400 w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {showProfileMenu && (
                    <div
                      id="profile-menu"
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5"
                    >
                      <div className="py-1">
                        {userData && (
                          <div className="px-4 py-2 text-sm text-amber-400 border-b border-gray-800">
                            {getDisplayName()}
                          </div>
                        )}
                        <button
                          onClick={() => {
                            setShowChangePassword(true);
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-amber-400 hover:bg-amber-400/10"
                        >
                          <Lock className="mr-2" size={16} />
                          Change Password
                        </button>
                        {/* Keep editor-specific links in profile menu */}
                        {isEditor && (
                          <>
                            <Link
                              to="/hackathon/problems"
                              className="flex items-center px-4 py-2 text-sm text-amber-400 hover:bg-amber-400/10"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <Settings className="mr-2" size={16} />
                              Manage Problems
                            </Link>
                          </>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-400/10"
                        >
                          <LogOut className="mr-2" size={16} />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:inline-flex button-28 items-center justify-center px-6 py-2 text-sm font-semibold rounded-xl
                    border-2 border-blue-600 text-blue-600
                    hover:bg-blue-600 hover:text-white
                    transition-all duration-300 ease-in-out
                    min-h-0 min-w-[80px] w-auto
                    hover:shadow-lg hover:shadow-blue-600/20
                    active:transform active:translate-y-0
                    disabled:pointer-events-none"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown menu - Horizontal animation */}
      <div
        className={`absolute w-full transform transition-all duration-500 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
        } ${scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-black'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap justify-center items-center gap-4 lg:gap-6">
            {/* Mobile login button */}
            {!isEditor && !userRole && (
              <Link
                to="/login"
                className="sm:hidden block w-full text-center py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}

            {/* Navigation links */}
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <Link
                  to={item.href}
                  className={`text-center py-2 px-4 text-xl font-medium transform transition-all duration-500 ${
                    location.pathname === item.href
                      ? 'text-amber-400'
                      : 'text-white hover:text-amber-400'
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    fontFamily: "'Emilys Candy', cursive"
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Change password modal */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </nav>
  );
}