import React, { useContext, useEffect, useState } from 'react';
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

    useEffect(() => {
        document.title = "Login | Visit Login";
    }, []);

    
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
        <div className='flex justify-center items-center my-8 bg-gray-50'>
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
                <h2 className='text-2xl font-bold text-center mb-4'>Login to your account</h2>

                <form onSubmit={handleLogin} className="card-body">
                    <label className="label">Email</label>
                    <input
                        required
                        name='email'
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="label mt-3">Password</label>
                    <input
                        required
                        name='password'
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                    />

                    <Link
                        to='/auth/forget-password'
                        state={{ email }}
                        className='link link-hover mt-2 block'
                    >
                        Forgot password?
                    </Link>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline w-full mt-4 flex items-center justify-center gap-2"
                    >
                        <FcGoogle className='text-xl' /> Sign in with Google
                    </button>

                    <p className='text-center mt-5 font-semibold'>
                        Don’t Have An Account?
                        <Link className='text-secondary ml-1' to='/auth/register'>Register</Link>
                    </p>

                    <button type='submit' className="btn btn-neutral w-full mt-4">Login</button>
                </form>

                {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
