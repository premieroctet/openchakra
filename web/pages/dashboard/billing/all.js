const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const {insensitiveComparator}=require('../../../utils/text')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Label", field: "label"},
    ]
  }

  getTitle = () => {
    return "Méthodes de facturation"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/billing/all')
      .then( response => {
        let billings = response.data;
        this.setState({data: billings});
      })
  }

  onCellClicked = (data, field) => {
    window.open(`/dashboard/billing/view?id=${data._id}`, '_blank')
  }

  onAddClicked = () => {
    window.open(`/dashboard/billing/add`, '_blank')
  }

}

export default withStyles(styles)(all);
