import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import Footer from '../Component/Footer ';
import Header from '../Component/Header';
import ServiceData from '../Component/ServiceData';

const ServicePage = () => {
   

    const appsData = useLoaderData() || [];
    const [sortedData, setSortedData] = useState(appsData);
    const [sortOrder, setSortOrder] = useState(""); 

    useEffect(() => {
        let sorted = [...appsData];
        if (sortOrder === "low-to-high") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "high-to-low") {
            sorted.sort((a, b) => b.price - a.price);
        }
        setSortedData(sorted);
    }, [sortOrder, appsData]);

    return (
        <div>
            <Header />
            <main>
                <div className="w-11/12 mx-auto flex justify-between items-center mt-4">
                    <h2 className='text-2xl font-bold'>Our Popular Service</h2>

                    
                    <div className=''>
                        <label className="mr-2 font-semibold">Sort by Price:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="low-to-high">Low → High</option>
                            <option value="high-to-low">High → Low</option>
                        </select>
                    </div>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-6 my-10">
                    {sortedData.map((data) => (
                        <ServiceData key={data.id} data={data} />
                    ))}
                </div>

                <div className="flex justify-center my-5">
                    <Link className='btn btn-outline' to='/'>Back Home</Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ServicePage;
