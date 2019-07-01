
import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputRange from 'react-input-range';

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Link from 'next/link';



const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({
    signupContainer: {

        height: '170vh',

        flexDirection: 'column',
        marginTop: 150,

    },
    table: {
        border: '1px solid black',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    }


});



class addPrestations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceUser: {},
            prestations: [],
            all_prestations: [],
            new_prestations: [],






        };

    }

    static getInitialProps ({ query: { id } }) {
        return { service_id: id }

    }

    componentDidMount() {
        const id = this.props.service_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios
            .get(url+`myAlfred/api/serviceUser/${id}`)
            .then(res => {
                let serviceUser = res.data;
                this.setState({serviceUser: serviceUser, prestations: serviceUser.prestations});

                axios.get(url+`myAlfred/api/prestation/${serviceUser.service._id}`)
                    .then(response => {

                        const data = response.data;
                        this.setState({all_prestations: data});


                            //console.log(data);
                            this.state.prestations.forEach(e => {
                                data.forEach(k => {
                                    if (k.label === e.prestation.label) {
                                        console.log('egal')
                                    } else {
                                       this.state.new_prestations.push(k);

                                    }

                                })

                            })

                    })
                    .catch(error => {
                        console.log(error);
                    })

            })
            .catch(err =>
                console.log(err)
            );



    }

    onChange = e => {
        //this.setState({ [e.target.name]: e.target.value });
        const state = this.state.serviceUser;
        state[e.target.name] = e.target.value;
        this.setState({serviceUser:state});
    };




    onSubmit = e => {
        e.preventDefault();


    };





    render() {
        const { classes } = this.props;
        const {prestations} = this.state;
        const {new_prestations} = this.state;



        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ajouter des prestations</Typography>
                            </Grid>

                            <table>
                                <thead>
                                <tr>
                                    <th>Prestation</th>
                                    <th>Prix</th>
                                </tr>
                                </thead>
                                <tbody>
                                {new_prestations.map(e => (
                                    <tr>
                                        <td>{e.label}</td>
                                        <td><input type="text"/> </td>
                                        <td> <button>Ajouter</button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(addPrestations);
