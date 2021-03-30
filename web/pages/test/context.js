import React from 'react';
const {getLoggedUser}=require('../../utils/functions')
class MobileTest extends React.Component{

  constructor(props) {
    super(props);
  }


  render() {
    const{classes} = this.props;

    return(
      <>
        <h1>Valeur token</h1>
        <div>{JSON.stringify(getLoggedUser())}</div>
      </>
    )
  }

}

export default MobileTest
