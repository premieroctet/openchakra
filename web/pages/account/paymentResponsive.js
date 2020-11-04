import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Router from "next/router";


class PaymentResponsive extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid>
        <LayoutMobile>
          <Grid>
            <Grid>
              <h2>Mes modes de paiement</h2>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={() => Router.push('/account/paymentMethod')}>
                <ListItemText primary="Mes cartes de crédit" secondary={'Ajoutez vos cartes de crédit'}/>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/paymentPreference')}>
                <ListItemText primary="Mon RIB" secondary={'Choisissez un mode de versement'}/>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </Grid>
        </LayoutMobile>
      </Grid>
    );
  }

}


export default PaymentResponsive;
