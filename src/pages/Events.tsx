import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const events = [
  {
    id: '1',
    title: 'AI Workshop 2024',
    date: '2024-03-25',
    time: '14:00',
    location: 'Main Auditorium',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c',
    description:
      'Join us for an intensive workshop on the latest AI technologies and their applications.',
  },
  {
    id: '2',
    title: 'Data Science Hackathon',
    date: '2024-04-15',
    time: '09:00',
    location: 'Innovation Hub',
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0',
    description:
      'A 24-hour hackathon focused on solving real-world problems using data science.',
  },
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-lg rounded-xl overflow-hidden border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-6">{event.description}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                  Register Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}