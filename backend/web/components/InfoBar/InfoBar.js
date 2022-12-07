
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/InfoBar/InfoBar'
import ReactHtmlParser from 'react-html-parser'
import Typography from '@material-ui/core/Typography'

function InfoBar({classes, t}) {

  return (
    <Grid container className={`${classes.infoBarMainStyle} customheaderinfobar`}>
      <Grid item className={classes.infoBarLinkContainer}>
        <Grid className={classes.infoBarPicsContainer}>
          <Grid className={`${classes.icon} custominfobaricon`} style={{backgroundSIze: 'contain'}}/>
        </Grid>
        <Grid>
          <Typography>{ReactHtmlParser(t('INFOBAR.message'))}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(InfoBar))
