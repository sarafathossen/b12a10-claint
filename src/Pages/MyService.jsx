import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

import Swal from 'sweetalert2';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';

const MyService = () => {
  const { user } = useContext(AuthContext);
  const allData = useLoaderData();
  const [myServices, setMyServices] = useState([]);

  useEffect(() => {
    if (user?.email) {
      const servicesArray = Array.isArray(allData?.result) ? allData.result : allData;
      if (Array.isArray(servicesArray)) {
        const userServices = servicesArray.filter(item => item.email === user.email);
        setMyServices(userServices);
      }
    }
  }, [user, allData]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains('dark') ? "#1e293b" : "#f8fafc",
      color: document.documentElement.classList.contains('dark') ? "#f1f5f9" : "#1f2937"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://workly-server-two.vercel.app/services/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0 || data.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Your service has been deleted.",
                icon: "success",
                background: document.documentElement.classList.contains('dark') ? "#1e293b" : "#f8fafc",
                color: document.documentElement.classList.contains('dark') ? "#f1f5f9" : "#1f2937"
              });
              setMyServices(prev => prev.filter(service => service._id !== id));
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
              background: document.documentElement.classList.contains('dark') ? "#1e293b" : "#f8fafc",
              color: document.documentElement.classList.contains('dark') ? "#f1f5f9" : "#1f2937"
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <div className="w-11/12 mx-auto py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-500 dark:text-blue-400">
          My Services
        </h1>

        {myServices.length > 0 ? (
          <div className="overflow-x-auto shadow-xl rounded-lg backdrop-blur bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700">
            <table className="min-w-full text-sm md:text-base">
              <thead className="bg-blue-100 dark:bg-blue-600/30 text-gray-900 dark:text-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Service Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Category</th>
                  <th className="px-4 py-3 text-left font-semibold">Price</th>
                  <th className="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {myServices.map((service, idx) => (
                  <tr
                    key={service._id || service.id}
                    className={`transition-all hover:bg-blue-200/20 dark:hover:bg-blue-600/20 ${
                      idx % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800/50' : 'bg-gray-50 dark:bg-gray-900/40'
                    }`}
                  >
                    <td className="px-4 py-3">{service.service_name || '-'}</td>
                    <td className="px-4 py-3">{service.category || '-'}</td>
                    <td className="px-4 py-3 text-blue-600 dark:text-blue-400 font-semibold">
                      {service.price ? `${service.price} Taka` : '-'}
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <Link
                        to={`/update-service/${service._id}`}
                        className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 px-3 py-1 rounded text-white transition duration-200"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 px-3 py-1 rounded text-white transition duration-200"
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
          <p className="text-center mt-10 text-lg text-gray-700 dark:text-gray-400">
            No service found for <span className="text-blue-500 dark:text-blue-400 font-semibold">{user?.email}</span>
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyService;
