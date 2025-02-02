import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Github,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('http://localhost:5000/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Send message error:', error);
      setStatus('error');
      // Reset error message after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-400">
            Get in touch with us for any inquiries or collaborations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-blue-900/50"
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-blue-400 mr-4" />
                <div>
                  <p className="text-white">Call Us</p>
                  <p className="mt-2">
                    <a 
                      className="text-gray-400 hover:text-yellow-500 underline" 
                      href="tel:+919949169108"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Call Banala Nithya"
                    >
                      Banala Nithya: +91 9949169108
                    </a>
                  </p>
                  <p className="mt-2">
                    <a 
                      className="text-gray-400 hover:text-yellow-500 underline" 
                      href="tel:+919014825007"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Call Sri Harshith"
                    >
                      Sri Harshith: +91 9014825007
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-blue-400 mr-4" />
                <div>
                  <p className="text-white">Email Us</p>
                  <p className="mt-2">
                    <a 
                      className="text-gray-400 hover:text-yellow-500 underline" 
                      href="mailto:abcclub.icfaitech@ifheindia.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Send us an email"
                    >
                      abcclub.icfaitech@ifheindia.org
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/abc._.club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                  aria-label="Visit our Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/abc-club-b01830332/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-900 transition-colors"
                  aria-label="Visit our LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://github.com/ABC-Club-ICFAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Visit our GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-blue-900/50"
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              {status === 'success' && (
                <div className="text-green-500 text-center bg-green-500/10 py-2 rounded">
                  Message sent successfully!
                </div>
              )}

              {status === 'error' && (
                <div className="text-red-500 text-center bg-red-500/10 py-2 rounded">
                  Failed to send message. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                  status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Mail className="w-5 h-5" />
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}