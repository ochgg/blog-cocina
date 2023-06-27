import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from '../components/pages/Home';
import { Articles } from '../components/pages/Articles';
import { Navigation } from '../components/layout/Navigation';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const Routing = () => {
  return (
    <BrowserRouter>
        {/*LAYOUT */}
        <Header />
        <Navigation />
        


        {/*/Contenido central y rutas */}
        <section id="content" className='content' />
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/articles" element={<Articles />} />
           </Routes>
           
           <Footer />
    </BrowserRouter>
    
  )
}
