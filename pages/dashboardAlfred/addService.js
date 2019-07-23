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
import Link from 'next/link';
import Select2 from 'react-select';
import FormControl from "@material-ui/core/FormControl";


const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        height: '170vh',
        justifyContent: 'top',
        flexDirection: 'column',
        marginTop: 150,

    },

});

class addService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: [],
            all_category: [],
            category: '',
            equipments: [],
            city: '',
            perimeter: '',
            minimum_basket: '',
            deadline_before_booking: '',
            options: [],
            label:'',
            unity: '',
            price: '',
            option_extra: '',
            description: '',
            level: '',




        };
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/category/all')
            .then(res => {
                let category = res.data;
                this.setState({all_category:category});



            })
            .catch(err =>
                console.log(err)
            );

    }

    handleChangeCategory= category => {
        this.setState({ category });

    };



    render() {
        const { classes } = this.props;
        const {all_category} = this.state;

        const optionsCategory = all_category.map(tag => ({
            label: tag.label,
            value: tag._id
        }));


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Grid item style={{ width: '100%',marginTop:20 }}>
                        <Typography style={{ fontSize: 20 }}>Catégorie</Typography>
                        <FormControl className={classes.formControl} style={{ width: '100%' }}>
                            <Select2
                                value={this.state.category}
                                onChange={this.handleChangeCategory}
                                options={optionsCategory}


                            />
                        </FormControl>

                    </Grid>
                </Grid>

            </Layout>
        );
    };
}

export default withStyles(styles)(addService);
