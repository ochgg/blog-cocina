import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';

export const Navigation = () => {
  return (
    <Navbar expand="lg" style={{ background: 'var(--custom-gradient)' }}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Link to="/home" className="nav-link text-white">Inicio</Link> */}
            <Link to="/inicio" className="nav-link text-white">
              <FaHome />
            </Link>
            <Link to="/crear" className="nav-link text-white">
              <RiAddLine />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
