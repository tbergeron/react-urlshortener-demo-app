import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import logo from '../TopNavBar/images/logo.svg';
import facebook from './images/icon-facebook.svg';
import twitter from './images/icon-twitter.svg';
import pinterest from './images/icon-pinterest.svg';
import instagram from './images/icon-instagram.svg';

export function Footer() {
  return (
    <Container className="footer p-4" fluid>
      <Container>
        <Row className="pt-4">
          <Col md={3} className="ps-0 ps-md-5 pe-0 pe-md-5 text-center text-md-start">
            <img src={logo} alt="Logo" className="logo" />
          </Col>
          <Col md={2} className="text-center text-md-start mt-4 mt-md-0">
            <h6 className="mb-4">Features</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#">Link Shortening</a>
              </li>
              <li>
                <a href="#">Branded Links</a>
              </li>
              <li>
                <a href="#">Analytics</a>
              </li>
            </ul>
          </Col>
          <Col md={2} className="text-center text-md-start mt-4 mt-md-0">
            <h6 className="mb-4">Resources</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Developers</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </Col>
          <Col md={2} className="text-center text-md-start mt-4 mt-md-0">
            <h6 className="mb-4">Company</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </Col>
          <Col md={3} className="text-center text-md-start mt-4 mt-md-0 mb-5 mb-md-0">
            <a href="#" className="social me-3">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#" className="social me-3">
              <img src={twitter} alt="Twitter" />
            </a>
            <a href="#" className="social me-3">
              <img src={pinterest} alt="Pinterest" />
            </a>
            <a href="#" className="social">
              <img src={instagram} alt="Instagram" />
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}