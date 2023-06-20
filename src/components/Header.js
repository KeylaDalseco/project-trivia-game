import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  // função pega o email do global state, e transforma em hash com a função md5 ;
  handleEmail = () => {
    const { email } = this.props;
    const hashEmail = md5(email).toString();
    return hashEmail;
  };

  render() {
    const { nome, score } = this.props;
    return (
      <header>
        <p data-testid="header-player-name">
          { nome }
        </p>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${this.handleEmail()}` } alt="profile-img" />
        <br />
        <span data-testid="header-score">
          { score }
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.email,
  nome: state.player.nome,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
