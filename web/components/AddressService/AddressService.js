import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class AddressService extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {bookingObj, currentUser, user} = this.props;

    if (!bookingObj) {
      return null
    }
    console.log(`BookingObj:${JSON.stringify(bookingObj, null, 2)}`)
    if (currentUser && bookingObj) {
      var checkAdd = bookingObj.address && currentUser.billing_address.address === bookingObj.address.address && currentUser.billing_address.zip_code === bookingObj.address.zip_code && currentUser.billing_address.city === bookingObj.address.city;
    }

    return(
      <Grid>
        <Grid style={{display: 'flex', flexDirection: 'column'}}>
          <Grid>
            <Typography>{bookingObj.address ? checkAdd ? currentUser.firstname + " " +  currentUser.name : user.firstname + " " + user.name : 'En visio' }</Typography>
          </Grid>
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
            null
          }
          {/*TODO UPDATE ADDRESS + CHECK ADDRESS FACTURE
          <Grid style={{marginTop: '2vh'}}>
            <Typography style={{color:'rgba(39,37,37,35%)'}}>L'adresse de facturation est identique</Typography>
          </Grid>
          <Grid style={{marginTop: '2vh'}}>
            <Button>Modifier</Button>
          </Grid>
          */}
        </Grid>
      </Grid>
    );
  }
}

export default AddressService;
