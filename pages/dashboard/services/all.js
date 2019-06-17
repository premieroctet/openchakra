import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../../../hoc/Layout/Layout';
import axios from "axios";
import Link from "next/link";
import Chip from "@material-ui/core/Chip";


const { config } = require('../../../config/config');
const url = config.apiUrl;
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

class all extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: []
        }

    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get(url+"myAlfred/api/admin/service/all")
            .then((response) => {
                let service = response.data;
                this.setState({service: service})
            }).catch((error) => {
            console.log(error)
        });
    }


    render() {
        const { classes } = this.props;
        const {service} = this.state;


                const row = service.map(e => (
                    <tr key={e._id}>
                        <td>{e.label}</td>
                        <td>{e.category.label} </td>
                        
                        <td><a href={`/dashboard/services/view?id=${e._id}`}>Modifier</a> </td>
                    </tr>
                ));

                return (
                    <Layout>
                        <Grid container className={classes.signupContainer}>
                            <Card className={classes.card}>
                                <Grid>
                                    <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Typography style={{ fontSize: 30 }}>Services</Typography>
                                    </Grid>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Label</th>
                                            <th>Catégorie</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {row}
                                        </tbody>
                                        <Grid item>
                                            <Link href={"/dashboard/services/add"}>
                                                <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                                    Ajouter
                                                </Button>
                                            </Link>
                                        </Grid>
                                    </table>
                                </Grid>
                            </Card>
                        </Grid>
                    </Layout>
                );



    };
}

export default withStyles(styles)(all);
