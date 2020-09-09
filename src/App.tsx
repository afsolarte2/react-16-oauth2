import React from 'react';

import {hello} from './services/Application.service'

import logo from './logo.svg';
import './App.css';

function App() {
  const callHelloEndpoint = async () => {
    await hello()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={callHelloEndpoint}
        >
          Call Hello endpoint
        </a>
      </header>
    </div>
  );
}

export default App;
