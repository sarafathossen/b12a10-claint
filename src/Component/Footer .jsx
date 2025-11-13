import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="
      w-11/12 mx-auto mt-10 p-10 
      flex flex-col md:flex-row justify-between items-center gap-6 
      bg-black text-gray-300 rounded-2xl
    ">
      <aside className="text-center md:text-left space-y-2">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Workly</h2>
        <p className="font-semibold text-sm md:text-base text-gray-400">
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 1992
        </p>
        <p className="text-xs md:text-sm text-gray-500">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </aside>

      <nav>
        <div className="flex gap-6 justify-center items-center">
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-3xl text-gray-400 hover:text-blue-400 transition-colors" />
          </a>

          <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="fill-gray-400 hover:fill-red-500 transition-colors"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>

          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="fill-gray-400 hover:fill-blue-500 transition-colors"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
