import {withStyles} from '@material-ui/core/styles'
import React from 'react'
import axios from 'axios'
import {Grid} from '@material-ui/core'
import 'react-datepicker/dist/react-datepicker.css'

const moment = require('moment')

const {DataPage, styles}=require('../../components/AlfredDashboard/DataPage')
const models=require('../../components/BigList/models')

moment.locale('fr')
import DatePicker from 'react-datepicker'

class Incomes extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      models.dateTimeColumn({headerName: 'Date de prestation', field: 'date_prestation_moment'}),
      models.textColumn({headerName: 'Service', field: 'service'}),
      models.textColumn({headerName: 'Client', field: 'user.full_name'}),
      models.textColumn({headerName: 'Alfred', field: 'alfred.full_name'}),
      models.currencyColumn({headerName: 'Montant client', field: 'amount'}),
      models.currencyColumn({headerName: 'Commission', field: 'commission'}),
      models.textColumn({headerName: 'Statut', field: 'status'}),
      models.booleanColumn({headerName: 'Payé au fournisseur', field: 'paid'}),
    ]
  }

  getTitle = () => {
    return 'Commissions perçues'
  }

  getHeader = () => {
    const {start_date, end_date}=this.state

    return (
      <Grid style={{width: '100%', alignItems: 'center', margin: '15px'}}>
        <span style={{margin: '5px'}}>Commissions perçues entre le</span>
        <DatePicker
          selected={start_date}
          name='start_date'
          dateFormat='dd/MM/yyyy'
          onChange={this.onStartDateChange}
          placeholderText='date début'
          locale='fr'
        />
        <span style={{margin: '5px'}}>et le</span>
        <DatePicker
          selected={end_date}
          name='end_date'
          dateFormat='dd/MM/yyyy'
          onChange={this.onEndDateChange}
          placeholderText='date fin'
          locale='fr'
          minDate={start_date || null}
        />
      </Grid>
    )
  }

  onStartDateChange = ev => {
    const st={start_date: ev}
    this.setState({start_date: ev})
    if (this.state.end_date < ev) {
      st.end_date=null
    }
    this.setState(st, this.componentDidMount)
  }

  onEndDateChange = ev => {
    this.setState({end_date: ev}, this.componentDidMount)
  }

  loadData = () => {
    const {start_date, end_date}=this.state
    axios.get('/myAlfred/api/admin/commissions', {params: {start_date: start_date && moment(start_date).unix(), end_date: end_date && moment(end_date).unix()}})
      .then(response => {
        let bookings = response.data
        // Hide avocotes bookings
        bookings = bookings.filter(b => !b.company_customer)
        bookings.forEach(b => {
          b.date = b.date ? moment(b.date) : null
          if (b.customer_booking) {
            b.user.full_name = `${b.user.full_name} pour ${b.customer_booking.user.full_name}`
          }
        })
        this.setState({data: bookings})
      })
  }

  onCellClicked = (data, field) => {

    if (field=='user.full_name') {
      window.open(`/profile/about?user=${data.user._id}`, '_blank')
    }
    if (field=='alfred.full_name') {
      window.open(`/profile/about?user=${data.alfred._id}`, '_blank')
    }
    if (field=='service') {
      window.open(`/userServicePreview?id=${data.serviceUserId}`, '_blank')
    }
  }

}

export default withStyles(styles)(Incomes)
