
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Link from 'next/link';
import {ErrorMessage, Field, FieldArray} from "formik";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Switch from "@material-ui/core/Switch";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddressFinder from "../../components/WizardForm/AddressFinder";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";



const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({

    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },



});

class editService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceUser: {},
            service: {},
            prestations: [],
            equipments: [],
            perimeter: '',
            all_equipments: [],
            all_prestations: [],
            all_options: [],
            current_equipments: [],
            prestations_filter: [],





        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
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
                this.setState({serviceUser: serviceUser,service: serviceUser.service ,prestations: serviceUser.prestations, current_equipments: serviceUser.equipments,
                    perimeter: serviceUser.perimeter});

                axios.get(url+`myAlfred/api/service/${serviceUser.service._id}`)
                    .then(response => {
                        const data = response.data;
                        this.setState({all_equipments: data.equipments})
                    })
                    .catch(error => {
                        console.log(error);
                    });

                axios.get(url+`myAlfred/api/prestation/${serviceUser.service._id}`)
                    .then(result => {
                        let prestations = result.data;
                        this.setState({all_prestations: prestations});

                    })
                    .catch(error => {
                        console.log(error);
                    });

                axios.get(url+`myAlfred/api/options/all`)
                    .then(result => {
                        let options = result.data;
                        this.setState({all_options: options});
                    })
                    .catch(error => {
                        console.log(error);
                    });



            })
            .catch(err =>
                console.log(err)
            );

    }

    onChange = e => {
        //this.setState({ [e.target.name]: e.target.value });
        const state = this.state.serviceUser;
        state[e.target.name] = e.target.value;
        this.setState({serviceUser:state});
    };



    handleChecked () {
        //this.setState({graduated: !this.state.graduated});
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }


    onSubmit = e => {
        e.preventDefault();
        const equipments = this.state.equipments;
        const perimeter = this.state.perimeter;
        const active = this.state.active;
        const { city,minimum_basket,deadline_before_booking,price } = this.state.serviceUser;
        const id = this.props.service_id;


        axios.put(`${url}myAlfred/api/serviceUser/edit/${id}`,{city,minimum_basket,deadline_before_booking,price,equipments,perimeter
            ,active})
            .then(res => {

                alert('Service modifié avec succès');
                Router.push({pathname:'/myShop/services'})
            })
            .catch(err => {
                console.log(err);
            })


    };

    handleClick() {
        const id = this.props.service_id;
        axios.delete(`${url}myAlfred/api/serviceUser/${id}`)
            .then(res => {

                alert('Service supprimé avec succès');
                Router.push({pathname:'/dashboardAlfred/services'})
            })
            .catch(err => {
                console.log(err);
            })


    };



    render() {
        const { classes } = this.props;
        const {serviceUser} = this.state;
        const {service} = this.state;
        const {all_prestations} = this.state;
        const {prestations_filter} = this.state;

        const data = all_prestations.forEach(e => {
            axios.get(url+`myAlfred/api/prestation/${serviceUser.service._id}/${e.filter_presentation._id}`)
                .then(prestation_result => {
                    let prestations_data = prestation_result.data;
                    this.setState({prestations_filter: prestations_data})
                } )
                .catch(err => console.log(err));
        })






        return (
            <Layout>
                <Grid container className={classes.bigContainer}>
                    <Grid item xs={7} style={{paddingLeft:20}}>
                        <h2 style={{fontWeight: '100'}}>Paramétrez votre service {service.label}</h2>
                        <Grid container>
                            {all_prestations.map(f=> (
                                <p key={f._id}>{f.filter_presentation.label}</p>
                            ))}
                            <ul>
                                {prestations_filter.map((e,index)=> (
                                    <li key={index}>{e.label}</li>
                                ))}
                            </ul>
                        </Grid>
                        {all_prestations.forEach(e => {
                        axios.get(url+`myAlfred/api/prestation/${service._id}/${e.filter_presentation._id}`)
                            .then(prestation_result => {
                                let prestations_data = prestation_result.data;
                                this.setState({prestations_filter: prestations_data})
                            } )
                            .catch(err => console.log(err));
                    })}

                    </Grid>

                    <Grid item xs={5} style={{backgroundColor: 'whitesmoke'}}>
                    </Grid>




                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(editService);
