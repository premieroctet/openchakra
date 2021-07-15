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
        <Grid className={classes.blur}>
          <Grid container className={classes.container}>
            <Grid item>
              <h2 style={{textAlign: 'center', color: 'white'}}>{AVOCOTES.askQuestion}</h2>
            </Grid>
            <Grid item>
              <h2 style={{textAlign: 'center', color: 'white'}}>{AVOCOTES.contactUs}</h2>
            </Grid>
            <Grid item style={{display: 'flex', justifyContent: 'center'}}>
              <Grid container spacing={2} className={classes.containerFakeButton}>
                <Grid item>
                  <Typography style={{fontWeight: 'bold', fontSize: 30}}>{AVOCOTES.phone}</Typography>
                </Grid>
                <Grid item>
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
      </Grid>
    </>
  )
}

export default withStyles(styles)(BannerContact)
