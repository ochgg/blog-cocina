import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from '../components/pages/Home';
import { Navigation } from '../components/layout/Navigation';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Create } from '../components/pages/Create';
import { Article } from '../components/pages/Article';
import { Container } from 'react-bootstrap';

export const Routing = () => {
  return (
    <BrowserRouter>
      {/*LAYOUT */}
      <Header />
      <Navigation />



      {/*/Contenido central y rutas */}
      <Container className="my-5">
        <section id="content" className='content' />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/articulo/:id" element={<Article />} />
          <Route path="/crear" element={<Create />} />
        </Routes>


        <Footer />
      </Container>
    </BrowserRouter>
  )
}
