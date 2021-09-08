import {withTranslation} from 'react-i18next'
import React from 'react'
import CompanyDashboard from '../../../components/CompanyDashboard/CompanyDashboard'
import Grid from '@material-ui/core/Grid'
const {MICROSERVICE_MODE, CARETAKER_MODE}=require('../../../utils/consts')

class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      mode: CARETAKER_MODE,
      index: 0,
    }
  }

  changemode = index => {
    if(index === 0) {
      this.setState({mode: MICROSERVICE_MODE, index: 1})
    }
    else{
      this.setState({mode: CARETAKER_MODE, index: 0})
    }
  }

  render() {
    const{mode, index}= this.state

    return(
      <Grid>
        <CompanyDashboard mode={mode} index={index} changeMode={this.changemode}/>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(DashboardPage)
