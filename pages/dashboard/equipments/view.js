import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";
import Link from "next/link";
import cookie from 'react-cookies'

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
    cardContant: {
        flexDirection: 'column',
    },
    linkText: {
        textDecoration: 'none',
        color: 'black',
        fontSize: 12,
    },
};

class view extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            equipment: {}

        };

        this.handleClick = this.handleClick.bind(this);
    }

    static getInitialProps ({ query: { id } }) {
        return { equipment_id: id }

    }
    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const id = this.props.equipment_id;
        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        axios.get(`/myAlfred/api/admin/equipment/all/${id}`)
            .then(response => {
                let equipment = response.data;
                this.setState({equipment: equipment});

            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401 || err.response.status === 403 ) {
                    cookie.remove('token', { path: '/' })
                    Router.push({pathname: '/login'})
                }
            })

    }

    onChange = e => {
        const state = this.state.equipment;
        state[e.target.name] = e.target.value;
        this.setState({equipment:state});
    };

    onSubmit = e => {
        e.preventDefault();

        const { label } = this.state.equipment;
        const id = this.props.equipment_id;
        axios.put(`/myAlfred/api/admin/equipment/all/${id}`,{label})
            .then(res => {

                alert('Equipement modifié avec succès');
                Router.push({pathname:'/dashboard/equipments/all'})
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401 || err.response.status === 403 ) {
                    cookie.remove('token', { path: '/' })
                    Router.push({pathname: '/login'})
                }
            })
    };

    handleClick() {
        const id = this.props.equipment_id;
        axios.delete(`/myAlfred/api/admin/equipment/all/${id}`)
            .then(res => {
                alert('Equipement supprimé avec succès');
                Router.push({pathname:'/dashboard/equipments/all'})
            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401 || err.response.status === 403 ) {
                    cookie.remove('token', { path: '/' })
                    Router.push({pathname: '/login'})
                }
            })


    };


    render()  {
        const { classes } = this.props;
        const {equipment} = this.state;


        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>{equipment.label}</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="label"
                                        value={equipment.label}
                                        onChange={this.onChange}

                                    />
                                </Grid>
                                <Grid item>
                                    <img src={`../../../${equipment.logo}`} alt={'logo'} width={100}/>
                                </Grid>
                                <Grid item>
                                    <img src={`../../../${equipment.logo2}`} alt={'logo2'} width={100}/>
                                </Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Modifier
                                    </Button>
                                    <Button type="button" variant="contained" color="secondary" style={{ width: '100%' }} onClick={this.handleClick}>
                                        Supprimer
                                    </Button>
                                </Grid>
                            </form>
                            <Link href={`editPicture?id=${this.props.equipment_id}`}>
                                <Button type="button" variant="contained" color="primary" style={{ width: '100%' }}>
                                    Modifier les logos
                                </Button>
                            </Link>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}



export default withStyles(styles)(view);
