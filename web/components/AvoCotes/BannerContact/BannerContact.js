import React from 'react'
import Grid from '@material-ui/core/Grid'
import styles from '../../../static/css/components/BannerContactAvocotes/BannerContactAvocotes'
import withStyles from '@material-ui/core/styles/withStyles'
import {AVOCOTES} from '../../../utils/i18n'
import Typography from '@material-ui/core/Typography'


function BannerContact({classes}) {
  return(
    <>
      <Grid className={classes.mainContainer}>
        <Grid container className={classes.container}>
          <Grid item>
            <h2 style={{textAlign: 'center'}}>{AVOCOTES.askQuestion}</h2>
          </Grid>
          <Grid item>
            <h2 style={{textAlign: 'center'}}>{AVOCOTES.contactUs}</h2>
          </Grid>
          <Grid item style={{display: 'flex', justifyContent: 'center'}}>
            <Grid className={classes.containerFakeButton}>
              <Grid>
                <Typography>{AVOCOTES.phone}</Typography>
              </Grid>
              <Grid>
                <Grid>
                  <Typography>{AVOCOTES.phoneTextFirst}</Typography>
                </Grid>
                <Grid>
                  <Typography>{AVOCOTES.phoneTextSecond}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(BannerContact)
