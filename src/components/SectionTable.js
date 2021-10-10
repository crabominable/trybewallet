import React from 'react';
import PropTypes from 'prop-types';
import ExpanseTable from './ExpanseTable';

class SectionTable extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.length > 0 && expenses
            .map((expanse, index) => (<ExpanseTable
              key={ index }
              data={ expanse }
            />)) }
        </tbody>
      </table>
    );
  }
}

SectionTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SectionTable;
