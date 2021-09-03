import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {HOW_IT_WORKS} from '../../../utils/i18n'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/HowItWorks/HowItWorks'
import '../../../static/assets/css/custom.css'

class HowItWorks extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <Grid className={classes.howItWorksMainStyle}>
        <Grid className={classes.howItWorksMainContainer}>
          <Grid className={classes.howItWorksLeftContainer}>
            <Typography className={`customhowitworksleft ${classes.howItWorksLeftText}`}>{HOW_IT_WORKS.leftText}</Typography>
          </Grid>
          <Grid className={classes.howItWorksRightContainer}>
            <Grid>
              <Typography className={`customhowitworksright ${classes.howItWorksRightText}`}>
                {HOW_IT_WORKS.rightText}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default withTranslation()(withStyles(styles)(HowItWorks))
