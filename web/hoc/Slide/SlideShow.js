import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination'
import './SlideShow.css'

function withSlide(WrappedComponent) {

  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state={
        pageIndex: 0,
      }
    }

    onPageChange = (event, pageIndex) => {
      this.setState({pageIndex: pageIndex-1})
    };

    render() {
      const {pageIndex} = this.state
      const {style, model} = this.props
      let pageCount = this.props

      if (model) {
        pageCount=model.getPageCount()
      }

      return(
        <Grid style={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <Carousel
            autoPlay={false}
            next={ () => { this.setState({pageIndex: this.state.pageIndex + 1}) }}
            prev={ () => { this.setState({pageIndex: this.state.pageIndex - 1}) }}
            animation={'slide'}
            navButtonsAlwaysVisible={this.props.infinite}
            navButtonsAlwaysInvisible={!model.isInfinite()}
          >
            { /** TODO importer les styles directement */ }
            <Grid container className={style.slideShowContainer}>
              <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                <Grid style={{width: '100%'}}>
                  <WrappedComponent {...this.props} page={pageIndex}/>
                </Grid>
              </Grid>
            </Grid>
          </Carousel>
          { !model.isInfinite() ?
            <Grid style={{display: 'flex', justifyContent: 'center', marginTop: '5vh', marginBottom: '5vh'}}>
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
