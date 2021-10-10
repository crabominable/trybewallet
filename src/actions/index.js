import { DELETE_ITEMS, RECEIVED_QUOTATION,
  RECEIVED_CURRENCIES,
  FETCH_ERROR, LOGIN_FORM, UPDATE_ITEMS, UPDATE_ITEMS_MODE } from './actionTypes';

export const actionSendLoginFormData = (payload) => ({
  type: LOGIN_FORM,
  payload,
});

export const receivedCurrencies = (currencies) => ({
  type: RECEIVED_CURRENCIES,
  currencies,
});

export const
  receivedQuotation = (payload, { id, value, description, currency, method, tag }) => ({
    type: RECEIVED_QUOTATION,
    payload,
    id,
    value,
    description,
    currency,
    method,
    tag,
  });

const errorFetch = (error) => ({
  type: FETCH_ERROR,
  error,
});

export const actionDeletePurchaseItems = (payload) => ({
  type: DELETE_ITEMS,
  payload,
});

export const actionUpadateMode = (id) => ({
  type: UPDATE_ITEMS_MODE,
  id,
});

export const actionUpadatePurchase = (payload) => ({
  type: UPDATE_ITEMS,
  payload,
});

export function actionRequestCurrencies() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(receivedCurrencies(Object.keys(currencies))))
      .catch((error = 'Falha na requisição') => dispatch(errorFetch(error)));
  };
}

export function actionReceiveQuotation(state) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(receivedQuotation(currencies, state)))
      .catch((error = 'Falha na requisição') => dispatch(errorFetch(error)));
  };
}
