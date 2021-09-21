import {withTranslation} from 'react-i18next'
import React from 'react';
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Router from "next/router";
import {PARAMATER} from '../../utils/i18n'

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
              <h2>{PARAMATER.title}</h2>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={() => Router.push('/account/notifications')}>
                <ListItemText primary={PARAMATER.my_notification} secondary={PARAMATER.secondary_notification}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/paymentResponsive')}>
                <ListItemText primary={PARAMATER.payment_method} secondary={PARAMATER.secondary_payment}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/security')}>
                <ListItemText primary={PARAMATER.security} secondary={PARAMATER.security_secondary} />
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

export default withTranslation('custom', {withRef: true})(parameters)
