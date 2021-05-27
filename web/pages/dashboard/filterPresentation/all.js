const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const {insensitiveComparator}=require('../../../utils/text')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Label", field: "label", comparator: insensitiveComparator},
    ]
  }

  getTitle = () => {
    return "Filtres de présentation"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/filterPresentation/all')
      .then( response => {
        let filterPresentation = response.data;
        this.setState({data: filterPresentation});
      })
  }

  onCellClicked = (data,field) => {
    window.open(`/dashboard/filterPresentation/view?id=${data._id}`, '_blank')
  }

}

export default withStyles(styles)(all);
