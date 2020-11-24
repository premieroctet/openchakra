import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination'
import './SlideShow.css';
import styles from '../../static/css/components/Slide/SlideShow/SlideShow'

function withSlide(WrappedComponent) {

  return class extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        pageIndex: 0,
      }
    }

    onCarouselIndexChange = (index, active) => {
      this.setState({pageIndex: index})
    };

    onPageChange = (event, pageIndex) => {
      this.setState({pageIndex: pageIndex-1})
    };

    render(){
      const {pageIndex} = this.state;
      const {style,model} = this.props;
      var pageCount = this.props;

      if (model) {
        pageCount=model.getPageCount()
      }

      return(
        <Grid style={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <Carousel
            easing="ease"
            autoPlay={false}
            onChange={this.onCarouselIndexChange}
            animation={"slide"}
            navButtonsAlwaysVisible={this.props.infinite}
            navButtonsAlwaysInvisible={!model.isInfinite()}
          >
            { /** TODO importer les styles directement */ }
            <Grid container className={style.slideShowContainer}>
              <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                <Grid className={style.slideShowSectionContainer}>
                  <WrappedComponent {...this.props} page={pageIndex}/>
                </Grid>
              </Grid>
            </Grid>
          </Carousel>
          { !model.isInfinite() ?
            <Grid style={{ display:'flex', justifyContent:'center', marginTop : '5vh', marginBottom: '5vh'}}>
              <Pagination count={pageCount} page={pageIndex+1} onChange={this.onPageChange} classes={{root: style.paginationRoot}}/>
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
