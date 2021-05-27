const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const {insensitiveComparator}=require('../../../utils/text')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Privée", field: "private_alfred", cellRenderer: "privateRenderer"},
      {headerName: "Label", field: "label", comparator: insensitiveComparator},
      {headerName: "Catégorie", field: "category_label", comparator: insensitiveComparator},
      {headerName: "Service", field: "service.label", comparator: insensitiveComparator},
      {headerName: "Pros", field: "professional_access", cellRenderer:'booleanCellRenderer'},
      {headerName: "Particuliers", field: "particular_access", cellRenderer:'booleanCellRenderer'},
      {headerName: "Filtre présentation", field: "filter_presentation.label", comparator: insensitiveComparator},
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
          return p
        })
        this.setState({data: prestation});
      })  
  }

  onCellClicked = (data, field) => {
    if (field=='private_alfred') {
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
