import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="relative w-full h-[300px] font-playfair">
      <img
        src="../images/footer.jpg"
        alt="Footer Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white p-4">
        
        <div className="mb-4">
          <ul className="flex space-x-10">
            <li>
              <a href="" className="text-lg hover:text-gray-300 hover:translate-x-1 transition">Home</a>
            </li>
            <li className="relative">
              <a href="/news/general" className="text-lg hover:text-gray-300 hover:translate-x-1 transition">News</a>
              <ul className="absolute left-0 mt-2 pl-4 space-y-1 hidden group-hover:block">
                <li>
                  <a href="/news/politics" className="hover:text-gray-300 hover:translate-x-1 transition">Politics</a>
                </li>
                <li>
                  <a href="/news/sports" className="hover:text-gray-300 hover:translate-x-1 transition">Sports</a>
                </li>
                <li>
                  <a href="/news/technology" className="hover:text-gray-300 hover:translate-x-1 transition">Technology</a>
                </li>
              </ul>
            </li>
            <li className="relative">
              <a href="/history/all" className="text-lg hover:text-gray-300 hover:translate-x-1 transition">History</a>
              <ul className="absolute left-0 mt-2 pl-4 space-y-1 hidden group-hover:block">
                <li>
                  <a href="/history/monuments" className="hover:text-gray-300 hover:translate-x-1 transition">Monuments</a>
                </li>
                <li>
                  <a href="/history/culture" className="hover:text-gray-300 hover:translate-x-1 transition">Culture</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <div className="flex space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl hover:text-gray-300 transition" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl hover:text-gray-300 transition" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-gray-300 transition" />
            </a>
          </div>
        </div>

        <div className="text-sm mt-4">
          <p>&copy; 2024 Timely. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
