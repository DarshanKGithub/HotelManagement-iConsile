import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function PasswordInput({ value, onChange, placeholder, name, register }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className="w-full p-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none placeholder:text-white text-white"
        {...register(name)}
      />
      <div
        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        onClick={handleToggle}
      >
        {showPassword ? <FaEyeSlash className="text-slate-100" /> : <FaEye className="text-slate-100" />}
      </div>
    </div>
  );
}

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
        const response = await axios.post('http://localhost:3000/api/login', data);
        Cookies.set('token', response.data.token, { expires: 7 });
        navigate('/home');
    } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
        alert('Login failed: ' + (error.response?.data.message || error.message));
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="flex items-center justify-center h-full py-48">
      <div className="w-full max-w-md bg-transparent p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-white font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register('email', { required: 'Email is required' })}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-slate-100 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <PasswordInput
              placeholder="Enter your password"
              name="password"
              register={register} 
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-right">
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => navigate('/forgot')}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`w-24 bg-red-500 -my-12 text-white font-bold py-2 px-2 rounded-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
