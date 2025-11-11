import React from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: "https://wallpapers.com/images/hd/pubg-banner-1920-x-1080-background-prs6to3hgrs8nk7x.jpg",
      title: "Web Design Service",
      details: "We create stunning, responsive websites that bring your business to life online.",
    },
    {
      id: 2,
      image: "https://wallpapers.com/images/featured/clash-of-clans-f88iyeweabo3r6kz.jpg",
      title: "E-commerce Solutions",
      details: "Build your online store with secure checkout, user-friendly design, and top performance.",
    },
    {
      id: 3,
      image: "https://wallpapers.com/images/hd/free-fire-banner-with-complete-cast-5vfv6tj9bc7x37rw.jpg",
      title: "SEO & Marketing",
      details: "Boost your website ranking and visibility with professional SEO and marketing strategies.",
    },
  ];

  return (
    <div className="carousel w-full rounded-2xl overflow-hidden shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          id={`slide${slide.id}`}
          className="carousel-item relative w-full"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-[400px] object-cover"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
            <h2 className="text-3xl font-bold mb-3">{slide.title}</h2>
            <p className="max-w-xl mb-4 text-sm md:text-base">{slide.details}</p>
            <button
              onClick={() => navigate("/all-service")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300"
            >
              Explore
            </button>
          </div>

          {/* Navigation */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${index === 0 ? slides.length : index}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${index + 2 > slides.length ? 1 : index + 2}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
