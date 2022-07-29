import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import {Grid} from '@material-ui/core'
import Topic from'../hoc/Topic/Topic'
import ListAlfredConditions from './ListAlfredConditions/ListAlfredConditions'

const Equipments = ({classes, t, allEquipments, selectedEquipments, alfred}) => {

  return (
    <Topic
      titleTopic={ReactHtmlParser(t('USERSERVICEPREVIEW.topic_title_stuff'))}
      needBackground={true}
      underline={true}
      titleSummary={alfred.firstname ? ReactHtmlParser(t('USERSERVICEPREVIEW.topic_title_stuff_summary')) + alfred.firstname : ''}
    >
      <ListAlfredConditions
        columnsXl={6}
        columnsLG={6}
        columnsMD={6}
        columnsSM={6}
        columnsXS={6}
        wrapperComponentProps={allEquipments}
        equipmentsSelected={selectedEquipments}
      />
    </Topic>
  )
}

export default withTranslation(null, {withRef: true})(Equipments)
