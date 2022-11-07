import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ShortenerForm.css';

export function ShortenerForm() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col className="shortener-form rounded">
          <Form>
            <Container>
              <Row className="">
                <Col md={9}>
                  <Form.Control id="name" placeholder="Shorten a link here..." className="p-2 p-md-3 mb-3 mb-md-0" />
                </Col>
                <Col md={3}>
                  <Button variant="primary" size="lg" className="w-100 h-100 fw-bold">
                    Shorten It!
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}