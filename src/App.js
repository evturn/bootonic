import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="root">
        <div className="header">
          <img 
            src="https://www.dropbox.com/s/7pax8utugwnj2r8/favicon.png?dl=1"
            className="logo" 
            alt="Bootonic logo" />
        </div>
        <div className="landing">
          <img 
            alt="Red logo with sprinkles"
            className="img"
            src="https://www.dropbox.com/s/dmq48wcxikdbyny/nabisco-sharpened.png?dl=1" />
        </div>
      </div>
    );
  }
}

export default App;
