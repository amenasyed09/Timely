import NewsSection from './Homepage/NewsSection';
import SubscribeText from './Subscribe/SubscribeText';

import BackgroundSection from './Homepage/BackgroundSection';
import IndiaHistory from './Video/IndianHistory';
import Footer from './Footer/Footer';
import Card from './Categories/Card';
export default function Home() {
  return (
    <>
     <div className="bg-black">
    
    <BackgroundSection/>
      <NewsSection />
      <SubscribeText />
        <IndiaHistory/>
      <Card/>
      <Footer/>
      </div>
    </>
  );
}
