import React from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">ABC Club</h3>
            <p className="text-gray-400">
              Advancing the future through Data Science and Artificial Intelligence
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/events" className="text-gray-400 hover:text-blue-400">
                  Events
                </a>
              </li>
              <li>
                <a href="/recruitment" className="text-gray-400 hover:text-blue-400">
                  Join Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/abc._.club/"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/abc-club-b01830332/"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:anybodycancodeclub@gmail.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} ABC Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}