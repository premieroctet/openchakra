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

const rows = [
  {firstname: 'edwin'},
  {lastname: 'lienard'},
  {billing_number: 'mybilling'},
  {amount: 500},
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
    return (
      <Grid>
        <h2>Factures</h2>
        <Grid style={{
          height: 400,
          width: '100%',
        }}>
          {/* <DataGrid rows={rows} columns={columns} checkboxSelection/>*/}
        </Grid>
      </Grid>
    )
  }
}

export default Invoices
