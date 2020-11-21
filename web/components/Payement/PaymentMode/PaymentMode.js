import React from 'react';
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import PaymentPics from "../../PaymentPics/PaymentPics";
import HttpsIcon from '@material-ui/icons/Https';
import PaymentCard from "../PaymentCard/PaymentCard";
import Hidden from "@material-ui/core/Hidden";

class PaymentMode extends React.Component{
  constructor(props) {
    super(props);
  }

  handleCardSelected = (e) => {
    this.props.handleCardSelected(e.target.value)
  };

  render() {
    const {cards, currentUser, id_card} = this.props;
    let name = currentUser.firstname + " " + currentUser.name;

    return(
      <Grid>
        <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Grid style={{display : 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Grid>
              <HttpsIcon/>
            </Grid>
            <Grid style={{marginLeft: '2vh'}}>
              <Typography>Paiement sécurisé</Typography>
            </Grid>
          </Grid>
          <Hidden only={['xs']}>
            <Grid>
              <PaymentPics/>
            </Grid>
          </Hidden>
        </Grid>
        <Grid style={{marginTop: '3vh', marginBottom: '3vh'}}>
          <FormControl component="fieldset" style={{width: '100%'}}>
            <RadioGroup value={id_card ? id_card : ''} onChange={this.handleCardSelected} style={{backgroundColor: 'rgba(249,249,249, 1)', borderRadius: 14,  padding: '5%'}}>
              <PaymentCard editable={false} cards={cards} userName={name}/>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default PaymentMode
