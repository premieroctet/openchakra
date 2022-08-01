import RegisterInvitation from '../../components/RegisterInvitation/RegisterInvitation'
import React from 'react'
import {withTranslation} from 'react-i18next'

function RegisterInvitationTest() {

  return(
    <RegisterInvitation />
  )
}

export default withTranslation(null, {withRef: true})(RegisterInvitationTest)
