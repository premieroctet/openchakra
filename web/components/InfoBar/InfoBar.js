import React from 'react'
import Grid from '@material-ui/core/Grid'

import {Typography} from '@material-ui/core'
import styles from '../../static/css/components/InfoBar/InfoBar'
import withStyles from '@material-ui/core/styles/withStyles'
import '../../static/assets/css/custom.css'
import {withTranslation} from 'react-i18next'

function InfoBar({classes, t}) {

  return (
    <Grid container className={`${classes.infoBarMainStyle} customHeaderinfobar`}>
      <Grid item className={classes.infoBarLinkContainer}>
        <Grid className={classes.infoBarPicsContainer}>
          <img src={'/static/assets/img/warning.svg'} alt={'warning'} title={'warning'} width={'100%'}
            height={'100%'}/>
        </Grid>
        <Grid>
          <Typography className={`${classes.infoBarColorText} customHeaderinfobar`}>{t('INFOBAR_MESSAGE.message')}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTranslation()(withStyles(styles)(InfoBar))
