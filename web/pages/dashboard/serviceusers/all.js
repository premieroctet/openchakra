const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const {insensitiveComparator}=require('../../../utils/text')


class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Email", field: "user.email", comparator: insensitiveComparator},
      {headerName: "Pro", field: "user.shop.is_professional", cellRenderer: 'booleanCellRenderer'},
      {headerName: "Service", field: "service.label", comparator: insensitiveComparator},
      {headerName: "Catégorie", field: "service.category.label", comparator: insensitiveComparator},
      {headerName: "Localisation (Client/Alfred/Visio)", field: "location", cellRenderer: 'locationRenderer'},
      {headerName: "Code postal", field: "service_address.zip_code"},
      {headerName: "Ville", field: "service_address.city", comparator: insensitiveComparator},
    ]
  }

  getTitle = () => {
    return "Services d'Alfred"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/serviceusers/all')
      .then( response => {
        let services = response.data;
        services.forEach( s => {
          try {
            s.user.shop.is_professional = Boolean(s.user.shop[0].is_professional)
          }
          catch (error) {
            console.error(`Err on ${s._id}:${error}`)
          }
        });
        this.setState({data: services});
      })
  }

  onCellClicked = (data, field) => {
    if (field=='service.label') {
      window.open(`/userServicePreview?id=${data._id}`, '_blank')
    }
    else {
      window.open(`/profile/about?user=${data.user._id}`, '_blank')
    }
  }

}

export default withStyles(styles)(all);
