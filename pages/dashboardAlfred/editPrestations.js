
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


const _ = require('lodash');
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



class editPrestations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceUser: {},
            prestations: [],
            price: '',







        };

        this.handleClick = this.handleClick.bind(this);
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


            })
            .catch(err =>
                console.log(err)
            );





    }




    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        /*const state = this.state.prestation;
        state[e.target.name] = e.target.value;
        this.setState({prestation:state});*/
    };




    onSubmit = e => {
        e.preventDefault();
        const id = this.props.service_id;
        const price = e.target.price.value;
        const prestation = e.target.prestation.value;

        axios.put(url+`myAlfred/api/serviceUser/editPrestation/${id}`,{price,prestation})
            .then(res => {
                alert('Prestation modifiée avec succès');
            })
            .catch(err => {
                console.log(err);
            })



    };

    handleClick(prestation) {
        const id = this.props.service_id;

        axios.put(`${url}myAlfred/api/serviceUser/deletePrestation/${id}`,prestation)
            .then(res => {

                alert('Prestation supprimée avec succès');

            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            })


    };




    render() {

        const { classes } = this.props;
        const {prestations} = this.state;









        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Modifier mes prestations</Typography>
                            </Grid>


                            {prestations.map((e,index) => (
                                <div key={index}>
                                    <form onSubmit={this.onSubmit}>

                                        <p>{e.prestation.label}</p>


                                        <input type="number" name="price"/>
                                        <input type="hidden" name="prestation" value={e._id}/>
                                        <button type={"submit"}>Modifier</button>
                                        <Button type="button" variant="contained" color="secondary" onClick={()=>this.handleClick(e._id)}>
                                            Supprimer
                                        </Button>


                                    </form>
                                </div>

                            ))}


                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(editPrestations);
