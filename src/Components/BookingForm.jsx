import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

function BookingForm() {
  const location = useLocation();
  const hotel = location.state.hotel;

  const [selectedRoom, setSelectedRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text(`Booking Confirmation`, 10, 10);
    doc.text(`Hotel: ${hotel.name}`, 10, 20);
    doc.text(`Room: ${selectedRoom}`, 10, 30);
    doc.text(`Name: ${userName}`, 10, 40);
    doc.text(`Email: ${email}`, 10, 50);
    doc.save(`${hotel.name}_Booking_Confirmation.pdf`);
  };

  return (
    <div className="p-6 min-h-screen text-slate-100 flex flex-col items-center">
      <h1 className="text-4xl text-blue-500 font-extrabold mb-6 text-center">
        Confirm Your Booking
      </h1>

      <div className="w-full max-w-lg space-y-4">
        <div>
          <label className="block text-lg font-semibold mb-2">Full Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Select Room</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white"
          >
            <option value="">-- Select a Room --</option>
            {hotel.rooms.map((room, index) => (
              <option key={index} value={room.name}>
                {room.name} - {room.price}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleGeneratePDF}
        className="mt-8 bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
      >
        Generate PDF
      </button>
    </div>
  );
}

export default BookingForm;
