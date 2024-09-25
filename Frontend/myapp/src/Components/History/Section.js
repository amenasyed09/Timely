import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';

const Section = ({ content, imageUrl, mainsummary, summaryTitle }) => {
  const [showSummary, setShowSummary] = useState(false);

  const toggleSummary = () => {
    setShowSummary(prev => !prev);
  };

  return (
    <div className="section-container mx-auto my-10 p-6 max-w-4xl bg-white shadow-lg rounded-lg relative">
      <div className="section-image mb-6 flex justify-center">
        <Fade>
          <img src={imageUrl} alt="" className="uniform-image w-full max-w-lg h-auto rounded-lg object-cover" />
        </Fade>
      </div>
      <div className="section-content">
        <div className="text-content">
          <p className="text-left text-base text-gray-700 leading-relaxed">{content}</p>
        </div>
      </div>
      <button
        onClick={toggleSummary}
        className="floating-button fixed bottom-8 right-8 bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-transform transform duration-200"
      >
        Summary
      </button>
      {showSummary && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="modal-content bg-white rounded-lg shadow-lg p-6 relative max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <button onClick={toggleSummary} className="absolute top-2 right-2 text-red-600 hover:text-red-800">
              &times; {/* Close button */}
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">{summaryTitle}</h2>
            <div className="mb-4">
              <p className="text-lg text-black italic">{mainsummary}</p>
            </div>
            <div className="flex justify-center">
              <img src={imageUrl} alt="" className="w-[300px] h-[200px] object-cover rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
