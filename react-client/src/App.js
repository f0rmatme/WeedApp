import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/*OUR APP GOES HERE
        Will probably need react router for routes
        Not sure what else

        */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ASHTON & ANTON EDIT HERE TO SEE CHANGES
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
