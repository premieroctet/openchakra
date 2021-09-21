import {withTranslation} from 'react-i18next'
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
import {PERSONAL_INFORMATION} from '../../utils/i18n'

class personalInformation extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <React.Fragment>
        <LayoutMobile currentIndex={4}>
          <Grid>
            <Grid>
              <h2 style={{whiteSpace: 'nowrap'}}>{PERSONAL_INFORMATION.title}</h2>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={() => Router.push('/account/editProfile')}>
                <ListItemText primary={PERSONAL_INFORMATION.my_information} secondary={PERSONAL_INFORMATION.secondary_information}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/myAddresses')}>
                <ListItemText primary={PERSONAL_INFORMATION.my_adresses} secondary={PERSONAL_INFORMATION.secondary_adresses}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/trustAndVerification')}>
                <ListItemText primary={PERSONAL_INFORMATION.verification} secondary={PERSONAL_INFORMATION.secondary_verification} />
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

export default withTranslation('custom', {withRef: true})(personalInformation)
