import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const Register = () => {

     useEffect(() => {
            document.title = "Register | Visit Register";
          }, []);
  const { createUser, setUser, updateUser, SignInGoogle } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handelGoogleSignIn = () => {
    SignInGoogle()
      .then(result => {
        const loggedUser = result.user;
        setUser(loggedUser);
        toast('✅ Logged in with Google successfully!');
        navigate('/');
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) return setError('❌ Password must be at least 6 characters long');
    if (!/[A-Z]/.test(password)) return setError('❌ Password must contain at least one uppercase letter');
    if (!/[a-z]/.test(password)) return setError('❌ Password must contain at least one lowercase letter');

    setError('');

    createUser(email, password)
      .then(result => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate('/');
          })
          .catch(console.error);
        toast('✅ Account created successfully!');
        form.reset();
      })
      .catch(err => setError(err.message));
  };

  return (
    <div className="flex justify-center my-8 items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="text-2xl font-bold text-center">Register your account</h2>

        <form onSubmit={handleRegister} className="card-body">
          <label className="label">Name</label>
          <input required name="name" type="text" className="input" placeholder="Name" />

          <label className="label">Photo URL</label>
          <input required name="photo" type="text" className="input" placeholder="Photo URL" />

          <label className="label">Email</label>
          <input required name="email" type="email" className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input required name="password" type="password" className="input" placeholder="Password" />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <h2 className="text-center my-2">Or</h2>
          <button type="button" onClick={handelGoogleSignIn} className="btn btn-outline w-full"> <FcGoogle className='text-xl' /> Sign in with Google</button>

          <p className="font-semibold text-center pt-5">
            Already have an account?{" "}
            <Link className="text-secondary" to="/auth/login">Login</Link>
          </p>

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
