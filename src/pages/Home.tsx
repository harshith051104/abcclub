import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Rocket, Users, Calendar } from 'lucide-react';
import EditButton from '../components/EditButton';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isEditor } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-black/50" />
<img
            src="src/pages/frequency-wave-7776034.jpg"
            alt="AI Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          {/* Add image above the heading */}
          <motion.img
            src="src/pages/g10328.png"
            alt="ABC Club Logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-4"
            style={{ width: '550px', height: '550px' }}
          />
          
        

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 mb-8"
          >
            Exploring the frontiers of Data Science and Artificial Intelligence
          </motion.p>
          <motion.div
                      initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="/recruitment"
              className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200"
            >
              Join Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        {/* ... rest of the features section ... */}
      </section>

      {isEditor && (
        <EditButton
          onClick={() => setIsEditing(!isEditing)}
        />
      )}
    </div>
  );
}
