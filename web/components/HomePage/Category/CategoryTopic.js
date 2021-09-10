import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import Button from '@material-ui/core/Button'
import {CATEGORY} from '../../../utils/i18n'
import styles from '../../../static/css/components/CategoryTopic/CategoryTopic'
import CategoryCard from '../../Card/CategoryCard/CategoryCard'
import withStyles from '@material-ui/core/styles/withStyles'
import withSlide from '../../../hoc/Slide/SlideShow'
import withGrid from '../../../hoc/Grid/GridCard'
const {SlideGridDataModel}=require('../../../utils/models/SlideGridDataModel')
const CategorySlide=withSlide(withGrid(CategoryCard))
import '../../../static/assets/css/custom.css'

class CategoryTopic extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {classes, category, user} = this.props

    if (!category) {
      return null
    }

    return(
      <Grid className={classes.categoryMainContainer}>
        <Grid className={classes.categoryContainer}>
          <Grid className={classes.categoryLeftContainer}>
            <Grid className={`customslidelogo ${classes.categoryImgContainer}`}>
              <img src={'/static/assets/faq/star.svg'} alt={'iconStar'} title={'iconStar'} />
            </Grid>
            <Grid className={classes.categoryTextContainer}>
              <Grid>
                <p className={`customslideh1 ${classes.categoryTitle}`}>{CATEGORY.title}</p>
              </Grid>
              <Grid>
                <p className={`customslidetext ${classes.categoryText}`}>{CATEGORY.text}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.hiddenOnXs}>
            <Button variant={'outlined'} className={'customcatbutton'} classes={{root: `${classes.categoryButton}`}} onClick={() => Router.push('/search')}>
              {CATEGORY.button}
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.categorySlideShowContainer} spacing={3}>
          <Grid className={classes.categorySlideContainer}>
            <CategorySlide model={new SlideGridDataModel(category, 4, 2, true)} style={classes} user={user}/>
          </Grid>
          <Grid item container spacing={3} className={classes.hideOnBigScreen}>
            {
              Object.keys(category).map((res, index) => (
                <Grid item key={index}>
                  <CategoryCard item={category[res]}/>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid className={classes.buttonDiscoverMobile}>
          <Button variant={'outlined'} className={'customcatbutton'} classes={{root: `customcatbutton ${classes.categoryButton}`}} onClick={() => Router.push('/search')}>
            {CATEGORY.button}
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(CategoryTopic))
