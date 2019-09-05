
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import Footer from '../../hoc/Layout/Footer/Footer';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "react-select";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


const _ = require('lodash');
const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({

    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },



});



class selectCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all_category: [],
            selectedCategory: null,
            categoryOk: false,

            all_services: [],
            selectedService: null,
            serviceOk: false,


        };


    }


    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get(url+'myAlfred/api/category/all')
            .then(res => {
                let category = res.data;
                this.setState({all_category: category});
            })
            .catch(err => console.log(err));


    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });


    };

    handleChangeCategory = selectedCategory => {
        this.setState({selectedCategory})
    };

    handleChangeService = selectedService => {
        this.setState({selectedService})
    };

    handleCategory() {
        const id_category = this.state.selectedCategory.value;
        axios.get(url+'myAlfred/api/service/all/'+id_category)
            .then(res => {
                let services = res.data;
                this.setState({all_services: services})
            })
            .catch(err => console.log(err));

        axios.get(url+'myAlfred/api/serviceUser/currentAlfred')
            .then(response => {
                let current_services = response.data;
                current_services.forEach(e => {


                    let test2 = _.pullAllBy(this.state.all_services, [{'label': e.service.label}], 'label');


                    this.setState({all_services: test2});


                })
            });
        this.setState({categoryOk: true});
    }

    handleService() {
        const id_service = this.state.selectedService.value;
        this.setState({serviceOk: true});
    }








    render() {
        const { classes } = this.props;
        const {categoryOk} = this.state;
        const {serviceOk} = this.state;
        const {all_category} = this.state;
        const {all_services} = this.state;

        const array_category = all_category.map(e => ({
            label: e.label,
            value: e._id
        }));

        const array_services = all_services.map(e => ({
            label: e.label,
            value: e._id
        }));


        return (

            <Layout>

                <Grid container className={classes.bigContainer}>
                    <Grid item xs={7} style={{paddingLeft:20}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <h2 style={{fontWeight: '100'}}>Votre catégorie de service</h2>
                            </Grid>
                            <Grid item xs={12}>
                                <p>
                                    Commencez par sélectionner votre catégories de service. Par exemple, si vous souhaitez réaliser un service
                                    de coiffure, sélectionnez la catégorie «Beauté et bien-être».
                                </p>
                            </Grid>
                            <Grid item xs={10}>
                                <Select
                                    placeholder="Sélectionnez votre catégorie"
                                    isClearable={true}
                                    options={
                                        array_category
                                    }
                                    onChange={ this.handleChangeCategory}
                                    theme={theme => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: '#2FBCD3',
                                        }
                                    })}
                                />
                            </Grid>
                            <Grid item xs={5} style={{marginTop:20}}>
                                <Button onClick={()=>this.handleCategory()} type="submit" variant="contained" color="primary" style={{ color:"white" }}>
                                    Je valide la catégorie
                                </Button>
                            </Grid>
                        </Grid>

                        {categoryOk ?
                            <React.Fragment>
                                <Grid container>

                                    <Grid item xs={12}>
                                        <h2 style={{fontWeight: '100'}}>Votre service</h2>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p>
                                            Identifiez maintenant le service que vous souhaitez réaliser dans la catégorie sélectionnée.
                                            Vous pourrez choisir le type de prestation que vous souhaitez réaliser dans ce service dès la prochaine étape !


                                        </p>
                                    </Grid>

                                    <Grid item xs={10}>
                                        <Select
                                            placeholder="Sélectionnez votre service"
                                            isClearable={true}
                                            options={
                                                array_services
                                            }
                                            onChange={ this.handleChangeService}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary: '#2FBCD3',
                                                }
                                            })}
                                        />
                                    </Grid>
                                    <Grid item xs={5} style={{marginTop:20}}>
                                        <Button onClick={()=>this.handleService()} type="submit" variant="contained" color="primary" style={{ color:"white" }}>
                                            Je valide le service
                                        </Button>
                                    </Grid>

                                </Grid>
                            </React.Fragment>

                            :null}

                        <hr/>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Link href={'/myShop/services'}>
                                        <Button type="button" variant="contained" color="primary" style={{ color:"white" }}>
                                            Retour
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>
                                    {serviceOk ?
                                        <Link href={'/myShop/addService?id='+this.state.selectedService.value}>
                            <Button type="submit" variant="contained" color="secondary" style={{ color:"white" }}>
                                Suivant
                            </Button>
                                        </Link>
                                        : null}
                                </Grid>
                            </Grid>



                    </Grid>






                    <Grid item xs={5} style={{backgroundColor: 'whitesmoke'}}>
                    </Grid>



                </Grid>

            <Footer/>
            </Layout>
            

        );
    };
}



export default withStyles(styles)(selectCategory);


