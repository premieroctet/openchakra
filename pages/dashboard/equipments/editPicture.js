import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";

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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
};


class editPicture extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            equipment: {},
            logo: null,
            logo2: null,

        };
        this.onChange2 = this.onChange2.bind(this);


    }

    static getInitialProps ({ query: { id } }) {
        return { equipment_id: id }

    }
    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const id = this.props.equipment_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`/myAlfred/api/admin/equipment/all/${id}`)
            .then(response => {
                let equipment = response.data;
                this.setState({equipment: equipment});

            })
            .catch(err => {
                console.error(err);
                if(err.response.status === 401 || err.response.status === 403 ) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            });


    }

    onChange = e => {
        this.setState({logo:e.target.files[0]})
    };

    onChange2(e){
        this.setState({logo2:e.target.files[0]})
    }



    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('logo',this.state.logo);
        formData.append('logo2',this.state.logo2);
        const id = this.props.equipment_id;
        axios.post(`/myAlfred/api/admin/equipment/editPicture/${id}`,formData)
            .then(res => {
                alert('Logos modifiés avec succès');
                Router.push({pathname:'/dashboard/equipments/all'})
            })
            .catch(err => {
                console.error(err);
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
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
                                    <img src={`../../../${equipment.logo}`} alt={'logo'} width={100}/>
                                </Grid>

                                <Grid item>
                                    <input type="file" name="logo" onChange= {this.onChange} accept="image/*" />
                                </Grid>
                                <Grid item>
                                    <img src={`../../../${equipment.logo2}`} alt={'logo2'} width={100}/>
                                </Grid>
                                <Grid item>
                                    <input type="file" name="logo2" onChange= {this.onChange2} accept="image/*" />
                                </Grid>


                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Modifier
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



export default withStyles(styles)(editPicture);
