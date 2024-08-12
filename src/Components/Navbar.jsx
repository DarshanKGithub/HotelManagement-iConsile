import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hotelsData from '../assets/hotels.json'; // Import your hotels JSON file

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      // Filter the hotels based on the search query
      const filteredHotels = hotelsData.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredHotels);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <div className="relative flex items-center justify-between p-4 shadow-md bg-gray-800">
      {/* DKODER's LOGO */}
      <div 
        className="flex items-center cursor-pointer" 
        onClick={() => navigate('/')}
      >
        <span className="text-2xl text-white font-bold ml-3 hover:text-zinc-900 transition duration-300">
         iConcile
        </span>
      </div>

      {/* SearchBar for searching the hotels */}
      <div className="flex-1 mx-4 relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border bg-transparent border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-100 text-white"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white text-black w-full mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((hotel) => (
              <li
                key={hotel.id}
                onClick={() => {
                  setSearchQuery(hotel.name);
                  navigate(`/hotel/${hotel.id}`); // Navigate to the hotel's page
                }}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {hotel.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <button 
          className="font-semibold text-white text-xl px-4 py-2 border border-transparent rounded-lg hover:text-blue-600 transition duration-300"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button 
          className="font-semibold text-xl text-white px-6 py-2 border border-transparent rounded-lg hover:text-green-600 transition duration-300"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
        <button 
          className="font-semibold text-xl text-white px-6 py-2 border border-transparent rounded-lg hover:text-red-600 transition duration-300"
          onClick={() => navigate('/admin-login')}
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
