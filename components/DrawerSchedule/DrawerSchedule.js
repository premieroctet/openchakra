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
import {availabilities2events, eventUI2availability, availability2eventUI, DAYS} from '../../utils/converters';


class DrawerSchedule extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            mobileOpen: false,
            recurrDays: new Set()
        }

    }

    handleDrawerToggle = () =>{
        this.setState({mobileOpen: !this.state.mobileOpen})
    };

    toggleRecurrDay = (item) => {
        this.state.recurrDays.has(item) ? this.removeRecurrDay(item) : this.addRecurrDay(item);
    };

    addRecurrDay = (item) => {
        this.setState(({ recurrDays }) => ({
            recurrDays: new Set(recurrDays).add(item)
        }));
    }

    removeRecurrDay = (item) => {
        this.setState(({ recurrDays }) => {
            const newChecked = new Set(recurrDays);
            newChecked.delete(item);

            return {
                recurrDays: newChecked
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
                        <AccordionDetails>
                            <Grid>
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
                        </AccordionDetails>
                    </Accordion>
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
                                paperAnchorLeft: classes.paperAnchorLeft
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
