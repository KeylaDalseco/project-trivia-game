import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Header from '../components/Header';
import RankingBtn from '../components/RankingBtn';

class Feedback extends Component {
  // estado das respostas
  // state = {
  //   score: 0,
  // };

  // // func para fericar acertos
  // handleScore = () => {

  // };

  render() {
    const { history, assertions, score } = this.props;
    const THREE = 3;
    console.log(assertions);
    return (
      <div>
        <Header />
        <RankingBtn />
        {assertions < THREE ? (
          <h1 data-testid="feedback-text">
            Could be better...
          </h1>
        ) : (
          <h1 data-testid="feedback-text">
            Well Done!
          </h1>
        )}
        <div>
          <h3>Total score: </h3>
          <span data-testid="feedback-total-score">{score}</span>
          <h3>questions assertions: </h3>
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
        <br />
        <button
          onClick={ () => { history.push('/'); } }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
