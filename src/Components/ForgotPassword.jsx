import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Add logic to handle forgot password here
    console.log('Forgot Password for Email:', email);
  };

  return (
    <div className="flex items-center justify-center h-full py-64">
      <div className="w-full max-w-md bg-transparent p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-white font-bold text-center mb-6">Forgot Password</h2>
        
        <form onSubmit={handleForgotPassword}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-slate-100 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaEnvelope className="text-slate-100 mx-3" />
              <input
                type="email"
                id="email"
                className="w-full p-2 focus:outline-none bg-transparent placeholder:text-white text-white"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className=" bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-900 transition duration-300"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
