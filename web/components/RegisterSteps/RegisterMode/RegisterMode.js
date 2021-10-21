import Siret from '../../Siret/Siret';
import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import styles from '../../../static/css/components/RegisterSteps/RegisterMode/RegisterMode'
import {withStyles} from '@material-ui/core/styles'
import {Divider} from '@material-ui/core'
import {REGISTER} from '../../../utils/i18n'

function RegisterMode(props) {
  const {classes, state, onChangeCompany} = props
  const is_particular = state.company==null
  return(
    <Grid container spacing={1} style={{margin: 0, width: '100%'}}>
      <Grid container item xs={12} justifyContent={'center'}>
        <Button onClick={() => onChangeCompany(null)} variant="outlined" classes={{root: is_particular ? classes.active : classes.inactive}}>{REGISTER.particular}</Button>
      </Grid>
      <Grid container item xs={12} justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={2}>
          <Divider/>
        </Grid>
        <Grid container item xs={2} justifyContent={'center'}>
          <h3>{REGISTER.or}</h3>
        </Grid>
        <Grid item xs={2}>
          <Divider/>
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent={'center'}>
        <Button onClick={() => onChangeCompany({})} variant="outlined" classes={{root: is_particular ? classes.inactive : classes.active}}>{REGISTER.company}</Button>

      </Grid>
      {!is_particular &&
      <Grid container item xs={12} justifyContent={'center'}>
        <Siret onChange={onChangeCompany} xl={12}/>
      </Grid>
      }
    </Grid>
  )
}

export default withStyles(styles)(RegisterMode)
