const {
  DELTA,
  DROITE,
  SEMI_DELTA,
  UNKNOWN,
} = require('../../utils/feurst_consts')

import React from 'react'
import {feurstImgPath} from '../../pages/configurator'

function BladePicture(props) {

  const BLADES = {
    [DROITE]: {
      path: `${feurstImgPath}/lame-droite-${props.teeth_count}.svg`,
      alt_path: `${feurstImgPath}/lame-droite-4.svg`,
      width: '120',
      height: '74',
    },
    [SEMI_DELTA]: {
      path: `${feurstImgPath}/lame-semidelta-${props.teeth_count}.svg`,
      alt_path: `${feurstImgPath}/lame-semidelta-4.svg`,
      width: '120',
      height: '74',
    },
    [DELTA]: {
      path: `${feurstImgPath}/lame-delta-${props.teeth_count}.svg`,
      alt_path: `${feurstImgPath}/lame-delta.svg`,
      width: '120',
      height: '74',
    },
  }

  const blade_data=BLADES[props.shape]
  if (!blade_data) {
    return null
  }
  return (
    <img src={blade_data.path} alt="" width={blade_data.width} height={blade_data.height}
      onError={({currentTarget}) => {
        currentTarget.onError = null
        currentTarget.src=blade_data.alt_path
      }} />
  )
}

module.exports=BladePicture
