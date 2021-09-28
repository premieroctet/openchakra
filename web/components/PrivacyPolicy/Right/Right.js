import React from 'react'
import {withTranslation} from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/PrivacyPolicy/Preamble/Preamble'

function Right() {
  return(
    <div>
      <h1>Droits
        relatifs aux données à caractère personnel</h1>
    </div>
  )
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Right))
