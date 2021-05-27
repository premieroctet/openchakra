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
    return "Métiers"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/job/all')
      .then( response => {
        let job = response.data;
        this.setState({data: job});
      })
  }

  onCellClicked = (data, field) => {
    window.open(`/dashboard/job/view?id=${data._id}`, '_blank')
  }

}

export default withStyles(styles)(all);
