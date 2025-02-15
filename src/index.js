import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Home from './Components/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from './Components/Contact';
import Footer from './Components/Footer';



const root = ReactDOM.createRoot(document.getElementById('myapp'));

root.render(
  <>


  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</BrowserRouter>
<Footer />
</>
);

