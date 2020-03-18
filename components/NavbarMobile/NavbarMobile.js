import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './NavbarMobileStyle'
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ForumIcon from '@material-ui/icons/Forum';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ScheduleIcon from '@material-ui/icons/Schedule';

class NavbarMobile extends React.Component {
  constructor(props) {
    super(props);
  }

    render(){
    const {classes} = this.props;

      return (
        <Grid>
          <BottomNavigation showLabels className={classes.bottombar}>
            <BottomNavigationAction className={classes.bottomNavigationAction} label="Shop" icon={<ShoppingCartIcon />} />
            <BottomNavigationAction label="Réservation " icon={<AssignmentIcon />} />
            <BottomNavigationAction label="Messages" icon={<ForumIcon />} />
            <BottomNavigationAction label="Calendrier" icon={<ScheduleIcon />} />
            <BottomNavigationAction label="Performances" icon={<AssessmentIcon />} />
          </BottomNavigation>
        </Grid>
      )
    }
}

NavbarMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavbarMobile);
