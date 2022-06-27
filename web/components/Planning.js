import {withTranslation} from 'react-i18next'
import ReactHtmlParser from 'react-html-parser'

import React from 'react'
import Topic from '../hoc/Topic/Topic'
import Schedule from './Schedule/Schedule'

const Planning = ({t, availabilities, scheduleDateChanged, alfred, classes}) => {

  return (
    <Topic
      id={'availabilities'}
      underline={true}
      titleTopic={ReactHtmlParser(t('USERSERVICEPREVIEW.topic_title_date'))}
      titleSummary={alfred.firstname ? ReactHtmlParser(t('USERSERVICEPREVIEW.topic_title_date_summary')) + alfred.firstname : ''}
    >
      <Schedule
        availabilities={availabilities}
        bookings={[]}
        services={[]}
        selectable={true}
        height={400}
        nbSchedule={1}
        handleSelection={scheduleDateChanged}
        singleSelection={true}
        mode={'week'}
        underline={true}
        style={classes}
      />
    </Topic>
  )
}

export default withTranslation('custom', {withRef: true})(Planning)
