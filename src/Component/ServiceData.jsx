import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const ServiceData = ({ data }) => {
    const { _id, service_name, category, price, service_rating } = data || {}; // safe destructure
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(_id)

    const handleClick = () => {
        if (!user) {
            navigate('/auth/login', { state: { from: `/service-details/${_id}` } });
        } else {
            navigate(`/service-details/${_id}`);
        }
    };

    return (
        <div className="card bg-base-200 shadow-md p-4 rounded-xl hover:shadow-lg transition-all duration-300 w-full my-3">
            <img
                src={data?.image_url || "https://i.ibb.co.com/RTM46szK/Al-Hasan.jpg " }
                alt={service_name || "Service Image"}
                className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h2 className="text-xl font-semibold mb-2">{service_name || "No Name"}</h2>
            <div className="flex justify-between px-2 text-gray-600">
                <p>{category || "No Category"}</p>
                <p>{service_rating?.rating || "No Rating"}</p>
            </div>
            <h2 className='font-bold text-xl'>Price: {price || "N/A"}</h2>
            <button onClick={handleClick} className='px-6 mt-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300'>Details</button>
        </div>
    );
};

export default ServiceData;
