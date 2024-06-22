import React from "react";
import "./styles/App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import ReactGA from "react-ga4";

//providers
import { ToastProvider } from "./components/toastFactory/ToastContext";
// redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

// components
import Header from "./components/header/Header";
import Layout from "./components/views/mainView/Layout";
import InputField from "./components/views/mainView/InputField";
import WordField from "./components/views/mainView/WordField";
import FAQPage from "./components/views/FAQPage/FAQPage";
import Footer from "./components/footer/Footer";
import ConsentBanner from "./components/ConsentBanner";
//middleware
import AdminMiddleware from "./components/middleware/AdminMiddleware";

// pages
import Profile from "./components/views/profile/Profile";
import Login from "./components/views/login/Login";
import AdminPanel from "./components/views/adminPanel/AdminPanel";

// Google Analytics //todo move to .env
const TRACKING_ID = "G-YTBJVQT22P";

function App() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem("consent");
    if (consent !== null) {
      const consentValue = consent === "true";
      setHasConsent(consentValue);
      if (consentValue) {
        ReactGA.initialize(TRACKING_ID);
      }
    }
  }, []);

  const handleConsent = (consent: boolean) => {
    localStorage.setItem("consent", String(consent));
    setHasConsent(consent);
    if (consent) {
      ReactGA.initialize(TRACKING_ID);
    }
  };

  return (
    <Router basename="romaji2kanji">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider>
            <div className="App">
              <Header />
              <div className="content-wrapper">
                {hasConsent === null && (
                  <ConsentBanner onConsent={handleConsent} />
                )}
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/profile/:username" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Login />} />
                  <Route
                    path="/admin"
                    element={
                      <AdminMiddleware>
                        <AdminPanel />
                      </AdminMiddleware>
                    }
                  />
                </Routes>
              </div>
              <Footer />
            </div>
          </ToastProvider>
        </PersistGate>
      </Provider>
    </Router>
  );
}

const HomePage = () => {
  useEffect(() => {
    const consent = localStorage.getItem("consent");
    if (consent === "true") {
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
        title: "app",
      });
    }
  }, []);

  return (
    <div className="main-wrapper">
      <WordField />
      <InputField />
      <Layout />
    </div>
  );
};

export default App;
