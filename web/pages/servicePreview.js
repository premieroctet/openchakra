import ReactHtmlParser from 'react-html-parser'
const axios = require('axios')
const BookingBase = require('./bookingBase')
import {withTranslation} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
import styles from '../static/css/pages/userServicePreviewPage/userServicePreviewStyle'
import {registerLocale} from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import '../static/assets/css/custom.css'
const moment = require('moment')

moment.locale('fr')
registerLocale('fr', fr)

// TODO : gérer affichage si utilisateur non connecté
class ServicePreview extends BookingBase {

  constructor(props) {
    super(props, true)
  }

  loadData = () => {
    return axios.get(`/myAlfred/api/service/${this.getURLProps().id}`)
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
    return serviceUser && ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_title_stuff_summary')) + serviceUser.label || ''
  }

  setDefaultLocation = () => {
    const {serviceUser} = this.state
    let location = serviceUser.location.client ? this.get_prop_address() || 'main' : serviceUser.location.alfred ? 'alfred' : serviceUser.location.visio ? 'visio' : null
    this.setState({location: location})
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(ServicePreview))
