import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid';
import CardPreview from "../Card/CardPreview/CardPreview";
import CategoryCard from "../Card/CategoryCard/CategoryCard";


class SlideShow extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      pageIndex: 0,
    }
  }

  onCarouselIndexChange = (index, active) => {
    console.log(`Index:${index}, active:${active}`)
    this.setState({pageIndex: index})
  }

  render(){
    const{style, type, category, alfred } = this.props
    const {pageIndex} = this.state

    return(
      <Grid>
        <Carousel easing="ease" autoPlay={false} onChange={this.onCarouselIndexChange} animation={"slide"} navButtonsAlwaysVisible={true}>
          <Grid container className={style.slideShowContainer}>
            <Grid container>
              <Grid className={style.slideShowSectionContainer}>
                {type === 'alfred' ? <CardPreview style={style} alfred={alfred} start={pageIndex*3} length={3}/> : <CategoryCard style={style} category={category} start={pageIndex*8} length={8}/>}
              </Grid>
            </Grid>
          </Grid>
        </Carousel>
      </Grid>
    );
  }

}

export default SlideShow
