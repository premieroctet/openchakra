import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import axios from "axios";


const { config } = require('../config/config');
const url = config.apiUrl;
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'top',
        flexDirection: 'column',

    },
    card: {
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
        backgroundColor: '#00abed',
        height: 80,

    },
    newContainer: {
        padding: 20,
    },
    title: {
        fontFamily: 'helveticaNeue',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 0,
        paddingTop: 22,
        letterSpacing: 1,
    },
});

class addPicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: '',
            file: null,
        };

        this.handleChange = this.handleChange.bind(this)
    }

    onChange = e => {
        this.setState({picture:e.target.files[0]});
    };

    handleChange(event) {
        this.setState({
            file:
                URL.createObjectURL(event.target.files[0])    })
    }

    onSubmit = e => {
        e.preventDefault();


        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('myImage',this.state.picture);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url+"myAlfred/api/users/profile/picture",formData,config)
            .then((response) => {
                alert("Photo ajouté");
                if(localStorage.getItem('path') === '/signup') {
                    Router.push({pathname: '/addPhone'})
                } else {
                    Router.push({pathname:'/profile'})
                }

            }).catch((error) => {
                console.log(error)
        });


    };

    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <div className={classes.banner}>
                            <h2 className={classes.title}>Ajouter votre photo de profil</h2>

                        </div>

                            <div className={classes.newContainer}>
                                <Typography>Votre photo apparaîtra sur votre page de profil,. Assurez-vous d’utiliser une photo
                                    qui montre clairement votre visage et qui ne contient pas d’information personnelles ou sensibles.</Typography>
                            <form onSubmit={this.onSubmit}>
                                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>

                                    <input accept="image/*" className="input" style={{display:'none'}} id="icon-button-file" type="file" onChange={(event) =>{this.handleChange(event);this.onChange(event)}} name={"myImage"} />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" className={classes.button}  style={{width:150, height:150,backgroundColor:'lightgrey'}} component="span">
                                            <PhotoCamera style={{fontSize: '2rem'}} />
                                        </IconButton>
                                    </label>

                                </Grid>
                                <img src={this.state.file}/>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Ajouter
                                    </Button>
                                </Grid>
                                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                                    <Link href={'/'}><a style={{textDecoration: 'none', color: 'black'}}>Je le ferai plus tard</a></Link>
                                </Grid>
                            </form>
                            </div>

                    </Card>
                </Grid>
            </Layout>
        );
    };
}


export default withStyles(styles)(addPicture);
