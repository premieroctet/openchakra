
import {withTranslation} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
import axios from 'axios'
const moment = require('moment')
const models=require('../../components/BigList/models')
const {DataPage, styles}=require('../../components/AlfredDashboard/DataPage')
const {SHIPRATE, CREATE} = require('../../utils/consts')
moment.locale('fr')
const {setAxiosAuthentication} = require('../../utils/authentication')

class all extends DataPage {

  getColumnDefs = () => {
    return [
      {headerName: '_id', field: '_id', width: 0},
      models.textColumn({headerName: 'Code postal', field: 'zipcode'}),
      models.textColumn({headerName: 'Département', field: 'province'}),
      models.booleanColumn({headerName: 'Express', field: 'express'}),
      {headerName: 'Poids minimum', field: 'min_weight'},
      {headerName: 'Poids maximum', field: 'max_weight'},
      {headerName: 'Forfait', field: 'fixed_price'},
      {headerName: 'Par kg', field: 'per_kg_price'},
    ]
  }

  getTitle = () => {
    return 'Frais de livraison'
  }

  loadData = () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/shiprates')
      .then(response => {
        this.setState({data: response.data})
      })
    axios.get('/myAlfred/api/users/actions')
      .then(response => {
        this.setState({actions: response.data})
      })
  }

  importURLS = () => {
    const {actions}=this.state
    return actions?.find(a => a.model==SHIPRATE && a.action==CREATE) && [
      {title: 'Import', url: '/myAlfred/api/shiprates/import'},
    ]
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(all))
