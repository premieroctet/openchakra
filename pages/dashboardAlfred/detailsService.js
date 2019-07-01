
import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import Link from "next/link";


const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({
    signupContainer: {

        height: '170vh',

        flexDirection: 'column',
        marginTop: 150,

    },
    table: {
        border: '1px solid black',
},


});

class detailsService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceUser: {},
            prestations: [],
            equipments: [],



        };
    }

    static getInitialProps ({ query: { id } }) {
        return { service_id: id }

    }

    componentDidMount() {
        const id = this.props.service_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios
            .get(url+`myAlfred/api/serviceUser/${id}`)
            .then(res => {
                let serviceUser = res.data;
                this.setState({serviceUser: serviceUser, prestations: serviceUser.prestations, equipments: serviceUser.equipments});



            })
            .catch(err =>
                console.log(err)
            );
    }



    render() {
        const { classes } = this.props;
        const {serviceUser} = this.state;
        const {prestations} = this.state;
        const {equipments} = this.state;




        return (
            <Layout>
                <Grid container className={classes.signupContainer}>

                    <div>
                        <p>Périmètre d'activité : {serviceUser.perimeter}km</p>
                        <p>Panier minimum : {serviceUser.minimum_basket}</p>
                        <p>Ville : {serviceUser.city}</p>
                        <p>Délais de prévenance : {serviceUser.deadline_before_booking}</p>
                        {serviceUser.graduated ? <p>Vous avez un diplôme</p> : <p>Aucun diplôme</p>}
                        {serviceUser.is_certified ? <p>Vous avez une certification</p> : <p>Aucune certification</p>}
                    </div>
                    <table className={classes.table}>
                        <thead>
                        <tr>
                            <th>Prestation</th>
                            <th>Prix</th>
                        </tr>
                        </thead>
                        <tbody>
                        {prestations.map(e => (
                            <tr key={e}>
                                <td>{e.prestation.label}</td>
                                <td>{e.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        Vous fournissez :
                        <ul>
                            {equipments.map(k => (
                                <li key={k}>{k.label}</li>
                            ))}
                        </ul>
                    </div>
                    <Link href={"/dashboardAlfred/editService?id="+serviceUser._id}>
                        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                            Modifier
                        </Button>
                    </Link>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(detailsService);
