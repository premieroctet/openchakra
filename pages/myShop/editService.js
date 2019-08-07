
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






const _ = require('lodash');
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
            uniqFilter: [],





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
                        let arrayFilter =  [];

                        prestations.forEach(e => {
                            arrayFilter.push(e.filter_presentation);
                            let uniqFilter = _.uniqBy(arrayFilter,'label');

                           this.setState({uniqFilter: uniqFilter});
                        })

                        this.state.uniqFilter.forEach(f=> {

                            axios.get(url+`myAlfred/api/prestation/${serviceUser.service._id}/${f._id}`)
                                .then(data => {
                                    this.setState({[f._id]:data.data});
                                })


                        })


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
        const {uniqFilter} = this.state;

        /*uniqFilter.forEach((q) => {
           console.log(this.state[q._id]);
        });*/














        return (
            <Layout>
                <Grid container className={classes.bigContainer}>
                    <Grid item xs={7} style={{paddingLeft:20}}>
                        <h2 style={{fontWeight: '100'}}>Paramétrez votre service {service.label}</h2>
                        <Grid container>

                            {uniqFilter.map(f=> (
                                console.log(this.state[f._id])
                                /*this.state[f._id].forEach(s => (
                                    <React.Fragment><p key={f._id}>{f.label}</p>
                                        <p>{s.label}</p>
                                    </React.Fragment>
                                ))*/








                            ))}

                        </Grid>


                    </Grid>

                    <Grid item xs={5} style={{backgroundColor: 'whitesmoke'}}>
                    </Grid>




                </Grid>
            </Layout>
        );
    };
}



export default withStyles(styles)(editService);


