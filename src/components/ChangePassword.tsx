import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ChangePassword = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { changePassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords
    if (newPassword !== confirmPassword) {
      return setError('New passwords do not match');
    }

    if (newPassword.length < 6) {
      return setError('New password must be at least 6 characters');
    }

    if (oldPassword === newPassword) {
      return setError('New password must be different from current password');
    }

    try {
      setLoading(true);
      await changePassword(oldPassword, newPassword);
      alert('Password changed successfully!');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="button-28 inline-block px-6 py-2 text-base font-semibold rounded-xl
                border-2 border-gray-600 text-gray-600
                hover:bg-gray-600 hover:text-white
                transition-all duration-300 ease-in-out
                min-h-0 min-w-0 flex-1
                hover:shadow-lg hover:shadow-gray-600/20
                active:transform active:translate-y-0
                disabled:pointer-events-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="button-28 inline-block px-6 py-2 text-base font-semibold rounded-xl
                border-2 border-blue-600 text-blue-600
                hover:bg-blue-600 hover:text-white
                transition-all duration-300 ease-in-out
                min-h-0 min-w-0 flex-1
                hover:shadow-lg hover:shadow-blue-600/20
                active:transform active:translate-y-0
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword; 