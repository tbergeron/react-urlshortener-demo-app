import { Container, Row, Col } from 'react-bootstrap';
import './LandingPageTop.css';
import gettingStartedImage from './images/illustration-working.svg';

export function LandingPageTop() {
  return (
    <Container className="mt-5 getting-started">
      <Row className="">
        <Col>
          <h1>More than just shorter links</h1>
          <p>
            Sit anim ex aliquip do nostrud tempor consectetur laboris adipisicing voluptate. Irure sint consectetur id ut culpa ea cillum sint cillum quis. Officia aliquip dolore cupidatat ad duis officia ullamco. Voluptate officia adipisicing commodo cillum nulla duis laboris anim proident.
          </p>
          <a href="#getstarted" className="btn btn-primary fw-bold px-4">Get Started</a>
        </Col>
        <Col>
          <img src={gettingStartedImage} alt="Getting Started" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  )
}