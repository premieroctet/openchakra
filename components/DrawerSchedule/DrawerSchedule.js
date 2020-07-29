import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './DrawerScheduleStyle';


class DrawerSchedule extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            mobileOpen: false,
        }

    }

    handleDrawerToggle = () =>{
        this.setState({mobileOpen: !this.state.mobileOpen})
    };

    drawer = (classes) => {
        return (
            <Grid>
                <h1>Bonjour</h1>
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
                            anchor="right"
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
