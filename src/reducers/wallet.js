import { DELETE_ITEMS, FETCH_ERROR, RECEIVED_CURRENCIES,
  RECEIVED_QUOTATION, UPDATE_ITEMS, UPDATE_ITEMS_MODE } from '../actions/actionTypes';
import receivedCurrenciesCase from './aux';

const INITIAL_STATE = {
  currencies: [],
  error: '',
  expenses: [],
  id: 0,
  totalExpenses: 0,
  update: false,
};

function wallet(state = INITIAL_STATE, {
  payload,
  type,
  error, value, description, currency = 'USD', currencies, method, tag, id }) {
  switch (type) {
  case FETCH_ERROR:
    return {
      ...state,
      error,
    };
  case RECEIVED_CURRENCIES:
    return receivedCurrenciesCase(state, currencies);
  case RECEIVED_QUOTATION:
    return {
      ...state,
      expenses: [...state.expenses,
        { exchangeRates: payload,
          id,
          value,
          description,
          currency,
          method,
          tag,
        }],
    };
  case UPDATE_ITEMS_MODE:
    return {
      ...state,
      update: true,
      id,
    };
  case UPDATE_ITEMS:
    return {
      ...state,
      expenses: payload,
      update: false,
    };
  case DELETE_ITEMS:
    return {
      ...state,
      expenses: payload,
    };
  default:
    return state;
  }
}

export default wallet;
