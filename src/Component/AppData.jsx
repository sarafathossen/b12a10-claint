import React from 'react';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const AppData = ({ data }) => {
  console.log(data)
  const { _id, title, category, ratings,coverPhoto } = data;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      
      navigate('/auth/login', { state: { from: `/game-details/${_id}` } });
    } else {
      navigate(`/game-details/${_id}`);
    }
  };

  return (
    <div className="">
      <div
        className="card bg-base-200 shadow-md p-4 rounded-xl hover:shadow-lg transition-all duration-300 w-full my-3"
        onClick={handleClick}
      >
        <img
          src={coverPhoto}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <h2 className="text-xl font-semibold mb-2">{data.service_name}</h2>
        <div className="flex justify-between px-2 text-gray-600">
          <p>{data.category}</p>
          <p>{data.service_rating.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default AppData;
