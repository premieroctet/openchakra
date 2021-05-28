const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const models=require('../../../components/BigList/models')
const {MANGOPAY_CONFIG}=require('../../../config/config')
const regions=require('../../../static/assets/data/regions')
const moment = require('moment')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Statut", field: "status", cellRenderer: 'statusRenderer', filter:'statusFilter'},
      models.textColumn({headerName: "Prénom", field: "firstname"}),
      models.textColumn({headerName: "Nom", field: "name"}),
      models.textColumn({headerName: "Email", field: "email"}),
      models.textColumn({headerName: "Ville", field: "billing_address.city"}),
      {headerName: "CP", field: "billing_address.zip_code"},
      models.textColumn({headerName: "Région", field: "region"}),
      {headerName: "Tel", field: "phone"},
      models.dateColumn({headerName: "Né(e) le", field: "birthday_moment"}),
      models.dateTimeColumn({headerName: "Inscrit le", field: "creation_date", initialSort: 'desc'}),
      models.dateTimeColumn({headerName: "Création boutique", field: "shop.creation_date"}),
      models.textColumn({headerName: "Client Mangopay", field: "id_mangopay"}),
      models.textColumn({headerName: "Alfred Mangopay", field: "mangopay_provider_id"}),
      models.textColumn({headerName: "Warning", field: "warning", cellRenderer: 'warningRenderer'}),
    ]
  }

  getTitle = () => {
    return "Utilisateurs"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/users/all')
      .then((response) => {
        let users = response.data;
        users=users.map( u => {
          u.status={'alfred':u.is_alfred, 'admin': u.is_admin}
          u.birthday_moment = moment(u.birthday)
          u.shop = u.shop.pop()
          if (!(u.billing_address && u.billing_address.gps && u.billing_address.gps.lat)) {
            u.warning='Adresse incorrecte'
          }
          if (u.billing_address && u.billing_address.zip_code) {
            u.region = (regions.find(r => u.billing_address.zip_code.startsWith(r.num_dep)) || {}).region_name
          }
          return u
        })
        this.setState({data:users});
      })
  }

  onCellClicked = (data, field, value) => {
    if (field=='shop.creation_date') {
      if (data.shop) {
        window.open(`/profile/services?user=${data._id}`, '_blank')
      }
      return
    }
    else if (['id_mangopay', 'mangopay_provider_id'].includes(field)) {
      if (value) {
        const sandbox = MANGOPAY_CONFIG.sandbox
        const mangopay_base_url = sandbox ? 'https://dashboard.sandbox.mangopay.com' : 'https://dashboard.mangopay.com'
        window.open(`${mangopay_base_url}/User/${value}/Details`)
      }
      return
    }
    else {
      window.open(`/profile/about?user=${data._id}`)
    }
  }

}

export default withStyles(styles)(all);
