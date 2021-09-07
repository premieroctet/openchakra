import {withTranslation} from 'react-i18next'
import React from 'react'

import BasePage from '../../basePage'
import EditPicture from '../../../components/Dashboard/EditPicture/EditPicture'
import Layout from '../../../hoc/Layout/Layout'

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
      <Layout>
        <EditPicture type={this.state.type} id={this.getURLProps().id}/>
      </Layout>
    )
  }
}

export default withTranslation()(EditServicePicture)
