import React from "react";
import LayoutPdf from "../../hoc/Layout/Pdf/LayoutPdf";
import moment from 'moment';


moment.locale('fr');

class PdfGeneration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    }
  }

  componentDidMount() {
    let dateNow = moment().format('L');
    this.setState({
      date: dateNow
    })
  }

  render() {
    return (
      <LayoutPdf/>
    )
  }
}

export default (PdfGeneration)