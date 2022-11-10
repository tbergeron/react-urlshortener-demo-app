import './App.css';
import { TopNavBar } from './TopNavBar/TopNavBar';
import { LandingPageTop } from './LandingPage/LandingPageTop/LandingPageTop';
import { LandingPageBottom } from './LandingPage/LandingPageBottom/LandingPageBottom';
import { ShortenerForm } from './ShortenerForm/ShortenerForm';
import { Footer } from './Footer/Footer';

function App() {
  return (
    <>
      <TopNavBar />
      <LandingPageTop />
      <ShortenerForm />
      <LandingPageBottom />
      <Footer />
    </>
    );
}

export default App;
