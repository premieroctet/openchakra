import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
import Chip from '@material-ui/core/Chip';
import {DAYS} from '../../../utils/converters';
import SelectSlotTimer from '../../SelectSlotTimer/SelectSlotTimer';
import {Button} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './DrawerSettingScheduleStyle';

class DrawerSettingSchedule extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            eventsSelected: new Set(),
            availabilities: [{
                starDate:null,
                endDate: null,
                indexPeriod: 0,
                recurrDays: new Set(),
            }],
            nbAvailabilities: 0,
            showFirstPeriod: false
        }
    }

    toggleRecurrDay = (item, availIdx) => {
        this.state.availabilities[availIdx].recurrDays.has(item) ? this.removeRecurrDay(item, availIdx) : this.addRecurrDay(item, availIdx);
    };


    addRecurrDay = (day, availIdx) => {
        let newArray = [...this.state.availabilities];
        newArray[availIdx] = {...newArray[availIdx], recurrDays : new Set(newArray[availIdx].recurrDays).add(day)};
        this.setState({
            availabilities: newArray,
        });
    };

    removeRecurrDay = (day, availIdx) => {
        let newArray = [...this.state.availabilities];
        let newChecked = new Set(newArray[availIdx].recurrDays);

        this.setState({recurrDays: newChecked.delete(day)});
    };

    getEventsSelected = (eventsSelected) =>{
        this.setState({eventsSelected : new Set(eventsSelected)});
    };

    handlePeriode = () =>{
        let myNewAvailabilities = {
            starDate:null,
            endDate: null,
            indexPeriod: this.state.nbAvailabilities + 1,
            recurrDays: new Set(),
        };
      this.setState({availabilities: [...this.state.availabilities, myNewAvailabilities], nbAvailabilities: this.state.nbAvailabilities + 1})
    };

    showFirstPeriod = () => {
      this.setState({showFirstPeriod: true})
    };

    handleDateStart = index => (date) =>{
        const elementsIndex = this.state.availabilities.findIndex(element => element.indexPeriod == index );
        let newArray = [...this.state.availabilities];
        newArray[elementsIndex] = {...newArray[elementsIndex], starDate: date};
        this.setState({
            availabilities: newArray,
        });
    };

    handleDateEnd = index => (date) => {
        const elementsIndex = this.state.availabilities.findIndex(element => element.indexPeriod == index );
        let newArray = [...this.state.availabilities];
        newArray[elementsIndex] = {...newArray[elementsIndex], endDate: date};
        this.setState({
            availabilities: newArray,
        });
    };


    render(){

        const {classes} = this.props;
        const {availabilities, showFirstPeriod} = this.state;

        return(
            <Grid>
                <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                        <h1>Paramétrer vos disponibilités</h1>
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
                    {
                        showFirstPeriod ?
                            availabilities.map((availResult, availIdx) =>{
                                return(
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Grid>
                                                <Grid>
                                                    <Typography>Période du 10/07/20 au 31/12/20</Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography>Vous êtes disponible tous les lundis, mardis, samedis de 5h à 12h et de 14h à 18h</Typography>
                                                </Grid>
                                            </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
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
                                                                        value={availResult.starDate}
                                                                        onChange={this.handleDateStart(availIdx)}
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
                                                                        value={availResult.endDate}
                                                                        onChange={this.handleDateEnd(availIdx)}
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
                                                            return (
                                                                <Chip
                                                                    clickable
                                                                    label={(DAYS[d]).charAt(0)}
                                                                    style={{backgroundColor: availabilities[availIdx].recurrDays.has(DAYS[d]) ? '#4fbdd7' :  '#c4c44'}}
                                                                    className={classes.textFieldChips}
                                                                    onClick={() => this.toggleRecurrDay(DAYS[d], availIdx)}
                                                                />
                                                                )
                                                        })}
                                                    </Grid>
                                                </Grid>
                                                <Grid>
                                                    <Grid>
                                                        <h3>Horaires travaillés :</h3>
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
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })
                          : null
                    }
                </Grid>
                <Divider/>
                <Grid style={{marginTop: 30}}>
                    <Grid style={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <Button variant={'contained'} color={'primary'} style={{color:'white'}} onClick={!this.state.showFirstPeriod ? this.showFirstPeriod : this.handlePeriode}>Ajouter une période</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default  withStyles(styles, { withTheme: true }) (DrawerSettingSchedule)
