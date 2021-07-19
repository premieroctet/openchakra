import React from 'react'
import Grid from '@material-ui/core/Grid'
import styles from '../../../static/css/components/BannerAvocotes/BannerAvocotes'
import withStyles from '@material-ui/core/styles/withStyles'
import {AVOCOTES} from '../../../utils/i18n'

function Banner({classes}) {

  return(
    <>
      <Grid container className={classes.container}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{padding: 20}}>
          <img
            alt={'logo_myAlfred'}
            title={'logo_myAlfred'}
            src={'../../../static/assets/icon/logoOnDemand.svg'}
            height={64}
          />
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerImgAndTitle}>
          <Grid container item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h1 className={classes.title}>{AVOCOTES.title}</h1>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h3 className={classes.subtitle}>{AVOCOTES.subtitle}</h3>
            </Grid>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <img
              alt={'equipement'}
              title={'equipment'}
              src={'../../../static/assets/img/avocotes/avocote.svg'}
              className={classes.imgEquipment}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Banner)
