
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination'
import './SlideShow.module.css'

function withSlide(WrappedComponent) {

  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state={
        pageIndex: 0,
      }
    }

    onPageChange = (event, pageIndex) => {
      this.setState({pageIndex: Math.max(0, pageIndex-1)})
      document.getElementById('wrappedComponent').scrollIntoView()
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
            prev={ () => { this.setState({pageIndex: Math.max(0, this.state.pageIndex - 1)}) }}
            animation={'slide'}
            navButtonsAlwaysVisible={false} // && this.props.infinite || pageCount>1}
            navButtonsAlwaysInvisible={false && !model.isInfinite()}
          >
            { /** TODO importer les styles directement */ }
            <Grid container className={style.slideShowContainer}>
              <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                <Grid style={{width: '100%'}} id={'wrappedComponent'}>
                  <WrappedComponent {...this.props} page={pageIndex}/>
                </Grid>
              </Grid>
            </Grid>
          </Carousel>
          { !model.isInfinite() && !this.props.hidePageCount &&
            <Grid style={{display: 'flex', justifyContent: 'center', marginTop: '5vh', marginBottom: '5vh'}}>
              <Pagination count={pageCount} page={pageIndex+1} onChange={this.onPageChange} classes={{root: `custompagination ${style.paginationRoot}`}}/>
            </Grid>
          }
        </Grid>
      )
    }
  }
}

export default withSlide
