import {withTranslation} from 'react-i18next'
const {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles'
import axios from 'axios'
const models=require('../../../components/BigList/models')

class all extends DataPage {

  getDataType = () => {
    return 'shopBanner'
  }

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      models.textColumn({headerName: 'Label', field: 'label'}),
      models.pictureColumn({headerName: 'Illustration', field: 'picture'}),
    ]
  }

  getTitle = () => {
    return 'Bannières'
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/shopBanner/all')
      .then(response => {
        let shopBanners = response.data
        this.setState({data: shopBanners})
      })
  }

  onCellClicked = data => {
    window.open(`/dashboard/shopBanner/view?id=${data._id}`, '_blank')
  }

  onAddClicked = () => {
    window.open('/dashboard/shopBanner/add', '_blank')
  }


}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(all))
