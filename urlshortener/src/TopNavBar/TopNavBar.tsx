import { Container, Navbar, Nav } from 'react-bootstrap';
import './TopNavBar.css';
import logo from './images/logo.svg'

export function TopNavBar() {
  return (
    <Navbar expand="lg" className="top-nav-bar mt-3 pb-3">
    <Container>
      <Navbar.Brand href="#home">
        <img src={logo} alt="Shortly" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features" className="pe-3">Features</Nav.Link>
          <Nav.Link href="#pricing" className="pe-3">Pricing</Nav.Link>
          <Nav.Link href="#resources" className="pe-3">Resources</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#login">Login</Nav.Link>
          <Nav.Link href="#signup" className="btn btn-primary rounded-pill ms-3 px-3 mt-3 mt-md-0">
            Sign Up
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}