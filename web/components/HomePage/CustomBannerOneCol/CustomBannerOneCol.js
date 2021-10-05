import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {HOW_IT_WORKS} from '../../../utils/i18n'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './CustomBannerOneColStyle'
import '../../../static/assets/css/custom.css'

class CustomBannerOneCol extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props

    return (
      <Grid className={classes.howItWorksMainStyle}>
        <Grid className={classes.howItWorksMainContainer}>
          <Grid className={classes.howItWorksRightContainer}>
            <Typography className={`customhowitworksright ${classes.howItWorksRightText}`}>
              {ReactHtmlParser(this.props.t('HOW_IT_WORKS.rightText'))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(CustomBannerOneCol))
