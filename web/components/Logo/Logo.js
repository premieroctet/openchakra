import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withTranslation} from 'react-i18next'

function Logo({className}) {

  return(
    <Grid className={`${className} customLogo`}/>
  )
}

export default withTranslation('custom', {withRef: true})(Logo)
