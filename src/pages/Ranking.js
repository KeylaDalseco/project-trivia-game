import React, { Component } from 'react';
import RedirectLoginBtn from '../components/RedirectLoginBtn';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <RedirectLoginBtn />
      </div>
    );
  }
}

export default Ranking;
