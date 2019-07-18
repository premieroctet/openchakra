import React, {Fragment} from 'react';
import Link from 'next/link';
import axios from "axios";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';


const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    signupContainer: {
        alignItems: 'center',

        justifyContent: 'top',
        flexDirection: 'column',


    },
    cardContant: {
        flexDirection: 'column',
    },
    linkText: {
        textDecoration: 'none',
        color: 'black',
        fontSize: 12,
        lineHeight: 4.15,
    },


});
class editInformations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},



        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});


            })
            .catch(err =>
                console.log(err)
            );
    }

    onChange = e => {
        const state = this.state.user;
        state[e.target.name] = e.target.value;
        this.setState({user:state});
    };

    onSubmit = e => {
        e.preventDefault();
        const {email, phone, job} = this.state.user;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.put(url+'myAlfred/api/users/profile/editProfile',{email,phone,job})
            .then(res => {
                alert("Profil modifié avec succès");

            })
            .catch(err => console.log(err))
    };


    render() {
        const {classes} = this.props;
        const {user} = this.state;



        return (


                        <Grid>
                            <form onSubmit={this.onSubmit}>

                                <Grid item>
                                    <TextField
                                        id="filled-name"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={this.onChange}
                                        helperText={"Votre email"}

                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="phone"
                                        value={user.phone}
                                        onChange={this.onChange}
                                        helperText={"Votre numéro de téléphone"}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="job"
                                        value={user.job}
                                        onChange={this.onChange}
                                        helperText={"Votre métier"}
                                    />
                                </Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Valider
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>



        );
    };
}

export default withStyles(styles)(editInformations);
