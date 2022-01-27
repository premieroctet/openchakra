const { isPlatform } = require('../../../config/config');

import {withTranslation} from 'react-i18next'
const {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles'
import axios from 'axios'
const models=require('../../../components/BigList/models')

class all extends DataPage {

  getDataType = () => {
    return 'service'
  }

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      models.textColumn({headerName: 'Label', field: 'label'}),
      models.textColumn({headerName: 'Catégorie', field: 'category_label'}),
      models.booleanColumn({headerName: 'Pros', field: 'professional_access'}),
      models.booleanColumn({headerName: 'Particuliers', field: 'particular_access'}),
      models.booleanColumn({headerName: 'Frais dep.', field: 'travel_tax'}),
      models.booleanColumn({headerName: 'Frais liv.', field: 'pick_tax'}),
      models.textColumn({headerName: 'Lieux', field: 'location_label'}),
      models.pictureColumn({headerName: 'Illustration', field: 'picture'}),
      models.warningColumn({headerName: 'Warning', field: 'warning'}),
    ]
    // TODO : ajouter colonne warning si service pro sans prestations pro ou service particulier sans presta particuliers
  }

  getTitle = () => {
    return 'Services'
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/service/all')
      .then(response => {
        let services = response.data

        this.setState({
          data: services.map(s => {
            s.location_label = Object.entries(s.location).filter(e => Boolean(e[1])).map(e => e[0].slice(0, 3).toUpperCase()).sort().join('/')
            return s
          }),
        })
      })
  }

  onCellClicked = data => {
    window.open(`/dashboard/services/view?id=${data._id}`, '_blank')
  }

  onAddClicked = () => {
    window.open('/dashboard/services/add', '_blank')
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(all))
