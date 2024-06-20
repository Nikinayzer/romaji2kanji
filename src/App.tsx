import "./styles/App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactGA from 'react-ga4';
//redux
import { Provider } from "react-redux";
import Store from "./redux/store";
import Header from "./components/Header";
// components
import Layout from "./components/Layout";
import InputField from "./components/InputField";
import WordField from "./components/WordField";
import FAQPage from "./components/FAQPage";
import Footer from "./components/Footer";
import ConsentBanner from './components/ConsentBanner';
// pages
import Profile from "./components/Profile";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import { WordController } from "./logic/WordController";

const TRACKING_ID = 'G-YTBJVQT22P';

function App() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('consent');
    if (consent !== null) {
      const consentValue = consent === 'true';
      setHasConsent(consentValue);
      if (consentValue) {
        ReactGA.initialize(TRACKING_ID);
      }
    }
  }, []);

  const handleConsent = (consent: boolean) => {
    localStorage.setItem('consent', String(consent));
    setHasConsent(consent);
    if (consent) {
      ReactGA.initialize(TRACKING_ID);
    }
  };
  

  return (
    <Router basename="romaji2kanji">
      <Provider store={Store}>
        <div className="App">
          <Header />
          {hasConsent === null && <ConsentBanner onConsent={handleConsent} />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Login/>} />
            <Route path="/admin" element={<AdminPanel/>} />
          </Routes>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

const HomePage = () => {
  useEffect(() => {
    const consent = localStorage.getItem('consent');
    if (consent === 'true') {
      ReactGA.send({ 
        hitType: 'pageview', 
        page: window.location.pathname,
        title: "app"
      });
    }
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <WordField />
        <InputField />
        <Layout />
      </div>
    </>
  );
};

export default App;
