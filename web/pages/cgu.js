import {withTranslation} from 'react-i18next'
import React from 'react';
import LayoutFaq from "../hoc/Layout/LayoutFaq";
import CguContent from "../components/CguContent/CguContent";

class CguPage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <LayoutFaq>
        <CguContent/>
      </LayoutFaq>
    );

  };
}


export default withTranslation('custom', {withRef: true})((CguPage))
