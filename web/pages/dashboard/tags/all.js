import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import axios from 'axios'

import {DataPage} from '../../../components/AlfredDashboard/DataPage'

const moment = require('moment-timezone')

moment.locale('fr')

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
  card: {
    padding: '1.5rem 3rem',
    marginTop: '100px',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
    lineHeight: 4.15,
  },
})

class All extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      {headerName: 'Label', field: 'label'},
      {headerName: 'Titre', field: 'title'},
      {headerName: 'Description', field: 'description'},
    ]
  }

  getTitle = () => {
    return 'Tags'
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/tags/all')
      .then(response => {
        let tags = response.data
        this.setState({data: tags})
      })
  }

  onCellClicked = data => {
    if (data) {
      window.open(`/dashboard/tags/view?id=${data._id}`, '_blank')
    }
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(All))
