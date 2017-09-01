import React, { Component } from 'react';
import './App.css';

import Toolbar from './components/Toolbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Toolbar />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
