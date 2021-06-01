import React from 'react';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import {CATEGORY} from '../../../utils/i18n';
import styles from '../../../static/css/components/CategoryTopic/CategoryTopic';
import CategoryCard from "../../Card/CategoryCard/CategoryCard";
import withStyles from "@material-ui/core/styles/withStyles";
import withSlide from "../../../hoc/Slide/SlideShow";
import withGrid from '../../../hoc/Grid/GridCard'
const {SlideGridDataModel}=require('../../../utils/models/SlideGridDataModel');
const CategorySlide=withSlide(withGrid(CategoryCard));

class CategoryTopic extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const {classes, category, user} = this.props;

    if (!category) {
      return null
    }

    return(
      <Grid className={classes.categoryMainContainer}>
        <Grid className={classes.categoryContainer}>
          <Grid className={classes.categoryLeftContainer}>
            <Grid className={classes.categoryImgContainer}>
              <img src={'/static/assets/faq/star.svg'} alt={'iconStar'} title={'iconStar'} />
            </Grid>
            <Grid className={classes.categoryTextContainer}>
              <Grid>
                <p className={classes.categoryTitle}>{CATEGORY.title}</p>
              </Grid>
              <Grid>
                <p className={classes.categoryText}>{CATEGORY.text}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.hiddenOnXs}>
            <Button variant={'outlined'} classes={{root : classes.categoryButton}} onClick={() => Router.push('/search?search=1')}>
              {CATEGORY.button}
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.categorySlideShowContainer} spacing={3}>
          <Grid className={classes.categorySlideContainer}>
            <CategorySlide model={new SlideGridDataModel(category, 4, 2, true)} style={classes} user={user}/>
          </Grid>
          <Grid className={classes.hideOnBigScreen}>
            {
              Object.keys(category).map((res,index) => (
                <Grid item key={index}>
                  <CategoryCard item={category[res]}/>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid className={classes.buttonDiscoverMobile}>
          <Button variant={'outlined'} classes={{root : classes.categoryButton}} onClick={() => Router.push('/search?search=1')}>
            {CATEGORY.button}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles) (CategoryTopic);
