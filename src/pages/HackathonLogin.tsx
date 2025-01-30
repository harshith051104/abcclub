import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HackathonLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    navigate('/hackathon/problems');
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Login to Hackathon
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Username (Email)
            </label>
            <input
              type="email"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
