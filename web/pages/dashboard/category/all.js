const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
const {insensitiveComparator}=require('../../../utils/text')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Label particuliers", field: "particular_label"},
      {headerName: "Label pro", field: "professional_label"},
      {headerName: "Illustration particuliers", field: "particular_picture", cellRenderer:'pictureCellRenderer'},
      {headerName: "Illustration pro", field: "professional_picture", cellRenderer:'pictureCellRenderer'},
      {headerName: "Tags", field: "tags"},
    ]
  }

  getTitle = () => {
    return "Catégories"
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/category/all')
      .then((response) => {
        let categories = response.data;
        categories=categories.map( c => {
          c.professional_picture='/'+c.professional_picture;
          c.particular_picture='/'+c.particular_picture;
          c.tags=c.tags.map(t=>t.title).join(',')
          return c
        })
        this.setState({data: categories})
      })
  }

  onCellClicked = (data, field) => {
    window.open(`/dashboard/category/view?id=${data._id}`, '_blank')
  }

  onAddClicked = () => {
    window.open(`/dashboard/category/view`, '_blank')
  }

}

export default withStyles(styles)(all);
