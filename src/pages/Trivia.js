import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { fetchApiQuestions } from '../redux/actions';

class Trivia extends Component {
  componentDidMount() {
    const { history, dispatch } = this.props;
    const tokenLocalStorage = localStorage.getItem('token');
    dispatch(fetchApiQuestions(tokenLocalStorage, history));
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <div>Trivia</div>
        <Questions
          history={ history }
        />
      </>
    );
  }
}
Trivia.propTypes = {
  alternatives: PropTypes.object,
  results: PropTypes.shape({
    length: PropTypes.number,
  }),
}.isRequired;

export default connect()(Trivia);
