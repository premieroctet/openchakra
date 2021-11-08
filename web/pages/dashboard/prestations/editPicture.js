import {withTranslation} from 'react-i18next'
import React from 'react'

import BasePage from '../../basePage'
import EditPicture from '../../../components/Dashboard/EditPicture/EditPicture'
import DashboardLayout from '../../../hoc/Layout/DashboardLayout'

class EditPrestationPicture extends BasePage {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <DashboardLayout>
        <EditPicture type='prestation' id={this.getURLProps().id}/>
      </DashboardLayout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(EditPrestationPicture)
