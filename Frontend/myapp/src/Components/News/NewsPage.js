import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [summaries, setSummaries] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNews = async (category) => {
    try {
      const response = await axios.get(`http://localhost:8000/news/${category}`);
      setNews(response.data.news);
    } catch (err) {
      setError('An error occurred while fetching the news.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`https://gnews.io/api/v4/search`, {
        params: {
          q: query,
          country: 'in',
          apikey: '56ccb1e25242e4191fe03acb6e1b310a',
        },
      });
      setNews(response.data.articles);
    } catch (err) {
      setError('An error occurred while fetching search results.');
    }
  };

  const fetchSummary = async (url, index) => {
    try {
      const response = await axios.get(`http://localhost:8000/summarize/`, {
        params: { url },
      });
      setSummaries(prevSummaries => ({ ...prevSummaries, [index]: response.data.summary }));
    } catch (err) {
      console.error('Error fetching summary:', err);
    }
  };

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const handleSearch = () => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    } else {
      fetchNews(category);
    }
  };

  const handleToggleSummary = async (index) => {
    if (expandedArticle === index) {
      setIsModalOpen(false);
      setExpandedArticle(null);
    } else {
      setLoadingSummary(true);
      setExpandedArticle(index);

      try {
        const article = news[index];
        const response = await axios.get(`http://localhost:8000/summarize/`, {
          params: { url: article.url },
        });

        setSummaries((prevSummaries) => ({
          ...prevSummaries,
          [index]: response.data.summary,
        }));
        setModalContent({
          title: article.title,
          image: article.image,
          summary: response.data.summary,
        });
        setIsModalOpen(true);
      } catch (err) {
        console.error('Error fetching summary:', err);
      } finally {
        setLoadingSummary(false);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setExpandedArticle(null);
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-white">{error}</p>;

  return (
    <div className="bg-black text-white min-h-screen font-playfair">
      <div className="py-4 mb-8 bg-black">
        <div className="container mx-auto flex justify-center space-x-4">
          {['general', 'sports', 'politics', 'technology'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-gray-900 bg-white px-4 py-2 rounded-full hover:bg-gray-200 transition ${category === cat && 'bg-gray-300'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-4 container mx-auto flex justify-center">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg w-full max-w-md text-black"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-maroon-600 hover:bg-maroon-700 text-white px-4 rounded-lg"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid gap-6">
          {news[0] && (
            <div className="relative w-full h-80 rounded-lg overflow-hidden">
              <img
                src={news[0].image}
                alt={news[0].title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-white text-3xl font-bold">{news[0].title}</h2>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleToggleSummary(0)}
                    className={`px-4 py-2 rounded-full text-white bg-maroon-600 hover:bg-maroon-700 transition ${expandedArticle === 0 && 'bg-maroon-800'}`}
                  >
                    {expandedArticle === 0 ? 'Hide Summary' : 'Summarize'}
                  </button>
                  <a
                    href={news[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-full text-white bg-maroon-600 hover:bg-maroon-700 transition ${expandedArticle === 0 && 'bg-maroon-800'}`}
                  >
                    Read Full Article
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(1).map((article, index) => (
              <div key={index} className="bg-white text-black rounded-lg overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{article.title}</h3>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleToggleSummary(index + 1)}
                      className={`px-4 py-2 rounded-full text-white bg-black hover:bg-red-700 transition ${expandedArticle === index + 1 && 'bg-maroon-800'}`}
                    >
                      {expandedArticle === index + 1 ? 'Hide Summary' : 'Summarize'}
                    </button>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-full text-white bg-black hover:bg-red-700 transition ${expandedArticle === index + 1 && 'bg-maroon-800'}`}
                    >
                      Read Full Article
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center overflow-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-96 overflow-y-auto">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black">{modalContent.title}</h2>
                <p className="text-gray-700 italic">{modalContent.summary}</p>
              </div>
              <div>
                <img
                  src={modalContent.image}
                  alt={modalContent.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
