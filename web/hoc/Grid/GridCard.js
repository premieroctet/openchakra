import React from 'react';
import Grid from '@material-ui/core/Grid';

function withGrid(WrappedComponent) {

  return class extends React.Component{
    constructor(props) {
      super(props);
    }

    render(){
      const {style, model, page} = this.props;

      const colSize=12/model.getColumns();

      const indexes=[...Array(model.getRows()*model.getColumns())].map((v, idx) => idx);

      return(
        <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
          { indexes.map(idx => {
            const row=Math.floor(idx/model.getColumns())
            const col=idx%model.getColumns()
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
