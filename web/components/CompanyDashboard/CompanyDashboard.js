import React from 'react';
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import styles from '../../static/css/components/CompanyDashboard/CompanyDashboard';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import NavBar from "../../hoc/Layout/NavBar/NavBar";
import MobileNavbar from "../../hoc/Layout/NavBar/MobileNavbar";
import axios from "axios";
import Router from "next/router";

const {setAxiosAuthentication} = require('../../utils/authentication');
const {STEPS}=require('../../utils/dashboardSteps');
const {is_b2b_admin} = require('../../utils/context');

class CompanyDashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      mobileOpen: false,
      activeStep: 0,
      isMicroService: true,
    }
  }

  componentDidMount(){
    setAxiosAuthentication();
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({
          user: user,
          email: user.email,
          firstName: user.firstname,
          name: user.name,
          position: user.position,
        });
        if(!is_b2b_admin(user)){
          Router.push({pathname: '/'});
        }
      })
      .catch(err => {
          console.error(err);
          if (err.response.status === 401 || err.response.status === 403) {
            Router.push({pathname: '/'});
          }
        },
      );
  };

  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen})
  };

  handleStep = (index) =>{
    this.setState({activeStep: index})
  };

  drawer = (classes) => {
    const{mode} = this.props;
    const {activeStep} = this.state;

    return (
      <Grid style={{height: '100%'}}>
        <Grid className={classes.appBarContainer}>
          <List classes={{root: classes.paddingList}}>
            {
              STEPS[mode].map((item, index) => (
                <Grid key={index} className={classes.hoverButton}>
                  <ListItem button key={item.menu} onClick={() => this.handleStep(index)} classes={{root: activeStep === index ? classes.activeButton : classes.standartButton}}>
                    <ListItemIcon style={{color: 'white'}}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.menu} classes={{root: classes.listItemText}}/>
                  </ListItem>
                </Grid>
              ))
            }
          </List>
          <Grid container style={{display:'flex', justifyContent:'center'}}>
            <Grid>
              <Button variant="outlined" classes={{root: classes.helpButton}}>Aide</Button>
            </Grid>
            <Grid style={{height: '100%', display : 'flex', flexDirection: 'column-reverse'}}>
              <img
                alt={'logo_myAlfred'}
                title={'logo_myAlfred'}
                src={'../../../static/assets/icon/logo.svg'}
                height={64}
                style={{filter: 'invert(1)'}}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  };


  renderSwitch(stepIndex) {
    const {mode} = this.props;

    return STEPS[mode][stepIndex].component(this)
  }

  render() {
    const{classes, window, mode} = this.props;
    const {mobileOpen, activeStep} = this.state;

    const container = window !== undefined ? () => window().document.body : undefined;

    return(
      <Grid className={classes.root}>
        <CssBaseline />
        <Grid>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={this.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
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
        <main className={classes.content}>
          <Hidden only={['xs']}>
            <NavBar/>
          </Hidden>
          <Grid>
            {this.renderSwitch(activeStep)}
          </Grid>
          <Hidden only={['lg', 'xl', 'md', 'sm']}>
            <Grid style={{position: 'fixed', bottom: '3%', display: 'flex', justifyContent: 'center', width: '100%', zIndex: 4}}>
              <Grid style={{width: '100%'}}>
                <MobileNavbar currentIndex={0}/>
              </Grid>
            </Grid>
          </Hidden>
        </main>
      </Grid>
    );
  }
}

CompanyDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withStyles (styles)(CompanyDashboard)
