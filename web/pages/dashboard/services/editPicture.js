const withParams = require('../../../components/withParams')
import {withTranslation} from 'react-i18next'
import React from 'react'


import EditPicture from '../../../components/Dashboard/EditPicture/EditPicture'
import DashboardLayout from '../../../hoc/Layout/DashboardLayout'

class EditServicePicture extends React.Component {

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
        <EditPicture type={this.state.type} id={this.props.params.id}/>
      </DashboardLayout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withParams(EditServicePicture))
