import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { actionAsync, loginScreen, fetchToken } from '../redux/actions';

class Home extends Component {
  state = {
    nome: '',
    email: '',
    isDisable: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionAsync());
  }

  loginValidation = () => {
    const { email, nome } = this.state;
    const charEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const nameMin = 0;
    const validationName = nome.length > nameMin;
    if (charEmail && validationName) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.loginValidation());
  };

  saveToken = async (result) => {
    const { token } = await result;
    return localStorage.setItem('token', token);
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const result = await dispatch(actionAsync());
    dispatch(loginScreen({ ...this.state }));
    await dispatch(fetchToken(result));
    this.saveToken(result);
    history.push('/trivia');
  };

  render() {
    const { nome, email, isDisable } = this.state;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div>
            <input
              data-testid="input-player-name"
              placeholder="Insira seu nome"
              name="nome"
              value={ nome }
              onChange={ this.handleChange }
            />
            <input
              data-testid="input-gravatar-email"
              placeholder="Insira seu Email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <button
              data-testid="btn-play"
              disabled={ isDisable }
              onClick={ this.handleClick }
            >
              Play
            </button>
            <h3 data-testid="settings-title">
              Tela de Configuração
            </h3>
            <button
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.token,
});

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Home);
