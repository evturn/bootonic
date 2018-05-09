import React, { Component } from 'react';
import Winamp from 'winamp2-js';
import data from './data.json';
import './style.css';

class App extends Component {
  componentDidMount() {
    const winamp = new Winamp(data);
    winamp.renderWhenReady(document.getElementById('player'));
  }

  render() {
    return (
      <div className="root">
        <div className="footer">
          <img 
            className="footer-img"
            src="/static/media/footer.png" />
          <div className="copyright">
            © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
