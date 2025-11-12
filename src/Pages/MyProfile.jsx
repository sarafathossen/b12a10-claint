import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router';

const MyProfile = () => {
  useEffect(() => {
    document.title = "My Profile | Visit My Profile";
  }, []);

  const { user, logOut } = useContext(AuthContext);
  console.log(user)


  const lastLoginTime = user?.metadata?.lastSignInTime
    ? (() => {
      const d = new Date(user.metadata.lastSignInTime);

      const day = d.getDate();
      const month = d.toLocaleString('default', { month: 'short' });

      
      const hours = d.getHours();
      const minutes = d.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;

      return `${day} ${month}, ${hour12}:${minutes} ${ampm}`;
    })()
    : "Not Available";



  return (
    <div className="flex flex-col items-center py-10">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <img
        className="h-[200px] w-[200px] rounded-full border shadow-md mb-4 object-cover"
        src={user?.photoURL || "https://www.flaticon.com/svg/static/icons/svg/666/666201.svg"}
        alt={user?.displayName || "User"}
      />

      <h2 className="font-bold text-xl mb-2">{user?.displayName || ""}</h2>
      <p className="text-gray-500 mb-2">{user?.email}</p>

      {/* Display last login time */}
      <p className="text-gray-400 mb-4">
        Last Login: <span className="font-medium">{lastLoginTime}</span>
      </p>


      <Link
        to='/auth/update-profile'
        className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
      >
        Update Profile
      </Link>
    </div>
  );
};

export default MyProfile;
