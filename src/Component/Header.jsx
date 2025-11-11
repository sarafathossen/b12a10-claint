import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handelLogOut = () => {
        console.log('User Trying Log Out')
        logOut().then(() => {
            toast('You Logged Out Successfully')
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    return (
        <div className="navbar bg-base-100  flex justify-between w-11/12 mx-auto ">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>


                    <ul
                        tabIndex={-1}
                        className="menu items-center menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-3">
                        <Link to="/">Home</Link>
                        <Link to="/all-service">Service</Link>



                        {!user && (
                            <>
                                <Link to="/auth/login">Login</Link>
                                <Link to="/auth/register">Register</Link>
                            </>
                        )}

                        <div className="flex">
                            {user &&
                                <>
                                    <div className="flex items-center space-x-4 ">
                                        <Link to="/auth/register">My Services</Link>
                                        <Link to="/auth/register">Add Service</Link>
                                        <Link to="/auth/register">My Bookings</Link>


                                        <Link to="/auth/my-profile"><img
                                            className="h-[35px] w-[35px] rounded-full border shadow-md  object-cover"
                                            src={user?.photoURL || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_666201&psig=AOvVaw2gvjB1Ct5dBixusBZ9QnAQ&ust=1761283494785000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKCYjLvKuZADFQAAAAAdAAAAABAE"}

                                        /></Link>
                                    </div>

                                </>
                            }
                        </div>
                        {
                            user && <button onClick={handelLogOut} className="btn btn-outline my-4 w-[150px] ">Log Out </button>
                        }
                    </ul>
                </div>
                {/* <a to className="btn btn-ghost text-xl">Gamehub</a> */}
                <Link to='/' className=' text-2xl font-semibold'>Workly </Link>
            </div>


            <div className="hidden lg:flex items-center">
                <ul className=" items-center menu menu-horizontal px-1 gap-3 flex">
                    <Link to="/">Home</Link>
                    <Link to="/all-service">Services</Link>


                    {!user && (
                        <>
                            <Link to="/auth/login">Login</Link>
                            <Link to="/auth/register">Register</Link>
                        </>
                    )}

                    <div className="flex">
                        {user &&
                            <>
                                <div className="flex items-center space-x-4 ">
                                    <Link to="/my-service">My Services</Link>
                                    <Link to="/add-service">Add Service</Link>
                                    <Link to="/my-booking">My Bookings</Link>


                                    <Link to="/auth/my-profile"><img
                                        className="h-[35px] w-[35px] rounded-full border shadow-md  object-cover"
                                        src={user?.photoURL || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_666201&psig=AOvVaw2gvjB1Ct5dBixusBZ9QnAQ&ust=1761283494785000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKCYjLvKuZADFQAAAAAdAAAAABAE"}

                                    /></Link>
                                </div>

                            </>
                        }
                    </div>

                    <div className="">
                        {
                            user && <button onClick={handelLogOut} className="btn btn-outline my-4 w-[120px] ">Log Out </button>
                        }
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Header;
