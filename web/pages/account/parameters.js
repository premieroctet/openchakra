import ReactHtmlParser from 'react-html-parser'
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
import {PARAMETER} from '../../utils/i18n'

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
              <h2>{ReactHtmlParser(this.props.t('PARAMETER.title'))}</h2>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={() => Router.push('/account/notifications')}>
                <ListItemText primary={ReactHtmlParser(this.props.t('PARAMETER.my_notification'))} secondary={ReactHtmlParser(this.props.t('PARAMETER.secondary_notification'))}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/paymentResponsive')}>
                <ListItemText primary={ReactHtmlParser(this.props.t('PARAMETER.payment_method'))} secondary={ReactHtmlParser(this.props.t('PARAMETER.secondary_payment'))}/>
                <ListItemIcon style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => Router.push('/account/security')}>
                <ListItemText primary={ReactHtmlParser(this.props.t('PARAMETER.security'))} secondary={ReactHtmlParser(this.props.t('PARAMETER.security_secondary'))} />
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

export default withTranslation(null, {withRef: true})(parameters)
