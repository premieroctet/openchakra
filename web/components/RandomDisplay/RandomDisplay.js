import React from 'react'
import {Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import '../../static/assets/css/custom.css'
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  colorText: {
    color: 'white',
  },
  carouselStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  carouselItem: {
    height: '100%',
    '& div:first-child': {
      height: '100%',
    },
  },
  
}))

function RandomDisplay(props) {
  const {arrayText, loop} = props
  const classes = useStyles()

  return(
    <Carousel
      autoPlay={loop}
      indicators={false}
      interval={6000}
      className={classes.carouselItem}
    >
      {
        arrayText.map((res, i) => (
          <Grid container spacing={2} key={i} style={{height: '100%'}}>
            {
              res.map((element, index) => (
                <Grid item md={2} xs={12} key={index} className={classes.carouselStyle}>
                  <Typography className={`${classes.colorText} customrandomdisplay`}>{element}</Typography>
                </Grid>
              ))
            }
          </Grid>
        ))
      }
    </Carousel>
  )
}

export default withTranslation('custom', {withRef: true})(RandomDisplay)
