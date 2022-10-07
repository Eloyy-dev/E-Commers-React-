import React, { useState } from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import Car from './Car'



const MyNavBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logout = () => {

    localStorage.setItem("token", "");
    navigate("/login")
  }

 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home" to="/" as={Link}>E-Commers</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/login" as={Link}>Login</Nav.Link>
              <Nav.Link to="/purchases" as={Link}>Purchase</Nav.Link>
              <Nav.Link onClick={handleShow}>Car</Nav.Link>
              <Nav.Link onClick={logout}>LOGOUT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Car show={show} close={handleClose} />

    </>
  );
}

export default MyNavBar;