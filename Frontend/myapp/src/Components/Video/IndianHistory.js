import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const IndiaHistory = () => {
  const videoRef = useRef(null);
  const carouselRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [items, setItems] = useState([]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:8000/history/all`);
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const scrollToCarousel = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, 
        },
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3, 
        },
      },
    ],
  };

  return (
    <div className="w-full relative font-playfair">
   
      <div className="relative text-center text-white">
        <video
          ref={videoRef}
          className="w-full h-auto object-cover"
          src="videos/4460336-hd_1920_1080_25fps.mp4"
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-1/3 md:h-1/4"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover India's Rich Heritage</h1>
          <p className="text-sm md:text-lg mb-6 max-w-4xl">
            India, a land of ancient civilizations and diverse cultures, is home to a rich historical heritage that stretches back thousands of years. From the architectural grandeur of the Taj Mahal, a symbol of eternal love, to the majestic forts of Rajasthan, every monument tells a story of its own. The depth of India's history is not just in its monuments but also in its traditions, languages, and vibrant art forms. Come explore the glory of India's past and immerse yourself in the wonders that have stood the test of time.
          </p>
          <button
            onClick={scrollToCarousel}
            className="px-6 py-3 bg-maroon-600 text-white font-semibold rounded-md hover:bg-maroon-700 focus:outline-none"
          >
            Explore Monuments
          </button>
        </div>
      </div>
      <div ref={carouselRef} className="relative mt-[-10%] z-20 p-4">
        <div className="relative mb-8">
          <div className="absolute top-0 left-0 right-0 flex justify-center z-30">
            <a
              href="/history/all"
              className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              View All
            </a>
          </div>
        </div>
        
        <div className="mx-auto max-w-screen-lg">
          <Slider {...settings}>
            {items.map((monument) => (
              <div key={monument.id} className="relative group p-2">
                <img
                  src={monument.urlToImage[1]}
                  alt={monument.title}
                  className="w-full h-64 object-cover border-2 border-transparent group-hover:border-red-600 transition-transform transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-lg text-white font-bold">{monument.title}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default IndiaHistory;
