import React from 'react'
import Grid from '@material-ui/core/Grid'
import {DataGrid} from '@material-ui/data-grid'
import axios from 'axios'

const {setAxiosAuthentication} = require('../../../utils/authentication')

const columns = [
  {field: 'firstname', headerName: 'firstname'},
  {field: 'lastname', headerName: 'lastname'},
  {field: 'billing_number', headerName: 'billing_number'},
]

class Invoices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/companies/billings')
      .then(res => {
        let data = res.data
        this.setState({data: data})
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    const {data} = this.state

    return (
      <Grid>
        <h2>Factures</h2>
        <Grid style={{
          height: 400,
          width: '100%',
        }}>
          {/* <DataGrid rows={data} columns={columns} checkboxSelection/>*/}
        </Grid>
      </Grid>
    )
  }
}

export default Invoices
