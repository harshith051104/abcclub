import React from "react";
import { MapPin, Instagram, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Logo and Address */}
          <div>
            <img
              src="src/components/g10328.png"
              alt="ABC Club Logo"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-2xl font-bold text-white">ABC Club</h3>
            <p className="text-lg text-gray-400">AnyBody Can Code Club</p>
            <h4 className="text-xl font-bold text-white mt-4 flex items-center">
              <MapPin size={20} className="mr-2" />
              Location
            </h4>
            <p className="text-gray-400">
              Address: Survey No. 156/157, IFHE-IBS Campus, Donthanapally
              Shankarapalli Road, Hyderabad, Telangana 501203
            </p>
            <h4 className="text-xl font-bold text-white mt-4">Contact Us</h4>
            <div className="flex space-x-4 mt-2">
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

          {/* Right Column - Offerings */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">What We Offer</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <strong className="text-white">Workshops & Seminars:</strong>{" "}
                Regular events led by industry experts to stay updated with the
                latest trends in DSAI.
              </li>
              <li>
                <strong className="text-white">Hackathons & Competitions:</strong>{" "}
                Test your skills, solve real-world challenges, and collaborate
                with like-minded individuals.
              </li>
              <li>
                <strong className="text-white">Projects & Mentorship:</strong>{" "}
                Gain practical experience through guided projects and mentorship
                from experienced professionals.
              </li>
              <li>
                <strong className="text-white">Networking Opportunities:</strong>{" "}
                Connect with peers, industry leaders, and organizations to build
                meaningful relationships and advance your career.
              </li>
            </ul>
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
