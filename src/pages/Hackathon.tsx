import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, Clock, Trophy, Lightbulb, Target, Upload, X, Edit2, Trash2 } from 'lucide-react';
import SaveButton from '../components/SaveButton';
import { motion } from 'framer-motion';
import { api } from '../utils/api';
import { handleApiError } from '../types/errors';

interface HackathonState {
  posterImage: string;
  isEditingPoster: boolean;
  hasChanges: boolean;
}

interface TeamData {
  teamName: string;
  members: string[];
  problemId: string;
}

const hackathonApi = {
  register: (teamData: TeamData) => 
    api.post('/hackathon/register', teamData),
  
  getProblems: () => 
    api.get('/hackathon/problems'),
  
  submitSolution: (teamId: string, problemId: string, solution: string) =>
    api.post('/hackathon/submit', { teamId, problemId, solution })
};

const Hackathon: React.FC = () => {
  const { isEditor } = useAuth();
  const [posterImage, setPosterImage] = useState<string>('/hackathon-poster.jpg');
  const [isEditingPoster, setIsEditingPoster] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Load poster from localStorage on mount
  useEffect(() => {
    const savedPoster = localStorage.getItem('hackathonPoster');
    if (savedPoster) {
      setPosterImage(savedPoster);
    }
  }, []);

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterImage(reader.result as string);
        setIsEditingPoster(false);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePoster = () => {
    if (window.confirm('Are you sure you want to remove this poster?')) {
      setPosterImage('/hackathon-poster.jpg');
      localStorage.removeItem('hackathonPoster');
      setHasChanges(true);
    }
  };

  const handleSaveChanges = async () => {
    try {
      localStorage.setItem('hackathonPoster', posterImage);
      setHasChanges(false);
      alert('Poster saved successfully!');
    } catch (error) {
      const apiError = handleApiError(error);
      alert(apiError.message);
    }
  };

  // Update hasChanges whenever posterImage changes
  useEffect(() => {
    if (posterImage !== '/hackathon-poster.jpg') {
      setHasChanges(true);
    }
  }, [posterImage]);

  const handleRegistration = async (teamData: TeamData) => {
    try {
      await hackathonApi.register(teamData);
      alert('Team registered successfully!');
    } catch (error) {
      const apiError = handleApiError(error);
      alert(apiError.message);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Poster */}
        <div className="relative mb-16 rounded-2xl overflow-hidden">
          <img 
            src={posterImage}
            alt="Hackathon 2024" 
            className="w-full h-[500px] object-cover"
          />
          {isEditor && (
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              {isEditingPoster ? (
                <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg">
                  <label className="cursor-pointer flex items-center gap-2 text-white">
                    <Upload className="w-5 h-5" />
                    <span>Upload New Poster</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePosterUpload}
                    />
                  </label>
                  <button
                    onClick={() => setIsEditingPoster(false)}
                    className="mt-2 text-red-400 hover:text-red-300 flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditingPoster(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Edit2 className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleRemovePoster}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Remove</span>
                  </button>
                </>
              )}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-8 w-full">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                ABC Club Hackathon 2024
              </h1>
              <p className="text-gray-200 text-lg mb-8 max-w-2xl">
                Join us for an exciting 24-hour coding challenge and turn your innovative ideas into reality
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center text-gray-200">
                  <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                  <span>March 15-16, 2024</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <Clock className="h-5 w-5 mr-2 text-blue-400" />
                  <span>24 Hours</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                  <a 
                    href="https://maps.google.com/?q=IcfaiTech+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    IcfaiTech Campus
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">About The Hackathon</h2>
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-blue-900/50">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              ABC Club Hackathon is a 24-hour coding marathon where innovative minds come together to solve real-world problems. 
              This event provides a platform for students to showcase their technical skills, creativity, and problem-solving abilities.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you're a beginner or an experienced developer, this hackathon offers an opportunity to learn, collaborate, 
              and create something meaningful while competing for exciting prizes.
            </p>
          </div>
        </div>

        {/* Why Participate Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Participate?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-blue-900/50">
              <Trophy className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Win Prizes</h3>
              <p className="text-gray-400">
                Compete for prizes worth ₹50,000 and get recognized for your innovative solutions
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-blue-900/50">
              <Lightbulb className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Learn & Grow</h3>
              <p className="text-gray-400">
                Gain hands-on experience, learn new technologies, and enhance your skills
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-blue-900/50">
              <Target className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Network</h3>
              <p className="text-gray-400">
                Connect with like-minded individuals, mentors, and industry professionals
              </p>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How it Works</h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Register Your Team',
                description: 'Form a team of 2-4 members and register through our portal'
              },
              {
                step: '2',
                title: 'Choose Your Problem Statement',
                description: 'Select from multiple problem statements across different domains'
              },
              {
                step: '3',
                title: 'Code & Create',
                description: 'Work on your solution during the 24-hour hackathon period'
              },
              {
                step: '4',
                title: 'Present & Win',
                description: 'Present your solution to judges and win exciting prizes'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-gray-900/30 p-6 rounded-lg"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Participate?</h2>
          <p className="text-gray-400 mb-8">
            Start your journey by registering your team now
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/hackathon/register"
              className="button-28 inline-block px-6 py-3 text-base font-semibold rounded-xl
                border-2 border-blue-600 text-blue-600
                hover:bg-blue-600 hover:text-white
                transition-all duration-300 ease-in-out
                min-h-0 min-w-0 w-auto
                hover:shadow-lg hover:shadow-blue-600/20
                active:transform active:translate-y-0
                disabled:pointer-events-none"
            >
              Register Now
            </Link>
            <p className="text-gray-400">
              Already registered? <Link to="/hackathon/login" className="text-blue-400 hover:text-blue-300">Login here</Link> to view problem statements
            </p>
          </div>
        </div>

        {/* Editor Actions */}
        {isEditor && (
          <div className="flex justify-center gap-4 mt-8">
            <Link
              to="/hackathon/problems"
              className="button-28 inline-block px-6 py-3 text-base font-semibold rounded-xl
                border-2 border-purple-600 text-purple-600
                hover:bg-purple-600 hover:text-white
                transition-all duration-300 ease-in-out
                min-h-0 min-w-0 w-auto
                hover:shadow-lg hover:shadow-purple-600/20
                active:transform active:translate-y-0
                disabled:pointer-events-none"
            >
              Manage Problems
            </Link>
            <Link
              to="/hackathon/manage-registrations"
              className="button-28 inline-block px-6 py-3 text-base font-semibold rounded-xl
                border-2 border-green-600 text-green-600
                hover:bg-green-600 hover:text-white
                transition-all duration-300 ease-in-out
                min-h-0 min-w-0 w-auto
                hover:shadow-lg hover:shadow-green-600/20
                active:transform active:translate-y-0
                disabled:pointer-events-none"
            >
              View Registrations
            </Link>
          </div>
        )}

        {/* Show save button when there are changes and user is editor */}
        {hasChanges && isEditor && (
          <SaveButton onSave={handleSaveChanges} />
        )}
      </div>
    </div>
  );
};

export default Hackathon;