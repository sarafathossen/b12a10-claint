import React, { useContext, useState } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';
import { AuthContext } from '../Provider/AuthProvider';
import {  useLoaderData } from 'react-router';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router';


const UpdateService = () => {
    const data = useLoaderData()
    const model = data.result
    console.log(model)
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
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
                reviews: []
            }
        };

        try {
            const res = await fetch("https://workly-server-two.vercel.app/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log('Service added:', data);

            alert('Service added successfully!');
            e.target.reset(); // ফর্ম রিসেট
            navigate('/all-service'); // ইচ্ছা করলে ইউজারকে সার্ভিস লিস্ট পেজে পাঠানো

        } catch (err) {
            console.error(err);
            setError('Failed to add service. Try again!');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className=''>
            <Header></Header>
            <div className="max-w-2xl mx-auto p-4 border rounded-xl shadow mt-6">
                <h2 className="text-2xl font-semibold mb-4">Update Service</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        defaultValue={model.service_name}
                        name="service_name"
                        placeholder="Service Name"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        defaultValue={model.category}
                        name="category"
                        placeholder="Category"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        defaultValue={model.price}
                        name="price"
                        placeholder="Price"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="image_url"
                        defaultValue={model.image_url}
                        placeholder="Image URL"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="provider_name"
                        value={user?.displayName || ''}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 text-gray-600"
                    />
                    <input
                        type="email"
                        name="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 text-gray-600"
                    />
                    <textarea
                        name="description"
                        defaultValue={model.description}
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                        rows={4}
                    />
                    <input
                        type="number"
                        step="0.1"
                        defaultValue={model.service_rating.rating}
                        name="rating"
                        placeholder="Rating (e.g. 4.8)"
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Update Service'}
                    </button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default UpdateService;