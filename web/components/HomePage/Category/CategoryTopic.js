import React from 'react';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import {CATEGORY} from '../../../utils/i18n';
import styles from '../../../static/css/components/CategoryTopic/CategoryTopic';
import CategoryCard from "../../Card/CategoryCard/CategoryCard";
import {Hidden} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import withSlide from "../../../hoc/Slide/SlideShow";
import withGrid from '../../../hoc/Grid/GridCard'
const {SlideGridDataModel}=require('../../../utils/models/SlideGridDataModel');
const CategorySlide=withSlide(withGrid(CategoryCard))

class CategoryTopic extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const {classes, category} = this.props;

    if (!category) {
      return null
    }

    return(
      <Grid className={classes.categoryMainContainer}>
        <Grid className={classes.categoryContainer}>
          <Grid className={classes.categoryLeftContainer}>
            <Grid className={classes.categoryImgContainer}>
              <img src={'/static/assets/icon/star.png'} alt={'iconStar'} title={'iconStar'} />
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
          <Hidden only={['xs']}>
            <Grid>
              <Button variant={'outlined'} classes={{root : classes.categoryButton}} onClick={() => Router.push('/search?search=1')}>
                {CATEGORY.button}
              </Button>
            </Grid>
          </Hidden>
        </Grid>
        <Grid container className={classes.categorySlideShowContainer} spacing={3}>
          <Hidden only={['xs', 'sm']}>
            <CategorySlide model={new SlideGridDataModel(category, 4, 2, true)} style={classes}/>
          </Hidden>
          <Hidden only={['md', 'lg', 'xl']}>
            {
              Object.keys(category).map(res => (
                <Grid item>
                  <CategoryCard item={category[res]}/>
                </Grid>
              ))
            }
          </Hidden>
        </Grid>
        <Hidden only={['xl', 'lg', 'md', 'sm']}>
          <Grid style={{marginTop: '10vh', display: 'flex', justifyContent: 'center'}}>
            <Button variant={'outlined'} classes={{root : classes.categoryButton}} onClick={() => Router.push('/search?search=1')}>
              {CATEGORY.button}
            </Button>
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

export default withStyles(styles) (CategoryTopic);
