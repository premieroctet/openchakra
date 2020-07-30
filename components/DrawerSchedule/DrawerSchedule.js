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
import {availabilities2events, eventUI2availability, availability2eventUI, DAYS, TIMESLOTS} from '../../utils/converters';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
import DoneIcon from '@material-ui/icons/Done';
import {Button} from '@material-ui/core';


class DrawerSchedule extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            mobileOpen: false,
            recurrDays: new Set(),
            recurrSlotTime: new Set(),
            selectedDateStart: null,
            selectedDateEnd: null,

        }

    }

    handleDrawerToggle = () =>{
        this.setState({mobileOpen: !this.state.mobileOpen})
    };

    toggleRecurrDay = (item) => {
        this.state.recurrDays.has(item) ? this.removeRecurrDay(item) : this.addRecurrDay(item);
    };

    activeTimeSlot = (item) =>{
        this.state.recurrSlotTime.has(item) ? this.removeSlotTime(item) : this.addSlotTime(item);
    };

    addRecurrDay = (item) => {
        this.setState(({ recurrDays }) => ({
            recurrDays: new Set(recurrDays).add(item)
        }));
    };

    addSlotTime = (item) =>{
        this.setState(({ recurrSlotTime }) => ({
            recurrSlotTime: new Set(recurrSlotTime).add(item)
        }));
    };

    removeRecurrDay = (item) => {
        this.setState(({ recurrDays }) => {
            const newChecked = new Set(recurrDays);
            newChecked.delete(item);

            return {
                recurrDays: newChecked
            };
        });
    };

    removeSlotTime = (item) => {
        this.setState(({ recurrSlotTime }) => {
            const newChecked = new Set(recurrSlotTime);
            newChecked.delete(item);

            return {
                recurrSlotTime: newChecked
            };
        });
    };

    drawer = (classes) => {
        return (
            <Grid>
                <Grid>
                    <h1>Paramètrez vos disponibilités</h1>
                </Grid>
                <Divider />
                <Grid>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Grid>
                                <Grid>
                                    <Typography className={classes.heading}>Période du 10/07/20 au 31/12/20</Typography>
                                </Grid>
                                <Grid>
                                    <Typography className={classes.heading}>Vous êtes disponible tous les lundis, mardis, samedis de 5h à 12h et de 14h à 18h</Typography>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails style={{marginBottom: 200}}>
                            <Grid style={{width: '100%'}}>
                                <Grid>
                                    <Grid>
                                        <h3>Période :</h3>
                                    </Grid>
                                    <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                                            <Grid style={{display : 'flex', alignItems: 'center'}}>
                                                <Grid>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        id="date-picker-inline"
                                                        label="Date de début"
                                                        className={classes.formSchedule}
                                                        value={this.state.selectedDateStart}
                                                        onChange={this.handleDateStartChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                        autoOk={true}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid style={{display : 'flex', alignItems: 'center'}}>
                                                <Grid>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        id="date-picker-inline"
                                                        label="Date de fin"
                                                        className={classes.formSchedule}
                                                        value={this.state.selectedDateEnd}
                                                        onChange={this.handleDateStartChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                        autoOk={true}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Grid>
                                        <h3>Jours travaillés :</h3>
                                    </Grid>
                                    <Grid container className={classes.panelFormDays}>
                                        {[0,1,2,3,4,5,6].map( d => {
                                            return (<Chip
                                                clickable
                                                label={DAYS[d]}
                                                color={this.state.recurrDays.has(d) ? 'secondary' :  ''}
                                                className={classes.textFieldChips}
                                                onClick={() => {
                                                    this.toggleRecurrDay(d);
                                                }
                                                } />)
                                        })}
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Grid>
                                        <h3>Horaires travaillés :</h3>
                                    </Grid>
                                    <Grid style={{display: 'flex'}}>
                                        <Grid>
                                            <Grid>
                                                <h4>Nuit</h4>
                                            </Grid>
                                            <Grid>
                                                {[0,1,2,3,4,5].map( t => {
                                                    return (
                                                        <Chip
                                                            clickable
                                                            label={TIMESLOTS[t]}
                                                            color={this.state.recurrSlotTime.has(t) ? 'primary' :  ''}
                                                            className={classes.textFieldChips}
                                                            onClick={() => {
                                                                this.activeTimeSlot(t);
                                                            }}
                                                        />
                                                    )
                                                })}
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Grid>
                                                <h4>Matin</h4>
                                            </Grid>
                                            <Grid>
                                                {[6,7,8,9,10,11].map( t => {
                                                    return (
                                                        <Chip
                                                            clickable
                                                            label={TIMESLOTS[t]}
                                                            color={this.state.recurrSlotTime.has(t) ? 'primary' :  ''}
                                                            className={classes.textFieldChips}
                                                            onClick={() => {
                                                                this.activeTimeSlot(t);
                                                            }}
                                                        />
                                                    )
                                                })}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid style={{display: 'flex'}}>
                                        <Grid>
                                            <Grid>
                                                <h4>Après-midi</h4>
                                            </Grid>
                                            <Grid>
                                                {[12,13,14,15,16,17].map( t => {
                                                    return (
                                                        <Chip
                                                            clickable
                                                            label={TIMESLOTS[t]}
                                                            color={this.state.recurrSlotTime.has(t) ? 'primary' :  ''}
                                                            className={classes.textFieldChips}
                                                            onClick={() => {
                                                                this.activeTimeSlot(t);
                                                            }}
                                                        />
                                                    )
                                                })}
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Grid>
                                                <h4>Soirée</h4>
                                            </Grid>
                                            <Grid>
                                                {[18,19,20,21,22,23].map( t => {
                                                    return (
                                                        <Chip
                                                            clickable
                                                            label={TIMESLOTS[t]}
                                                            color={this.state.recurrSlotTime.has(t) ? 'primary' :  ''}
                                                            className={classes.textFieldChips}
                                                            onClick={() => {
                                                                this.activeTimeSlot(t);
                                                            }}
                                                        />
                                                    )
                                                })}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid style={{marginTop: 30}}>
                                    <Grid style={{display:'flex', flexDirection:'row-reverse'}}>
                                        <Button variant={'contained'} color={'primary'} style={{color: 'white'}}>Enregistrer</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Divider/>
                <Grid style={{marginTop: 30}}>
                    <Grid style={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <Button variant={'contained'} color={'primary'} style={{color:'white'}}>Ajouter une période</Button>
                    </Grid>
                </Grid>

            </Grid>
        )
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
            </Grid>

        );
    }
}

DrawerSchedule.propTypes = {
    window: PropTypes.func,
};

export default  withStyles(styles, { withTheme: true }) (DrawerSchedule)
