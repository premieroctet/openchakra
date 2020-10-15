import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination'
import './SlideShow.css';

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

    onPageChange = (event, pageIndex) => {
      console.log(pageIndex)
      this.setState({pageIndex: pageIndex-1})
    }

    render(){
      const {pageIndex} = this.state
      const {style, pageCount} = this.props

      console.log(`pageIndex:${pageIndex}`)
      return(
        <Grid>
          <Carousel easing="ease" autoPlay={false} onChange={this.onCarouselIndexChange} animation={"slide"} navButtonsAlwaysVisible={this.props.infinite}
          navButtonsAlwaysInvisible={!this.props.infinite}>
            { /** TODO importer les styles directement */ }
            <Grid container className={style.slideShowContainer}>
              <Grid container>
                <Grid className={style.slideShowSectionContainer}>
                  <WrappedComponent {...this.props} page={pageIndex}/>
                </Grid>
              </Grid>
            </Grid>
          </Carousel>
          { !this.props.infinite ?
            <Grid style={{ display:'flex', justifyContent:'center'}}>
              <Pagination count={pageCount} page={pageIndex+1} onChange={this.onPageChange} />
            </Grid>
            :
            null
          }
        </Grid>
      )
    }
  }
}

export default withSlide
