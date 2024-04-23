import logo from './logo.svg';
import './App.css';
import Layout from './Layout';
import InputField from './InputField';
import WordField from './WordField';
//redux
import { Provider } from 'react-redux';
import store from './store';
import Header from './Header';
//<img src={logo} className="App-logo" alt="logo" />

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Header />
      <WordField  />
      <InputField />
      <Layout />
    </div>
    </Provider>
  );
}

export default App;
