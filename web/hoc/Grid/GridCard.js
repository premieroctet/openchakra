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
      const {style, data, columns, rows, page} = this.props;

      const size=12/columns;
      const dataLength=columns*rows;

      return(
        <Grid container spacing={2}>
          {data && data.length>0 ?
            circular_get(Object.keys(data), page, dataLength).map( (res, idx) => {
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
