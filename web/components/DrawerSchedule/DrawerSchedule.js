const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../../static/css/components/DrawerSchedule/DrawerSchedule';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import DrawerEditingSchedule from '../Drawer/DrawerEditingSchedule/DrawerEditingSchedule';
import DrawerSettingSchedule from '../Drawer/DrawerSettingSchedule/DrawerSettingSchedule';
import Drawer from '@material-ui/core/Drawer';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
    setAxiosAuthentication()
    axios.get('/myAlfred/api/availability/currentAlfred')
      .then ( res => {
        this.setState({availabilities: res.data})
      })
      .catch (err => console.error(err))
  };

  isDirty = () => {
    return this.drawer.current && this.drawer.current.isDirty()
  };

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
    const {classes, windows} = this.props;
    const {mobileOpen} = this.state;

    const container = windows !== undefined ? () => windows.document.body : undefined;

      return(
        <Grid style={{width: '100%', height: '100%'}}>
          <Drawer
            container={container}
            variant="temporary"
            anchor={'bottom'}
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerScheduleDrawerPaper,
              paperAnchorBottom : classes.drawerPaperAnchorBottom
            }}
            ModalProps={{
                keepMounted: true,
            }}
          >
            {
              this.state.eventsSelected.size > 0 ?
                <DrawerEditingSchedule
                  ref={this.drawer}
                  handleDrawer={this.handleDrawerToggle}
                  onAvailabilityChanged={this.onAvailabilityChanged}
                  onDateSelectionCleared={this.onDateSelectionCleared}
                />
                :
                <DrawerSettingSchedule
                  ref={this.drawer}
                  handleDrawer={this.handleDrawerToggle}
                  onAvailabilityChanged={this.onAvailabilityChanged}
                />
            }
          </Drawer>
          <Grid style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <Grid className={classes.buttonShowContainer}>
              <Button
                startIcon={this.state.eventsSelected.size > 0 ? <SettingsIcon /> : <AddCircleOutlineIcon />}
                onClick={this.handleDrawerToggle}
                color={'primary'}
              >
                { this.state.eventsSelected.size > 0 ? 'Modifier vos disponibilités' : 'Paramétrez vos disponibilités'}
              </Button>
            </Grid>
            <Grid className={classes.containerFab}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={this.handleDrawerToggle}
                className={classes.drawerScheduleButton}>
                <SettingsIcon style={{color: 'white'}}/>
              </Fab>
            </Grid>
          </Grid>
        </Grid>

    );
  }
}

export default withStyles(styles) (DrawerSchedule);
