import React from 'react'
import {withTranslation} from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/PrivacyPolicy/Preamble/Preamble'

function Payment() {
  return(
    <div>
      <h1>Paiements
        & versements</h1>
    </div>
  )
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(Payment))
