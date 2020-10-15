import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid';
const {circular_get}=require('../../utils/functions')

function withGrid(WrappedComponent) {

  return class extends React.Component{
    constructor(props) {
      super(props);
    }

    get_data = (data, start, length) => {
      return this.props.infinite ?
        circular_get(Object.keys(data), start, length)
        :
        Object.keys(data.slice(start, start+length))
    }
    render(){
      const {style, data, columns, rows, page} = this.props

      if (12%columns>0 || 12%rows>0) {
        throw new Error('columns/rows must be 1,2,3,4 or 6')
      }
      const size=12/columns
      const dataLength=columns*rows

      return(
        <Grid container spacing={2}>
          {data && data.length>0 ?
            this.get_data(data, page*dataLength, dataLength).map( (res, idx) => {
              return(
                <Grid item xl={size} lg={size} md={size} className={style.categoryCardRoot}>
                  <WrappedComponent {...this.props} key={page*dataLength+res} item={data[res]} index={idx}/>
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
