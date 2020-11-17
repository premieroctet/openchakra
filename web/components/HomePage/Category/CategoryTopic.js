import React from 'react';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import {CATEGORY} from '../../../utils/i18n';
import withSlide from '../../../hoc/Slide/SlideShow'
import withGrid from '../../../hoc/Grid/GridCard'
import CategoryCard from "../../Card/CategoryCard/CategoryCard";
import {Hidden} from "@material-ui/core";
const {SlideGridDataModel}=require('../../../utils/models/SlideGridDataModel')

const CategorySlide=withSlide(withGrid(CategoryCard))

class CategoryTopic extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const {style, category} = this.props;

    if (!category) {
      return null
    }

    return(
      <Grid className={style.categoryMainContainer}>
        <Grid className={style.categoryContainer}>
          <Grid className={style.categoryLeftContainer}>
            <Grid className={style.categoryImgContainer}>
              <img src={'/static/assets/icon/star.png'} alt={'iconStar'} title={'iconStar'} />
            </Grid>
            <Grid className={style.categoryTextContainer}>
              <Grid>
                <p className={style.categoryTitle}>{CATEGORY.title}</p>
              </Grid>
              <Grid>
                <p className={style.categoryText}>{CATEGORY.text}</p>
              </Grid>
            </Grid>
          </Grid>
          <Hidden only={['xs']}>
            <Grid>
              <Button variant={'outlined'} classes={{root : style.categoryButton}} onClick={() => Router.push('/search?search=1')}>
                {CATEGORY.button}
              </Button>
            </Grid>
          </Hidden>
        </Grid>
        <Grid className={style.categorySlideShowContainer}>
          {/*{
            category.map(res =>{
              return(
                <CategoryCard item={category} style={style}/>
              )
            })
          }*/}
        </Grid>
      </Grid>
    );
  }
}

export default CategoryTopic
