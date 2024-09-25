import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import './BackgroundSection.css';  

const heroData = [
  {
    imageUrl: '/images/pexels-avii-768043.jpg',
    title: 'Subscribe for Daily History Facts!',
  },
  {
    imageUrl: '/images/pexels-markus-winkler-1430818-4057663.jpg',
    title: 'Effortless Summaries for Quick Insights',
  },
  {
    imageUrl: '/images/pexels-byrahul-2081500.jpg',
    title: 'Explore Monuments on the Map',
  },
];

const BackgroundSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
      setShowUnderline(false); 

      setTimeout(() => {
        setShowUnderline(true);  
      }, 100);  
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { imageUrl, title } = heroData[currentIndex];

  return (
    <section
      className="relative bg-fixed bg-cover bg-center text-white h-screen flex items-center justify-center font-playfair"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <Fade key={currentIndex}>
        <div className="flex items-center justify-between w-[80vw] h-[80vh] z-10">
          <div className="flex-1 h-full flex justify-center items-center">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="flex-1 ml-8 h-full flex flex-col justify-center text-center">
            <h1 className={`text-6xl font-bold mb-4 underline-expand ${showUnderline ? 'show-underline' : ''}`}>
              {title}
            </h1>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default BackgroundSection;
