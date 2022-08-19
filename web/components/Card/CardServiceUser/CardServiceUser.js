import React, {useState, useEffect} from 'react'
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
import ConfirmDialog from '../../Dialog/ConfirmDialog'


const CTA = ({t}) => (
  <CustomButton
    variant={'contained'}
    classes={{root: `customshoprofil`}}
  >
    {ReactHtmlParser(t('CARD_SERVICE.button_show_profil'))}
  </CustomButton>
)

const CTAServiceUser = withTranslation(null, {withRef: true})(CTA)


const CardServiceUser = ({
  t,
  item,
  gps,
  profileMode,
  loading,
  booking_id,
  onDelete,
  ...props},
) => {

  const [animated, setAnimated] = useState(false)
  const [cpData, setCpData] = useState({})
  const [showDialog, setShowDialog] = useState(false)

  const alfred = cpData?.alfred

  const resa_link=bookingUrl(cpData._id, booking_id ? {booking_id}: {})
  const city = cpData?.city
  let distance = gps ? computeDistanceKm(gps, cpData.gps) : null
  distance = distance ? distance.toFixed(0) : ''
    
  const notes = cpData.reviews ? computeAverageNotes(cpData.reviews.map(r => r.note_alfred)) : {}
  const reviews = cpData.reviews ? cpData.reviews.length : +0

  let picture = profileMode ? cpData.picture : alfred?.picture || cpData.picture

  if (picture && !animated && picture.toLowerCase().endsWith('.gif')) {
    const filename = picture.split('/').slice(-1).pop()
    picture=`myAlfred/api/users/still_profile/${filename}`
  }

  if (picture && !picture.startsWith('http') && !picture.startsWith('/')) {
    picture=`/${picture}`
  }

  const editable = alfred ? isEditableUser(alfred) : false
  const description = cpData.description || (t('CARD_SERVICE.no_description').trim() ? ReactHtmlParser(t('CARD_SERVICE.no_description')) : null)

  const showDeleteDialog = () => {
    setShowDialog(true)
  }

  const editAction = id => {
    Router.push(`/creaShop/creaShop?serviceuser_id=${id}`)
  }
  
  const deleteAction = id => {
    axios.delete(`${API_PATH}/serviceUser/${id}`)
      .then(() => {
        onDelete && onDelete(id)
      })
      .catch(err => console.error(err))
  }

  const onMouseEnter = () => {
    setAnimated(true)
  }

  const onMouseLeave = () => {
    setAnimated(false)
  }
  
  useEffect(() => {

    if (item) {
      axios.get(`${API_PATH}/serviceUser/cardPreview/${item}`)
        .then(res => {
          setCpData(res.data)
        })
        .catch(err => console.error(err))
    }
  }, [item])

    
  if (item===null) {
    return (
      <Helpcard />
    )
  }

  return(
    loading ?
      <CardSkeleton /> :
      <>
        <Card
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          link={resa_link}
          picture={picture}
          pictureratio={'4/3'}
          tagname={!(profileMode && editable) && {firstname: alfred?.firstname, data: cpData}}
          title={cpData.label}
          description={!profileMode && description}
          city={!profileMode && (cpData.location?.client || cpData.location?.alfred) && city}
          distance={!profileMode && (cpData.location?.client || cpData.location?.alfred) && distance}
          isCpf={cpData?.cpf}
          isPro={cpData.is_professional}
          rating={!profileMode && (!hideEmptyEvaluations() || notes.global && notes.global >0) && notes.global.toFixed(2)}
          reviews={!profileMode && (!hideEmptyEvaluations() || cpData.reviews && cpData.reviews.length >0) && reviews}
          editAction={profileMode && editable && editAction.bind(this, cpData._id)}
          deleteAction={profileMode && editable && showDeleteDialog.bind(this)}
          Cta={!profileMode && CTAServiceUser}
          {...props}
        />
        <ConfirmDialog
          removeAction={() => deleteAction(cpData._id)}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </>
  )
  
}

export default withTranslation(null, {withRef: true})(CardServiceUser)
