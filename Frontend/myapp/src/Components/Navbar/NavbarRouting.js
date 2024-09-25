import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from '../Home';
import HistoryPage from "../History/HistoryPage";
import Discussion from "../DiscussionPage/Discussion";
import SubscribeText from "../Subscribe/SubscribeText";
import FullHistoryPage from "../History/FullHistoryPage";
import NewsSection from "../News/NewsPage";
import MapComponent from "../Map/Map";
import PageNotFound from "../Page Not Found/PageNotFound";

function NavbarRouting() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history/all" element={<HistoryPage />} />
        <Route path="/news/general" element={<NewsSection />} />
        <Route path="/fullHistoryPage/:id" element={<FullHistoryPage />} />
        <Route path="/subscribe" element={<SubscribeText />} />
        <Route path="/discuss" element={<Discussion />} />
  <Route path='/getMap' element={<MapComponent/>}/>
  <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default NavbarRouting;
