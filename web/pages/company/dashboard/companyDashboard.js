import React from 'react';
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Layout from "../../../hoc/Layout/Layout";
import LayoutMobileSearch from "../../../hoc/Layout/LayoutMobileSearch";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import styles from '../../../static/css/pages/company/dashboard/companyDashboard';
import withStyles from "@material-ui/core/styles/withStyles";
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PropTypes from 'prop-types';


class companyDashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      mobileOpen: false

  }
  }

  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen})
  };

   drawer = (classes) => {
     return (
       <Grid>
         <List>
           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
             <ListItem button key={text}>
               <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
               <ListItemText primary={text} />
             </ListItem>
           ))}
         </List>
       </Grid>
     )

   };

  content = (classes) => {
    const { window } = this.props;
    const {mobileOpen} = this.state;

    const container = window !== undefined ? () => window().document.body : undefined;


    return(
      <Grid className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar} classes={{positionFixed : classes.AppBarPosition}}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={'left'}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {this.drawer()}
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
              {this.drawer()}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography>Bonjour</Typography>
        </main>
      </Grid>
    )
  };

  render() {
    const{classes} = this.props;

    return(
      <Grid>
        <React.Fragment>
          <Hidden only={['xs']}>
            <Layout>
              {this.content(classes)}
            </Layout>
          </Hidden>
          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <LayoutMobileSearch >
              {this.content(classes)}
            </LayoutMobileSearch>
          </Hidden>
        </React.Fragment>
      </Grid>
    );
  }
}

companyDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withStyles (styles)(companyDashboard)
