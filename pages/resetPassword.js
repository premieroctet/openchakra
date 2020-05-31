import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {checkPass1, checkPass2} from '../utils/passwords';
import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";
import {toast} from "react-toastify";

const styles = {
    loginContainer: {
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    card: {
        padding: '1.5rem 3rem',
        width: 400,
    },
};

class resetPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            password2:'',
            token: '',
            status1: {error:'', check:false},
            status2: {error:'', check:false},
        };
    }

    static getInitialProps ({ query: { token } }) {
        return { token: token }

    }
    componentDidMount() {
        const token = this.props.token;
        this.setState({token: token});

    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onChange2 = e => {
        this.setState({
            status1: checkPass1(this.state.password),
            status2: checkPass2(this.state.password, this.state.password2),
        })
    }

    onSubmit = e => {
        e.preventDefault();
        const data = {
            password: this.state.password,
            token: this.state.token,
        };
        console.log("1")
        axios.post('/myAlfred/api/users/resetPassword',data)
            .then(res => {
                console.log("2")
                toast.info('Mot de passe modifié avec succès');
                Router.push({pathname:'/login'})
            })
            .catch(err => {
                toast.error(err.response.data.msg)
            })


    };

    render()  {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Réinitialisation du mot de passe</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Nouveau mot de passe"
                                        placeholder="Mot de passe"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        onKeyUp={this.onChange2}
                                        error={this.state.status1.error}
                                        helperText={this.state.status1.error}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Répéter le mot de passe"
                                        placeholder="Mot de passe"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                        onKeyUp={this.onChange2}
                                        error={this.state.status2.error}
                                        helperText={this.state.status2.error}
                                    />
                                </Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }} disabled={!(this.state.status1.check && this.state.status2.check)}>
                                        Valider
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



export default withStyles(styles)(resetPassword);
