import { LOGIN_SCREEN, PLAYER_SCORE, PLAYER_ASSERTIONS } from '../actions/actionTypes';

const INITIAL_STATE = {
  nome: '',
  email: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_SCREEN:
    return {
      ...state,
      nome: action.payload.nome,
      email: action.payload.email,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case PLAYER_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
