import {withTranslation} from 'react-i18next'
const {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles'
import axios from 'axios'
const {textColumn}=require('../../../components/BigList/models')

class all extends DataPage {

  getDataType = () => {
    return 'job'
  }

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      textColumn({headerName: 'Label', field: 'label'}),
    ]
  }

  getTitle = () => {
    return 'Métiers'
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/job/all')
      .then(response => {
        let job = response.data
        this.setState({data: job})
      })
  }

  onCellClicked = data => {
    window.open(`/dashboard/job/view?id=${data._id}`, '_blank')
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(all))
