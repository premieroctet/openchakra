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
  const array = arrayText.map(item => item.text)

  return(

    <Carousel
      autoPlay={loop}
      indicators={false}
      timeout={300}
      navButtonsAlwaysInvisible={true}
    >
      {
        array.map((res, index) =>
          <Grid container key={index}>
            <Grid item xl={2}>
              <Typography className={`${classes.infoBarColorText} customheaderinfobar`}>{res}</Typography>
            </Grid>
          </Grid>,
        )}
      
    </Carousel>
  )
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(RandomDisplay))
