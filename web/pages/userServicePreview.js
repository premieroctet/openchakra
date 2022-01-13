import ReactHtmlParser from 'react-html-parser'
const axios = require('axios')
const BookingBase = require('./bookingBase')
import {withTranslation} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
import styles from '../static/css/pages/userServicePreviewPage/userServicePreviewStyle'
import '../static/assets/css/custom.css'

// TODO : gérer affichage si utilisateur non connecté
class UserServicePreview extends BookingBase {
  constructor(props) {
    super(props, false)
  }

  loadData = () => {
    return axios.get(`/myAlfred/api/serviceUser/${this.getURLProps().id}`)
  }

  getServiceLabel = () => {
    return this.state.service.label
  }

  getPageDescription = () => {
    const {alfred, service}=this.state
    return !!alfred && !!service && `${service.label} par ${alfred.firstname}` || ''
  }

  getPagePicture = () => {
    const {service}=this.state
    return !!service && `/${service.picture}` || ''
  }

  getStuffTitle = () => {
    const {alfred}=this.state
    return alfred.firstname && ReactHtmlParser(this.props.t('USERSERVICEPREVIEW.topic_title_stuff_summary')) + alfred.firstname || ''
  }

  setDefaultLocation = () => {
    const {serviceUser, user} = this.state
    let location = serviceUser.location.client && (!user || this.isInPerimeter()) ? this.get_prop_address() || 'main' : serviceUser.location.alfred ? 'alfred' : serviceUser.location.visio ? 'visio' : null
    this.setState({location: location})
  }

  computePricedPrestations = () => {
    const {count, prestations}=this.state
    let result = Object.fromEntries(prestations.filter(p => count[p._id]).map(p => [p.prestation.label, count[p._id] * p.price]))
    return result
  }

  convertPrestation = p => {
    return {
      label: p.prestation.label,
      cesu_eligible: p.prestation.cesu_eligible,
      billing: p.billing,
      price: p.price,
      _id: p._id,
    }
  }
}

module.exports=withTranslation('custom', {withRef: true})(withStyles(styles)(UserServicePreview))
