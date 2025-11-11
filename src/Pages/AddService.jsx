import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import Header from "../Component/Header";
import Footer from "../Component/Footer ";


const AddService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = {
      service_name: e.target.service_name.value,
      category: e.target.category.value,
      price: parseFloat(e.target.price.value),
      image_url: e.target.image_url.value,
      provider_name: user?.displayName || "",
      email: user?.email || "",
      description: e.target.description.value,
      service_rating: {
        rating: parseFloat(e.target.rating.value) || 0,
        reviews: [],
      },
    };

    try {
      const res = await fetch("https://workly-server-two.vercel.app/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Service added:", data);

      alert("✅ Service added successfully!");
      e.target.reset();
      navigate("/all-service");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to add service. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] transition-colors duration-300">
      <Header />

      <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-[#161b27] border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
          ✳️ Add New Service
        </h2>

        {error && (
          <p className="text-red-500 text-center font-medium mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Grid for inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="service_name"
              placeholder="Service Name"
              className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-[#1e2535] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-[#1e2535] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-[#1e2535] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              name="image_url"
              placeholder="Image URL"
              className="p-3 border rounded-lg w-full bg-gray-100 dark:bg-[#1e2535] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <input
            type="text"
            name="provider_name"
            value={user?.displayName || ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-[#1e2535] text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
          />
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-[#1e2535] text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
          />

          <textarea
            name="description"
            placeholder="Write short description..."
            rows={4}
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-[#1e2535] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating (e.g. 4.8)"
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-[#1e2535] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            {loading ? "Adding..." : "Add Service"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddService;
