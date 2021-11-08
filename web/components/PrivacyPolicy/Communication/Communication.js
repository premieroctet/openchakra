import React from 'react'
import {withTranslation} from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/PrivacyPolicy/Preamble/Preamble'

function Communication() {
  return(
    <div>
      <h1>Communication</h1>
    </div>
  )
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Communication))
