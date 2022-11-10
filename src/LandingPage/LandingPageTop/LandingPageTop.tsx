import { Container, Row, Col } from 'react-bootstrap';
import './LandingPageTop.css';
import gettingStartedImage from './images/illustration-working.svg';

export function LandingPageTop() {
  return (
    <Container className="mt-5 pb-3 getting-started">
      <Row className="justify-content-xl-center">
        <Col>
          <Container className="text-center text-md-start">
            <Row>
              <Col md={6} className="pt-5 mb-5 mb-md-0">
                <h1>More than just shorter links</h1>
                <p className="pe-md-5 me-5 pt-2 pb-2">
                  Build your brand's recognition and get detailed insights on how your links are performing.
                </p>
                <a href="#getstarted" className="btn btn-primary btn-lg rounded-pill fw-bold px-4">Get Started</a>
              </Col>
              <Col md={6} className="text-right">
                <img src={gettingStartedImage} alt="Getting Started" className="img-fluid" />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}