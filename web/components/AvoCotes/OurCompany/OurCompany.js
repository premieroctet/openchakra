import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/OurCompanyAvocotes/OurCompanyAvocotes'
import Grid from '@material-ui/core/Grid'
import {AVOCOTES} from '../../../utils/i18n'
import Typography from '@material-ui/core/Typography'

function OurCompany({classes}) {
  return(
    <>
      <Grid container spacing={2} className={classes.mainContainer}>
        <Grid item>
          <h2 style={{margin: 0, color: 'black'}}>{AVOCOTES.ourCompanyTitleFirst}</h2>
        </Grid>
        <Grid item>
          <h2 style={{marginTop: 0, marginBottom: 50, color: 'black'}}>{AVOCOTES.ourCompanyTitleSecond}</h2>
        </Grid>
        <Grid item>
          <Typography style={{textAlign: 'justify'}}>{AVOCOTES.ourCompanyDescriptionFirst}</Typography>
        </Grid>
        <Grid item>
          <Typography style={{textAlign: 'justify'}}>{AVOCOTES.ourCompanyDescriptionSecond}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(OurCompany)
