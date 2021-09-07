import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {DataGrid} from '@material-ui/data-grid'


class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      page: 1,
    }
  }

  render() {
    const{data} = this.props
    const{page} = this.state

    let newData = data ? data : ''

    return(
      <Grid>
        <DataGrid
          page={page}
          onPageChange={params => {
            this.setState({page: params.page})
          }}
          pageSize={5}
          pagination
          {...newData}
        />
      </Grid>
    )
  }
}

export default withTranslation()(Pagination)
