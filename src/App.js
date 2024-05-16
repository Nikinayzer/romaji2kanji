import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header";
// components
import Layout from "./components/Layout";
import InputField from "./components/InputField";
import WordField from "./components/WordField";
import FAQPage from "./components/FAQPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router basename="romaji2kanji">
      <Provider store={store}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

const HomePage = () => (
  <>
    <div className="main-wrapper">
      <WordField />
      <InputField />
      <Layout />
    </div>
  </>
);

export default App;
