import React from 'react'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import Button from '@material-ui/core/Button'
import {CATEGORY} from '../../../utils/i18n'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/OurAlfred/OurAlfred'
import withSlide from '../../../hoc/Slide/SlideShow'
import withGrid from '../../../hoc/Grid/GridCard'
import CardPreview from '../../Card/CardPreview/CardPreview'
import Typography from '@material-ui/core/Typography'
const {SlideGridDataModel}=require('../../../utils/models/SlideGridDataModel')

const AlfredSlide=withSlide(withGrid(CardPreview))

class OurAlfred extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const{classes, alfred} = this.props

    return(
      <Grid className={classes.ourAlfredMainStyle}>
        <Grid className={classes.ourAlfredMainContainer}>
          <Grid className={classes.ourAlfredMainHeader}>
            <Grid className={classes.ourAlfredImgContainer}>
              <img src={'/static/assets/faq/star.svg'} alt={'iconStar'} title={'iconStar'}/>
            </Grid>
            <Grid className={classes.ourAlfredTextContainer}>
              <Grid>
                <Typography className={classes.ourAlfredTitle}>Nos Alfred</Typography>
              </Grid>
              <Grid>
                <Typography className={classes.ourAlfredSubtitle}>Découvrez les profils de nos Alfred</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.hiddenOnMobile}>
            <Button classes={{root: classes.ourAlfredButton}} onClick={() => Router.push('/search?search=1')}>Tout découvrir</Button>
          </Grid>
        </Grid>
        <Grid container className={classes.categorySlideShowContainer} spacing={3}>
          <Grid item className={classes.alfredSlideContainer}>
            <AlfredSlide model={new SlideGridDataModel(alfred, 3, 1, true)} style={classes} />
          </Grid>
          <Grid item container spacing={3} className={classes.containerCardPreviewMobile}>
            {
              Object.keys(alfred).map((res, index) => (
                <Grid item key={index}>
                  <CardPreview item={alfred[res]}/>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid className={classes.containerMobileButton}>
          <Button variant={'outlined'} classes={{root: classes.categoryButton}} onClick={() => Router.push('/search?search=1')}>
            {CATEGORY.button}
          </Button>
        </Grid>
      </Grid>

    )
  }
}

export default withStyles(styles)(OurAlfred)
