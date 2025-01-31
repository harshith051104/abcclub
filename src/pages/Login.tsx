import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User } from 'lucide-react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, register, isEditor, isUser } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isEditor) {
      navigate('/events');
    } else if (isUser) {
      navigate('/'); // Redirect users to home page
    }
  }, [isEditor, isUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignUp) {
      // Sign up validation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      try {
        await register(formData.name, formData.email, formData.password);
        setSuccess('Account created successfully! Please log in.');
        // Switch to login mode after successful registration
        setTimeout(() => {
          setIsSignUp(false);
          setFormData(prev => ({
            ...prev,
            name: '',
            confirmPassword: ''
          }));
          setSuccess('');
        }, 2000);
      } catch (_error: unknown) {
        setError('Failed to create account. Email might already be registered.');
      }
    } else {
      // Login
      try {
        await login(formData.email, formData.password);
      } catch (_error: unknown) {
        setError('Invalid credentials');
      }
    }
  };

  // If already logged in, don't show the login page
  if (isEditor || isUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-black to-blue-900">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-lg border border-gray-800">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white mb-2">
              {isSignUp ? 'Create your account' : 'Sign in to your account'}
            </h2>
            <p className="text-gray-400">
              {isSignUp 
                ? 'Already have an account?' 
                : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                }}
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-center bg-red-500/10 py-2 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-500 text-center bg-green-500/10 py-2 rounded">
                {success}
              </div>
            )}

            <div className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={isSignUp}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Password"
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={isSignUp}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isSignUp ? 'Create Account' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;