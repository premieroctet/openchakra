import RegisterThirdPage from
  '../../components/RegisterSteps/RegisterThirdPage/RegisterThirdPage'
import {withTranslation} from 'react-i18next'

import React from 'react'

class RegisteredTest extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const{classes} = this.props

    return(
      <RegisterThirdPage class={classes}/>
    )
  }

}

export default withTranslation(null, {withRef: true})(RegisteredTest)
