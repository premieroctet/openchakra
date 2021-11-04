import React from 'react'
import {Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/InfoBar/InfoBar'
import '../../static/assets/css/custom.css'
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid'

function RandomDisplay(props) {
  const {classes, arrayText, loop} = props

  return(
    <Carousel
      autoPlay={loop}
      indicators={false}
      transitionTime={1000}
      navButtonsAlwaysInvisible={true}
    >
      {
        arrayText.map((res, i) => (
          <Grid container spacing={2} key={i}>
            {
              res.map((element, index) => (
                <Grid item md={2} xs={12} key={index}>
                  <Typography className={`${classes.infoBarColorText} customheaderinfobar`}>{element}</Typography>
                </Grid>
              ))
            }
          </Grid>
        ))
      }
    </Carousel>
  )
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(RandomDisplay))
