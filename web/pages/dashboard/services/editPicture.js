import {withTranslation} from 'react-i18next'
import React from 'react'

import BasePage from '../../basePage'
import EditPicture from '../../../components/Dashboard/EditPicture/EditPicture'
import DashboardLayout from '../../../hoc/Layout/DashboardLayout'

class EditServicePicture extends BasePage {

  constructor(props) {
    super(props)

    this.state = {
      id: null,
      type: 'service',
    }
  }

  render() {
    return (
      <DashboardLayout>
        <EditPicture type={this.state.type} id={this.getURLProps().id}/>
      </DashboardLayout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(EditServicePicture)
