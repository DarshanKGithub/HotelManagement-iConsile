import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Directly navigate to the admin dashboard
        setTimeout(() => {
            navigate('/admin');
        }, 1000); // Simulate a delay for better UX
    };

    return (
        <div className="flex items-center justify-center h-full p-56 text-white">
            <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-lg w-full max-w-md ">
                <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded-lg text-white bg-transparent border border-gray-600"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6 relative">
                    <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded-lg text-white  border border-gray-600 bg-transparent"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6 text-gray-400"
                    >
                        {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </button>
                </div>
                <button
                    type="submit"
                    className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
