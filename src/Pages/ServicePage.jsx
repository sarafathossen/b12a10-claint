import React, { useEffect } from 'react';

import { Link, useLoaderData } from 'react-router';
import AppData from '../Component/AppData';
import Footer from '../Component/Footer ';
import Header from '../Component/Header';
import ServiceData from '../Component/ServiceData';

const ServicePage = () => {
    useEffect(() => {
        document.title = "All Game | Visit All Game";
    }, []);

    const appsData = useLoaderData() || [];
    console.log(appsData);

    return (
        <div>
            <Header></Header>
            <main>
                <div className="w-11/12 mx-auto">
                    <h2 className='text-2xl font-bold mt-4'>Our Popular Games</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-6 my-10">
                    {appsData.map((data) => (
                        
                        <ServiceData key={data.id} data={data} />
                    ))}
                </div>
                <div className="flex justify-center my-5">
                    <Link className='btn btn-outline' to='/'>Back Home</Link>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default ServicePage;
