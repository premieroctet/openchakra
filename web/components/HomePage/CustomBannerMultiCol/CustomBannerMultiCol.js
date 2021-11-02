import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './CustomBannerMultiColStyle'
import '../../../static/assets/css/custom.css'
import {Typography} from '@material-ui/core'

class CustomBannerMultiCol extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes, firstContent, secondContent, thirdContent, fourContent, fiveContent, sixContent} = this.props

    return (
      <>
        <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
          {
            firstContent ?
              <Grid item lg={2} md={12} sm={12} xs={12} className={classes.centerContent}>
                <Typography className={'customtypocolone'}>{firstContent}</Typography>
              </Grid> : null
          }
          {
            secondContent ?
              <Grid item lg={2} md={6} sm={6} xs={12} className={classes.centerContent}>
                <Typography className={'customtypocoltwo'}>{secondContent}</Typography>
              </Grid> : null
          }
          {
            thirdContent ?
              <Grid item lg={2} md={6} sm={6} xs={12} className={classes.centerContent}>
                <Typography className={'customtypocolthree'}>{thirdContent}</Typography>
              </Grid> : null
          }
          {
            fourContent ?
              <Grid item lg={2} md={6} sm={6} xs={12} className={classes.centerContent}>
                <Typography className={'customtypocolfour'}>{fourContent}</Typography>
              </Grid> : null
          }
          {
            fiveContent ?
              <Grid item lg={2} md={6} sm={6} xs={12} className={classes.centerContent}>
                <Typography className={'customtypocolfive'}>{fiveContent}</Typography>
              </Grid> : null
          }
          {
            sixContent ?
              <Grid item lg={2} md={6} sm={6} xs={12} className={classes.centerContent}>
                <Typography className={'customtypocolsix'}>{sixContent}</Typography>
              </Grid> : null
          }
        </Grid>
      </>

    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(CustomBannerMultiCol))
