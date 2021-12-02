import RegisterInvitation from '../../components/RegisterInvitation/RegisterInvitation'
import React from 'react'
import {withTranslation} from 'react-i18next'

function RegisterInvitationTest() {

  return(
    <RegisterInvitation />
  )
}

export default withTranslation('custom', {withRef: true})(RegisterInvitationTest)
