import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid';
const {circular_get}=require('../../utils/functions')

function withGrid(WrappedComponent) {

  return class extends React.Component{
    constructor(props) {
      super(props);
    }

    render(){
      const {style, data, columns, rows, start} = this.props

      const size=12/columns
      const dataLength=columns*rows

      return(
        <Grid container>
          {data && data.length>0 ?
            circular_get(Object.keys(data), start, dataLength).map( res => {
              return(
                <Grid item xl={size} lg={size} md={size} key={res} className={style.categoryCardRoot}>
                  <WrappedComponent {...this.props} item={data[res]}/>
                </Grid>
              )
            })
          :
            null
          }
        </Grid>
      )
    }
  }
}

export default withGrid
