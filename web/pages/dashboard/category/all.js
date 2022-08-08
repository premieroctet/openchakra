import {withTranslation} from 'react-i18next'

const {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles'
const models=require('../../../components/BigList/models')
import axios from 'axios'

class all extends DataPage {

  getDataType = () => {
    return 'category'
  }

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      models.textColumn({headerName: 'Label particuliers', field: 'particular_label'}),
      models.textColumn({headerName: 'Label pro', field: 'professional_label'}),
      models.pictureColumn({headerName: 'Illustration particuliers', field: 'particular_picture'}),
      models.pictureColumn({headerName: 'Illustration pro', field: 'professional_picture'}),
    ]
  }

  getTitle = () => {
    return 'Catégories'
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/category/all')
      .then(response => {
        let categories = response.data
        this.setState({data: categories})
      })
  }

  onCellClicked = data => {
    window.open(`/dashboard/category/view?id=${data._id}`, '_blank')
  }

  onAddClicked = () => {
    window.open('/dashboard/category/view', '_blank')
  }

}

export default withTranslation(null, {withRef: true})(withStyles(styles)(all))
