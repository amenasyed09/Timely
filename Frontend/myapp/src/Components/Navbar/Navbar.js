import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [username,setUsername]=useState('')
  const toggleMenu = () => setIsOpen(!isOpen);
  useEffect(() => {
    const cookieData = Cookies.get('user_data');
    if (cookieData)
      {
        setSubscribed(true);
        setUsername(cookieData.split(',')[0]);
      }
  
    const handleStorageChange = () => {
      const isSubscribed = localStorage.getItem('subscribed') === 'true';
      setSubscribed(isSubscribed);
    };
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleUnsubscribe=async()=>
  {
    console.log(username)
    try 
    {
      await axios.post('http://localhost:8000/unsubscribe', { username:username });
      Cookies.remove('user_data');
      setSubscribed(false);
    }catch(err)
    {
      console.log('Unsubscription failed',err)
    }
  }
  return (
    <nav className="text-white bg-black w-full z-50  backdrop-blur-md shadow-md font-playfair">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex-grow flex items-center">
        <div className="text-red-500 text-2xl font-bold">
          <Link to="/">Timely</Link>
        </div>
        <div className="hidden md:flex flex-grow justify-center space-x-6">
          <Link to="/" className="text-white hover:text-red-500 transition relative">
            Home
          </Link>
          <Link to="/news/general" className="text-white hover:text-red-500 transition relative">
            News
          </Link>
          <Link to="/history/all" className="text-white hover:text-red-500 transition relative">
            History
          </Link>
        </div>
      </div>
      <button 
        className="md:hidden text-white hover:text-red-500 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      {subscribed ? (
        <button
          onClick={handleUnsubscribe}
          className="text-white bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-full ml-4 hidden md:block"
        >
          Unsubscribe
        </button>
      ) : (
        <Link to="/subscribe">
          <button
            className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full ml-4 hidden md:block"
          >
            Subscribe
          </button>
        </Link>
      )}
    </div>

    <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800 bg-opacity-80`}>
      <Link to="/" className="block px-4 py-2 text-white hover:text-red-500 transition relative">
        Home
      </Link>
      <Link to="/news/general" className="block px-4 py-2 text-white hover:text-red-500 transition relative">
        News
      </Link>
      <Link to="/history/all" className="block px-4 py-2 text-white hover:text-red-500 transition relative">
        History
      </Link>

      {subscribed ? (
        <button
          onClick={handleUnsubscribe}
          className="text-white bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-full ml-4"
        >
          Unsubscribe
        </button>
      ) : (
        <Link to="/subscribe">
          <button
            className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full ml-4"
          >
            Subscribe
          </button>
        </Link>
      )}
    </div>
  </nav>
  
  );
};

export default Navbar;
