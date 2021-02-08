import React from 'react';
import {isMobile} from 'react-device-detect';

class MobileTest extends React.Component{

  constructor(props) {
    super(props);
  }


  render() {
    const{classes} = this.props;

    const text=isMobile ? "Navigation à partir du téléphone" : "Navigation à partir d'un PC"
    return(
        <div>{text}</div>
    )
  }

}

export default MobileTest
