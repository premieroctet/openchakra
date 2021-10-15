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
          <Grid item xl lg md sm xs className={classes.centerContent}>
            <Typography className={'customtypocolone'}>{firstContent}</Typography>
          </Grid>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            <Typography className={'customtypocoltwo'}>{secondContent}</Typography>
          </Grid>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            <Typography className={'customtypocolthree'}>{thirdContent}</Typography>
          </Grid>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            <Typography className={'customtypocolfour'}>{fourContent}</Typography>
          </Grid>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            <Typography className={'customtypocolfive'}>{fiveContent}</Typography>
          </Grid>
          <Grid item xl lg md sm xs className={classes.centerContent}>
            <Typography className={'customtypocolsix'}>{sixContent}</Typography>
          </Grid>
        </Grid>
      </>

    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(CustomBannerMultiCol))
