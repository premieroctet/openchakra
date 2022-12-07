import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withTranslation} from 'react-i18next'

function Logo({className, style}) {

  return(
    <Grid className={`${className} customlogo`} style={style}/>
  )
}

export default withTranslation(null, {withRef: true})(Logo)
