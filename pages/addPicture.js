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
import { toast } from 'react-toastify';
import axios from "axios";


const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        flexDirection: 'column',

    },
    card: {
        maxWidth: 800,
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
        justifyContent: 'center',
        [theme.breakpoints.down("xs")]:{
            textAlign: 'center'
        }

    },
    newContainer: {
        padding: 20,
    },
    title: {
        fontFamily: 'Helvetica',
        color: 'white',
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
                event.target.files[0] ? URL.createObjectURL(event.target.files[0]):null })
    }

    handleLater(e) {
        e.preventDefault();

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.put("/myAlfred/api/users/profile/pictureLater", { picture: 'static/basicavatar.png' })
            .then((response) => {
                Router.push({pathname: '/addPhone'})
            }).catch((error) => {
                console.log(error)
        });
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
        axios.post("/myAlfred/api/users/profile/picture",formData,config)
            .then((response) => {
                toast.info('Photo de profil ajoutée');
                Router.push({pathname: '/addPhone'})


            }).catch((error) => {
                console.log(error)
        });


    };

    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Grid item xs={10}>
                    <Card className={classes.card}>
                        <div className={classes.banner}>
                            <h2 className={classes.title}>Ajouter votre photo de profil</h2>

                        </div>

                            <div className={classes.newContainer}>
                                <Typography>Votre photo apparaîtra sur votre page de profil. Assurez-vous d’utiliser une photo
                                    qui montre clairement votre visage et qui ne contient pas d’information personnelles ou sensibles.</Typography>
                            <form onSubmit={this.onSubmit}>
                                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>

                                    <input accept="image/*" className="input" style={{display:'none'}} id="icon-button-file" type="file" onChange={(event) =>{this.handleChange(event);this.onChange(event)}} name={"myImage"} />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" className={classes.button}  style={{width:150, height:150,backgroundColor:'lightgray',backgroundImage:`url('${this.state.file}')`,
                                        backgroundSize:"cover",backgroundPosition:"center"}} component="span">
                                            {this.state.file === null ? <PhotoCamera style={{fontSize: '2rem'}} /> : null}

                                        </IconButton>
                                    </label>

                                </Grid>

                                <Grid container>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4} style={{justifyContent: 'center', marginTop: 30, justifyItems: 'center' }}>
                                        <Button type="submit" variant="contained" color="primary" style={{ width: '100%',color: 'white' }} disabled={this.state.file===null}>
                                            Suivant
                                        </Button>
                                    <Grid item xs={4}></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                                    <a onClick={(e) => this.handleLater(e)} style={{textDecoration: 'none', color: 'black', cursor: 'pointer'}}>Je le ferai plus tard</a>
                                </Grid>
                            </form>
                            </div>

                    </Card>
                    </Grid>
                </Grid>
            </Layout>
        );
    };
}


export default withStyles(styles)(addPicture);
