const {formatAddress} = require('../utils/text')
const moment = require('moment')
const {setAxiosAuthentication} = require('../utils/authentication')
import ReactHtmlParser from 'react-html-parser'
const axios = require('axios')
const PreviewBase = require('./previewBase')
import {withTranslation} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
import styles from '../static/css/pages/userServicePreviewPage/userServicePreviewStyle'
import '../static/assets/css/custom.css'
import React from 'react'

// TODO : gérer affichage si utilisateur non connecté
class UserServicePreview extends PreviewBase {
  constructor(props) {
    super(props, false)
    this.hasWarningSelf=this.hasWarningSelf.bind(this)
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

  readOnly = () => {
    return !!this.getURLProps().booking_id
  }

  hasWarningSelf() {
    if (this.getURLProps().booking_id) {
      return false
    }
    return super.hasWarningSelf()
  }

  postLoadData = () => {
    const {booking_id}=this.getURLProps()
    if (!booking_id) {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      setAxiosAuthentication()
      axios.get(`/myAlfred/api/booking/${booking_id}`)
        .then(res => {
          const booking=res.data
          const prestas=booking.prestations.map(p => (<li>{p.value} {p.name} à {p.price}€</li>))
          const title=(
            <>
              <div>Commande : {booking.service.label} pour {booking.user.full_name}</div>
              <div>{formatAddress(booking.address)}</div>
              <ul>{prestas}</ul>
              <div>Total:{booking.amount}€</div>
            </>
          )
          this.setState({bookingHeader: title})
          const {serviceUser}=this.state
          this.onChange({target: {name: 'prestation_date', value: moment(booking.prestation_date)}})
          this.setState({allAddresses: {'main': {...booking.address, label: this.props.t('USERSERVICEPREVIEW.at_home')}}})
          this.onLocationChanged('main', true)
          let count={}
          booking.prestations.forEach(p => {
            const presta = serviceUser.prestations.find(pr => pr.prestation.label == p.name)
            count[presta._id]=p.value
          })
          this.setState({
            prestation_date: moment(booking.prestation_date),
            allAddresses: {'main': booking.address},
            location: 'main',
            count: count,
          },
          () => this.computeTotal())
          resolve(null)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

module.exports=withTranslation('custom', {withRef: true})(withStyles(styles)(UserServicePreview))
