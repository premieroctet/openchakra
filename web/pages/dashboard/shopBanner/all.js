const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const models=require('../../../components/BigList/models')

class all extends DataPage {
  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      models.textColumn({headerName: "Label", field: "label"}),
      models.pictureColumn({headerName: "Illustration", field: "picture"}),
    ]
  }

  getTitle = () => {
    return "Bannières"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/shopBanner/all')
      .then((response) => {
        let shopBanner = response.data.map(sb => { sb.picture=`/${sb.picture}`; return sb});
        this.setState({data: shopBanner});
      })
  }

  onCellClicked = data => {
    window.open(`/dashboard/shopBanner/view?id=${data._id}`, '_blank')
  }

  onAddClicked = () => {
    window.open(`/dashboard/shopBanner/add`, '_blank')
  }


}

export default withStyles(styles)(all);
