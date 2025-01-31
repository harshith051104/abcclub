import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store user credentials in localStorage
    const userData = {
      username: username,
      password: password
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Redirect to login page after successful signup
    navigate('/login');
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-sm sm:text-base text-gray-400">Join ABC Club</p>
=======
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-400">Join ABC Club</p>
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
<<<<<<< HEAD
          className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-blue-900/50"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
=======
          className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-blue-900/50"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
                Full Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
<<<<<<< HEAD
                className="w-full px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
=======
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
                placeholder="John Doe"
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
=======
              <label className="block text-sm font-medium text-gray-300 mb-2">
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
                IFHE Email
              </label>
              <input
                type="email"
<<<<<<< HEAD
                className="w-full px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
=======
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
                placeholder="example@ifheindia.org"
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
=======
              <label className="block text-sm font-medium text-gray-300 mb-2">
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
                Create Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
                className="w-full px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
=======
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
                placeholder="••••••••"
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
=======
              <label className="block text-sm font-medium text-gray-300 mb-2">
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
                Confirm Password
              </label>
              <input
                type="password"
<<<<<<< HEAD
                className="w-full px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
=======
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
<<<<<<< HEAD
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
=======
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
            >
              Create Account
            </button>
          </form>

<<<<<<< HEAD
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
=======
          <div className="mt-6 text-center">
            <p className="text-gray-400">
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
              Already have an account?{' '}
              <a
                href="/login"
                className="text-blue-400 hover:text-blue-300"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                Sign in
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default SignUp; 
=======
export default SignUp;
>>>>>>> 8fa918c0c55d9f4680588e3b591486cba22eb5a7
