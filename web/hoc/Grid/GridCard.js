import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
const {circular_get}=require('../../utils/functions')

function withGrid(WrappedComponent) {

  return class extends React.Component{
    constructor(props) {
      super(props);
    }

    render(){
      const {style, model, page} = this.props

      const colSize=12/model.getColumns()

      const indexes=[...Array(model.getRows()*model.getColumns())].map((v, idx) => idx)

      return(
        <Grid container spacing={2}>
          { indexes.map(idx => {
            const row=Math.floor(idx/model.getColumns())
            const col=idx%model.getColumns()
            console.log(`Item:${model.getData(page, col, row)}`)
            return(
              <Grid item xl={colSize} lg={colSize} md={colSize} className={style.categoryCardRoot}>
                <WrappedComponent {...this.props} item={model.getData(page, col, row)} key={[page, col, row]}/>
              </Grid>
            )
            })
          }
        </Grid>
      )
    }
  }
}

export default withGrid
