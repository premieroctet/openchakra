import {withTranslation} from 'react-i18next'
import React from 'react'

import BasePage from '../../basePage'
import EditPicture from '../../../components/Dashboard/EditPicture/EditPicture'
import Layout from '../../../hoc/Layout/Layout'

class EditPrestationPicture extends BasePage {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <Layout>
        <EditPicture type='prestation' id={this.getURLProps().id}/>
      </Layout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(EditPrestationPicture)
