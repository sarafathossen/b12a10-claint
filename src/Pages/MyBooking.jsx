import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';
import { useLoaderData } from 'react-router';

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  console.log(data)

  const [bookings, setBookings] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const reviewer = user?.displayName || "Guest";

  
  useEffect(() => {
    if (!user?.email) return;
    const fetchBookings = async () => {
      try {
        const res = await fetch('https://workly-server-two.vercel.app/booking');
        const data = await res.json();
        const filtered = data.filter(
          b => b.userEmail?.trim().toLowerCase() === user.email.trim().toLowerCase()
        );
        setBookings(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, [user?.email]);

  
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://workly-server-two.vercel.app/booking/${_id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              Swal.fire("Deleted!", "Your booking has been deleted.", "success");
              setBookings(prev => prev.filter(b => b._id !== _id));
            }
          })
          .catch(() => Swal.fire("Error!", "Something went wrong.", "error"));
      }
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim() || rating === 0) return toast.error("Please give a rating and write a review!");
    if (!selectedServiceId) return toast.error("No service selected!");

    const newReview = {
      reviewer,
      comment,
      rating,
      date: new Date().toLocaleString(),
    };

    try {
      const res = await fetch(
        `https://workly-server-two.vercel.app/booking/${selectedServiceId}/review`,
        { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newReview) }
      );

      if (!res.ok) throw new Error("Failed to add review");

      setBookings(prev =>
        prev.map(b =>
          b.id === selectedServiceId
            ? {
              ...b,
              service_rating: {
                reviews: [...(b.service_rating?.reviews || []), newReview],
                rating: (
                  ([...(b.service_rating?.reviews || []).map(r => r.rating), newReview.rating]
                    .reduce((a, c) => a + c, 0) /
                    ((b.service_rating?.reviews?.length || 0) + 1)
                  ).toFixed(1))
              }
            }
            : b
        )
      );

      setComment("");
      setRating(0);
      toast.success("Review added successfully!");
      document.getElementById("review_modal").close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <div className='w-11/12 mx-auto p-4 sm:p-8'>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">My Bookings</h1>

        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm md:text-base">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <tr>
                  <th className="border px-3 py-2">Service</th>
                  <th className="border px-3 py-2">Provider</th>
                  <th className="border px-3 py-2">Price</th>
                  <th className="border px-3 py-2">Date</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {bookings.map(b => (
                  <tr key={b._id} className="text-center hover:bg-blue-100 dark:hover:bg-blue-700/30 transition">
                    <td className="border px-3 py-2" data-label="Service">{b.service_name}</td>
                    <td className="border px-3 py-2" data-label="Provider">{b.provider_name}</td>
                    <td className="border px-3 py-2 text-blue-600 dark:text-blue-400" data-label="Price">{b.price} Taka</td>
                    <td className="border px-3 py-2" data-label="Date">{b.bookingDate}</td>
                    <td className="border px-3 py-2 flex flex-col md:flex-row justify-center gap-2" data-label="Action">
                      <button onClick={() => { setSelectedServiceId(b.id); document.getElementById("review_modal").showModal(); }}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition w-full md:w-auto">Review</button>
                      <button onClick={() => handleDelete(b._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition w-full md:w-auto">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-center mt-10">No booking data found.</p>
        )}
      </div>

     
      <dialog id="review_modal" className="modal">
        <div className="modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <h3 className="font-bold text-lg mb-4 text-center">Submit Review</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" value={reviewer} readOnly className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200" />
            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <div className="flex justify-center gap-2 text-2xl">
              {[1, 2, 3, 4, 5].map(num => (
                <span key={num} onClick={() => setRating(num)}
                  className={`cursor-pointer text-4xl ${num <= rating ? "text-yellow-400" : "text-gray-400"}`}>★</span>
              ))}
            </div>

            <button type="submit" className="btn btn-primary w-full">Submit Review</button>
          </form>
          <div className="modal-action mt-2">
            <button type="button" onClick={() => document.getElementById("review_modal").close()} className="btn w-full">Close</button>
          </div>
        </div>
      </dialog>

      <Footer />
    </div>
  );
};

export default MyBooking;
