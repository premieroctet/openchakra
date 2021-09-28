import '../../static/assets/css/custom.css'

import {Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/InfoBar/InfoBar'

function InfoBar({classes, t}) {

  return (
    <Grid container className={`${classes.infoBarMainStyle} customHeaderinfobar`}>
      <Grid item className={classes.infoBarLinkContainer}>
        <Grid className={classes.infoBarPicsContainer}>
          <Grid className={`${classes.icon} customInfoBarIcon`}/>
        </Grid>
        <Grid>
          <Typography className={`${classes.infoBarColorText} customHeaderinfobar`}>{ReactHtmlParser(t('INFOBAR.message'))}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(InfoBar))
