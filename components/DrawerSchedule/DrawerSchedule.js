import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './DrawerScheduleStyle';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import {DAYS} from '../../utils/converters';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
import {Button} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SelectSlotTimer from '../SelectSlotTimer/SelectSlotTimer';
import DrawerEditingSchedule from '../Drawer/DrawerEditingSchedule/DrawerEditingSchedule';

class DrawerSchedule extends React.Component{
    constructor(props) {
        super(props);
        this.drawerEditing = React.createRef();
        this.state={
            mobileOpen: false,
            recurrDays: new Set(),

            eventsSelected: new Set()
        }

    }

    getEventsSelected = (eventsSelected) =>{
        this.drawerEditing.current.getEventsSelected(eventsSelected)
    };


    handleDrawerToggle = () =>{
        this.setState({mobileOpen: !this.state.mobileOpen})
    };


    render(){
        const { classes,  windows }= this.props;
        const { mobileOpen } = this.state;

        const container = windows !== undefined ? () => windows.document.body : undefined;

        return(
            <Grid>
                <CssBaseline />
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={'bottom'}
                            open={mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {<DrawerEditingSchedule ref={this.drawerEditing} handleDrawer={this.handleDrawerToggle}/>}
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
                            {<DrawerEditingSchedule ref={this.drawerEditing} handleDrawer={this.handleDrawerToggle}/>}
                        </Drawer>
                    </Hidden>
                </nav>
                <Grid>
                    <Grid style={{position: 'fixed', bottom: '2%', zIndex: 6, right: 0}}>
                        {
                            this.state.eventsSelected.size > 0 ?
                                <Fab color="primary" aria-label="add"
                                     onClick={this.handleDrawerToggle}
                                     className={classes.menuButton}>
                                    <SettingsIcon style={{color: 'white'}}/>
                                </Fab>
                                :
                                <Fab color="primary" aria-label="add"
                                     onClick={this.handleDrawerToggle}
                                     className={classes.menuButton}>
                                    <AddIcon style={{color: 'white'}}/>
                                </Fab>
                        }
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}

DrawerSchedule.propTypes = {
    window: PropTypes.func,
};

export default  withStyles(styles, { withTheme: true }) (DrawerSchedule)
