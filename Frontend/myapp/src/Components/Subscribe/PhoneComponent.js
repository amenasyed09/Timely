import React from 'react';
import './PhoneComponent.css'

const PhoneComponent = () => {
  return (
    <div className="phone-frame flex flex-col items-center bg-black font-playfair">
    
      <div className="volume-buttons">
        <div className="volume-button"></div>
        <div className="volume-button"></div>
      </div>

  
      <div className="screen-container text-black">
        <div className="scroll-content flex flex-col w-full h-full">
          <h2 className="text-2xl font-bold mb-4 fade-in text-center">Timely</h2>

      
          <img src="/images/Home.jpg" alt="Timely Homepage" className="w-full h-auto mb-4" />

          <div className="flex flex-col space-y-4">
            <p>
              <strong>Timely</strong> brings history to your fingertips. Stay updated with the latest news and explore historical facts and insights in a way that's easy to understand.
            </p>
            <p>
              Whether you're interested in ancient civilizations or modern history, <strong>Timely</strong> provides an immersive experience, offering summaries, in-depth articles, and discussions about key events.
            </p>
    
            <div className="flex flex-col space-y-4">
              <div className="card">
                <img src="/images/Home1.webp" alt="Historical Insights" />
                Discover hidden stories and historical monuments from across the world.
              </div>
              
              <p>
                Dive into cultural discussions, read about significant events in world history, and learn more about how the past shapes the present.
              </p>

              <p>
                From timelines to detailed summaries, <strong>Timely</strong> ensures you stay informed and enlightened with curated content designed for history enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </div>

   
      <div className="nav-buttons">
        <div className="nav-button home"></div>
        <div className="nav-button circle"></div>
        <div className="nav-button square"></div>
      </div>
    </div>
  );
};

export default PhoneComponent;
