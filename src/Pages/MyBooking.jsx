import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';

const MyBooking = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [ratings, setRatings] = useState({}); // Booking ID অনুযায়ী rating state

    useEffect(() => {
        if (!user?.email) return;

        const fetchBookings = async () => {
            try {
                const res = await fetch('https://workly-server-two.vercel.app/booking');
                if (!res.ok) throw new Error('Failed to fetch bookings');
                const data = await res.json();

                const filtered = data.filter(
                    b => b.userEmail?.trim().toLowerCase() === user.email.trim().toLowerCase()
                );

                // যদি আগে rating থাকে তা state-তে ধরতে পার
                const initialRatings = {};
                filtered.forEach(b => {
                    if (b.rating) initialRatings[b._id] = b.rating;
                });

                setBookings(filtered);
                setRatings(initialRatings);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBookings();
    }, [user?.email]);

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
                            const remaining = bookings.filter(booking => booking._id !== id);
                            setBookings(remaining);

                            // ratings state থেকেও remove
                            const updatedRatings = { ...ratings };
                            delete updatedRatings[id];
                            setRatings(updatedRatings);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const handleRatingSubmit = (bookingId) => {
        const rating = ratings[bookingId];
        if (!rating) return Swal.fire("Error", "Please select a rating", "warning");

        // Backend API কল করতে পারো এখানে
        Swal.fire("Success", `You rated ${rating} ⭐`, "success");

        // Submit করার পরে select value reset
        setRatings(prev => ({
            ...prev,
            [bookingId]: ""  // খালি করে দিচ্ছি
        }));
    };


    return (
        <div>
            <Header />
            <div className='w-11/12 mx-auto p-8'>
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Bookings</h1>

                {bookings.length > 0 ? (
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Provider</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Booking Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Provider Email</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Rating</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {bookings.map((booking, idx) => (
                                    <tr key={booking._id} className={`transition hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="px-4 py-3 text-sm text-gray-700">{booking.id || '-'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{booking.service_name || '-'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{booking.provider_name || '-'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{booking.price ? `${booking.price} Taka` : '-'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{booking.bookingDate || '-'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{booking.userEmail || '-'}</td>
                                        <td className="px-4 py-3 text-sm text-center flex justify-center items-center gap-2">
                                            <select
                                                value={ratings[booking._id] || ''}
                                                onChange={(e) => setRatings({ ...ratings, [booking._id]: e.target.value })}
                                                className="border rounded px-2 py-1"
                                            >
                                                <option value="">Rate</option>
                                                <option value="1">1 ⭐</option>
                                                <option value="2">2 ⭐⭐</option>
                                                <option value="3">3 ⭐⭐⭐</option>
                                                <option value="4">4 ⭐⭐⭐⭐</option>
                                                <option value="5">5 ⭐⭐⭐⭐⭐</option>
                                            </select>
                                            <button
                                                onClick={() => handleRatingSubmit(booking._id)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                            >
                                                Submit
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-center">
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
                    <p className="text-gray-500 text-center mt-10 text-lg">No booking data found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyBooking;
