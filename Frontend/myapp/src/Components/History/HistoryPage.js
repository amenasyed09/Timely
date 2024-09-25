import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryCard from './HistoryCard';

function HistoryPage() {
  const [items, setItems] = useState([]); 
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  const fetchItems = async (category) => {
    try {
      const response = await fetch(`http://localhost:8000/history/${category}`);
      const data = await response.json();
      console.log(data);
      setItems(data.items || []); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchItems(category);
  }, [category]);

  return (
    <div className="bg-black text-white min-h-screen py-8 font-playfair">
      <div className="mb-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-4">
          <nav className="flex flex-wrap justify-center space-x-4 md:space-x-8">
            <button
              onClick={() => setCategory('all')}
              className="text-gray-900 bg-white px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
            >
              All Categories
            </button>
            <button
              onClick={() => setCategory('monument')}
              className="text-gray-900 bg-white px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
            >
              Historical Monuments
            </button>
            <button
              onClick={() => setCategory('art')}
              className="text-gray-900 bg-white px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
            >
              Indian Art and Literature
            </button>
          </nav>
        
          <button
            onClick={() => navigate('/getMap')}
            className="bg-red-500 group flex items-center space-x-2 transition-all duration-150 ease-in-out hover:bg-red-600 hover:scale-105 shadow-md shadow-red-700 rounded-full px-4 py-2"
          >
            <span className="text-white">Open Map</span>
            <span className="group-hover:hidden">🗺️</span>
            <span className="group-hover:block hidden">🌍</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <HistoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
