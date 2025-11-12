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

  // Load bookings
  useEffect(() => {
    if (!user?.email) return;
    const fetchBookings = async () => {
      try {
        const res = await fetch('https://workly-server-two.vercel.app/booking');
        const data = await res.json();
        const filtered = data
          .filter(b => b.userEmail?.trim().toLowerCase() === user.email.trim().toLowerCase())
          .map(b => ({ ...b })); // keep `id` as is
        setBookings(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, [user?.email]);

  // Delete booking
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://workly-server-two.vercel.app/booking/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0 || data.success) {
              Swal.fire("Deleted!", "Your booking has been deleted.", "success");
              setBookings(prev => prev.filter(b => b.id !== id)); // id দিয়ে filter
            }
          })
          .catch(() => Swal.fire("Error!", "Something went wrong.", "error"));
      }
    });
  };

  // Submit review
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
    console.log("Submitting review for:", selectedServiceId, newReview);
    try {
      const res = await fetch(
        `https://workly-server-two.vercel.app/booking/${selectedServiceId}/review`,
        { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newReview) }
      );

      if (!res.ok) throw new Error("Failed to add review");

      // Update local UI immediately
      setBookings(prev =>
        prev.map(b =>
          b.id === selectedServiceId // id দিয়ে matching
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
    <div>
      <Header />
      <div className='w-11/12 mx-auto p-8'>
        <h1 className="text-2xl font-bold mb-4">My Booking</h1>

        {bookings.length > 0 ? (
          <table className="table-auto w-full border border-gray-300 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Service</th>
                <th className="border px-4 py-2">Provider</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="text-center">
                  <td className="border px-4 py-2">{b.service_name}</td>
                  <td className="border px-4 py-2">{b.provider_name}</td>
                  <td className="border px-4 py-2">{b.price} Taka</td>
                  <td className="border px-4 py-2">{b.bookingDate}</td>
                  <td className="border px-4 py-2 flex justify-center gap-2">
                    <button onClick={() => { setSelectedServiceId(b.id); document.getElementById("review_modal").showModal(); }}
                      className="bg-green-500 text-white px-3 py-1 rounded">Review</button>
                    <button onClick={() => handleDelete(b.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p className="text-gray-600 text-center mt-10">No booking data found.</p>}
      </div>

      {/* Review Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box bg-base-100 text-base-content">
          <h3 className="font-bold text-lg mb-4 text-center">Submit Review</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" value={reviewer} readOnly className="w-full p-2 border rounded bg-base-200" />
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <span key={num} onClick={() => setRating(num)}
                  className={`text-2xl cursor-pointer ${num <= rating ? "text-yellow-500" : "text-gray-400"}`}>★</span>
              ))}
            </div>
            <textarea placeholder="Write your review..." value={comment} onChange={e => setComment(e.target.value)}
              className="w-full p-2 border rounded bg-base-200" />
            <button type="submit" className="btn btn-primary w-full">Submit Review</button>
          </form>
          <div className="modal-action">
            <button type="button" onClick={() => document.getElementById("review_modal").close()} className="btn w-full">Close</button>
          </div>
        </div>
      </dialog>
      <Footer />
    </div>
  );
};

export default MyBooking;
// Okkkkk 