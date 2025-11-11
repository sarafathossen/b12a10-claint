import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

import Swal from 'sweetalert2';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';

const MyBooking = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    // 🔹 MongoDB থেকে বুকিং লোড করা
    useEffect(() => {
        if (!user?.email) return;

        const fetchBookings = async () => {
            try {
                const res = await fetch('https://workly-server-two.vercel.app/booking');
                if (!res.ok) throw new Error('Failed to fetch bookings');
                const data = await res.json();

                // শুধু logged-in user এর বুকিং
                const filtered = data.filter(b =>
                    b.userEmail?.trim().toLowerCase() === user.email.trim().toLowerCase()
                );

                console.log("Filtered bookings:", filtered);
                setBookings(filtered);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBookings();
    }, [user?.email]);

    // 🔹 Cancel/Delete Booking
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://workly-server-two.vercel.app/booking/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0 || data.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your booking has been deleted.",
                                icon: "success"
                            });
                            // ফ্রন্টএন্ড থেকেও আপডেট
                            const remaining = bookings.filter(booking => booking._id !== id);
                            setBookings(remaining);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div>
            <Header />
            <div className='w-11/12 mx-auto p-8'>
                <h1 className="text-2xl font-bold mb-4">My Booking</h1>

                {bookings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border border-gray-300 text-sm md:text-base">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Service</th>
                                    <th className="border px-4 py-2">Provider</th>
                                    <th className="border px-4 py-2">Price</th>
                                    <th className="border px-4 py-2">Booking Date</th>
                                    <th className="border px-4 py-2">Provider Email</th>
                                    
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking._id} className="text-center">
                                        <td className="border px-4 py-2">{booking.id || '-'}</td>
                                        <td className="border px-4 py-2">{booking.service_name || '-'}</td>
                                        <td className="border px-4 py-2">{booking.provider_name || '-'}</td>
                                        <td className="border px-4 py-2">{booking.price ? `${booking.price} Taka` : '-'}</td>
                                        <td className="border px-4 py-2">{booking.bookingDate || '-'}</td>
                                        
                                        <td className="border px-4 py-2">{booking.userEmail || '-'}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(booking._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600 text-center mt-10">No booking data found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyBooking;
