import {REVIEW_STATUS} from '../../utils/consts'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import {setAxiosAuthentication} from '../../utils/authentication'
import {withTranslation} from 'react-i18next'
const {DataPage, styles}=require('../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles'
import axios from 'axios'
const models=require('../../components/BigList/models')

class Reviews extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      models.textColumn({headerName: 'Prestataire', field: 'alfred.full_name'}),
      models.textColumn({headerName: 'Client', field: 'user.full_name'}),
      models.textColumn({headerName: 'Service', field: 'serviceUser.service.label'}),
      models.dateColumn({headerName: 'Date', field: 'date'}),
      models.textColumn({headerName: 'Sens', field: 'direction'}),
      models.textColumn({headerName: 'Statut', field: 'status', editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: Object.values(REVIEW_STATUS)},
        filter: 'reviewStatusFilter',
      }),
      models.textColumn({headerName: 'Commentaire', field: 'content'}),
    ]
  }

  getTitle = () => {
    return 'Commentaires'
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/reviews')
      .then(response => {
        let reviews = response.data
        reviews=reviews.map(r => {
          r.direction=r.note_client ? 'Alfred=>client':'Client=>Alfred'
          return r
        })
        this.setState({data: reviews})
      })
      .catch(err => {
        console.error(err)
      })
  }

  onCellChanged = (colDef, data, oldValue, newValue) => {
    console.log(`Changed ${JSON.stringify({colDef, data, oldValue, newValue}, null, 2)}`)
    setAxiosAuthentication()
    axios.put(`/myAlfred/api/admin/reviews/${data._id}`, {status: newValue})
      .then(() => {
        snackBarSuccess('Commentaire mis à jour')
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.repsonse.data)
      })
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Reviews))
