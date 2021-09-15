import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {ADDRESS_SERVICE} from '../../utils/i18n'

class AddressService extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {bookingObj} = this.props

    if (!bookingObj) {
      return null
    }

    return(
      <Grid>
        <Grid style={{display: 'flex', flexDirection: 'column'}}>
          { bookingObj.address ?
            <>
              <Grid>
                <Typography>{bookingObj.address.address}</Typography>
              </Grid>
              <Grid>
                <Typography>{bookingObj.address.zip_code} {bookingObj.address.city} - {bookingObj.address.country}</Typography>
              </Grid>
            </>
            :
            ADDRESS_SERVICE.remote
          }
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(AddressService)
