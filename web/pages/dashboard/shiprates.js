import {withTranslation} from 'react-i18next'
const {DataPage, styles}=require('../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles'
const models=require('../../components/BigList/models')
import axios from 'axios'
const moment = require('moment')
moment.locale('fr')
const {setAxiosAuthentication} = require('../../utils/authentication')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      models.textColumn({headerName: 'Département', field: 'zipcode'}),
      models.booleanColumn({headerName: 'Express', field: 'express'}),
      {headerName: 'Poids minimum', field: 'min_weight'},
      {headerName: 'Poids maximum', field: 'max_weight'},
      {headerName: 'Forfait', field: 'fixed_price'},
      {headerName: 'Par kg', field: 'per_kg_price'},
    ]
  }

  getTitle = () => {
    return 'Frais de livraison'
  }

  loadData = () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/shiprates')
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

  importURLS = () => {
    return [
      {title: 'Import', url: '/myAlfred/api/shiprates/import'},
    ]
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(all))
