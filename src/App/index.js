import React, { Component } from 'react';
import Player from '../Player';
import data from '../static/data.json';
import './style.css';

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
        <Player {...data} />
      </div>
    );
  }
}

export default App;
