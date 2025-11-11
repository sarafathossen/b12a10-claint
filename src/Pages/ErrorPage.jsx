import React, { useEffect } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';
import { Link } from 'react-router';

const ErrorPage = () => {
  useEffect(() => {
    document.title = "404 Error | Game-Hub";
  }, []);
  return (
    <div className=''>
      <Header></Header>
      <div className="flex justify-center flex-col items-center md:min-h-screen p-4">
        <div className="flex justify-center">
          <img src="https://i.ibb.co/tT4T2Z7s/images.png" alt="" />
        </div>
        <h1 className='text-4xl font-bold my-8'> Page Is not Found <br /> 404 Error </h1>
        <div className="flex justify-center my-4">
          <Link to='/' className='btn btn-outline' >Back Home</Link>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;