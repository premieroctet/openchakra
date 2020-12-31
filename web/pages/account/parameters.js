import React from 'react';
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/Inbox';
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Router from "next/router";

class parameters extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Grid>
        <LayoutMobile>
          <Grid>
            <Grid>
              <h2>Mes Paramètres</h2>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={() => Router.push('/account/notifications')}>
                <ListItemText primary="Mes notifications" secondary={'Messages, rappels'}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/paymentResponsive')}>
                <ListItemText primary="Mes modes de paiement" secondary={'Cartes de crédits, RIB'}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/security')}>
                <ListItemText primary="Sécurité" secondary={'Vos mot de passe, votre compte'} />
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
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

export default parameters;
