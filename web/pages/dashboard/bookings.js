const  {DataPage, styles}=require('../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const {insensitiveComparator}=require('../../utils/text')
const moment = require('moment')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Date réservation", field: "date", cellRenderer: 'dateTimeCellRenderer'},
      {headerName: "Date prestation", field: "prestation_date", comparator: insensitiveComparator},
      {headerName: "Service", field: "service", comparator: insensitiveComparator},
      {headerName: "Client", field: "user.full_name", comparator: insensitiveComparator},
      {headerName: "Alfred", field: "alfred.full_name", comparator: insensitiveComparator},
      {headerName: "Montant client", field: "amount"},
      {headerName: "Statut", field: "status"},
      {headerName: "Virement", field: "paid", cellRenderer: 'booleanCellRenderer'},
    ]
  }

  getTitle = () => {
    return "Réservations"
  }


  loadData = () => {
    axios.get('/myAlfred/api/admin/booking/all')
      .then( response => {
        const bookings = response.data
        bookings.forEach( b => {
          b.prestation_date = `${b.date_prestation} ${moment(b.time_prestation).format('HH:mm')}`
        })
        this.setState({data: response.data});
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

export default withStyles(styles)(all);
