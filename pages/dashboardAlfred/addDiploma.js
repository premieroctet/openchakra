
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Link from 'next/link';



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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    }


});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class addDiploma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceUser: {},
            diploma: '',






        };

    }

    static getInitialProps ({ query: { id } }) {
        return { service_id: id }

    }

    componentDidMount() {
        const id = this.props.service_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');



    }

    onChange = e => {
        this.setState({diploma: e.target.files[0]});
    };


    onSubmit = e => {
        e.preventDefault();
       const formData = new FormData() ;
       formData.append('diploma',this.state.diploma);

        const id = this.props.service_id;

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(`${url}myAlfred/api/serviceUser/addDiploma/${id}`,formData,config)
            .then(res => {

                alert('Diplome ajouté avec succès');
                Router.push({pathname:'/dashboardAlfred/services'})
            })
            .catch(err => {
                console.log(err);
            })


    };




    render() {
        const { classes } = this.props;





        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Ajouter votre diplome</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>



                                 <Grid item>
                                    <input type="file" name="diploma" onChange={this.onChange} accept="image/*" />
                                </Grid>


                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Enregistrer
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

export default withStyles(styles)(addDiploma);
