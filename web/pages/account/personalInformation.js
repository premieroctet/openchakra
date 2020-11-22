import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Router from "next/router";

class personalInformation extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <React.Fragment>
        <LayoutMobile>
          <Grid>
            <Grid>
              <h2 style={{whiteSpace: 'nowrap'}}>Informations personnelles</h2>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={() => Router.push('/account/editProfile')}>
                <ListItemText primary="Mes informations" secondary={'Nom, date de naissance, e-mail'}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/myAddresses')}>
                <ListItemText primary="Mes adresses" secondary={'Gérez vos adresses'}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/trustAndVerification')}>
                <ListItemText primary="Vérification" secondary={'Faites vérifier votre pièce d’identité et votre numéro de téléphone'} />
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </Grid>
        </LayoutMobile>
      </React.Fragment>
    );
  }
}

export default personalInformation;
