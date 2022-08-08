import React from 'react'
import {withTranslation} from 'react-i18next'
import {bookingUrl} from '../../../config/config'
import {getDataModel} from '../../../config/config'
import Card from '../Card'
import AllInclusiveCardPreview from './AllInclusiveCardPreview'


const CardPreview = ({item}) => {

  if (!item) {
    return null
  }

  const name = item?.user?.firstname
  const image = item?.service?.picture
  const link = bookingUrl(item._id)
  const title = item?.service?.label
  const city = item.service_address?.city || ''
  const user = item?.user

  // TODO rustine all-E
  if (getDataModel()=='all-inclusive') {
    return (
      <AllInclusiveCardPreview item={item}/>
    )
  }

  return(
    <Card
      user={user}
      name={name}
      link={link}
      picture={image}
      title={title}
      city={city}
    />
  )
}


export default withTranslation(null, {withRef: true})(CardPreview)
