import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import {Slide}  from 'react-slideshow-image';
import Grid from '@material-ui/core/Grid';
import CardPreview from "../Card/CardPreview/CardPreview";
import CategoryCard from "../Card/CategoryCard/CategoryCard";


class SlideShow extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      autoplay: false,
    }
  }

  render(){
    const{autoplay} = this.state;
    const{style, type, category, alfred } = this.props;

    return(
      <Grid>
        <Slide easing="ease" autoplay={autoplay}>
          <Grid container className={style.slideShowContainer}>
            <Grid container>
              <Grid className={style.slideShowSectionContainer}>
                {type === 'alfred' ? <CardPreview style={style} alfred={alfred} start={0} length={3}/> : <CategoryCard style={style} category={category} start={0} length={8}/>}
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={style.slideShowContainer}>
            <Grid container>
              <Grid className={style.slideShowSectionContainer}>
                {type === 'alfred' ? <CardPreview style={style} alfred={alfred} start={3} length={3}/> : <CategoryCard style={style} category={category} start={8} length={8}/>}
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={style.slideShowContainer}>
            <Grid container>
              <Grid className={style.slideShowSectionContainer}>
                {type === 'alfred' ? <CardPreview style={style} alfred={alfred} start={0} length={3}/> : <CategoryCard style={style} category={category} start={16} length={8}/>}
              </Grid>
            </Grid>
          </Grid>
        </Slide>
      </Grid>
    );
  }

}

export default SlideShow
