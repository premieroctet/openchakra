const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
const models=require('../../../components/BigList/models')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      models.textColumn({headerName: "Privée", field: "alfred", cellRenderer: "privateRenderer", }),
      models.textColumn({headerName: "Label", field: "label"}),
      {headerName: "Ordre", field: "order"},
      models.textColumn({headerName: "Catégorie", field: "category_label"}),
      models.textColumn({headerName: "Service", field: "service.label"}),
      models.booleanColumn({headerName: "Pros", field: "professional_access"}),
      models.booleanColumn({headerName: "Particuliers", field: "particular_access"}),
      models.textColumn({headerName: "Filtre présentation", field: "filter_presentation.label"}),
    ]
  }

  getTitle = () => {
    return "Prestations"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/prestation/all')
      .then((response) => {
        let prestation = response.data;
        prestation=prestation.map( p => {
          const cat = p.service ? p.service.category: null
          p.category_label = cat ?
              [cat.particular_label, cat.professional_label].join('/')
              :
              '';
          p.alfred = p.private_alfred ? p.private_alfred.full_name : ''
          return p
        })
        this.setState({data: prestation});
      })
  }

  onCellClicked = (data, field) => {
    if (field=='alfred') {
      if (data.private_alfred) {
        window.open(`/profile/services?user=${data.private_alfred._id}`)
      }
      return
    }
    window.open(`/dashboard/prestations/view?id=${data._id}`, '_blank')
  }

  onAddClicked = () => {
    window.open(`/dashboard/prestations/add`, '_blank')
  }


}

export default withStyles(styles)(all);
