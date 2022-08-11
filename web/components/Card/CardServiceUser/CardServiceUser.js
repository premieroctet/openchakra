import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import axios from 'axios'
import Router from 'next/router'
import CardSkeleton from '../CardSkeleton'
import {bookingUrl} from '../../../config/config'
import {computeAverageNotes, computeDistanceKm} from '../../../utils/functions'
import CustomButton from '../../CustomButton/CustomButton'
import {isEditableUser, hideEmptyEvaluations} from '../../../utils/context'
import Helpcard from '../Helpcard'
import Card from '../Card'
import {API_PATH} from '../../../utils/consts'


const CTA = ({t}) => (
  <CustomButton
    variant={'contained'}
    classes={{root: `customshoprofil`}}
  >
    {ReactHtmlParser(t('CARD_SERVICE.button_show_profil'))}
  </CustomButton>
)


const CTAServiceUser = withTranslation(null, {withRef: true})(CTA)


class CardServiceUser extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      cpData: {},
      score: null,
      service: null,
      shop: null,
      reviews: [],
      alfred: {},
      animated: false,
    }
  }

  componentDidMount() {
    if (this.props.item) {
      axios.get(`/myAlfred/api/serviceUser/cardPreview/${this.props.item}`)
        .then(res => {
          this.setState({cpData: res.data, alfred: res.data.alfred})
        })
        .catch(err => console.error(err))
    }
  }

  
  editAction = id => {
    Router.push(`/creaShop/creaShop?serviceuser_id=${id}`)
  }
  
  deleteAction(id) {
    axios.delete(`${API_PATH}/serviceUser/${id}`)
      .then(() => {
        if (this.props.onDelete) {
          this.props.onDelete(id)
        }
      })
      .catch(err => console.error(err))
  }

  onMouseEnter = () => {
    this.setState({animated: true})
  }

  onMouseLeave = () => {
    this.setState({animated: false})
  }

  render() {
    const {gps, profileMode, address, loading, booking_id} = this.props
    const {cpData, alfred, animated} = this.state

    const resa_link=bookingUrl(cpData._id, booking_id ? {booking_id}: {})
    const city = cpData?.city
    let distance = gps ? computeDistanceKm(gps, cpData.gps) : null
    distance = distance ? distance.toFixed(0) : ''
    
    const notes = cpData.reviews ? computeAverageNotes(cpData.reviews.map(r => r.note_alfred)) : {}
    const reviews = cpData.reviews ? cpData.reviews.length : 0


    let picture = profileMode ? cpData.picture : alfred.picture || cpData.picture

    if (picture && !animated && picture.toLowerCase().endsWith('.gif')) {
      const filename = picture.split('/').slice(-1).pop()
      picture=`myAlfred/api/users/still_profile/${filename}`
    }

    if (picture && !picture.startsWith('http') && !picture.startsWith('/')) {
      picture=`/${picture}`
    }

    const editable = isEditableUser(alfred)
    const description = cpData.description || (this.props.t('CARD_SERVICE.no_description').trim() ? ReactHtmlParser(this.props.t('CARD_SERVICE.no_description')) : null)
    
    
    if (this.props.item===null) {
      return (
        <Helpcard />
      )
    }

    return(
      loading ?
        <CardSkeleton /> :
        <Card
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          ratio={'5/8'}
          link={resa_link}
          picture={picture}
          title={cpData.label}
          description={!profileMode && description}
          city={!profileMode && (cpData.location?.client || cpData.location?.alfred) && city}
          distance={!profileMode && (cpData.location?.client || cpData.location?.alfred) && distance}
          isCpf={cpData?.cpf}
          isPro={cpData.is_professional}
          rating={!profileMode && (!hideEmptyEvaluations() || notes.global && notes.global >0) && notes.global.toFixed(2)}
          reviews={!profileMode && (!hideEmptyEvaluations() || cpData.reviews && cpData.reviews.length >0) && reviews}
          editAction={profileMode && editable && this.editAction.bind(this, cpData._id)}
          removeAction={profileMode && editable && this.deleteAction.bind(this, cpData._id)}
          Cta={!profileMode && CTAServiceUser}
        />
    )
  }
}

export default withTranslation(null, {withRef: true})(CardServiceUser)
