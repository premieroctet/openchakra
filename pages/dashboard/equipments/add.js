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

const url = "https://myalfred.hausdivision.com/";

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
            file: null
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);
    }

        onFormSubmit(e){
            e.preventDefault();
            const formData = new FormData();
            formData.append('logo',this.state.file);
            formData.append('label',this.state.label);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios.post(url+"myAlfred/api/admin/equipment/all",formData,config)
                .then((response) => {
                    alert("Equipment ajouté");
                    Router.push({pathname:'/dashboard/equipments/all'})
                }).catch((error) => {
            });
        }
        onChange(e) {
            this.setState({file:e.target.files[0]});

        }

        onChange2(e){
            this.setState({label:e.target.value})
        }


        render() {
        const { classes } = this.props;


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
                                    />
                                </Grid>
                                <Grid item>
                                    <input type="file" name="logo" onChange= {this.onChange} accept="image/*" />
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
