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
      models.textColumn({headerName: 'Code article', field: 'reference'}),
      models.textColumn({headerName: 'Description', field: 'description'}),
      models.textColumn({headerName: 'Description 2', field: 'description_2'}),
      models.textColumn({headerName: 'Groupe', field: 'group'}),
      models.textColumn({headerName: 'Ligne de production', field: 'production_line'}),
      models.textColumn({headerName: 'Famille', field: 'family'}),
      models.currencyColumn({headerName: 'Tarif', field: 'price'}),
      {headerName: 'Stock', field: 'stock'},
      {headerName: 'Poids', field: 'weight'},
    ]
  }

  getTitle = () => {
    return 'Produits'
  }

  loadData = () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/products')
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
      {title: 'Import articles', url: '/myAlfred/api/products/import'},
      {title: 'Import tarifs', url: '/myAlfred/api/products/import-price'},
      {title: 'Import stock', url: '/myAlfred/api/products/import-stock'},
    ]
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

export default withTranslation('custom', {withRef: true})(withStyles(styles)(all))
