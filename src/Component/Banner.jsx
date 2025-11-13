import React from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co/NgChwJWy/New-Project-28.jpg",
      title: "Deep Home Cleaning",
      details: "We provide full home deep cleaning including floors, windows, furniture, and bathrooms. ",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/ccybSwds/New-Project-40.jpg",
      title: "Home Appliance Setup",
      details: "We install TVs, washing machines, ovens, and more safely with expert handling.",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/q3vJSbW6/New-Project-34.jpg",
      title: "Sofa & Carpet Cleaning",
      details: "We offer deep cleaning for sofas, carpets, and upholstery using advanced steam and vacuum machines.",
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
          
          <div
            className="w-full h-[400px] bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>

          
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
            <h2 className="text-3xl font-bold mb-3">{slide.title}</h2>
            <p className="max-w-xl mb-4 text-sm md:text-base">{slide.details}</p>
            <button
              onClick={() => navigate("/all-service")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300"
            >
              Explore
            </button>
          </div>

          
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
