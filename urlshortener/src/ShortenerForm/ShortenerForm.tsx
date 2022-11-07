import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ShortenerForm.css';
import { usePersistentStorageValue } from '../LocalStorage';

const API_BASE = 'https://api.shrtco.de/v2/';

// component state
type ShortenerFormState = {
  shortUrls: Array<ShortUrl>;
}

// initial state before loading from local storage
let shortenerFormState: ShortenerFormState = {
  shortUrls: []
}

type ShortUrlRequest = {
  url: string;
};

type ShortUrl = {
  originalLink: string;
  shortUrl: string;
  code: string;
}

export function ShortenerForm() {
  const [state, setState] = usePersistentStorageValue("short-urls", shortenerFormState);
  const { register, handleSubmit, formState: { errors } } = useForm<ShortUrlRequest>();
  const buildUrl = (uri: String) => API_BASE + uri;

  console.log('initialState:', state);

  const createShortenedUrl = async (shortUrlRequest: ShortUrlRequest) => {
    console.log('Sending request to API:', shortUrlRequest);
    try {
      let res = await fetch(buildUrl('shorten?url=' + shortUrlRequest.url));
      let resJson = await res.json();
      console.log(resJson);
      if (resJson.result) {
        // create new shortUrl
        let newShortUrl: ShortUrl = {
          originalLink: resJson.result.original_link,
          shortUrl: resJson.result.full_short_link,
          code: resJson.result.code
        };
        // push new short url to data store
        setState({ shortUrls: [...state.shortUrls, newShortUrl] })
        // TODO: update ui
        console.log('Link created successfully', shortenerFormState);
      } else {
        alert('Some error occured');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data: ShortUrlRequest): void => {
    createShortenedUrl(data);
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
                    // TODO: ADD VALIDATION TO MAKE SURE IT IS AN URL
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