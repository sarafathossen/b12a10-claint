import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';
import { toast } from 'react-toastify';

const UpdateService = () => {
    const data = useLoaderData();
    const model = data.result;
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
            provider_name: user?.displayName || '',
            email: user?.email || '',
            description: e.target.description.value,
            service_rating: {
                rating: parseFloat(e.target.rating.value) || 0,
                reviews: model.service_rating?.reviews || []
            }
        };

        try {
            const res = await fetch(`https://workly-server-two.vercel.app/services/${model._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log('Service updated:', data);

            toast('Service updated successfully!');
            navigate('/all-service');
        } catch (err) {
            console.error(err);
            setError('Failed to update service. Try again!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 text-base-content dark:bg-gray-900 dark:text-gray-100">
            <Header />
            <div className="max-w-xl sm:max-w-2xl mx-auto p-4 sm:p-6 md:p-8 mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100 text-center sm:text-left">
                    Update Service
                </h2>

                {error && <p className="text-red-500 mb-3 text-center sm:text-left">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        defaultValue={model.service_name}
                        name="service_name"
                        placeholder="Service Name"
                        className="w-full p-2 sm:p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        defaultValue={model.category}
                        name="category"
                        placeholder="Category"
                        className="w-full p-2 sm:p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="number"
                        defaultValue={model.price}
                        name="price"
                        placeholder="Price"
                        className="w-full p-2 sm:p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="image_url"
                        defaultValue={model.image_url}
                        placeholder="Image URL"
                        className="w-full p-2 sm:p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        name="provider_name"
                        value={user?.displayName || ''}
                        readOnly
                        className="w-full p-2 sm:p-3 border rounded bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200"
                    />
                    <input
                        type="email"
                        name="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full p-2 sm:p-3 border rounded bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200"
                    />
                    <textarea
                        name="description"
                        defaultValue={model.description}
                        placeholder="Description"
                        className="w-full p-2 sm:p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={4}
                    />
                    <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        name="rating"
                        defaultValue={model.service_rating.rating}
                        placeholder="Rating (1-5)"
                        className="w-full p-3 sm:p-3 border rounded-lg bg-gray-100 dark:bg-[#1e2535] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <button
                        type="submit"
                        className={`bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 w-full rounded hover:bg-green-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Service'}
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateService;
