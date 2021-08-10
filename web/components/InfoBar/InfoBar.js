import React from 'react'
import Grid from '@material-ui/core/Grid'
import {INFOBAR_MESSAGE} from '../../utils/i18n'
import {Typography} from '@material-ui/core'
import styles from '../../static/css/components/InfoBar/InfoBar'
import withStyles from '@material-ui/core/styles/withStyles'
import customStyle from '../../static/assets/css/custom.css'
import {combineStyles} from '../../utils/functions'

function InfoBar({classes}) {

  return (
    <Grid container className={`${classes.infoBarMainStyle} ${classes.headerInfobar}`}>
      <Grid item className={classes.infoBarLinkContainer}>
        <Grid className={classes.infoBarPicsContainer}>
          <img src={'/static/assets/img/warning.svg'} alt={'warning'} title={'warning'} width={'100%'}
            height={'100%'}/>
        </Grid>
        <Grid>
          <Typography className={`${classes.infoBarColorText} ${classes.headerInfobar}`}>{INFOBAR_MESSAGE.message}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

const combinedStyles = styles //combineStyles(styles, customStyle)

export default withStyles(combinedStyles)(InfoBar)
