import { Container, Navbar, Nav } from 'react-bootstrap';
import './TopNavBar.css';
import logo from './images/logo.svg'

export function TopNavBar() {
  return (
    <Navbar bg="light" expand="lg" className="top-nav-bar">
    <Container>
      <Navbar.Brand href="#home">
        <img src={logo} alt="Shortly" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link href="#resources">Resources</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#login">Login</Nav.Link>
          <Nav.Link href="#signup" className="btn btn-primary ms-3 px-3">
            Sign Up
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}