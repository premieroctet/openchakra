import React from 'react'
import Grid from '@material-ui/core/Grid'
import {useTheme} from '@material-ui/core/styles'
import { useStyles } from './style'

function importConfigStyle() {
  const classes = useStyles()
  return(
    <Grid>
      <p className={classes.mySelector }>Bonjour</p>
    </Grid>
  )
}

export default importConfigStyle
