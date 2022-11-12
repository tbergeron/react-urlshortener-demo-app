import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
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

interface ShortenedListProps {
  displayAlert: Function;
  items: Array<ShortUrl>;
}

function ShortenedUrlList(props: ShortenedListProps) {
  return (
    <>
      {props.items.map((item: ShortUrl) =>
        <ShortenedUrlListItem key={item.code} item={item} displayAlert={props.displayAlert} />
      )}
    </>
  );
}

interface ShortenedListItemProps {
  displayAlert: Function;
  item: ShortUrl;
}

function ShortenedUrlListItem(props: ShortenedListItemProps) {
  const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>, item: ShortUrl) => {
    event.preventDefault();
    navigator.clipboard.writeText(item.shortUrl);
    props.displayAlert('info', 'Copied to clipboard!');
  };

  return (
    <Row className="mt-2 mb-3 pt-3 p-2 bg-white rounded">
      <Col md={5} className="original-link text-truncate">
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

  // alert management
  const [fadeOutAlert, setFadeOutAlert] = useState(false);
  const [isShowingAlert, setIsShowingAlert] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [alertMessage, setAlertMessage] = useState('');
  const displayAlert = (alertType: string, alertMessage: string) => {
    setFadeOutAlert(true);
    setIsShowingAlert(true);
    setAlertType(alertType);
    setAlertMessage(alertMessage);
    // fade out and hide alert
    setTimeout(() => setFadeOutAlert(false), 1000);
    setTimeout(() => setIsShowingAlert(false), 3500);
  };

  console.log('initialState:', state);

  const createShortenedUrl = async (shortUrlRequest: ShortUrlRequest) => {
    const API_BASE = 'https://api.shrtco.de/v2/';
    const buildUrl = (uri: String) => API_BASE + uri;
    console.log('Sending request to API:', shortUrlRequest);
    try {

      // mssage for when URL already exists?
      if (state.shortUrls.some((shortUrl) => shortUrl.originalLink === shortUrlRequest.url)) {
        // error message on error
        displayAlert('danger', 'URL already exists');
        return false;
      }

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

        // clear form field on success
        reset();
        // confirmation message on success
        displayAlert('success', 'Link created successfully!');
      } else {
        // error message on error
        displayAlert('danger', 'Some error occured.');
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
          <Alert variant={alertType}
            className={
              (isShowingAlert && fadeOutAlert) ? 'alert-shown' :
              (isShowingAlert && !fadeOutAlert) ? 'alert-shown alert-fadeout' : 'alert-hidden'
            }
            onTransitionEnd={() => setFadeOutAlert(false)}>
            {alertMessage}
          </Alert>
          <ShortenedUrlList items={state.shortUrls} displayAlert={displayAlert} />
        </Container>
      </Container>
    </>
  );
}