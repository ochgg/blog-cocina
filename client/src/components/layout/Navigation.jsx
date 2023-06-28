import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-secondary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/home" className="nav-link text-white">Inicio</Link>
            <Link to="/create" className="nav-link text-white">Agregar receta</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
