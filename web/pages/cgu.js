import React from 'react';
import LayoutFaq from "../hoc/Layout/LayoutFaq";
import CguContent from "../components/CguContent/CguContent";

class CguPage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {classes} = this.props;

    return (
      <LayoutFaq>
        <CguContent/>
      </LayoutFaq>
    );

  };
}


export default (CguPage);
