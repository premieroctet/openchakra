import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {CATEGORY} from '../../../utils/i18n';
import withSlide from '../../../hoc/Slide/SlideShow';
import CategoryCard from "../../Card/CategoryCard/CategoryCard";

const CategorySlide=withSlide(CategoryCard)

class Category extends React.Component{
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
            <Button variant={'outlined'} classes={{root : style.categoryButton}}>{CATEGORY.button}</Button>
          </Grid>
        </Grid>
        <Grid className={style.categorySlideShowContainer}>
          <CategorySlide style={style} data={category} length={8}/>
        </Grid>
      </Grid>
    );
  }
}

export default Category
