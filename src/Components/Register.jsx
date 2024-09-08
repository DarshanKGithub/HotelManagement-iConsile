import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  confirmEmail: yup.string().oneOf([yup.ref('email'), null], 'Emails must match').required('Confirm Email is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  password: yup.string().min(8, 'Password must be at least 10 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http//localhost:3000/register', data);
      console.log('Registration successful:', response.data);
      alert('You have successfully created an account!');
      navigate('/home');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-full py-2">
      <div className="w-[750px] bg-transparent p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-white font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-slate-100 font-bold mb-2" htmlFor="username">
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaUser className="text-slate-100 mx-3" />
              <input
                type="text"
                id="username"
                className="w-full p-2 focus:outline-none bg-transparent placeholder:text-white text-white"
                placeholder="Enter your username"
                {...register('username')}
              />
            </div>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

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
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Confirm Email Input */}
          <div className="mb-4">
            <label className="block text-slate-100 font-bold mb-2" htmlFor="confirmEmail">
              Confirm Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaEnvelope className="text-slate-100 mx-3" />
              <input
                type="email"
                id="confirmEmail"
                className="w-full p-2 focus:outline-none bg-transparent placeholder:text-white text-white"
                placeholder="Confirm your email"
                {...register('confirmEmail')}
              />
            </div>
            {errors.confirmEmail && <p className="text-red-500 text-sm mt-1">{errors.confirmEmail.message}</p>}
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label className="block text-slate-100 font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaPhone className="text-slate-100 mx-3" />
              <input
                type="text"
                id="phone"
                className="w-full p-2 focus:outline-none bg-transparent placeholder:text-white text-white"
                placeholder="Enter your phone number"
                {...register('phone')}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-slate-100 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaLock className="text-slate-100 mx-3" />
              <input
                type="password"
                id="password"
                className="w-full p-2 focus:outline-none bg-transparent placeholder:text-white text-white"
                placeholder="Enter your password"
                {...register('password')}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="block text-slate-100 font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaLock className="text-slate-100 mx-3" />
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 focus:outline-none bg-transparent placeholder:text-white text-white"
                placeholder="Re-enter your password"
                {...register('confirmPassword')}
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Register Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
