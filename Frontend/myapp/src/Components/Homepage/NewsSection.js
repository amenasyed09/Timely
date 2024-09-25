import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/news/general');
        setNews(response.data.news);
      } catch (err) {
        setError('An error occurred while fetching the news.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-white">{error}</p>;

  return (
    <div className="container max-w-5xl mx-auto p-4 flex flex-col lg:flex-row gap-4 bg-black font-playfair">
 
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        {news.slice(3, 7).map((article, index) => (
          <div key={index} className="list-card p-3 rounded-lg flex gap-3 items-start bg-black">
            <a href={article.url} className="flex items-center gap-3 text-white text-xs w-full">
              <div className="img-wrapper flex-shrink-0">
                <img
                  src={article.image}
                  alt={`Small Image ${index}`}
                  className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="list-card-content flex flex-col">
                <div className="category mb-1">
         
                </div>
                <div className="list-card-description">
                  {article.description}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
   
        {news[0] && (
          <div className="relative rounded-lg overflow-hidden">
            <a href={news[0].url} className="text-white text-xs">
              <img
                src={news[0].image}
                alt="Large Image"
                className="w-full h-100 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-3xl font-bold bg-black bg-opacity-50 p-4 rounded-lg">{news[0].title}</h2>
              </div>
            </a>
          </div>
        )}

      
        <div className="flex flex-col lg:flex-row gap-4">
          {news.slice(1, 3).map((article, index) => (
            <div key={index} className="bg-white p-4 rounded-lg flex flex-col w-full lg:w-1/2">
              <a href={article.url} className="text-black text-xs">
                <img
                  src={article.image}
                  alt={`Vertical Card Image ${index}`}
                  className="w-full h-48 object-cover rounded-lg mb-2 transition-transform duration-300 hover:scale-105"
                />
                <p className="text-black">{article.description}</p>
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <a
            href="/news/general"
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            View All
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
