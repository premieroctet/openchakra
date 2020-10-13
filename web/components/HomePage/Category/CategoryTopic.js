import React from 'react';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import {CATEGORY} from '../../../utils/i18n';
import withSlide from '../../../hoc/Slide/SlideShow'
import withGrid from '../../../hoc/Grid/GridCard'
import CategoryCard from "../../Card/CategoryCard/CategoryCard";
const CategorySlide=withSlide(withGrid(CategoryCard))

class CategoryTopic extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const {style, category} = this.props;
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
          <Grid>
            <Button variant={'outlined'} classes={{root : style.categoryButton}} onClick={() => Router.push('/search?search=1')}>
              {CATEGORY.button}
            </Button>
          </Grid>
        </Grid>
        <Grid className={style.categorySlideShowContainer}>
          <CategorySlide style={style} data={category} columns={4} rows={2}/>
        </Grid>
      </Grid>
    );
  }
}

export default CategoryTopic
