import { Container, Row, Col } from 'react-bootstrap';
import './LandingPageBottom.css';
import iconBrandRecognition from './images/icon-brand-recognition.svg';
import iconDetailedRecords from './images/icon-detailed-records.svg';
import iconFullyCustomizable from './images/icon-fully-customizable.svg';

export function LandingPageBottom() {
  return (
    <>
      <Container className="landing-page-bottom p-2 p-md-5 pt-5" fluid>
        <Container className="text-center advanced-statistics pt-5">
          <Row className="pt-5">
            <Col>
              <h1>Advanced Statistics</h1>
              <p className="mb-5">
                Track how your links are performing across the web with<br />
                our advanced statistics dashboard.
              </p>
              <Container className="pt-5 pb-5 text-center">
                <Row>

                  <Col sm={12} lg={4} className="advanced-statistics-column brand-recognition mb-5 mb-lg-0">
                    <div className="bg-white rounded p-4">
                      <div className="icon rounded-circle mb-4">
                        <img src={iconBrandRecognition} alt="Brand Recognition" />
                      </div>
                      <h4>Brand Recognition</h4>
                      <p>Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.</p>
                    </div>
                  </Col>

                  <Col sm={12} lg={4} className="advanced-statistics-column detailed-records mb-5 mb-lg-0 mt-4 mt-lg-0">
                    <div className="bg-white rounded p-4">
                      <div className="icon rounded-circle mb-4">
                        <img src={iconDetailedRecords} alt="Detailed Records" />
                      </div>
                      <h4>Detailed Records</h4>
                      <p>Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.</p>
                    </div>
                  </Col>

                  <Col sm={12} lg={4} className="advanced-statistics-column fully-customizable mt-4 mt-lg-0">
                    <div className="bg-white rounded p-4">
                      <div className="icon rounded-circle mb-4">
                        <img src={iconFullyCustomizable} alt="Fully Customizable" />
                      </div>
                      <h4>Fully Customizable</h4>
                      <p>Improve brand awareness content discoverability through customizable links, supercharging audience engagement.</p>
                    </div>
                  </Col>

                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container className="text-center boost-your-links" fluid>
        <Row className="">
          <Col>
            <h2 className="mb-4">Boost your links today</h2>
            <a href="#getstarted" className="btn btn-primary rounded-pill btn-lg fw-bold px-4">Get Started</a>
          </Col>
        </Row>
      </Container>
    </>
  )
}