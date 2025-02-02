import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Rocket, Users, Calendar } from "lucide-react";
import EditButton from "../components/EditButton";
import { useAuth } from "../contexts/AuthContext";
import { loadGoogleFont } from '../components/Navbar';

export default function Home() {
  const { isEditor } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);

  useEffect(() => {
    // Only load Black Han Sans for the tagline
    loadGoogleFont('Black Han Sans');
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-black/50" />
          <img
            src="src/pages/frequency-wave-7776034.jpg"
            alt="AI Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.img
            src="src/pages/g10328.png"
            alt="ABC Club Logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[350px] lg:h-[350px]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-2xl text-gray-300 mb-6 sm:mb-8 font-['Black_Han_Sans'] px-4"
          >
            Insights through innovation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="/recruitment"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition-colors duration-200"
            >
              Join Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-[Gabarito] text-white mb-4 sm:mb-6"
            style={{ fontWeight: "700" }}
          >
            About Us
          </h2>
          <p
            className="text-base sm:text-lg text-gray-300 mb-6 font-[Bodoni Moda] px-4"
            style={{ lineHeight: "1.8" }}
          >
            Welcome to ABC Club – your gateway to exploring the dynamic world of
            Data Science and Artificial Intelligence. At ABC Club, we are a
            passionate community of innovators, learners, and tech enthusiasts
            united by a shared vision of harnessing the power of data and AI to
            drive change.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4">
          {/* Vision Card */}
          <motion.div 
            className="flex flex-col items-center p-6 sm:p-8 bg-gray-900/30 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Brain size={40} className="text-amber-500 mb-4" />
            <h3
              className="text-xl sm:text-2xl font-[Gabarito] text-white mb-2"
              style={{ fontWeight: "600" }}
            >
              Our Vision
            </h3>
            <p className="text-sm sm:text-base text-gray-300 font-[Bodoni Moda] text-center">
              To create an innovative platform that bridges the gap between
              theory and practical applications of Data Science and Artificial
              Intelligence.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            className="flex flex-col items-center p-6 sm:p-8 bg-gray-900/30 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Rocket size={40} className="text-amber-500 mb-4" />
            <h3
              className="text-xl sm:text-2xl font-[Gabarito] text-white mb-2"
              style={{ fontWeight: "600" }}
            >
              Our Mission
            </h3>
            <p className="text-sm sm:text-base text-gray-300 font-[Bodoni Moda] text-center">
              To empower individuals with the tools, knowledge, and
              opportunities to excel in the ever-evolving field of data science
              and AI.
            </p>
          </motion.div>

          {/* Why Join Card */}
          <motion.div 
            className="flex flex-col items-center p-6 sm:p-8 bg-gray-900/30 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Users size={40} className="text-amber-500 mb-4" />
            <h3
              className="text-xl sm:text-2xl font-[Gabarito] text-white mb-2"
              style={{ fontWeight: "600" }}
            >
              Why Join Us
            </h3>
            <p className="text-sm sm:text-base text-gray-300 font-[Bodoni Moda] text-center">
              Be part of a collaborative community that values learning,
              creativity, and innovation in the realm of AI and data science.
            </p>
          </motion.div>

          {/* Get Involved Card */}
          <motion.div 
            className="flex flex-col items-center p-6 sm:p-8 bg-gray-900/30 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Calendar size={40} className="text-amber-500 mb-4" />
            <h3
              className="text-xl sm:text-2xl font-[Gabarito] text-white mb-2"
              style={{ fontWeight: "600" }}
            >
              Get Involved
            </h3>
            <p className="text-sm sm:text-base text-gray-300 font-[Bodoni Moda] text-center">
              Join our workshops, hackathons, and mentorship programs to
              kickstart your journey in Data Science and AI.
            </p>
          </motion.div>
        </div>
      </section>

      {isEditor && <EditButton onClick={() => setIsEditing(!isEditing)} />}
    </div>
  );
}