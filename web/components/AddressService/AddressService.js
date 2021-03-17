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
            "En visio"
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
