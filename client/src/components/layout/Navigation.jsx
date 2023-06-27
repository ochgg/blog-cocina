import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-secondary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-white">Inicio</Nav.Link>
            <Nav.Link href="#link" className="text-white">Agregar receta</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
