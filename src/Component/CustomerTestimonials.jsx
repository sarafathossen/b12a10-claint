import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Entrepreneur",
    image: "https://i.ibb.co/SnD6b7K/female1.jpg",
    review:
      "They designed my business website perfectly! The team is very responsive and delivered exactly what I needed — highly recommended!",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    role: "Freelancer",
    image: "https://i.ibb.co/p1fL64Q/male1.jpg",
    review:
      "Excellent service and on-time delivery. My e-commerce site now looks professional and user-friendly. Great experience overall!",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Digital Marketer",
    image: "https://i.ibb.co/6sxdVwF/female2.jpg",
    review:
      "Amazing support! They not only built my site but also guided me with SEO and marketing. I’m really satisfied with the result.",
  },
];

const CustomerTestimonials = () => {
  return (
    <section className="bg-base-100 py-16 px-6 md:px-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        What Our <span className="text-blue-600">Customers Say</span>
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-12">
        We value our clients and their feedback. Here’s what they think about
        our services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <FaQuoteLeft className="text-blue-600 text-3xl mb-4 mx-auto" />
            <p className="text-gray-600 italic mb-6">“{item.review}”</p>
            <div className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full mb-3 border-2 border-blue-500 object-cover"
              />
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerTestimonials;
