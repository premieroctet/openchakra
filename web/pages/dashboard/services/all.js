const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const models=require('../../../components/BigList/models')

class all extends DataPage {
  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      models.textColumn({headerName: "Label", field: "label"}),
      models.textColumn({headerName: "Catégorie", field: "category_label"}),
      models.booleanColumn({headerName: "Pros", field: "professional_access"}),
      models.booleanColumn({headerName: "Particuliers", field: "particular_access"}),
      models.pictureColumn({headerName: "Illustration", field: "picture"}),
      models.textColumn({headerName: "Warning", field: "warning"}),
    ]
    // TODO : ajouter colonne warning si service pro sans prestations pro ou service particulier sans presta particuliers
  }

  getTitle = () => {
    return "Services"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/service/all')
      .then((response) => {
        let service = response.data;

        this.setState({
          data: service.map( s => {
            s.warning=[]
            s.picture='/'+s.picture;
            s.category_label = [s.category.particular_label, s.category.professional_label].join('/');
            if (s.professional_access && !s.prestations.find(p => p.professional_access)) {
              s.warning.push('aucune prestation pro')
            }
            if (s.particular_access && !s.prestations.find(p => p.particular_access)) {
              s.warning.push('aucune prestation particuliers')
            }
            s.warning=s.warning.join(',')
            return s
          })
        });
      })
  }

  onCellClicked = (data,field) => {
    window.open(`/dashboard/services/view?id=${data._id}`, '_blank')
  }

  onAddClicked = () => {
    window.open(`/dashboard/services/add`, '_blank')
  }

}

export default withStyles(styles)(all);
