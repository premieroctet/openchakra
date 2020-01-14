import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './NavBarSwitchStatusStyle';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

class NavBarSwitchStatus extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      setValue: 0,
      value: 0
    }
  }

  render(){
    const {classes} = this.props;
    const {theme} = this.props;

    const handleChange = (event, newValue) => {
      this.setState({setValue: newValue});
    };

    const handleChangeIndex = index => {
      this.setState({setValue: index});
    };

    return (
      <Grid className={classes.root}>
        <AppBar position="static" color="default" className={classes.navBar}>
          <Tabs
            value={this.state.value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Boutique" />
            <Tab label="Alfeed"/>
          </Tabs>
        </AppBar>
      </Grid>
    )
  }
}

NavBarSwitchStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(NavBarSwitchStatus);
