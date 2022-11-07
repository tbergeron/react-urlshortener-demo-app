import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ShortenerForm.css';

const API_BASE = 'https://api.shrtco.de/v2/';

type ShortUrl = {
  url: string;
};

export function ShortenerForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ShortUrl>();

  const buildUrl = (uri:String) => API_BASE + uri;

  const onSubmit = (data: ShortUrl): void => {
    alert('FUCK ' + JSON.stringify(data));
    console.log(data);
  };

  const createShortenedUrl = async () => {
    try {
      let res = await fetch(buildUrl('/shorten'), {
        method: 'POST',
        body: JSON.stringify({/* TODO */}),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        alert('User created successfully');
      } else {
        alert('Some error occured');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchShortenedUrls = async () => {
    // TODO: this needs to be stored locally (make sure to keep IDs)
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col className="shortener-form rounded">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Container>
              <Row className="">
                <Col md={9}>
                  <Form.Group>
                    <Form.Control id="url" placeholder="Shorten a link here..."
                      {...register('url', { required: true, minLength: 10 })}
                      className="p-2 p-md-3 mb-3 mb-md-0" />
                      {errors.url?.type === 'required' && <div className="text-danger mt-3 mt-md-0">URL is required.</div>}
                      {errors.url?.type === 'minLength' && <div className="text-danger mt-3 mt-md-0">URL needs to be longer.</div>}
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Button variant="primary" size="lg" className="w-100 h-100 fw-bold" type="submit">
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