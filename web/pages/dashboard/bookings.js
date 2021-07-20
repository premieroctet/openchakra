const {DataPage, styles}=require('../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles'
const models=require('../../components/BigList/models')
import axios from 'axios'
const moment = require('moment')
moment.locale('fr')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      models.dateTimeColumn({headerName: 'Réservation', field: 'date'}),
      models.dateTimeColumn({headerName: 'Prestation', field: 'date_prestation_moment'}),
      models.textColumn({headerName: 'Service', field: 'service'}),
      models.textColumn({headerName: 'Client', field: 'user.full_name'}),
      models.textColumn({headerName: 'Alfred', field: 'alfred.full_name'}),
      models.currencyColumn({headerName: 'Montant client', field: 'amount'}),
      models.textColumn({headerName: 'Statut', field: 'status'}),
      models.booleanColumn({headerName: 'Virement', field: 'paid'}),
    ]
  }

  getTitle = () => {
    return 'Réservations'
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/booking/all')
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

export default withStyles(styles)(all)
