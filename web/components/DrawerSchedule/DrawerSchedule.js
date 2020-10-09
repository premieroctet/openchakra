import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//import styles from './DrawerScheduleStyle';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import DrawerEditingSchedule from '../Drawer/DrawerEditingSchedule/DrawerEditingSchedule';
import DrawerSettingSchedule from '../Drawer/DrawerSettingSchedule/DrawerSettingSchedule';
import cookie from 'react-cookies';
import axios from 'axios';

class DrawerSchedule extends React.Component{
  constructor(props) {
    super(props);
    this.drawer = React.createRef();
    this.state={
      mobileOpen: false,
      eventsSelected: new Set(),
      availabilities: [],
      dirty: false,
    };
    this.onDateSelectionChanged = this.onDateSelectionChanged.bind(this);
    this.updateDrawerState = this.updateDrawerState.bind(this);
    this.onAvailabilityChanged = this.onAvailabilityChanged.bind(this)
  }

  componentDidMount = () => {
    const auth = cookie.load('token');
    axios.defaults.headers.common['Authorization'] = auth;
    axios.get('/myAlfred/api/availability/currentAlfred')
      .then ( res => {
        this.setState({availabilities: res.data})
      })
      .catch (err => console.error(err))
  };

  isDirty = () => {
    return this.drawer.current && this.drawer.current.isDirty()
  }

  onDateSelectionChanged = (eventsSelected) => {
    this.setState({eventsSelected: new Set(eventsSelected)}, () => this.updateDrawerState());
  };

  updateDrawerState = () => {
    this.drawer.current.onDateSelectionChanged(this.state.eventsSelected);
  };

  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen});
  };

  onAvailabilityChanged = () => {
    this.props.onAvailabilityChanged ? this.props.onAvailabilityChanged() : () => {}
  };

  onDateSelectionCleared = () => {
    this.setState({eventsSelected : new Set()}, () => this.props.onDateSelectionCleared())
  };

  render() {
    const {classes, windows, style} = this.props;
    const {mobileOpen} = this.state;

    const container = windows !== undefined ? () => windows.document.body : undefined;

        return(
            <Grid>
                <CssBaseline />
                <nav className={style.drawerScheduleNav} aria-label="mailbox folders">
                    {/* Mobile version */}
                    <Hidden mdUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={'bottom'}
                            open={mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: style.drawerScheduleDrawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {
                                mobileOpen ?
                                    this.state.eventsSelected.size > 0 ?
                                        <DrawerEditingSchedule ref={this.drawer}
                                                               handleDrawer={this.handleDrawerToggle}
                                                               onAvailabilityChanged={this.onAvailabilityChanged}
                                                               onDateSelectionCleared={this.onDateSelectionCleared}
                                        />
                                        :
                                        <DrawerSettingSchedule ref={this.drawer}
                                                               handleDrawer={this.handleDrawerToggle}
                                                               onAvailabilityChanged={this.onAvailabilityChanged}
                                        />
                                : null
                            }
                        </Drawer>
                    </Hidden>
                    {/* Web version */}
                    <Hidden smDown implementation="css">
                        <Drawer
                            classes={{
                                paper: style.drawerScheduleDrawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {
                                !mobileOpen ?
                                    this.state.eventsSelected.size > 0 ?
                                        <DrawerEditingSchedule ref={this.drawer}
                                                               handleDrawer={this.handleDrawerToggle}
                                                               onAvailabilityChanged={this.onAvailabilityChanged}
                                                               onDateSelectionCleared={this.onDateSelectionCleared}

                                        />
                                        :
                                        <DrawerSettingSchedule ref={this.drawer}
                                                               handleDrawer={this.handleDrawerToggle}
                                                               onAvailabilityChanged={this.onAvailabilityChanged}
                                        />
                                : null
                            }
                        </Drawer>
                    </Hidden>
                </nav>
                <Grid>
                    <Grid style={{position: 'fixed', bottom: '10%', zIndex: 6, right: 0}}>
                        <Fab color="primary" aria-label="add"
                             onClick={this.handleDrawerToggle}
                             className={style.drawerScheduleButton}>
                            <SettingsIcon style={{color: 'white'}}/>
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>

    );
  }
}

DrawerSchedule.propTypes = {
  window: PropTypes.func,
};

export default withStyles({withTheme: true})(DrawerSchedule);
