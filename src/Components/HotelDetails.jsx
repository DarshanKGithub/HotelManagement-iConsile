import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function HotelDetails() {
  const location = useLocation();
  const hotel = location.state.hotel; // Retrieve hotel data passed via state
  const navigate = useNavigate();

  const handlePartialBooking = () => {
    // Implement partial booking logic here
    navigate('/partial-booking', { state: { hotel } });
  };

  const handleConfirmedBooking = () => {
    // Navigate to the confirmed booking page and pass the hotel data
    navigate('/confirmed-booking', { state: { hotel } });
  };

  return (
    <div className="p-6 min-h-screen text-slate-100 flex flex-col items-center">
      <h1 className="text-4xl text-red-500 font-extrabold mb-6 text-center animate-pulse">
        {hotel.name}
      </h1>
      
      <div className="w-full flex justify-center mb-6">
        <img 
          src={hotel.image} 
          alt={`${hotel.name} image`} 
          className="w-full max-w-lg h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      <div className="w-full max-w-xl space-y-4">
        <p className="text-lg bg-gray-800 p-4 rounded-lg shadow-md">
          <span className="font-semibold">City:</span> {hotel.city}
        </p>
        <p className="text-lg bg-gray-800 p-4 rounded-lg shadow-md">
          <span className="font-semibold">Price:</span> {hotel.price}
        </p>
        <p className="text-lg bg-gray-800 p-4 rounded-lg shadow-md">
          <span className="font-semibold">Rating:</span> {hotel.ratings}
        </p>
        <p className="text-lg bg-gray-800 p-4 rounded-lg shadow-md">
          <span className="font-semibold">Amenities:</span> {hotel.amenities}
        </p>
      </div>

      <div className="mt-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">Available Rooms</h2>
        {hotel.rooms && hotel.rooms.length > 0 ? (
          <div className="space-y-4">
            {hotel.rooms.map((room, index) => (
              <div 
                key={index} 
                className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold text-slate-100">{room.name}</h3>
                  <p className="text-lg text-slate-200">Type: {room.type}</p>
                  <p className="text-lg text-slate-200">Price: {room.price}</p>
                  <p className={`text-lg ${room.availability ? 'text-green-400' : 'text-red-400'}`}>
                    {room.availability ? 'Available' : 'Not Available'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-red-400 text-center">No rooms available</p>
        )}
      </div>
      
      <div className="mt-8 flex space-x-4">
        <button
          onClick={handlePartialBooking}
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
        >
          Partial Booking
        </button>
        <button
          onClick={handleConfirmedBooking}
          className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default HotelDetails;
