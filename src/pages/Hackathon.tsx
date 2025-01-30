import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

export default function Hackathon({ isEditor = true }) {
  const [posterImage, setPosterImage] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {isEditor && (
          <div className="mb-8">
            <div className="relative">
              {posterImage ? (
                <div className="relative">
                  <img
                    src={posterImage}
                    alt="Hackathon Poster"
                    className="w-full rounded-xl shadow-lg"
                  />
                  <button
                    onClick={() => setPosterImage('')}
                    className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400">Upload Hackathon Poster</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            ABC Hackathon 2024
          </h1>
          
          <div className="space-y-6 text-gray-300">
            <p>
              Join us for an exciting 24-hour hackathon where innovative minds come together
              to solve real-world challenges using AI and technology.
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">Event Details</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Date: March 15-16, 2024</li>
                <li>Duration: 24 Hours</li>
                <li>Venue: ABC Innovation Hub</li>
                <li>Prize Pool: $10,000</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">Why Participate?</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Hands-on experience with cutting-edge technology</li>
                <li>Network with industry experts</li>
                <li>Amazing prizes and goodies</li>
                <li>Certificate of participation</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="/hackathon/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Participate Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
