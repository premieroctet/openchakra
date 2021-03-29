import React from 'react';
import LogoPng from '../../static/assets/icon/logo.png'
import LogoJpg from '../../static/assets/icon/logo.jpg'
import LogoJpeg from '../../static/assets/icon/logo.jpeg'
import LogoGif from '../../static/assets/icon/logo.gif'
import LogoSvg from '../../static/assets/icon/logo.svg'

class ImageImportTest extends React.Component{

  constructor(props) {
    super(props);
  }


  render() {
    return(
      <>
        <h4>Import image PNG</h4>
        <img src={LogoPng} width='100' />
        <h4>Import image JPG</h4>
        <img src={LogoJpg} width='100' />
        <h4>Import image JPEG</h4>
        <img src={LogoJpeg} width='100' />
        <h4>Import image GIF</h4>
        <img src={LogoGif} width='100' />
        <h4>Import image SVG</h4>
        <img src={LogoSvg} width='100'/>
      </>
    )
  }

}

export default ImageImportTest
