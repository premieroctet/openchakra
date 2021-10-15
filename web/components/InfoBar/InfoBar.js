import '../../static/assets/css/custom.css'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React, {useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/InfoBar/InfoBar'
import RandomDisplay from '../RandomDisplay/RandomDisplay'
import {INFOBAR} from '../../utils/i18n'

function InfoBar({classes}) {

  const [arrayText] = useState([
    INFOBAR.randomTextA,
    INFOBAR.randomTextB,
    INFOBAR.randomTextC,
  ])
  
  return (
    <Grid container className={`${classes.infoBarMainStyle} customheaderinfobar`}>
      <Grid item className={classes.infoBarLinkContainer}>
        <Grid className={classes.infoBarPicsContainer}>
          <Grid className={`${classes.icon} custominfobaricon`} style={{backgroundSIze: 'contain'}}/>
        </Grid>
        <Grid>
          <RandomDisplay arrayText={arrayText} loop={false}/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(InfoBar))
