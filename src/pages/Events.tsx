import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const events = [
  {
    id: '1',
    title: 'AI Art Competition',
    date: '2025-02-28',
    time: '15:30 - 16:50',
    location: 'Main Auditorium',
    image: 'https://www.unite.ai/wp-content/uploads/2024/12/AI-in-Art.png',
    description:
      'Join us for an intensive workshop on the latest AI technologies and their applications.',
  }
];

export default function Events() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          <p className="text-gray-400">
            Join us in our upcoming events and be part of the AI revolution
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            key={events[0].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-lg rounded-xl overflow-hidden border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 max-w-xl w-full"
          >
            <img
              src={events[0].image}
              alt={events[0].title}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {events[0].title}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-400">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(events[0].date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{events[0].time}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{events[0].location}</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">{events[0].description}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                Register Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}