import React, { useContext,  useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const { signIn, SignInGoogle } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

   

    const handleGoogleSignIn = () => {
        SignInGoogle()
            .then(result => {
                const loggedUser = result.user;
                toast.success('✅ Logged in with Google successfully!');
                navigate(location.state?.from || '/'); 
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                toast.error(err.message);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('✅ You Logged In Successfully');
                navigate(location.state?.from || '/'); 
            })
            .catch(err => {
                console.error(err);
                toast.error(err.message);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="card w-full max-w-sm shadow-2xl py-5 px-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg transition-colors duration-300">
                <h2 className='text-2xl font-bold text-center mb-4'>Login to your account</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="label mb-1 block">Email</label>
                        <input
                            required
                            name='email'
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg transition-colors duration-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label mb-1 block">Password</label>
                        <input
                            required
                            name='password'
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg transition-colors duration-300"
                        />
                    </div>

                    <Link
                        to='/auth/forget-password'
                        state={{ email }}
                        className='link link-hover mt-2 block text-blue-600 dark:text-blue-400'
                    >
                        Forgot password?
                    </Link>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline w-full mt-4 flex items-center justify-center gap-2 border-gray-400 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                        <FcGoogle className='text-xl' /> Sign in with Google
                    </button>

                    <p className='text-center mt-5 font-semibold'>
                        Don’t Have An Account?
                        <Link className='text-blue-600 dark:text-blue-400 ml-1' to='/auth/register'>Register</Link>
                    </p>

                    <button
                        type='submit'
                        className="btn btn-neutral w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>

                {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
