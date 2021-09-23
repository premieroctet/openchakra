
const  {DataPage, styles}=require('../../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles';
const models=require('../../../components/BigList/models')
import axios from 'axios'

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: "_id", field: "_id", width: 0},
      models.textColumn({headerName: "Label particuliers", field: "particular_label"}),
      models.textColumn({headerName: "Label pro", field: "professional_label"}),
      models.pictureColumn({headerName: "Illustration particuliers", field: "particular_picture"}),
      models.pictureColumn({headerName: "Illustration pro", field: "professional_picture"}),
      models.textColumn({headerName: "Tags", field: "tags"}),
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
