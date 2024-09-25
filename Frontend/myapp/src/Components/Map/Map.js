import React from 'react';

const MapComponent = () => {
  return (
    <div className="relative w-screen h-screen font-playfair">
      <iframe
        src="http://localhost:8000/getMap" 
        title="Historical Monuments Map"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default MapComponent;
