import React from 'react';

const {getField} = require("../../server/utils/booking");


class Invoice extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const type = ['billing', 'receipt', 'myalfred_billing']
    return (
      <div>
        {type.map(t => {
          console.log(getField(t))
        })}
      </div>
    )
  }
}

export default Invoice
