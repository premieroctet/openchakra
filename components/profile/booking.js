import React, {Fragment} from 'react';
import Link from 'next/link';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {Divider, List, ListItem, ListItemText} from "@material-ui/core";

moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },

});

class booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: [],


        };

    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    }




    render() {
        const {classes} = this.props;

        return (
            <Fragment>



                <AppBar position="static" color="primary" style={{height: 48}}>
                    <Toolbar style={{minHeight: 48}}>
                        <Typography variant="h6" color="inherit">
                            Mes réservations
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem>
                        <Link href={'#'}><a style={{textDecoration: "none"}}>
                            <ListItemText primary="Réservation 1" secondary="Acceptée"/>
                        </a></Link>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Link href={'#'}><a style={{textDecoration: "none"}}>
                            <ListItemText primary="Réservation 2" secondary="En attente"/>
                        </a></Link>
                    </ListItem>
                </List>



            </Fragment>
        );
    };
}

export default withStyles(styles)(booking);
