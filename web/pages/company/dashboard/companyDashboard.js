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
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import styles from '../../../static/css/pages/company/dashboard/companyDashboard';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import Team from "../../../components/Dashboard/Team/Team";
import IndexDashboard from "../../../components/Dashboard/IndexDashboard/IndexDashboard";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LocalFloristOutlinedIcon from '@material-ui/icons/LocalFloristOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import Invoices from "../../../components/Dashboard/Invoices/Invoices";
import ServicesCompany from "../../../components/Dashboard/ServicesCompany/ServicesCompany";
import ScheduleCompany from "../../../components/Dashboard/ScheduleCompany/ScheduleCompany";
import AccountCompany from "../../../components/Dashboard/AccountCompany/AccountCompany";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";


class companyDashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      mobileOpen: false,
      activeStep: 0,
      sideBarLabels:[
        {
          label: 'Tableau de bord',
          icon: <HomeOutlinedIcon />
        },
        {
          label: 'Mon équipe',
          icon: <PersonOutlineOutlinedIcon />
        },
        {
          label: 'Mes services',
          icon: <LocalFloristOutlinedIcon />
        },
        {
          label: 'Factures',
          icon: <DescriptionOutlinedIcon />
        },
        {
          label: 'Planning réservations',
          icon: <CalendarTodayOutlinedIcon />
        },
        {
          label: 'Mon compte',
          icon: <WorkOutlineOutlinedIcon />
        },
      ]

    }
  }

  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen})
  };

  handleStep = (index) =>{
    this.setState({activeStep: index})
  };

 drawer = (classes) => {
   const {sideBarLabels, activeStep} = this.state;
   return (
     <Grid>
       <div className={classes.toolbar}/>
       <List classes={{root: classes.paddingList}}>
         {sideBarLabels.map((item, index) => (
           <div className={classes.hoverButton}>
             <ListItem button key={item.label} onClick={() => this.handleStep(index)} classes={{root: activeStep === index ? classes.activeButton : classes.standartButton}}>
               <ListItemIcon>{item.icon}</ListItemIcon>
               <ListItemText primary={item.label} classes={{root: classes.listItemText}}/>
             </ListItem>
           </div>
         ))}
       </List>
       <Grid container style={{display:'flex', justifyContent:'center'}}>
         <Button variant="outlined" classes={{root: classes.helpButton}}>Aide</Button>
       </Grid>
       <div className={classes.toolbar} />
     </Grid>
   )
 };


  renderSwitch(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <IndexDashboard/>;
      case 1:
        return <Team/>;
      case 2:
        return <ServicesCompany/>;
      case 3:
        return <Invoices/>;
      case 4:
        return <ScheduleCompany/>;
      case 5:
        return <AccountCompany/>;

    }
  }

  content = (classes) => {
    const { window } = this.props;
    const {mobileOpen, activeStep} = this.state;

    const container = window !== undefined ? () => window().document.body : undefined;


    return(
      <Grid className={classes.root}>
        <CssBaseline />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={this.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
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
          <Grid>
            {this.renderSwitch(activeStep)}
          </Grid>
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
