import React, { useContext, useState, useEffect } from "react";
import { IoMdDownload } from "react-icons/io";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const ServiceDetailsCard = ({ appdata }) => {
  const { user } = useContext(AuthContext);
  const reviewer = user?.displayName || "Guest";

  const [reviews, setReviews] = useState(appdata?.service_rating?.reviews || []);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [bookings, setBookings] = useState()
  const [matchedBookings, setMatchedBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (appdata?.service_rating?.reviews) {
      setReviews(appdata.service_rating.reviews);
    }
  }, [appdata]);





  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch("https://workly-server-two.vercel.app/booking");
        const allBookings = await res.json();

        // 🔹 শুধু লগইন ইউজারের বুকিংগুলো ফিল্টার করো
        const userBookings = allBookings.filter(
          (b) =>
            b.userEmail?.trim().toLowerCase() ===
            user.email.trim().toLowerCase()
        );

        setBookings(userBookings);
      } catch (error) {
        console.error("❌ Failed to load bookings:", error);
        toast.error("Failed to load booking data");
      }
    };

    fetchBookings();
  }, [user?.email]);
  console.log(bookings)
  console.log(appdata._id)




  useEffect(() => {
    if (Array.isArray(bookings) && appdata?._id) {
      const filtered = bookings.filter(
        (b) => String(b.id) === String(appdata._id) || String(b._id) === String(appdata._id)
      );
      setMatchedBookings(filtered);
    }
  }, [bookings, appdata]);

  // এখন console.log useEffect এর বাইরে safely করতে পারো
  console.log("Matched Bookings outside useEffect:", matchedBookings);









  // 🔹 Review submit (with rating)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0)
      return toast("Please give a rating and write a review!");

    const newReview = {
      reviewer,
      comment,
      rating,
      date: new Date().toLocaleString(),
    };

    try {
      const res = await fetch(
        `https://workly-server-two.vercel.app/service/${appdata._id}/review`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReview),
        }
      );

      if (!res.ok) throw new Error("Failed to add review");

      const data = await res.json();
      console.log("✅ Review added:", data);

      setReviews([...reviews, newReview]);
      setComment("");
      setRating(0);
      toast("Review added successfully!");
    } catch (err) {
      console.error(err);
      toast("Failed to submit review. Try again!");
    }
  };

  // 🔹 Booking confirm (unchanged)
  const handleConfirmBooking = async () => {
    try {
      const resAll = await fetch("https://workly-server-two.vercel.app/booking");
      const allBookings = await resAll.json();
      const newId = (allBookings?.length || 0) + 500;

      const bookingData = {
        id: appdata._id,
        service_name: appdata.service_name,
        provider_name: appdata.provider_name,
        price: appdata.price,
        email: appdata.email,
        rating: appdata.service_rating,
        userEmail: user?.email || "guest@example.com",
        bookingDate: new Date().toLocaleDateString("en-GB"),
        bookingTime: new Date().toLocaleTimeString("en-GB"),
      };

      const modal = document.getElementById("my_modal_1");

      if (user?.email === appdata.email) {
        toast("❌ You cannot book your own service!");
        modal?.close();
        document.body.classList.remove("modal-open");
        navigate("/all-service");
        return;
      }

      const res = await fetch("https://workly-server-two.vercel.app/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Failed to book service");

      toast("Booking Confirmed!");
      modal?.close();
      document.body.classList.remove("modal-open");
      navigate("/all-service");
    } catch (err) {
      console.error(err);
      toast("Failed to book service. Try again!");
    }
  };

  return (
    <div className="flex justify-center my-8 bg-base-200 text-base-content min-h-screen">
      <div className="max-w-[500px] bg-base-100 p-5 rounded-xl shadow-lg space-y-5">
        <img
          className="w-full h-[400px] object-cover rounded-lg"
          src={appdata?.image_url || "https://i.ibb.co.com/RTM46szK/Al-Hasan.jpg"}
          alt={appdata?.service_name}
        />

        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">{appdata?.service_name}</h2>
          <p className="text-xl font-bold">{appdata?.price} Taka</p>
        </div>

        <div className="flex justify-between font-bold">
          <p>{appdata?.category}</p>
          <p>{appdata?.service_rating?.rating || 0} ⭐</p>
        </div>

        <p>
          <span className="font-bold">Description:</span> {appdata?.description}
        </p>

        <div className="flex justify-between items-center">
          <p className="font-bold">{appdata?.provider_name || "N/A"}</p>
          {appdata?.downloadLink && (
            <a href={appdata.downloadLink}>
              <IoMdDownload className="text-2xl text-blue-600 hover:text-blue-800" />
            </a>
          )}
        </div>

        {/* Review Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3">
            Rating: {matchedBookings && matchedBookings.length > 0
              ? matchedBookings[0]?.rating?.rating || 0
              : appdata?.service_rating?.rating || 0} ⭐
          </h2>

          <h3 className="text-lg font-semibold mb-2">Customer Reviews:</h3>

          <ul className="space-y-3 mb-6">
            {matchedBookings && matchedBookings.length > 0 ? (
              matchedBookings[0]?.rating?.reviews?.length > 0 ? (
                matchedBookings[0].rating.reviews.map((review, index) => (
                  <li
                    className="p-3 border rounded-lg bg-base-200 shadow-sm gap-4"
                    key={index}
                  >
                    <p className="font-semibold text-primary">{review.reviewer}</p>
                    <p>⭐ {review.rating}/5</p>
                    <p>{review.comment}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No Review Yet</p>
              )
            ) : reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <li
                  key={index}
                  className="p-3 border rounded-lg bg-base-200 shadow-sm"
                >
                  <p className="font-semibold text-primary">{review.reviewer}</p>
                  <p>⭐ {review.rating}/5</p>
                  <p>{review.comment}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No Review Yet</p>
            )}
          </ul>

          {/* Add Review Form */}
        </div>


        {/* Booking Modal Button */}
        <div className="flex justify-center">
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300 w-full"
          >
            Book Now
          </button>
        </div>

        <div className="flex justify-center">
          <a className="text-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300 w-full" href={`/`}>
            Go to Home
          </a>
        </div>
      </div>

      {/* Booking Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-base-100 text-base-content">
          <h3 className="font-bold text-lg mb-4 text-center">
            Your Order is Booked — Please Confirm
          </h3>

          <form className="space-y-3">
            <div>
              <label className="block text-sm font-semibold">Service Name</label>
              <input
                type="text"
                value={appdata?.service_name || ""}
                readOnly
                className="w-full p-2 border rounded bg-base-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Provider Name</label>
              <input
                type="text"
                value={appdata?.provider_name || ""}
                readOnly
                className="w-full p-2 border rounded bg-base-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Provider Email</label>
              <input
                type="email"
                value={appdata?.email || ""}
                readOnly
                className="w-full p-2 border rounded bg-base-200"
              />
            </div>

            <div className="flex gap-5 justify-between">
              <div>
                <label className="block text-sm font-semibold">Price</label>
                <input
                  type="text"
                  value={`${appdata?.price || 0} Taka`}
                  readOnly
                  className="w-full p-2 border rounded bg-base-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Booking Date</label>
                <input
                  type="text"
                  value={new Date().toLocaleDateString("en-GB")}
                  readOnly
                  className="w-full p-2 border rounded bg-base-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold">Your Email</label>
              <input
                type="email"
                value={user?.email || "guest@example.com"}
                readOnly
                className="w-full p-2 border rounded bg-base-200"
              />
            </div>

            <div className="modal-action flex justify-between mt-5">
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_1").close()}
                className="px-6 py-3 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ServiceDetailsCard;
