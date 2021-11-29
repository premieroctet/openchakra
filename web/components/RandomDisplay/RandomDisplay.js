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
    justifyContent: 'center',
    margin: 0,
    width: '100%',
  },
  carousel: {
    height: '100%',
    '& .CarouselItem': {
      height: '100%',
      display: 'flex',
    },
    '& .CarouselItem div': {
      width: '100%',
    },
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    margin: 0,
    backgroundSize: 'cover',
  },
  randompics: {
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: 250,
    maxHeight: 400,
    width: 200,
  },

}))

function RandomDisplay(props) {
  const {arrayText, loop} = props
  const classes = useStyles()

  return(
    <Carousel
      autoPlay={false}
      indicators={false}
      interval={6000}
      className={classes.carousel}
    >
      {
        arrayText.map((res, i) => {
          return(
            <Grid container spacing={2} key={i} className={`${classes.mainContainer} customhowitworks${i}`}>
              {
                res.map((element, index) => {
                  return(
                    <>
                      {
                        index === 0 &&
                        <Grid item xs={12} className={classes.title} key={index} >
                          <Typography className={`${classes.colorText} customrandomdisplay`}>{element[0]}</Typography>
                        </Grid>
                      }
                      {
                        index !== 0 &&
                        <Grid container spacing={2} item md={2} xs={12} className={`${classes.carouselStyle} customrandomdisplaycontainer${i.toString() + index.toString()}`} key={index}>
                          <Grid item xs={12}>
                            <Typography className={`${classes.colorText} customrandomdisplay`}>{element}</Typography>
                          </Grid>
                          <Grid item xs={12} className={`customrandompics${i.toString() + index.toString()} ${classes.randompics}`}/>
                        </Grid>
                      }

                    </>
                  )
                })
              }
            </Grid>
          )
        })
      }
    </Carousel>
  )
}

export default withTranslation('custom', {withRef: true})(RandomDisplay)
