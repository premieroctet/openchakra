import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../../../hoc/Layout/Layout';
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const {config} = require('../../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        justifyContent: 'top',
        flexDirection: 'column',

    },
    card: {
        padding: '1.5rem 3rem',

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
    table: {
        minWidth: 650,
    },
});

class all extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            billing: []
        }

    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get(url+"myAlfred/api/admin/billing/all")
            .then((response) => {
                let billing = response.data;
                this.setState({billing: billing})
            }).catch((error) => {
            console.log(error);
            if(error.response.status === 401 || error.response.status === 403) {
                localStorage.removeItem('token');
                Router.push({pathname: '/login'})
            }
        });
    }


    render() {
        const { classes } = this.props;
        const {billing} = this.state;

        const row = billing.map(e => (
            <tr key={e._id}>
                <td>{e.label}</td>
                <td><a href={`/dashboard/billing/view?id=${e._id}`}>Modifier</a> </td>
            </tr>
        ));


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Paper style={{width: '100%'}}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Label</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {billing.map((e,index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {e.label}
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/dashboard/billing/view?id=${e._id}`}><a>Modifier</a></Link>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                        <Link href={"/dashboard/billing/add"}>
                            <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                Ajouter
                            </Button>
                        </Link>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(all);
