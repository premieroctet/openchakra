import LoggedAsBanner from '../../components/LoggedAsBanner'
import {withTranslation} from 'react-i18next'
import React from 'react'
import HeaderColor from './HeaderColor/HeaderColor'
import TrustAndSecurityBar from './TrustAndSecurityBar/TrustAndSecurityBar'
import Grid from '@material-ui/core/Grid'

class LayoutPayment extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const{children} = this.props
    return (
      <Grid>
        <LoggedAsBanner />
        <HeaderColor/>
        <TrustAndSecurityBar/>
        {children}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(LayoutPayment)
