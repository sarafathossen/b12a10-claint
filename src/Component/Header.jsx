import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  // ✅ থিম ইনিশিয়াল সেট
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const html = document.querySelector('html');
    html.setAttribute('data-theme', savedTheme);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('You Logged Out Successfully!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTheme = (checked) => {
    const html = document.querySelector('html');
    const newTheme = checked ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // ✅ সেভ থিম পছন্দ
  };

  return (
    <div className="navbar bg-base-100 flex justify-between w-11/12 mx-auto border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-3 dark:bg-[#1e2535] dark:text-gray-200"
          >
            <Link to="/">Home</Link>
            <Link to="/all-service">Services</Link>

            {!user && (
              <>
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/register">Register</Link>
              </>
            )}

            {user && (
              <>
                <Link to="/my-service">My Services</Link>
                <Link to="/add-service">Add Service</Link>
                <Link to="/my-booking">My Bookings</Link>

                <Link to="/auth/my-profile">
                  <img
                    className="h-[35px] w-[35px] rounded-full border shadow-md object-cover"
                    src={
                      user?.photoURL ||
                      'https://cdn-icons-png.flaticon.com/512/666/666201.png'
                    }
                    alt="User"
                  />
                </Link>
                <button
                  onClick={handleLogOut}
                  className="btn btn-outline my-4 w-[150px]"
                >
                  Log Out
                </button>
              </>
            )}
          </ul>
        </div>

        <Link
          to="/"
          className="text-2xl font-semibold text-gray-800 dark:text-gray-100 ml-2"
        >
          Workly
        </Link>

        {/* 🌙 Theme Toggle */}
        <label className="flex items-center cursor-pointer ml-4">
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            className="toggle"
            defaultChecked={localStorage.getItem('theme') === 'dark'}
          />
        </label>
      </div>

      {/* Navbar Menu for Large Devices */}
      <div className="hidden lg:flex items-center">
        <ul className="menu menu-horizontal px-1 gap-4 items-center dark:text-gray-100">
          <Link to="/">Home</Link>
          <Link to="/all-service">Services</Link>

          {!user && (
            <>
              <Link to="/auth/login">Login</Link>
              <Link to="/auth/register">Register</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/my-service">My Services</Link>
              <Link to="/add-service">Add Service</Link>
              <Link to="/my-booking">My Bookings</Link>
              <Link to="/auth/my-profile">
                <img
                  className="h-[35px] w-[35px] rounded-full border shadow-md object-cover"
                  src={
                    user?.photoURL ||
                    'https://cdn-icons-png.flaticon.com/512/666/666201.png'
                  }
                  alt="User"
                />
              </Link>
              <button
                onClick={handleLogOut}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Log Out
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
