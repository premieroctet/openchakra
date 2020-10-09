import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid';

function withSlide(WrappedComponent) {

  return class extends React.Component{
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
      const{style, type, data, length } = this.props
      const {pageIndex} = this.state

      return(
        <Grid>
          <Carousel easing="ease" autoPlay={false} onChange={this.onCarouselIndexChange} animation={"slide"} navButtonsAlwaysVisible={true}>
            <Grid container className={style.slideShowContainer}>
              <Grid container>
                <Grid className={style.slideShowSectionContainer}>
                  <WrappedComponent {...this.props} style={style} data={data} start={pageIndex} length={length} />
                </Grid>
              </Grid>
            </Grid>
          </Carousel>
        </Grid>
      )
    }
  }
}

export default withSlide
