import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import hotelsData from '../assets/hotels.json'; // Import the JSON file
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: ''
  });
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [city, setCity] = useState('');
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]); // State for filtered hotels
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [recommendedHotels, setRecommendedHotels] = useState([]); // State for recommended hotels

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime({
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
      });
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setHotels(hotelsData);
    setFilteredHotels(hotelsData); // Initialize filteredHotels with all hotels

    // Set recommended hotels based on highest ratings
    const recommended = hotelsData
      .sort((a, b) => b.ratings - a.ratings)
      .slice(0, 3); // Recommend top 3 hotels by rating
    setRecommendedHotels(recommended);
  }, []);

  const handleBookNow = (hotel) => {
    navigate('/hotel-details', { state: { hotel } });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Filter hotels based on city and availability
    const filtered = hotels.filter(hotel => {
      const isCityMatch = city ? hotel.city.toLowerCase().includes(city.toLowerCase()) : true;

      // For simplicity, assuming all hotels are available. You would need actual availability data in a real app.
      return isCityMatch;
    });

    setFilteredHotels(filtered);
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (direction === 'left') {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="justify-center p-8 min-h-full relative">
      <h1 className="text-3xl text-red-500 font-bold mb-6 text-center">Hotel Booking Home</h1>

      <div className="mb-6 text-center">
        <p className="text-lg font-semibold text-white">Current Date: {currentDateTime.date}</p>
        <p className="text-lg font-semibold text-white">Current Time: {currentDateTime.time}</p>
      </div>

      <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-transparent p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex-1 min-w-[200px] mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="check-in">
              Check-In Date
            </label>
            <input
              type="date"
              id="check-in"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-2 border border-gray-300 text-white bg-transparent rounded-lg"
            />
          </div>

          <div className="flex-1 min-w-[200px] mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="check-out">
              Check-Out Date
            </label>
            <input
              type="date"
              id="check-out"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-2 border border-gray-300 text-white bg-transparent rounded-lg"
            />
          </div>

          <div className="flex-1 min-w-[200px] mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="city">
              City Location
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="w-full p-2 border border-gray-300 text-white bg-transparent rounded-lg"
            />
          </div>

          <div className="flex items-end mb-4">
            <button
              type="submit"
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8 relative">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Recommended Hotels</h2>
        
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hidden" ref={scrollContainerRef}>
          <div className="flex gap-6">
            {recommendedHotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                className="bg-cover bg-center bg-no-repeat p-2 border border-gray-300 rounded-lg shadow-md w-80 h-64 inline-block"
                style={{ backgroundImage: `url(${hotel.image})` }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleBookNow(hotel)}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="bg-white bg-opacity-75 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                  <p className="text-zinc-900 font-semibold mb-2">Price: {hotel.price}</p>
                  <p className="text-zinc-900 font-semibold mb-2">Rating: {hotel.ratings}</p>
                  <p className="text-zinc-900 font-semibold mb-2">Amenities: {hotel.amenities}</p>
                  <button
                    onClick={() => handleBookNow(hotel)}
                    className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 relative">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Available Hotels</h2>
        
        {/* Left Arrow */}
        <div
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full cursor-pointer z-10"
          onClick={() => scroll('left')}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </div>

        {/* Right Arrow */}
        <div
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full cursor-pointer z-10"
          onClick={() => scroll('right')}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        <div className="overflow-x-auto whitespace-nowrap scrollbar-hidden" ref={scrollContainerRef}>
          <div className="flex gap-6">
            {filteredHotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                className="bg-cover bg-center bg-no-repeat p-2 border border-gray-300 rounded-lg shadow-md w-80 h-64 inline-block"
                style={{ backgroundImage: `url(${hotel.image})` }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleBookNow(hotel)}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="bg-white bg-opacity-75 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                  <p className="text-zinc-900 font-semibold mb-2">Price: {hotel.price}</p>
                  <p className="text-zinc-900 font-semibold mb-2">Rating: {hotel.ratings}</p>
                  <p className="text-zinc-900 font-semibold mb-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-full">
                    Amenities: {hotel.amenities}
                  </p>
                  <button
                    onClick={() => handleBookNow(hotel)}
                    className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
