import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {useStyles} from './style'

function importConfigStyle() {
  const classes = useStyles()
  return(
    <Grid>
      <p className={classes.mySelector}>Bonjour</p>
    </Grid>
  )
}

export default withTranslation()(importConfigStyle)
