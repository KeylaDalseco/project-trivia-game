// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class RedirectLoginBtn extends Component {
  state = {
    redirect: false,
  };

  handleRedirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;
    return (
      <div>
        <button
          data-testid="btn-go-home"
          onClick={ this.handleRedirect }
        >
          { redirect && <Redirect to="/" />}
          Tela Inicial
        </button>
      </div>
    );
  }
}

export default connect()(RedirectLoginBtn);
