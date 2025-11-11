import React, { useContext, useState, useEffect } from "react";
import { IoMdDownload } from "react-icons/io";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const ServiceDetailsCard = ({ appdata }) => {
    const { user } = useContext(AuthContext);
    const reviewer = user?.displayName || "Guest";

    const [reviews, setReviews] = useState(appdata?.service_rating?.reviews || []);
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (appdata?.service_rating?.reviews) {
            setReviews(appdata.service_rating.reviews);
        }
    }, [appdata]);

    // 🔹 Review submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return alert("Please write a review!");

        const newReview = {
            reviewer,
            comment,
            date: new Date().toLocaleString(),
        };

        try {
            const res = await fetch(
                `http://localhost:3000/service/${appdata._id}/review`,
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
            alert("Review added successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to submit review. Try again!");
        }
    };

    // 🔹 Booking confirm
    const handleConfirmBooking = async () => {
        try {
            // 🔸 প্রথমে সব বুকিং ফেচ করে length বের করা (id = length + 1)
            const resAll = await fetch("https://workly-server-two.vercel.app/booking");
            const allBookings = await resAll.json();
            const newId = (allBookings?.length || 0) + 500;

            const bookingData = {
                id: newId,
                service_name: appdata.service_name,
                provider_name: appdata.provider_name,
                price: appdata.price,
                email: appdata.email,
                userEmail: user?.email || "guest@example.com",
                bookingDate: new Date().toLocaleDateString("en-GB"),
                bookingTime: new Date().toLocaleTimeString("en-GB"),
            };

            console.log("Booking Data:", bookingData);

            const modal = document.getElementById("my_modal_1");

            if (user?.email === appdata.email) {
                alert("You cannot book your own service!");
                modal?.close();
                document.body.classList.remove("modal-open");
                return;
            }

            const res = await fetch("https://workly-server-two.vercel.app/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (!res.ok) throw new Error("Failed to book service");

            const data = await res.json();
            console.log("✅ Booking added:", data);

            alert("Booking Confirmed!");
            modal?.close();
            document.body.classList.remove("modal-open");
            navigate("/all-service");
        } catch (err) {
            console.error(err);
            alert("Failed to book service. Try again!");
        }
    };

    return (
        <div className="flex justify-center my-8">
            <div className="max-w-[500px] space-y-5">
                <img
                    className="w-full h-[400px] object-cover"
                    src={"https://i.ibb.co.com/RTM46szK/Al-Hasan.jpg"}
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

                <div className="flex justify-between">
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
                        Rating: {appdata?.service_rating?.rating || 0} ⭐
                    </h2>
                    <h3 className="text-lg font-semibold mb-2">Customer Reviews:</h3>
                    <ul className="space-y-3 mb-6">
                        {reviews.map((review, index) => (
                            <li key={index} className="p-3 border rounded-lg bg-gray-50">
                                <p className="font-semibold text-blue-600">{review.reviewer}</p>
                                <p>{review.comment}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="p-4 border rounded-lg bg-white shadow">
                        <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="text"
                                value={reviewer}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-100"
                            />
                            <textarea
                                placeholder="Write your review..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>

                {/* Booking Modal Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => document.getElementById("my_modal_1").showModal()}
                        className="btn btn-outline w-[80%]"
                    >
                        Book Now
                    </button>
                </div>

                <div className="flex justify-center">
                    <a className="btn btn-outline" href={`/`}>
                        Go to Home
                    </a>
                </div>
            </div>

            {/* Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
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
                                className="w-full p-2 border rounded bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold">Provider Name</label>
                            <input
                                type="text"
                                value={appdata?.provider_name || ""}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold">Provider Email</label>
                            <input
                                type="email"
                                value={appdata?.email || ""}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-100"
                            />
                        </div>

                        <div className="flex gap-5 justify-between">
                            <div>
                                <label className="block text-sm font-semibold">Price</label>
                                <input
                                    type="text"
                                    value={`${appdata?.price || 0} Taka`}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Booking Date</label>
                                <input
                                    type="text"
                                    value={new Date().toLocaleDateString("en-GB")}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold">Your Email</label>
                            <input
                                type="email"
                                value={user?.email || "guest@example.com"}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-100"
                            />
                        </div>

                        <div className="modal-action flex justify-between mt-5">
                            <button
                                type="button"
                                onClick={handleConfirmBooking}
                                className="btn btn-success w-[48%]"
                            >
                                Confirm Booking
                            </button>
                            <button
                                type="button"
                                onClick={() => document.getElementById("my_modal_1").close()}
                                className="btn btn-outline w-[48%]"
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
