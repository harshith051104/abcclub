import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { isEditor } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Team', href: '/team' },
    { name: 'Join Us', href: '/recruitment' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50">
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* Center the logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link 
                to="/" 
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-4xl font-bold text-amber-400"
                      style={{ fontFamily: "'DM Serif Display', serif" }}>ABC Club
                </span>

              </Link>
            </div>
            
            {/* Right-aligned menu button */}
            <div className="ml-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-amber-400 hover:text-amber-300 p-2 transition-transform duration-300"
              >
                {isOpen ? <X size={24} className="rotate-90" /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated dropdown menu */}
      <div 
        className={`w-full bg-transparent transform transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center items-center gap-6">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-center py-2 px-4 text-lg font-medium transform transition-all duration-500 ${
                  location.pathname === item.href
                    ? 'text-amber-400'
                    : 'text-amber-300 hover:text-amber-400'
                } ${isOpen 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className={`text-center py-2 px-6 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform ${
                isOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${navigation.length * 50}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {isEditor ? 'Dashboard' : 'Login'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}