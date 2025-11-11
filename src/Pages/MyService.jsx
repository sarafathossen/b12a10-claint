import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';
import Swal from 'sweetalert2';

const MyService = () => {
    const { user } = useContext(AuthContext);
    const allData = useLoaderData(); // Loader থেকে আসা ডেটা
    const [myServices, setMyServices] = useState([]);

    useEffect(() => {
        if (user?.email) {
            // 🔹 চেক করি API response array কি 'result' এর মধ্যে আছে
            const servicesArray = Array.isArray(allData?.result) ? allData.result : allData;
            if (Array.isArray(servicesArray)) {
                const userServices = servicesArray.filter(item => item.email === user.email);
                setMyServices(userServices);
            }
        }
    }, [user, allData]);
    console.log(allData);

    // 🔹 Delete Function
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
                fetch(`https://workly-server-two.vercel.app/services/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0 || data.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your service has been deleted.",
                                icon: "success"
                            });
                            // ফ্রন্টএন্ড থেকেও আপডেট
                            const remaining = myServices.filter(service => service._id !== id);
                            setMyServices(remaining);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className="w-11/12 mx-auto">
            <Header />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">My Services</h1>

                {myServices.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border border-gray-300 text-sm md:text-base">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">Service Name</th>
                                    <th className="border px-4 py-2">Category</th>
                                    <th className="border px-4 py-2">Price</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myServices.map((service) => (
                                    <tr key={service._id || service.id} className="text-center">
                                        <td className="border px-4 py-2">{service.service_name || '-'}</td>
                                        <td className="border px-4 py-2">{service.category || '-'}</td>
                                        <td className="border px-4 py-2">{service.price ? `${service.price} Taka` : '-'}</td>
                                        <td className="border px-4 py-2 space-x-2">
                                            <Link
                                                to={`/update-service/${service._id}`}
                                                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition'
                                            >
                                                Update
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(service._id)}
                                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600 text-center mt-10">
                        No service found for <span className="font-semibold">{user?.email}</span>
                    </p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyService;
