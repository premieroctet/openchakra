import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/components/Layout/LayoutMobileReservations/LayoutMobileReservations';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Router from "next/router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import MobileNavbar from "./NavBar/MobileNavbar";

class LayoutMobileReservations extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      reservationType: 1,
    }
  }

  handleReservationTypeChanged = (event, newValue) =>{
    this.setState({reservationType: newValue}, () => this.props.handleReservationTypeChanged())
  };

  render() {
    const{classes, currentIndex, children} = this.props;

    return(
      <Grid>
        <Grid className={classes.layoutMobileMessageHeader}>
          <Grid>
            <Grid style={{padding: '5%'}}>
              <IconButton aria-label="ArrowBackIosIcon" onClick={() => Router.back()}>
                <ArrowBackIosIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid style={{marginLeft:'8vh'}}>
            <h2>Mes Reservations</h2>
          </Grid>
          <Grid>
            <Tabs
              value={this.state.reservationType}
              onChange={this.handleReservationTypeChanged}
              aria-label="scrollable force tabs"
              scrollButtons="on"
              classes={{indicator: classes.scrollIndicator}}
            >
              <Tab label={"Mes réservations d'Alfred"} className={classes.scrollMenuTab} />
              <Tab label={"Mes réservations d'utilisateur"} className={classes.scrollMenuTab} />
            </Tabs>
          </Grid>
        </Grid>
        <Grid>
          <Divider/>
        </Grid>
        <Grid style={{padding: '5%'}}>
          {children}
        </Grid>
        <Grid style={{position: 'fixed', bottom: '3%', display: 'flex', justifyContent: 'center', width: '100%', zIndex: 1}}>
          <Grid style={{width: '90%'}}>
            <MobileNavbar currentIndex={currentIndex}/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles (styles) (LayoutMobileReservations);
