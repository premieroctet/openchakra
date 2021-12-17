const {snackBarError} = require('../../utils/notifications')
const {setAxiosAuthentication} = require('../../utils/authentication')
const {COMMISSION_SOURCE} = require('../../utils/consts')
import {withTranslation} from 'react-i18next'

const {DataPage, styles}=require('../../components/AlfredDashboard/DataPage')
import {withStyles} from '@material-ui/core/styles'
const models=require('../../components/BigList/models')
import axios from 'axios'

class Commissions extends DataPage {

  URL='/myAlfred/api/admin/commissions'

  getDataType = () => {
    return 'commissions'
  }

  getColumnDefs = () => {
    const {companies}=this.state
    const companyData=Object.fromEntries((companies||[]).map(c => [c._id.toString(), c.name]))
    return [
      {headerName: '_id', field: '_id', width: 0},
      models.percentColumn({headerName: 'Taux', field: 'rate', editable: true}),
      models.currencyColumn({headerName: 'Forfait', field: 'fixed', editable: true}),
      models.refColumn({headerName: 'Prélevé sur', field: 'source', data: COMMISSION_SOURCE, editable: true}),
      models.refColumn({headerName: 'Versé à', field: 'target', data: companyData, editable: true}),
    ]
  }

  getTitle = () => {
    return 'Commissions'
  }

  loadData = () => {
    axios.get('/myAlfred/api/admin/commissions')
      .then(response => {
        let commissions = response.data.map(c => ({...c, target: c.target.toString()}))
        console.log(commissions.map(c => typeof c.target))
        this.setState({data: commissions})
      })
    axios.get('/myAlfred/api/admin/companies')
      .then(response => {
        let companies = response.data
        this.setState({companies: companies})
      })
  }

  onCellValueChanged = (colDef, data, oldValue, newValue, event) => {
    console.log(`Changed ${JSON.stringify({colDef, data, oldValue, newValue}, null, 2)}`)
    if (colDef.field=='fixed' && !(parseFloat(newValue)>=0)) {
      snackBarError('Le forfait doit être >=0')
      event.node.data[event.colDef.Field] = event.oldValue
      event.node.setDataValue(event.column, event.oldValue)
      return
    }
    const newData=!data._id
    const promise=newData ? axios.post(this.URL, data): axios.put(`${this.URL}/${data._id}`, data)
    console.log(`Sending data:${JSON.stringify(data)}`)
    setAxiosAuthentication()
    promise
      .then(() => {
        this.componentDidMount()
      }) // snackBarSuccess('Donnée modifiée'))
      .catch(err => {
        console.error(err)
        //snackBarError(`Erreur:${err.response.data}`)
      })
  }

  onAddClicked = () => {
    this.setState({data: [...this.state.data, {rate: 0, fixed: 0}]})
  }


}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Commissions))
