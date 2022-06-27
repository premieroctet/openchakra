import {Grid} from '@material-ui/core'
import {withTranslation} from 'react-i18next'

import React from 'react'
import MapComponent from '../components/map'
import Topic from '../hoc/Topic/Topic'

const Place = ({title, subTitle, location, perimeter}) => {

  return (
    <Topic
      underline={true}
      titleTopic={title} titleSummary={subTitle}
    >
      <MapComponent
        position={location}
        perimeter={perimeter}
      />
    </Topic>
  )
}

export default withTranslation('custom', {withRef: true})(Place)
