import Grid from '@material-ui/core/Grid';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './NavbarMobileStyle';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ForumIcon from '@material-ui/icons/Forum';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Router from 'next/router';

class NavbarMobile extends React.Component {
  constructor(props) {
    super(props);
  }

  switchUrl(stepIndex) {
    switch (stepIndex) {
      case 'Shop':
        return Router.push({
          pathname: '/shop',
          query: {id_alfred: this.props.userId},
        });
      case 'Reservation':
        return Router.push({
          pathname: '/reservations/allReservations',
        });
      case 'Messages':
        return Router.push({
          pathname: '/reservations/messages',
        });
      case 'Calendrier':
        return Router.push({
          pathname: '/myShop/myAvailabilities',
          query: {id_alfred: this.props.userId},
        });
      case 'Performances':
        return Router.push({
          pathname: '/performances/revenus',
        });
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid style={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 5,
      }}>
        <BottomNavigation showLabels className={classes.bottombar} onChange={(event, value) => {
          this.switchUrl(value);
        }}>
          <BottomNavigationAction className={classes.root} classes={{root : classes.MuiBottomNavigationRoot}}
                                  label="Boutique" value={'Shop'}
                                  icon={<ShoppingCartIcon color={'primary'}/>}/>
          <BottomNavigationAction className={classes.root} classes={{root : classes.MuiBottomNavigationRoot}}
                                  label="Réservation " value={'Reservation'}
                                  icon={<AssignmentIcon color={'primary'}/>}/>
          <BottomNavigationAction className={classes.root} classes={{root : classes.MuiBottomNavigationRoot}}
                                  label="Messages" value={'Messages'}
                                  icon={<ForumIcon color={'primary'}/>}/>
          <BottomNavigationAction className={classes.root} classes={{root : classes.MuiBottomNavigationRoot}}
                                  label="Calendrier" value={'Calendrier'}
                                  icon={<ScheduleIcon color={'primary'}/>}/>
          <BottomNavigationAction className={classes.root} classes={{root : classes.MuiBottomNavigationRoot}}
                                  label="Performances" value={'Performances'}
                                  icon={<AssessmentIcon color={'primary'}/>}/>
        </BottomNavigation>
      </Grid>
    );
  }
}

NavbarMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavbarMobile);
