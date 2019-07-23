import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import axios from "axios";


const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        justifyContent: 'top',
        flexDirection: 'column',

    },
    card: {
        padding: '1.5rem 3rem',
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

class editPicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: '',
            user: {}
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
        this.setState({picture:e.target.files[0]});
    };

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
                alert("Photo modifiée");
                Router.push({pathname:'/profile'})
            }).catch((error) => {
            console.log(error)
        });


    };

    render() {
        const { classes } = this.props;
        const {user} = this.state;


        return (

                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item>
                                <img src={`../../${user.picture}`} alt="picture"/>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <input type="file" name="myImage" onChange={this.onChange} accept="image/*" />
                                </Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%',color: 'white' }}>
                                        Valider
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Card>
                </Grid>

        );
    };
}

export default withStyles(styles)(editPicture);
