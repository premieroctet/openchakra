const withParams = require('../../../components/withParams')
import {withTranslation} from 'react-i18next'
import React from 'react'


import EditPicture from '../../../components/Dashboard/EditPicture/EditPicture'
import DashboardLayout from '../../../hoc/Layout/DashboardLayout'

class EditPrestationPicture extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <DashboardLayout>
        <EditPicture type='prestation' id={this.props.id}/>
      </DashboardLayout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withParams(EditPrestationPicture))
