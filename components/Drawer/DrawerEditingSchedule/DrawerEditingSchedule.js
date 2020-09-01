import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import SelectSlotTimer from '../../SelectSlotTimer/SelectSlotTimer';
import {Button} from '@material-ui/core';
import React from 'react';
import styles from './DrawerEditingScheduleStyle'
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';


class DrawerEditingSchedule extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            eventsSelected: new Set(),
            selectedDateStart: null,
            selectedDateEnd: null,
            recurrDays: new Set(),
            availabilities:''
        }
    }

    toggleRecurrDay = (item) => {
        this.state.recurrDays.has(item) ? this.removeRecurrDay(item) : this.addRecurrDay(item);
    };

    addRecurrDay = (item) => {
        this.setState(({ recurrDays }) => ({
            recurrDays: new Set(recurrDays).add(item)
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

    getEventsSelected = (eventsSelected) =>{
        this.setState({eventsSelected : new Set(eventsSelected)});
    };

    handleAvailabilities = (event) => {
        this.setState({availabilities: event.target.value});
    };


    render(){

        const {classes} = this.props;
        const {availabilities} = this.state;

        return (
            <Grid>
                <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                        <h1>Modifier vos disponibilités</h1>
                    </Grid>
                    <Hidden smUp implementation="css">
                        <Grid>
                            <IconButton aria-label="CLOSE">
                                <CloseIcon color={'secondary'} onClick={this.props.handleDrawer} />
                            </IconButton>
                        </Grid>
                    </Hidden>
                </Grid>
                <Divider />
                <Grid>
                    <Grid style={{width: '100%'}}>

                        <Grid>
                            <Grid>
                                <h3>Êtes-vous disponible ?</h3>
                            </Grid>
                            <Grid container>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="availabilities" name="availabilities" value={availabilities} onChange={this.handleAvailabilities}>
                                        <FormControlLabel value="availabilities" control={<Radio color="primary"/>} label="Disponible" />
                                        <FormControlLabel value="notavailabilities" control={<Radio  color="primary"/>} label="Non travaillé" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Grid>
                                <h3>Configurez vos disponibilités :</h3>
                            </Grid>
                            <Grid container>
                                <Grid item className={classes.containerSelectSlotTimer}>
                                    <Grid>
                                        <h4>Nuit</h4>
                                    </Grid>
                                    <Grid>
                                        <SelectSlotTimer arrayLength={6} index={0}/>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.containerSelectSlotTimer}>
                                    <Grid>
                                        <h4>Matin</h4>
                                    </Grid>
                                    <Grid >
                                        <SelectSlotTimer arrayLength={12} index={6}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item className={classes.containerSelectSlotTimer}>
                                    <Grid>
                                        <h4>Après-midi</h4>
                                    </Grid>
                                    <Grid>
                                        <SelectSlotTimer arrayLength={18} index={12}/>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.containerSelectSlotTimer}>
                                    <Grid>
                                        <h4>Soirée</h4>
                                    </Grid>
                                    <Grid>
                                        <SelectSlotTimer arrayLength={24} index={18}/>
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
                </Grid>
            </Grid>
        )
    }

}

export default  withStyles(styles, { withTheme: true }) (DrawerEditingSchedule)
