import { LOGIN_SCREEN,
  FETCH_TOKEN,
  FETCH_QUESTIONS, PLAYER_SCORE, PLAYER_ASSERTIONS } from './actionTypes';

export const loginScreen = (data) => ({
  type: LOGIN_SCREEN,
  payload: data,
});

export const playerScore = (score) => ({
  type: PLAYER_SCORE,
  payload: score,
});

export const playerAssertions = (assertions) => ({
  type: PLAYER_ASSERTIONS,
  payload: assertions,
});

export const fetchToken = (data) => ({
  type: FETCH_TOKEN,
  payload: data,
});

export const fetchQuestions = (questions) => ({
  type: FETCH_QUESTIONS,
  payload: questions,
});

export const actionAsync = () => async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};

export const fetchApiQuestions = (token, history) => async (dispatch) => {
  const QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(QUESTIONS);
  const data = await response.json();
  if (data.response_code !== 0) {
    localStorage.removeItem('token');
    history.push('/');
  }
  return dispatch(fetchQuestions(data.results));
};
