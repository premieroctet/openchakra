const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const models=require('../../../components/BigList/models')
const {COMPANY_SIZE, COMPANY_ACTIVITY}=require('../../../utils/consts')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      models.textColumn({headerName: "Nom", field: "name"}),
      {headerName: "Taille", field: "size", cellRenderer: 'enumRenderer', cellRendererParams: { enum: COMPANY_SIZE}},
      models.textColumn({headerName: "Secteur", field: "activity", cellRenderer: 'enumRenderer', cellRendererParams: { enum: COMPANY_ACTIVITY}}),
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
