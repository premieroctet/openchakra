const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const {insensitiveComparator}=require('../../../utils/text')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Label", field: "label"},
      {headerName: "Illustration", field: "picture", cellRenderer:'pictureCellRenderer'},
    ]
  }

  getTitle = () => {
    return "Equipements"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/equipment/all')
      .then((response) => {
        let equipments = response.data;
        equipments.forEach ( e => {
          e.picture=`/static/equipments/${e.logo}`
        })
        this.setState({data: equipments});
      })
  }

  onCellClicked = (data, field) => {
    window.open(`/dashboard/equipments/view?id=${data._id}`, '_blank')
  }

}

export default withStyles(styles)(all);
