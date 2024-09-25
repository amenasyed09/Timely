import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';


export default function HistoryCard({ item }) {
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const userDate = Cookies.get('user_data');
    if (userDate) {
      setIsSubscribed(true); 
    }
  }, []);

  const handleClick = async () => {
    try {
  
      navigate(`/fullHistoryPage/${item["_id"]}`);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const handleDiscuss = () => {

    if (isSubscribed) {
      navigate('/discuss', { state: { item } });
    } else {
    
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-wrap justify-center space-x-4 space-y-4 mt-4 font-playfair">
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
        <div className="relative group">
          <img
            className="w-full h-48 object-cover transition-transform duration-300 grayscale group-hover:grayscale-0 group-hover:scale-105"
            src={item.urlToImage[0]}
            alt={`Image related to ${item.title}`}
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl text-black text-center font-semibold mb-2">{item.title}</h2>
          <p className="text-gray-700 mb-4">{item.description.slice(0, 100)}</p>
          <div className="flex gap-4">
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-300"
            >
              Read More
            </button>
            <button
              onClick={handleDiscuss}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-300"
            >
              Discuss
            </button>
          </div>
        </div>
      </div>
      
    
      {showModal && (
        <Modal
          title="Subscribe First!"
          message="You need to subscribe to participate in the discussion."
          onClose={() => setShowModal(false)}
          onConfirm={() => navigate('/subscribe')}
        />
      )}
    </div>
  );
}
