import '../../static/assets/css/custom.css'

import {Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React, {useEffect, useState} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/InfoBar/InfoBar'

function InfoBar({classes, t}) {
  const [text, setText] = useState('')


  function displayRandomly() {
    setInterval(() => {
      let r_text = []
      r_text[0] = 'All the leaves are brown'
      r_text[1] = 'And the sky is grey'
      r_text[2] = "I've been for a walk"
      let random = Math.floor(3*Math.random())
      setText(r_text[random])
    }, 4000)
  }


  useEffect(() => {
    displayRandomly()
  }, [])


  return (
    <Grid container className={`${classes.infoBarMainStyle} customheaderinfobar`}>
      <Grid item className={classes.infoBarLinkContainer}>
        <Grid className={classes.infoBarPicsContainer}>
          <Grid className={`${classes.icon} custominfobaricon`} style={{backgroundSIze: 'contain'}}/>
        </Grid>
        <Grid>
          <Typography className={`${classes.infoBarColorText} customheaderinfobar`}>{text}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(InfoBar))
