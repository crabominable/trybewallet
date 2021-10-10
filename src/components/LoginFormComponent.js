import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LoginFormComponent extends React.Component {
  enableOrDisableSubmitButton(emailEnableButton, passwordEnableButton) {
    if (!emailEnableButton || !passwordEnableButton) {
      return true;
    }
    return false;
  }

  renderButtonLink(emailEnableButton, handleClick, passwordEnableButton) {
    return (
      <Link to="/carteira">
        <button
          className="submit-input-id"
          disabled={ this
            .enableOrDisableSubmitButton(emailEnableButton, passwordEnableButton) }
          id="submit-input-id"
          onClick={ handleClick }
          type="button"
        >
          Entrar
        </button>
      </Link>
    );
  }

  render() {
    const { emailEnableButton,
      emailInput,
      handleChange,
      handleClick,
      passwordEnableButton,
      passwordInput } = this.props;
    return (
      <div className="form-container">
        <h1>Entrar</h1>
        <form>
          <fieldset className="fieldset-login-form">
            <label className="form-label email-label" htmlFor="email-input-id">
              Email:
              <input
                className="form-control email-input-id"
                data-testid="email-input"
                id="email-input-id"
                name="emailInput"
                onChange={ handleChange }
                placeholder="Email:"
                required
                type="email"
                value={ emailInput }
              />
            </label>
            <label className="form-label password-label" htmlFor="password-input-id">
              Senha:
              <input
                className="form-control password-input-id"
                data-testid="password-input"
                id="password-input-id"
                minLength="6"
                name="passwordInput"
                onChange={ handleChange }
                placeholder="Senha:"
                type="password"
                value={ passwordInput }
              />
            </label>
            <div className="button-content">
              { this
                .renderButtonLink(emailEnableButton, handleClick, passwordEnableButton) }
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

LoginFormComponent.propTypes = {
  emailEnableButton: PropTypes.bool.isRequired,
  emailInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  passwordEnableButton: PropTypes.bool.isRequired,
  passwordInput: PropTypes.string.isRequired,
};

export default LoginFormComponent;
