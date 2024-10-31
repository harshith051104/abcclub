import React from 'react';
import { motion } from 'framer-motion';

const galleryItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998',
    title: 'AI Workshop 2023',
    description: 'Students learning about neural networks',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
    title: 'Hackathon Winners',
    description: 'Team Phoenix with their innovative solution',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c',
    title: 'Data Science Seminar',
    description: 'Expert talk on big data analytics',
  },
];

export default function Gallery() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Event Gallery
          </h1>
          <p className="text-gray-400">
            Capturing moments from our amazing events and activities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}