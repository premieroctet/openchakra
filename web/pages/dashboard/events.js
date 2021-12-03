import { snackBarError } from '../../utils/notifications';
import {withTranslation} from 'react-i18next'

const {DataPage, styles}=require('../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles'
const models=require('../../components/BigList/models')
import axios from 'axios'

class EventLogs extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      models.dateTimeColumn({headerName: 'Date', field: 'date'}),
      models.textColumn({headerName: 'Superutilisateur', field: 'super_account.full_name'}),
      models.textColumn({headerName: 'Compte', field: 'account.full_name'}),
      models.textColumn({headerName: 'Catégorie', field: 'category'}),
      models.textColumn({headerName: 'Titre', field: 'title'}),
      models.textColumn({headerName: 'Description', field: 'description'}),
      models.textColumn({headerName: 'Données', field: 'data'}),
    ]
  }

  getTitle = () => {
    return 'Evenements'
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/eventlogs')
      .then(response => {
        let events = response.data.map(ev => ({...ev, data: ev.data && JSON.stringify(ev.data)}))
        this.setState({data: events})
      })
      .catch(err => {
        snackBarError(err.response.data)
      })
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(EventLogs))
