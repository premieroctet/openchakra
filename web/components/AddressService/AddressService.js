import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ReactHtmlParser from 'react-html-parser'

function AddressService(props) {
  const {bookingObj, t} = props

  return bookingObj && (
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
          ReactHtmlParser(t('ADDRESS_SERVICE.remote'))
        }
      </Grid>
    </Grid>
  )
}

export default withTranslation('custom')(AddressService)
