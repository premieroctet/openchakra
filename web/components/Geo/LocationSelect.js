import AlgoliaPlaces from 'algolia-places-react'
import React from 'react'

const LocationSelect = props => {

  return (
    <AlgoliaPlaces
      options={{
        appId: 'plKATRG826CP',
        apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
        language: 'fr',
        countries: ['fr'],
        type: props.type || 'address',
      }}
      {...props} />
  )
}

export default LocationSelect
