import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {HOW_IT_WORKS} from '../../../utils/i18n'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './CustomBannerMultiColStyle'
import '../../../static/assets/css/custom.css'

class CustomBannerMultiCol extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes, firstContent, secondContent, thirdContent, fourContent, fiveContent, sixContent} = this.props

    return (
      <>
        <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            {firstContent}
          </Grid>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            {secondContent}
          </Grid>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            {thirdContent}
          </Grid>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            {fourContent}
          </Grid>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            {fiveContent}
          </Grid>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            {sixContent}
          </Grid>
        </Grid>
      </>

    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(CustomBannerMultiCol))
