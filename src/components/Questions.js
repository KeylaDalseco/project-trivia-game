import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/questions.css';
import { playerScore, playerAssertions } from '../redux/actions/index';

class Question extends Component {
  state = {
    questionCounter: 0,
    correctColor: '',
    wrongColor: '',
    isNext: false,
    timer: 30,
    activeTemporizer: true,
    shuffledArray: [],
  };

  componentDidMount() {
    this.timerTemporizer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { questions } = this.props;
    const { questionCounter } = this.state;
    if (prevProps.questions.length !== questions.length
      || prevState.questionCounter !== questionCounter) {
      const currentQuestion = questions[questionCounter];
      const allAnswers = [currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers];
      const shuffledAnswers = this.shuffleArray(allAnswers); // Embaralha as alternativas
      this.setState({
        shuffledArray: shuffledAnswers,
      });
    }
  }

  timerTemporizer = () => {
    const milisecond = 1000;
    setInterval(() => {
      const { timer, activeTemporizer } = this.state;
      if (timer > 0 && activeTemporizer) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      } else {
        this.setState({ activeTemporizer: false });
      }
    }, milisecond);
  };

  shuffleArray = (array) => {
    // Algoritmo de Fisher-Yates para embaralhar a array
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  handleClick = () => {
    this.setState({ correctColor: 'correctBorder' });
    this.setState({ wrongColor: 'wrongBorder' });
    this.setState({ isNext: true });
    this.setState({ activeTemporizer: false });
  };

  handleNext = () => {
    const { history } = this.props;
    const { questionCounter } = this.state;
    const number = 4;
    if (questionCounter === number) {
      history.push('/feedback');
    }
    const question1 = questionCounter + 1;
    this.setState({ questionCounter: question1 });
    this.setState({ correctColor: '' });
    this.setState({ wrongColor: '' });
    this.setState({ isNext: false });
    this.setState({ timer: 30 });
    this.setState({ activeTemporizer: true });
  };

  // salvar a pontuação em uma variavel;
  // dificuldades (hard: 3, medium: 2, easy: 1);
  // conta(10 + (timer * difculdade));

  getDifficult = () => {
    const { questions, dispatch, score, assertions } = this.props;
    const { questionCounter, timer } = this.state;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    const TEN = 10; // Valor por acertar questao (FALTANDO SOMENTE TIMER)
    let newScore = 0;
    const askDifficulty = questions[questionCounter].difficulty;

    if (askDifficulty === 'easy') {
      newScore += TEN + (EASY * timer);
    }
    if (askDifficulty === 'medium') {
      newScore += TEN + (MEDIUM * timer);
    }
    if (askDifficulty === 'hard') {
      newScore += TEN + (HARD * timer);
    }
    dispatch(playerScore(newScore + score));
    dispatch(playerAssertions(assertions + 1));
  };

  render() {
    const { questionCounter,
      correctColor,
      wrongColor,
      isNext,
      timer,
      activeTemporizer,
      shuffledArray,
    } = this.state;
    const { questions } = this.props;

    const currentQuestion = questions.length !== 0 && questions[questionCounter];

    if (!currentQuestion) {
      return null; // Verifica se não há pergunta atual e retorna null para não renderizar nada
    }

    // const allAnswers = [currentQuestion.correct_answer,
    //   ...currentQuestion.incorrect_answers];
    // // retirar daqui a shuff;
    // const shuffledAnswers = this.shuffleArray(allAnswers); // Embaralha as alternativas

    return (
      <main>
        <div>
          <div>
            <h3>
              {timer === 0
                && 'Tempo encerrado!'}
              <p>
                {
                  `Timer: ${timer}`
                }
              </p>
            </h3>
          </div>
          <section>
            <h3 data-testid="question-category">
              {`Category Field: ${currentQuestion.category}`}
            </h3>
            <p>
              <strong>
                Question:
                {' '}
              </strong>
              <strong data-testid="question-text">
                {`${currentQuestion.question}`}
              </strong>
            </p>
          </section>
          <section data-testid="answer-options">
            {shuffledArray.map((answer, index) => {
              if (answer === currentQuestion.correct_answer) {
                return (
                  <button
                    name="correta"
                    value="correta"
                    key="correct-answer"
                    data-testid="correct-answer"
                    onClick={ () => {
                      this.handleClick();
                      this.getDifficult();
                    } }
                    className={ correctColor }
                    disabled={ !activeTemporizer }
                  >
                    {answer}
                  </button>
                );
              }
              return (
                <button
                  name="errada"
                  value="errada"
                  key={ `wrong-answer-${index}` }
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.handleClick }
                  className={ wrongColor }
                  disabled={ !activeTemporizer }
                >
                  {answer}
                </button>
              );
            })}
          </section>
          { isNext && (
            <button data-testid="btn-next" onClick={ this.handleNext }>
              Next
            </button>
          )}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.token.questions,
  score: state.player.score,
  assertions: state.player.assertions,
});

Question.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Question);
