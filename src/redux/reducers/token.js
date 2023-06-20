import { FETCH_TOKEN, FETCH_QUESTIONS } from '../actions/actionTypes';

const INITIAL_STATE = {
  token: '',
  questions: [],
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case FETCH_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
