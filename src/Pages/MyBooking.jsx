import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';

const MyBooking = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [ratings, setRatings] = useState({});

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
                            const updatedRatings = { ...ratings };
                            delete updatedRatings[id];
                            setRatings(updatedRatings);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire("Error!", "Something went wrong", "error");
                    });
            }
        });
    };

    const handleRatingSubmit = (bookingId) => {
        const rating = ratings[bookingId];
        if (!rating) return Swal.fire("Error", "Please select a rating", "warning");

        Swal.fire("Success", `You rated ${rating} ⭐`, "success");
        setRatings(prev => ({
            ...prev,
            [bookingId]: ""
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
            <Header />
            <div className="w-11/12 mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    My Bookings
                </h1>

                {bookings.length > 0 ? (
                    <div className="overflow-x-auto shadow-xl rounded-lg bg-white dark:bg-gray-800">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    {["ID", "Service", "Provider", "Price", "Booking Date", "Provider Email", "Rating", "Action"].map((head, i) => (
                                        <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {bookings.map((booking, idx) => (
                                    <tr
                                        key={booking._id}
                                        className={`transition hover:bg-gray-50 dark:hover:bg-gray-700 ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
                                            }`}
                                    >
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{booking.id || '-'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{booking.service_name || '-'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{booking.provider_name || '-'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{booking.price ? `${booking.price} Taka` : '-'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{booking.bookingDate || '-'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{booking.userEmail || '-'}</td>
                                        <td className="px-4 py-3 text-sm text-center flex justify-center items-center gap-2">
                                            <select
                                                value={ratings[booking._id] || ''}
                                                onChange={(e) => setRatings({ ...ratings, [booking._id]: e.target.value })}
                                                className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-gray-200"
                                            >
                                                <option value="">Rate</option>
                                                {[1, 2, 3, 4, 5].map(num => (
                                                    <option key={num} value={num}>{`${num} ⭐`.padEnd(num + 1, '⭐')}</option>
                                                ))}
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
                    <p className="text-gray-500 dark:text-gray-400 text-center mt-10 text-lg">
                        No booking data found.
                    </p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyBooking;
