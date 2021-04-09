import React from 'react';
import Grid from "@material-ui/core/Grid";
import moment from "moment";

moment.locale('fr');

class Invoices extends React.Component {
  constructor(props) {
    super(props);
  }

  invoiceFormat = (num, places) => {
    return String(num).padStart(places, '0')
  }
  dateReceipt = (date) => {
    return moment(date).format("Y.MM.")
  }

  render() {
    return (
      <Grid>
        <h1>Factures {this.dateReceipt('2021-02-08T12:00:00.860Z') + this.invoiceFormat(1, 5)}</h1>
      </Grid>
    );
  }
}

export default Invoices;
