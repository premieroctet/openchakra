import ReactHtmlParser from 'react-html-parser'
import {is_development} from '../../config/config'
import React from 'react'
import {Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import '../../static/assets/css/custom.css'
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles(theme => ({
  colorText: {
    color: 'white',
  },
  carouselStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    backgroundPosition: 'center',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('sm')]: {
      minWidth: 500,
    },
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
  containerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  classesBoxPics: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'scroll',
    },
  },

}))

function RandomBanner(props) {
  const {arrayText, loop, t, i18n} = props
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  // const myNewArray = arrayText.map((res, i) => res.map((result, index) => i18n.exists(`RANDOM_BANNER_TEXT_${i}_${index}`) && ReactHtmlParser(t(`RANDOM_BANNER_TEXT_${i}_${index}`))))

  return(
    <Carousel
      autoPlay={mobile ? false : loop}
      indicators={false}
      interval={is_development() ? 2000 : 6000}
      className={classes.carousel}
      cycleNavigation={false}
      navButtonsAlwaysInvisible={true}
    >
      {
        arrayText.map((res, i) => {
          return(
            <Grid container spacing={2} key={i} className={`${classes.mainContainer} RANDOM_BANNER_BG_PICTURE_${i}`}>
              <Grid item xs={12} className={classes.title} key={i} >
                <Typography className={`${classes.colorText} customrandomdisplay`}>{i18n.exists(`RANDOM_BANNER_TITLE_${i}`) && ReactHtmlParser(t(`RANDOM_BANNER_TITLE_${i}`))}</Typography>
              </Grid>
              {
                [0, 1, 2, 3, 4, 5].map((val, index) => {
                  return(
                    <Grid className={classes.classesBoxPics}>
                      <Grid container spacing={1} item md={2} xs={12} className={`${classes.carouselStyle} RANDOM_BANNER_BG_PICTURE_${i}_${index}`} key={`${i}_${index}`} style={{display: mobile && index === 0 || mobile && index === 1 ? 'none' : 'flex'}}>
                        <Grid item xs={12} className={`${classes.containerTitle} customrandomdisplay_${i}_${index}`}>
                          <h1 className={`${classes.colorText} customrandomdisplay_${i}_${index}`} style={{display: mobile && i === 2 ? 'none' : 'inherit'}}>{i18n.exists(`RANDOM_BANNER_TEXT_${i}_${index}`) && ReactHtmlParser(t(`RANDOM_BANNER_TEXT_${i}_${index}`))}</h1>
                        </Grid>
                        <Grid item xs={12} className={`RANDOM_BANNER_PICTURE_${i}_${index} ${classes.randompics}`} style={{display: mobile && i === 2 ? 'none' : 'inherit'}}/>
                      </Grid>
                    </Grid>
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

export default withTranslation('custom', {withRef: true})(RandomBanner)
