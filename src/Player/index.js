import React, { Component } from 'react';
import Winamp from 'winamp2-js';

class Player extends Component {

  componentDidMount() {
    const winamp = new Winamp(this.props);
    winamp.renderWhenReady(document.getElementById('player'));
  }

  render() {
    return (
      <div className="landing">
        <img 
          className="img"
          src="https://www.dropbox.com/s/dmq48wcxikdbyny/nabisco-sharpened.png?dl=1" />
      </div>
    );
  }
}

export default Player;
