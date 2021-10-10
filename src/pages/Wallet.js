import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionRequestCurrencies,
  actionReceiveQuotation, actionUpadatePurchase } from '../actions/index';
import Button from '../components/Button';
import SectionTable from '../components/SectionTable';
import ValueDescriptionCoin from '../components/ValueDescriptionCoin';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'USD',
      description: '',
      id: 0,
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.setInputstoEdit = this.setInputstoEdit.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  componentDidUpdate(nextProps) {
    const { update } = this.props;
    if (nextProps.update !== update) {
      this.setInputstoEdit();
    }
  }

  setInputstoEdit() {
    const { expenses, id } = this.props;
    const newState = expenses.filter((a) => a.id === id)[0];
    this.setState({
      value: newState.value,
      tag: newState.tag,
      method: newState.method,
      currency: newState.currency,
      description: newState.description,
    });
  }

  handleClick() {
    const { requestQuotation } = this.props;
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    requestQuotation(this.state);
    this.setState({
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: '',
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  returnButton() {
    const { update, id } = this.props;
    const addButton = (
      <Button
        name="Adicionar despesa"
        data={ this.state }
        onClick={ this.handleClick }
      />
    );

    const editButton = (
      <Button
        name="Editar despesa"
        data={ this.state }
        onClick={ () => this.updateItems(id) }
      />
    );
    return update ? editButton : addButton;
  }

  updateItems(id) {
    const { value, description, method, tag, currency } = this.state;
    const { expenses, updatePurchase } = this.props;
    const update = expenses.reduce((acumulator, currentValue) => {
      if (currentValue.id === id) {
        return [...acumulator,
          { id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates: currentValue.exchangeRates }];
      }
      return [...acumulator, currentValue];
    }, []);
    updatePurchase(update);
    this.setState({
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: '',
    });
  }

  renderPayMethod(handleChange, method) {
    return (
      <div className="input-container">
        <label className="form-label" htmlFor="input-select-payment-type-id">
          Método de pagamento:
          <select
            className="form-select"
            id="input-select-payment-type-id"
            name="method"
            onChange={ handleChange }
            value={ method }
          >
            <option name="method" value="Dinheiro">Dinheiro</option>
            <option name="method" value="Cartão de crédito">Cartão de crédito</option>
            <option name="method" value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }

  renderForm() {
    const { currency, description, method, tag, value } = this.state;
    const { currencies } = this.props;
    return (
      <form className="form-class">
        <ValueDescriptionCoin
          arrayCurrencies={ currencies }
          currency={ currency }
          description={ description }
          handleChange={ this.handleChange }
          value={ value }
        />
        { this.renderPayMethod(this.handleChange, method) }
        <div className="input-container">
          <label className="form-label" htmlFor="input-select-tag-id">
            Tag:
            <select
              className="form-select"
              id="input-select-tag-id"
              name="tag"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option name="tag" value="Alimentação">Alimentação</option>
              <option name="tag" value="Lazer">Lazer</option>
              <option name="tag" value="Trabalho">Trabalho</option>
              <option name="tag" value="Transporte">Transporte</option>
              <option name="tag" value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        { this.returnButton() }
      </form>
    );
  }

  renderHeader() {
    const { email, totalAmount } = this.props;
    return (
      <header className="header">
        <div className="header-item">
          <p className="email-class" data-testid="email-field">
            Usuário atual
          </p>
          <span className="span-header-user">{ email }</span>
        </div>
        <div className="header-item">
          <p data-testid="total-field">
            Total das despesas
          </p>
          <span
            className="span-header"
          >
            { `R$${parseFloat(totalAmount).toFixed(2)}` }
          </span>
        </div>
        <div className="header-item">
          <p data-testid="header-currency-field">Câmbio utilizado</p>
          <span className="span-header-brl">BRL</span>
        </div>
      </header>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <main>
        { this.renderHeader() }
        { this.renderForm() }
        <SectionTable expenses={ expenses } />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.expenses,
  totalAmount: state.wallet.expenses
    .reduce((
      accumulator,
      { value, currency, exchangeRates },
    ) => accumulator + (parseFloat(exchangeRates[currency].ask) * value), 0),
  update: state.wallet.update,
  id: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuotation: (state) => (
    dispatch(actionReceiveQuotation(state))),
  requestCurrencies: () => dispatch(actionRequestCurrencies()),
  updatePurchase: (state) => dispatch(actionUpadatePurchase(state)),
});

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape).isRequired,
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  id: PropTypes.number,
  requestCurrencies: PropTypes.func.isRequired,
  requestQuotation: PropTypes.func.isRequired,
  totalAmount: PropTypes.number.isRequired,
  update: PropTypes.bool,
  updatePurchase: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  email: '',
  id: 0,
  update: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
