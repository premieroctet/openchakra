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
      autoplay: false
    }
  }

  render(){
    const{autoplay} = this.state;
    const{style, type} = this.props;

    return(
      <Grid>
        <Slide easing="ease" autoplay={autoplay}>
          <Grid container className={style.slideShowContainer}>
            <Grid container>
              <Grid className={style.slideShowSectionContainer}>
                {type === 'alfred' ? <CardPreview style={style}/> : <CategoryCard style={style}/>}
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={style.slideShowContainer}>
            <Grid container>
              <Grid className={style.slideShowSectionContainer}>
                {type === 'alfred' ? <CardPreview style={style}/> : <CategoryCard style={style}/>}
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={style.slideShowContainer}>
            <Grid container>
              <Grid className={style.slideShowSectionContainer}>
                {type === 'alfred' ? <CardPreview style={style}/> : <CategoryCard style={style}/>}
              </Grid>
            </Grid>
          </Grid>
        </Slide>
      </Grid>
    );
  }

}

export default SlideShow
