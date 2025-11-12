import { useLoaderData } from 'react-router';
import ServiceDetailsCard from '../Component/ServiceDetailsCard';
import Header from '../Component/Header';
import Footer from '../Component/Footer ';

const ServiceDetails = () => {
    const data = useLoaderData(); // Loader থেকে single service রিটার্ন করছে
    const appdata = data.result; // সরাসরি set

    console.log('ServiceDetails data:', appdata);

    return (
        <div>
            <Header />
            <div className="w-11/12 mx-auto">
                {appdata ? (
                    <ServiceDetailsCard appdata={appdata} />
                ) : (
                    <p className="text-center text-gray-500 mt-10">
                        Loading service details...
                    </p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ServiceDetails;
