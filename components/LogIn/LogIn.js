import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import styles from './LogInStyle';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import Router from "next/router";
import {Helmet} from 'react-helmet';

class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('/myAlfred/api/users/login',user)
            .then(res => {
                const {token} = res.data;
                localStorage.setItem('token',token);
                setAuthToken(token);
                axios.put('/myAlfred/api/users/account/lastLogin')
                    .then(data => {
                        let path = localStorage.getItem('path');
                        if(path === '/'){
                            Router.push('/')
                        } else {
                            Router.back();
                        }
                    })
                    .catch(err=> console.log(err));
            })
            .catch(err => {
                console.log(err);
                if (err.response) {
                    this.setState({errors: err.response.data});
                }
            })
    };

    render(){
        const { classes } = this.props;
        const {errors} = this.state;
        return (
            <Grid className={classes.fullContainer}>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{textAlign:'center'}}>
                                <Typography style={{ fontSize: 30 }}>Connexion</Typography>
                                <img src={'../static/background/connexion.svg'} alt={'bienvenu'} style={{width:100, height:100}}/>
                            </Grid>
                            <form onSubmit={this.onSubmit} style={{marginBottom:15}}>
                                <Grid item>
                                    <TextField
                                        label="Email"
                                        placeholder="Email"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="email"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChange}
                                        error={errors.username}
                                    />
                                    <em>{errors.username}</em>
                                </Grid>
                                <Grid item style={{backgroundColor:'borwn'}}>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Mot de passe"
                                        placeholder="Mot de passe"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                    <em>{errors.password}</em>
                                </Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30}}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%',color: 'white' }}>
                                        Connexion
                                    </Button>
                                </Grid>
                            </form>
                            <Grid item style={{display:'flex',flexDirection:'column'}}>
                                <Link href={"/forgotPassword"}><a color="primary" style={{textDecoration: 'none', color: '#2FBCD3'}}>Mot de passe oublié ?</a></Link>
                                <Link href={"/signup"}><a color="primary" style={{textDecoration: 'none', color: '#2FBCD3'}}>Pas encore inscrit ? Inscrivez-vous !</a></Link>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(LogIn);
