import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

export default function Recruitment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-gray-400">
            We're looking for passionate individuals to join our community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border-2 border-yellow-600/50 hover:border-yellow-400 transition-all duration-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
            </div>

            {/* Enrollment Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Enrollment Number</label>
              <input
                {...register('enrollmentNumber', { required: 'Enrollment Number is required' })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your enrollment number"
              />
              {errors.enrollmentNumber && (
                <p className="mt-1 text-sm text-red-400">{errors.enrollmentNumber.message}</p>
              )}
            </div>

            {/* IFHE Mail */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">IFHE Mail</label>
              <input
                type="email"
                {...register('ifheMail', {
                  required: 'IFHE Mail is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@ifheindia\.org$/i,
                    message: 'Invalid IFHE mail',
                  },
                })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your IFHE email"
              />
              {errors.ifheMail && <p className="mt-1 text-sm text-red-400">{errors.ifheMail.message}</p>}
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
              <input
                type="tel"
                {...register('contactNumber', { required: 'Contact number is required' })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your contact number"
              />
              {errors.contactNumber && (
                <p className="mt-1 text-sm text-red-400">{errors.contactNumber.message}</p>
              )}
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Academic Year</label>
              <select
                {...register('academicYear', { required: 'Please select an academic year' })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select your academic year</option>
                <option value="1st">1st year</option>
                <option value="2nd">2nd year</option>
                <option value="3rd">3rd year</option>
                <option value="4th">4th year</option>
              </select>
              {errors.academicYear && (
                <p className="mt-1 text-sm text-red-400">{errors.academicYear.message}</p>
              )}
            </div>

            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Branch</label>
              <select
                {...register('branch', { required: 'Please select your branch' })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select your branch</option>
                <option value="BTECH">BTECH</option>
                <option value="BCA">BCA</option>
                <option value="BSC">BSC</option>
              </select>
              {errors.branch && <p className="mt-1 text-sm text-red-400">{errors.branch.message}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
              <textarea
                {...register('experience')}
                rows={4}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                placeholder="Tell us about your relevant experience..."
              ></textarea>
            </div>

            {/* Preferred Domain */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Domain</label>
              <select
                {...register('preferredDomain', { required: 'Please select a preferred domain' })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select a domain</option>
                <option value="technical">Technical</option>
                <option value="poster-making">Poster Making</option>
                <option value="administration">Administration</option>
                <option value="event-management">Event Management</option>
                <option value="social-media">Social Media and Marketing</option>
                <option value="documentation">Documentation</option>
              </select>
              {errors.preferredDomain && (
                <p className="mt-1 text-sm text-red-400">{errors.preferredDomain.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98]"
              >
                Submit Application
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
