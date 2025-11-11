import React from 'react';
import Header from './Header';
import Footer from './Footer ';

const AddProduct = () => {
    const handelSubmit = (e) => {
        e.preventDefault()
        const fromData = {
            title: e.target.name.value,
            category: e.target.category.value,
            description: e.target.description.value,
            coverPhoto: e.target.thumbnail.value,
            downloadLink: "google.com",
            ratings: 4.6,
            developer: 'Activision',


        }
        console.log(fromData)
        fetch('https://workly-server-two.vercel.app/models', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fromData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="">
            <Header></Header>
            <div className="">
                <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
                    <div className="card-body p-6 relative">
                        <h2 className="text-2xl font-bold text-center mb-6">Add New Model</h2>
                        <form onSubmit={handelSubmit} className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="label font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                    placeholder="Enter name"
                                />
                            </div>

                            {/* Category Dropdown */}
                            <div>
                                <label className="label font-medium">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    required
                                    className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                    placeholder="write a category"
                                />
                            </div>

                            {/* Description Textarea */}
                            <div>
                                <label className="label font-medium">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows="3"
                                    className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
                                    placeholder="Enter description"
                                ></textarea>
                            </div>

                            {/* Thumbnail URL */}
                            <div>
                                <label className="label font-medium">Thumbnail URL</label>
                                <input
                                    type="url"
                                    name="thumbnail"
                                    required
                                    className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
                            >
                                Add Model
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AddProduct;