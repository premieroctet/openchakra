const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const {insensitiveComparator}=require('../../../utils/text')
const {COMPANY_SIZE, COMPANY_ACTIVITY}=require('../../../utils/consts')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "Nom", field: "name"},
      {headerName: "Taille", field: "size", cellRenderer: 'enumCellRenderer', cellRendererParams: { enum: COMPANY_SIZE}},
      {headerName: "Secteur", field: "activity", cellRenderer: 'enumCellRenderer', cellRendererParams: { enum: COMPANY_ACTIVITY}},
      {headerName: "Comptes", field: "employees", },
    ]
  }

  getTitle = () => {
    return "Entreprises"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/companies/all')
      .then((response) => {
        let companies = response.data;
        this.setState({data: companies});
      })
  }

  onCellClicked = (data, field) => {
    window.open(`/dashboard/companies/edit?id=${data._id}`, '_blank')
  }

  onAddClicked = () => {
    window.open(`/dashboard/companies/edit`, '_blank')
  }

}

export default withStyles(styles)(all);
