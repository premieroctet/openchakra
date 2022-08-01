import {withTranslation} from 'react-i18next'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import styles from './BadgesStyle'

import Topic from '../../hoc/Topic/Topic'

class Badges extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <Topic titleTopic={'Badges'}/>
    )
  }
}

export default withTranslation(null, {withRef: true})(withStyles(styles, {withTheme: true})(Badges))
