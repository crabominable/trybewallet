import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionSendLoginFormData } from '../actions';
import LoginFormComponent from '../components/LoginFormComponent';

import RightImage from '../images/cartoon-wallet.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailEnableButton: false,
      emailInput: '',
      passwordEnableButton: false,
      passwordInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
    if (name === 'emailInput') {
      const emailIsValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if (emailIsValid) {
        this.setState({
          emailEnableButton: true,
        });
      }
    } else if (name === 'passwordInput') {
      const NUMBER = 6;
      if (value.length >= NUMBER) {
        this.setState({
          passwordEnableButton: true,
        });
      }
    }
  }

  handleClick() {
    const { sendLoginForm } = this.props;
    const { emailInput } = this.state;
    sendLoginForm(emailInput);
  }

  render() {
    const {
      emailEnableButton,
      emailInput,
      passwordEnableButton,
      passwordInput } = this.state;
    return (
      <div className="main-login">
        <div className="left-side">
          <img src={ RightImage } alt="Login" />
          <p>
            Tenha o simples e rápido controle das suas despesas no TrybeWallet
            <i className="fas fa-coins fa-lg coin" />
          </p>
        </div>
        <div className="right-side">
          <div className="top-text-content">
            <h2>Bem vindo ao TrybeWallet!!</h2>
            <p>
              Insira seu email e
              senha para entrar (Nenhum dado será salvo - Site fictício)
            </p>
          </div>
          <LoginFormComponent
            emailEnableButton={ emailEnableButton }
            emailInput={ emailInput }
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
            passwordEnableButton={ passwordEnableButton }
            passwordInput={ passwordInput }
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLoginForm: (emailInput) => dispatch(actionSendLoginFormData(emailInput)),
});

Login.propTypes = {
  sendLoginForm: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
