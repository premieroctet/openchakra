import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import BookingDetail from "../../BookingDetail/BookingDetail";
import Accordion from "@material-ui/core/Accordion";
import Button from "@material-ui/core/Button";
import styles from '../../../static/css/components/DrawerBookingRecap/DrawerBookingRecap';
import withStyles from "@material-ui/core/styles/withStyles";

class DrawerBookingRecap extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {

    const{pricedPrestations, countPrestations, grandTotal, fees, travel_tax, classes, pick_tax, cesu_total} = this.props;

    return(
      <Grid>
        <Grid>
          <Grid>
            <Typography>Récapitulatif</Typography>
          </Grid>
          <Grid>
            <Grid>
              <Typography>Garde de chien avec Béatrice</Typography>
            </Grid>
            <Grid>
              <Typography>Le 07 octobre 2020 à 10h30</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Grid>
            <Accordion classes={{root: classes.userServicePreviewAccordionNoShadow}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Afficher les détails</Typography>
              </AccordionSummary>
              <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                <Typography>MY CONTENT</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid>
            <Accordion classes={{root: classes.userServicePreviewAccordionNoShadow}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Utiliser un code promo</Typography>
              </AccordionSummary>
              <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                <Typography>MY CONTENT</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <Grid>
          <BookingDetail
            prestations={pricedPrestations}
            count={countPrestations}
            total={grandTotal}
            client_fee={fees}
            travel_tax={travel_tax}
            pick_tax={pick_tax}
            cesu_total={cesu_total}
          />
        </Grid>
        <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Grid style={{width: '100%'}}>
            <Button
              classes={{root: classes.userServicePButtonResa}}
              variant="contained"
              color="primary"
              aria-label="add"
              onClick={() => {
                this.handlePay();
              }}
            >
              <Typography>Payer</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <Grid>
            <Typography>Choix du mode de paiement l'étape suivante</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles (styles) (DrawerBookingRecap);
