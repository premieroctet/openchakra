import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../../hoc/Layout/Layout';
import axios from "axios";
import cookie from 'react-cookies'

const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        height: '170vh',
        justifyContent: 'top',
        flexDirection: 'column',

    },
    card: {
        padding: '1.5rem 3rem',
        width: 400,
        marginTop: '100px',
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

class add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            file: null,
            file2: null,
            errors: {},
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.onChange3 = this.onChange3.bind(this);
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
    }

    onFormSubmit(e){
            e.preventDefault();
            const formData = new FormData();
            formData.append('logo',this.state.file);
            formData.append('label',this.state.label);
            formData.append('logo2',this.state.file2);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.defaults.headers.common['Authorization'] = cookie.load('token')
            axios.post("/myAlfred/api/admin/equipment/all",formData,config)
                .then((response) => {
                    alert("Equipment ajouté");
                    Router.push({pathname:'/dashboard/equipments/all'})
                }).catch((error) => {
                    console.log(error);
                    this.setState({errors: error.response.data});
                if(error.response.status === 401 || error.response.status === 403 ) {
                    cookie.remove('token', { path: '/' })
                    Router.push({pathname: '/login'})
                }
            });
        }
        onChange(e) {
            this.setState({file:e.target.files[0]});

        }

        onChange2(e){
            this.setState({label:e.target.value})
        }

    onChange3(e){
        this.setState({file2:e.target.files[0]})
    }


        render() {
        const { classes } = this.props;
        const {errors} = this.state;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ajouter un équipement</Typography>
                            </Grid>
                            <form onSubmit={this.onFormSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Label"
                                        placeholder="Label"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="label"
                                        value={this.state.label}
                                        onChange={this.onChange2}
                                        error={errors.label}
                                    />
                                    <em>{errors.label}</em>
                                </Grid>
                                <Grid item>
                                    <input type="file" name="logo" onChange= {this.onChange} accept="image/*" />
                                </Grid>
                                <Grid item>
                                    <input type="file" name="logo2" onChange= {this.onChange3} accept="image/*" />
                                </Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Ajouter
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(add);
