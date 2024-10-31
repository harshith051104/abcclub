import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Faculty Advisor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    linkedin: '#',
  },
  {
    id: '2',
    name: 'Alex Thompson',
    role: 'President',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    linkedin: '#',
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    role: 'Technical Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    linkedin: '#',
  },
];

export default function Team() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Our Team
          </h1>
          <p className="text-gray-400">
            Meet the passionate individuals behind ABC Club
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500/20"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {member.name}
                </h3>
                <p className="text-blue-400 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.linkedin}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@abcclub.com`}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}