import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [visits, setVisits] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [visitStatus, setVisitStatus] = useState('pending');
    const [bookingStatus, setBookingStatus] = useState('partial');

    useEffect(() => {
        fetchVisits();
        fetchBookings();
        fetchConfirmedBookings(); // Fetch confirmed bookings initially
    }, [visitStatus, bookingStatus]);

    const fetchVisits = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`http://10.42.0.242:3000/api/admin/visits/status/${visitStatus}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setVisits(response.data);
        } catch (error) {
            console.error('Error fetching visits:', error);
        }
    };

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`http://10.42.0.242:3000/api/admin/bookings/status/${bookingStatus}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const fetchConfirmedBookings = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('http://10.42.0.242:3000/api/admin/bookings/status/confirmed', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setConfirmedBookings(response.data);
        } catch (error) {
            console.error('Error fetching confirmed bookings:', error);
        }
    };

    const handleConfirmBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post(`http://10.42.0.242:3000/api/admin/bookings/${bookingId}/confirm`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchBookings(); // Refresh the list after confirming
            fetchConfirmedBookings(); // Refresh the confirmed bookings
        } catch (error) {
            console.error('Error confirming booking:', error);
        }
    };

    return (
        <div className="admin-dashboard p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="visits-section mb-12">
                <h2 className="text-2xl font-bold mb-4">Hotel Visits</h2>
                <div className="mb-4">
                    <button onClick={() => setVisitStatus('pending')} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Pending</button>
                    <button onClick={() => setVisitStatus('confirmed')} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">Confirmed</button>
                    <button onClick={() => setVisitStatus('completed')} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Completed</button>
                </div>
                
                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">User ID</th>
                            <th className="px-4 py-2">Hotel ID</th>
                            <th className="px-4 py-2">Visit Date</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visits.map((visit) => (
                            <tr key={visit.id}>
                                <td className="px-4 py-2">{visit.id}</td>
                                <td className="px-4 py-2">{visit.user_id}</td>
                                <td className="px-4 py-2">{visit.hotel_id}</td>
                                <td className="px-4 py-2">{visit.visit_date}</td>
                                <td className="px-4 py-2">{visit.visit_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bookings-section">
                <h2 className="text-2xl font-bold mb-4">Bookings</h2>
                <div className="mb-4">
                    <button onClick={() => setBookingStatus('partial')} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Partial</button>
                    <button onClick={() => setBookingStatus('confirmed')} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">Confirmed</button>
                    <button onClick={() => setBookingStatus('completed')} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Completed</button>
                </div>
                
                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">User ID</th>
                            <th className="px-4 py-2">Hotel ID</th>
                            <th className="px-4 py-2">Booking Date</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td className="px-4 py-2">{booking.id}</td>
                                <td className="px-4 py-2">{booking.user_id}</td>
                                <td className="px-4 py-2">{booking.hotel_id}</td>
                                <td className="px-4 py-2">{booking.booking_date}</td>
                                <td className="px-4 py-2">{booking.status}</td>
                                <td className="px-4 py-2">
                                    {booking.status === 'partial' && (
                                        <button 
                                            onClick={() => handleConfirmBooking(booking.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                        >
                                            Confirm
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="confirmed-bookings-section mt-12">
                <h2 className="text-2xl font-bold mb-4">Confirmed Bookings Summary</h2>
                <p>Total Confirmed Bookings: {confirmedBookings.length}</p>
                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden mt-4">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="px-4 py-2">Booking ID</th>
                            <th className="px-4 py-2">User Name</th>
                            <th className="px-4 py-2">User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {confirmedBookings.map((booking) => (
                            <tr key={booking.id}>
                                <td className="px-4 py-2">{booking.id}</td>
                                <td className="px-4 py-2">{booking.user_name}</td> {/* Assuming user_name is available */}
                                <td className="px-4 py-2">{booking.user_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
