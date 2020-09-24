import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SlideShow from '../../SlideShow/SlideShow';
import StarIcon from '@material-ui/icons/Star';
import {CATEGORY} from '../../../utils/i18n';

class Category extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const {style} = this.props;
    return(
      <Grid className={style.categoryMainContainer}>
        <Grid className={style.categoryContainer}>
          <Grid className={style.categoryLeftContainer}>
            <Grid>
              <StarIcon/>
            </Grid>
            <Grid>
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
        <Grid>
          <SlideShow/>
        </Grid>
      </Grid>
    );
  }
}

export default Category
