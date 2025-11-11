import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import ServiceData from '../Component/ServiceData';
import { useSpring, animated, config } from '@react-spring/web';

const FloatingAnimatedCard = ({ children, delay = 0 }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(20px) scale(0.95)' },
    to: async (next) => {
      while (true) {
        await next({ opacity: 1, transform: 'translateY(0px) scale(1)' });
        await next({ opacity: 1, transform: 'translateY(-5px) scale(1.05)' });
        await next({ opacity: 1, transform: 'translateY(0px) scale(1)' });
      }
    },
    config: { tension: 180, friction: 12 },
    delay,
  });

  return (
    <animated.div
      style={props}
      className="hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden "
    >
      {children}
    </animated.div>
  );
};

const SoftBubbleBackground = () => {
  const bubbles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {bubbles.map((_, idx) => {
        const size = Math.random() * 40 + 20;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        return (
          <animated.div
            key={idx}
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              background: 'rgba(59,130,246,0.2)',
              position: 'absolute',
              top: '100%',
              left: `${left}%`,
              animation: `floatBubble 7s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes floatBubble {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-150px); opacity: 0.5; }
          100% { transform: translateY(-300px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const Home = () => {
  const appsdata = useLoaderData();

  useEffect(() => {
    document.title = 'Home | Mobile App';
  }, []);

  return (
    <div className="relative px-4 sm:px-6 lg:px-10 py-10 overflow-hidden">
      {/* Background Bubbles */}
      <SoftBubbleBackground />

      {/* Heading */}
      <div className="text-center md:text-left mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 animate-gradient-x">
          Our Popular Services
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Enjoy the top-rated games our users love the most.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appsdata
          .sort((a, b) => b.ratings - a.ratings)
          .slice(0, 6)
          .map((data, idx) => (
            <FloatingAnimatedCard key={data.id} delay={idx * 200}>
              <ServiceData data={data} />
            </FloatingAnimatedCard>
          ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-10">
        <Link
          to="/all-service"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
        >
          Load More
        </Link>
      </div>

      {/* Gradient Animation */}
      <style>{`
        @keyframes gradientX {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 6s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
