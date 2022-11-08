import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { usePersistentStorageValue } from '../PersistentStorage';
import './ShortenerForm.css';

// initial state before loading from local storage
let shortenerState: ShortenerState = {
  shortUrls: []
}
// component state
type ShortenerState = {
  shortUrls: Array<ShortUrl>;
}
// request sent to API
type ShortUrlRequest = {
  url: string;
};
// short url type
type ShortUrl = {
  originalLink: string;
  shortUrl: string;
  code: string;
}

function ShortenedUrlList(props: any) {
  return (
    <>
      {props.items.map((item: ShortUrl) =>
        <ShortenedUrlListItem key={item.code} item={item} />
      )}
    </>
  );
}

function ShortenedUrlListItem(props: any) {
  const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>, item: ShortUrl) => {
    event.preventDefault();
    navigator.clipboard.writeText(item.shortUrl);
    // TODO: Update UI for success
  };

  return (
    <Row className="mt-2 mb-3 pt-3 p-2 bg-white rounded">
      <Col md={5} className="original-link">
        <a href={props.item.originalLink} target="_blank" rel="noreferrer">
          {props.item.originalLink}
        </a>
      </Col>
      <Col md={5} className="shortened-url text-end">
        <a href={props.item.shortUrl} target="_blank" rel="noreferrer">
          {props.item.shortUrl}
        </a>
      </Col>
      <Col md={2} className="copy text-end">
        <Button variant="primary" onClick={(event) => copyToClipboard(event, props.item)}>Copy</Button>
      </Col>
    </Row>
  );
}

export function ShortenerForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ShortUrlRequest>();
  const [state, setState] = usePersistentStorageValue('short-urls', shortenerState);

  console.log('initialState:', state);

  const createShortenedUrl = async (shortUrlRequest: ShortUrlRequest) => {
    const API_BASE = 'https://api.shrtco.de/v2/';
    const buildUrl = (uri: String) => API_BASE + uri;
    console.log('Sending request to API:', shortUrlRequest);
    try {

      // TODO: Message for when URL already exists?

      let res = await fetch(buildUrl('shorten?url=' + shortUrlRequest.url));
      let resJson = await res.json();
      console.log('response', resJson);

      if (resJson.result) {
        // create new shortUrl
        let newShortUrl: ShortUrl = {
          originalLink: resJson.result.original_link,
          shortUrl:     resJson.result.full_short_link,
          code:         resJson.result.code
        };
        // push new short url to data store
        setState({ shortUrls: [...state.shortUrls, newShortUrl] })
        console.log('Link created successfully');

        // Clear form field on success
        reset();

        // TODO: Add confirmation message on success

      } else {
        alert('Some error occured');

        // TODO: Add error message on error

      }
    } catch (err) {
      console.log(err);
    }
  };

  const validateUrl = (value: string) => {
    const pattern = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const regexp = new RegExp(pattern);
    return (regexp.test(value)) ? true : false;
  };

  const onSubmit = (data: ShortUrlRequest): void => {
    createShortenedUrl(data);
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col className="shortener-form rounded">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Container>
                <Row className="">
                  <Col md={9}>
                    <Form.Group>
                      <Form.Control id="url" placeholder="Shorten a link here..."
                        {...register('url', {
                          required: true,
                          minLength: 10,
                          validate: validateUrl
                        })}
                        className="p-2 p-md-3 mb-3 mb-md-0" />
                        {errors.url?.type === 'required' && <div className="text-danger mt-3 mt-md-0">URL is required.</div>}
                        {errors.url?.type === 'minLength' && <div className="text-danger mt-3 mt-md-0">URL needs to be longer.</div>}
                        {errors.url?.type === 'validate' && <div className="text-danger mt-3 mt-md-0">URL is not valid.</div>}
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
      <Container fluid className="shortened-urls-container pt-5 p-4">
        <Container className="pt-4">
          <ShortenedUrlList items={state.shortUrls} />
        </Container>
      </Container>
    </>
  );
}