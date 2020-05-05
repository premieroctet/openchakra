import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import styles from './ResponsiveDrawerStyle'
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

class ResponsiveDrawer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      itemsDrawer: [
        {
          text: 'Notifications',
          url: '/account/notifications',
          isActivePics: 'NotificationsActive'
        },
       {
          text: 'Mode de paiement',
          url: '/account/paymentMethod',
          isActivePics: 'Mode de paiement active'
        },
        {
          text: 'Préférence de versement',
          url: '/account/paymentPreference',
          isActivePics: 'Préférence de versement active'
        },
       {
          text: 'Historique des transactions',
          url: '/account/transactions',
          isActivePics: 'Historique des transactions active'
        },
       {
          text: 'Sécurité',
          url: '/account/security',
          isActivePics: 'Sécurité active'
        },
       {
          text: 'Paramètres',
          url: '/account/parameters',
          isActivePics: 'Paramètres active'
        },
      ]
    }
  }
  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen});
  };

  theme = () => useTheme();

  drawer(classes){
    return (
      <Grid>
        <Grid className={classes.toolbar} />
        <List>
          {this.state.itemsDrawer.map( (res, index) =>  (
            <Link href={res.url}>
              <ListItem button key={res.text}>
                <ListItemIcon>
                  <img src={`../static/${index === this.props.isActiveIndex ? res.isActivePics : res.text}.svg`} alt={res.text} title={res.text} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                </ListItemIcon>
              <ListItemText primary={res.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Grid>
    );
  }

  render() {

    const { classes, windows }= this.props;
    const { mobileOpen } = this.state;
    const container = windows !== undefined ? () => windows.document.body : undefined;

    return (
      <Grid className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={this.theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {this.drawer(classes)}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {this.drawer(classes)}
            </Drawer>
          </Hidden>
        </nav>
      </Grid>
    );
  }
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withStyles(styles)(ResponsiveDrawer);
