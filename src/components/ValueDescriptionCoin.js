import React from 'react';
import PropTypes from 'prop-types';

class ValueDescriptionCoin extends React.Component {
  renderValueDescriptionCoin(handleChange, value) {
    return (
      <div className="input-container">
        <label className="form-label" htmlFor="input-value-id">
          Valor:
          <input
            className="form-control"
            id="input-value-id"
            name="value"
            onChange={ handleChange }
            type="text"
            value={ value }
          />
        </label>
      </div>
    );
  }

  render() {
    const { arrayCurrencies,
      currency,
      description,
      handleChange,
      value } = this.props;
    return (
      <>
        { this.renderValueDescriptionCoin(handleChange, value) }
        <div className="input-container">
          <label className="form-label" htmlFor="input-description-id">
            Descrição:
            <input
              className="form-control"
              id="input-description-id"
              name="description"
              onChange={ handleChange }
              type="text"
              value={ description }
            />
          </label>
        </div>
        <div className="input-container">
          <label className="form-label" htmlFor="input-select-currency-id">
            Moeda:
            <select
              className="form-select"
              id="input-select-currency-id"
              name="currency"
              onChange={ handleChange }
              value={ currency }
            >
              { arrayCurrencies && arrayCurrencies
                .filter((removeItem) => removeItem !== 'USDT')
                .map((item, index) => (
                  <option
                    key={ index }
                    name="currency"
                    value={ item }
                  >
                    { item }
                  </option>)) }
            </select>
          </label>
        </div>
      </>
    );
  }
}

ValueDescriptionCoin.propTypes = {
  arrayCurrencies: PropTypes.arrayOf({}),
}.isRequired;

export default ValueDescriptionCoin;
