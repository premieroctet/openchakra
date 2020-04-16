import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import Link from "next/link";
import { toast } from 'react-toastify';

const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',

    },
    card: {
        fontFamily: 'Helvetica',
        width: 800,
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
    banner: {
        marginBottom: 25,
        backgroundColor: '#2FBCD3',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    newContainer: {
        padding: 20,
    },
    title: {
        fontFamily: 'Helvetica',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 0,
        paddingTop: 22,
        letterSpacing: 1,
    },
});

class addPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            phoneOk: false,
        };
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({ [name]: value });
        if( name=='phone') this.setState({phoneOk:value.length>=8})
    };

    onSubmit = e => {
        e.preventDefault();

        const newPhone = {
            phone: this.state.phone,

        };
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .put('/myAlfred/api/users/profile/phone', newPhone)
            .then(res => {
                toast.info('Téléphone ajouté');
                Router.push('/checkEmail');
            })
            .catch(err =>
                console.log(err)
            );


    };

    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Grid item xs={10}>
                    <Card className={classes.card}>
                        <div className={classes.banner}>
                            <h2 className={classes.title}>Confirmez votre numéro de téléphone</h2>

                        </div>
                            <div className={classes.newContainer}>
                                <Typography style={{fontFamily: 'Helvetica'}}>L'ajout de votre numéro de téléphone permet aux membres My-Alfred
                                    de disposer d'un moyen pour vous contacter.</Typography>
                                <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                                    <img src='../static/smartphone.svg' style={{width: 100,height: 100}}/>
                                </Grid>
                                <Grid container style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                                    <form onSubmit={this.onSubmit}>
                                        <Grid item>
                                            <TextField
                                                id="standard-with-placeholder"
                                                label="Numéro de téléphone"
                                                placeholder="Numéro de téléphone"
                                                margin="normal"
                                                style={{ width: '100%' }}
                                                type={'number'}
                                                name="phone"
                                                variant="outlined"
                                                value={this.state.phone}
                                                onChange={(e)=>this.onChange(e)}
                                            />
                                        </Grid>
                                        <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                            <Button disabled={!this.state.phoneOk} type="submit" variant="contained" color="primary" style={{ width: '100%', color: 'white' }}>
                                                Je confirme mon numéro
                                            </Button>
                                        </Grid>
                                    </form>
                                </Grid>

                            </div>

                    </Card>
                    </Grid>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(addPhone);
