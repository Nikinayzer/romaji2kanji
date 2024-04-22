import logo from './logo.svg';
import './App.css';
import HiraLayout from './HiraLayout';
import InputField from './InputField';
//<img src={logo} className="App-logo" alt="logo" />

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Akari</h1>
      </header>
      <InputField />
      <HiraLayout />
    </div>
  );
}

export default App;
