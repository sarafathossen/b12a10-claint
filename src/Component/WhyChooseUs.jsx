import React from "react";
import { FaHandshake, FaShieldAlt, FaClock } from "react-icons/fa";

const WhyChooseUs = () => {
    const reasons = [
        {
            id: 1,
            icon: <FaHandshake className="text-4xl text-blue-600 mb-3" />,
            title: "Trusted by Clients",
            description:
                "We’ve earned the trust of hundreds of satisfied clients by delivering top-notch digital solutions that drive real results.",
        },
        {
            id: 2,
            icon: <FaShieldAlt className="text-4xl text-blue-600 mb-3" />,
            title: "Quality & Security",
            description:
                "Our team ensures premium quality work with high-level security so your data and projects remain safe and reliable.",
        },
        {
            id: 3,
            icon: <FaClock className="text-4xl text-blue-600 mb-3" />,
            title: "On-Time Delivery",
            description:
                "We respect your time. Every project is delivered on schedule without compromising quality or performance.",
        },
    ];

    return (
        <section className="bg-base-200 py-16 px-6 md:px-12 text-center mt-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Why Choose <span className="text-blue-600">Us</span>?
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-12">
                We don’t just build websites — we build trust, success, and long-term
                relationships with our clients through professional service and
                excellence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reasons.map((reason) => (
                    <div
                        key={reason.id}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex flex-col items-center">
                            {reason.icon}
                            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                            <p className="text-gray-600">{reason.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
