import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
import {registerLocale} from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import withParams from '../components/withParams'
import styles from '../static/css/pages/userServicePreviewPage/userServicePreviewStyle'
const axios = require('axios')
const moment = require('moment')
const {LOCATION_CLIENT}=require('../utils/consts')
const PreviewBase = require('./previewBase')

moment.locale('fr')
registerLocale('fr', fr)

// TODO : gérer affichage si utilisateur non connecté
// TODO : les �quipements ne sont pas sauvegardés
class ServicePreview extends PreviewBase {

  constructor(props) {
    super(props, true)
  }

  loadData = () => {
    return new Promise((resolve, reject) => {
      axios.get(`/myAlfred/api/service/${this.props.id}`)
        .then(result => {
          let service=result.data
          service.prestations=service.prestations.filter(p => !!p.company_price)
          resolve({data: service})
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getServiceLabel = () => {
    return this.state.serviceUser.label
  }

  getPageDescription = () => {
    const {serviceUser}=this.state
    return serviceUser && serviceUser.label || ''
  }

  getPagePicture = () => {
    const {serviceUser}=this.state
    return !!serviceUser && `/${serviceUser.picture}`
  }

  getStuffTitle = () => {
    const {serviceUser}=this.state
    return serviceUser && ReactHtmlParser(this.props.t('SERVICEPREVIEW.topic_title_stuff_summary')) + serviceUser.label || ''
  }

  setDefaultLocation = () => {
    const {serviceUser} = this.state
    let location = serviceUser.location.client ? this.get_prop_address() || LOCATION_CLIENT :
      serviceUser.location.alfred ? 'alfred' : serviceUser.location.visio ? 'visio' : serviceUser.location.elearning ? 'elearning': null
    this.setState({location: location})
  }

  computePricedPrestations = () => {
    const {count, prestations}=this.state
    let result = Object.fromEntries(prestations.filter(p => count[p._id]).map(p => [p.label, count[p._id] * p.company_price]))
    return result
  }

  convertPrestation = p => {
    return {...p, price: p.company_price}
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(withParams(ServicePreview)))
