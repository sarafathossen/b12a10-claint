import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Entrepreneur",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FXQQHGfMSl47ZZzoX4Ro4EPhTfjSokbYCQ&s",
    review:
      "They designed my business website perfectly! The team is very responsive and delivered exactly what I needed — highly recommended!",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    role: "Freelancer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUM5hM53vez74ffS2Zs2mWgShg04rNsbp_cQ&s",
    review:
      "Excellent service and on-time delivery. My e-commerce site now looks professional and user-friendly. Great experience overall!",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Digital Marketer",
    image: "https://imgk.timesnownews.com/story/nusratjahan-ians_0.jpg",
    review:
      "Amazing support! They not only built my site but also guided me with SEO and marketing. I’m really satisfied with the result.",
  },
];

const CustomerTestimonials = () => {
  return (
    <section className="bg-base-100 dark:bg-gray-900 py-16 px-6 md:px-12 text-center transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        What Our <span className="text-blue-600">Customers Say</span>
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-12">
        We value our clients and their feedback. Here’s what they think about
        our services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <FaQuoteLeft className="text-blue-600 text-3xl mb-4 mx-auto" />
            <p className="text-gray-600 dark:text-gray-300 italic mb-6">
              “{item.review}”
            </p>
            <div className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full mb-3 border-2 border-blue-500 object-cover"
              />
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerTestimonials;
