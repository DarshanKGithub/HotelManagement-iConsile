import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Forgot() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('', {
        token,
        newPassword,
      });
      alert('Password has been reset successfully.');
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-full py-64">
      <div className="w-full max-w-md bg-transparent p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-white font-bold text-center mb-6">Reset Password</h2>
        
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-slate-100 font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none bg-transparent placeholder:text-white text-white"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-100 font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 focus:outline-none bg-transparent border border-gray-200 rounded-lg placeholder:text-white text-white"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-900 transition duration-300"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
