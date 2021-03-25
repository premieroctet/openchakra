import React, {Component} from 'react';
import LogoPng from '../../static/assets/icon/logo.png'
import LogoSvg from '../../static/assets/icon/logo.svg'

class ImageImportTest extends React.Component{

  constructor(props) {
    super(props);
  }


  render() {
    return(
      <>
        <img src={LogoPng} width='4000' />
        <img src={LogoSvg} width='4000'/>
      </>
    )
  }

}

export default ImageImportTest
