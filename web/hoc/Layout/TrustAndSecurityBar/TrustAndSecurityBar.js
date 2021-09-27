import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import {TRUST_SECURITY} from '../../../utils/i18n'

class TrustAndSecurityBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Grid style={{display: 'flex', justifyContent: 'center', backgroundColor: 'white', height: '8vh'}}>
        <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '90%'}}>
          <Grid>
            <VerifiedUserIcon/>
          </Grid>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            <Grid>
              <Typography>{ReactHtmlParser(this.props.t('TRUST_SECURITY.payment'))}</Typography>
            </Grid>
            <Grid>
              <Typography>{ReactHtmlParser(this.props.t('TRUST_SECURITY.security'))}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(TrustAndSecurityBar)
