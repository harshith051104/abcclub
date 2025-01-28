import React from "react";
import { motion } from "framer-motion";
import { Brain, Rocket, Users, Calendar } from "lucide-react";
import EditButton from "../components/EditButton";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isEditor } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
          <motion.img
            src="src/pages/g10328.png"
            alt="ABC Club Logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-4"
            style={{ width: "550px", height: "550px" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-300 mb-8 font-[Kantumruy Pro]"
          >
            Connecting Minds, Creating Solutions, Driving Change
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

      {/* About Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl font-[Gabarito] text-white mb-6"
            style={{ fontWeight: "700" }}
          >
            About Us
          </h2>
          <p
            className="text-lg text-gray-300 mb-6 font-[Bodoni Moda]"
            style={{ lineHeight: "1.8" }}
          >
            Welcome to ABC Club – your gateway to exploring the dynamic world of
            Data Science and Artificial Intelligence. At ABC Club, we are a
            passionate community of innovators, learners, and tech enthusiasts
            united by a shared vision of harnessing the power of data and AI to
            drive change.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <Brain size={48} className="text-amber-500 mb-4" />
            <h3
              className="text-2xl font-[Gabarito] text-white mb-2"
              style={{ fontWeight: "600" }}
            >
              Our Vision
            </h3>
            <p className="text-gray-300 font-[Bodoni Moda] text-center">
              To create an innovative platform that bridges the gap between
              theory and practical applications of Data Science and Artificial
              Intelligence.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Rocket size={48} className="text-amber-500 mb-4" />
            <h3
              className="text-2xl font-[Gabarito] text-white mb-2"
              style={{ fontWeight: "600" }}
            >
              Our Mission
            </h3>
            <p className="text-gray-300 font-[Bodoni Moda] text-center">
              To empower individuals with the tools, knowledge, and
              opportunities to excel in the ever-evolving field of data science
              and AI.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Users size={48} className="text-amber-500 mb-4" />
            <h3
              className="text-2xl font-[Gabarito] text-white mb-2"
              style={{ fontWeight: "600" }}
            >
              Why Join Us
            </h3>
            <p className="text-gray-300 font-[Bodoni Moda] text-center">
              Be part of a collaborative community that values learning,
              creativity, and innovation in the realm of AI and data science.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Calendar size={48} className="text-amber-500 mb-4" />
            <h3
              className="text-2xl font-[Gabarito] text-white mb-2"
              style={{ fontWeight: "600" }}
            >
              Get Involved
            </h3>
            <p className="text-gray-300 font-[Bodoni Moda] text-center">
              Join our workshops, hackathons, and mentorship programs to
              kickstart your journey in Data Science and AI.
            </p>
          </div>
        </div>
      </section>

      {isEditor && <EditButton onClick={() => setIsEditing(!isEditing)} />}
    </div>
  );
}
