import React from 'react'
import {withTranslation} from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/PrivacyPolicy/Preamble/Preamble'

function Definitions() {
  return(
    <div>
      <h1>Définitions</h1>
    </div>
  )
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(Definitions))
