
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

class editService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceUser: {},
            prestations: [],
            equipments: [],
            majoration: {},
            use_majoration: false,
            active: false,
            perimeter: '',
            all_equipments: [],
            current_equipments: [],





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
                this.setState({serviceUser: serviceUser, prestations: serviceUser.prestations, current_equipments: serviceUser.equipments,
                  perimeter: serviceUser.perimeter});

                if(typeof serviceUser.majoration != "undefined") {
                    this.setState({use_majoration: true});
                    this.setState({majoration: serviceUser.majoration});
                    this.setState({active: serviceUser.majoration.active});
                }
                axios.get(url+`myAlfred/api/service/${serviceUser.service._id}`)
                    .then(response => {
                        const data = response.data;
                        this.setState({all_equipments: data.equipments})
                    })
                    .catch(error => {
                        console.log(error);
                    })



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

    handleChange2 = e => {
        this.setState({equipments: e.target.value})


    };

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
                Router.push({pathname:'/dashboardAlfred/services'})
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
        const {prestations} = this.state;
        const {current_equipments} = this.state;
        const {active} = this.state;
        const {majoration} = this.state;
        const {all_equipments} = this.state;
        const {use_majoration} = this.state;




        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Modifier le service</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="city"
                                        value={serviceUser.city}
                                        onChange={this.onChange}
                                        helperText={"Ville d'activité"}

                                    />
                                </Grid>
                                <Grid item>
                                    <InputRange
                                        maxValue={100}
                                        minValue={0}
                                        value={this.state.perimeter}
                                        onChange={value =>this.setState({perimeter: value})}
                                        name={"perimeter"}
                                        step={10}

                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="minimum_basket"
                                        value={serviceUser.minimum_basket}
                                        onChange={this.onChange}
                                        helperText={"Panier minimum"}

                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="deadline_before_booking"
                                        value={serviceUser.deadline_before_booking}
                                        onChange={this.onChange}
                                        helperText={"Délais de prévenance"}

                                    />
                                </Grid>

                                {use_majoration ?
                                <React.Fragment><Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.active}
                                                onChange={this.handleChecked}
                                                value={this.state.active}
                                                color="primary"
                                                name={"active"}
                                            />
                                        }
                                        label="Majoration ?"
                                    />

                                </Grid>

                                {active ? <Grid item>
                                    <TextField
                                        id="standard-with-placeholder"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="price"
                                        value={majoration.price}
                                        onChange={this.onChange}
                                        helperText={"Prix de la majoration"}

                                    />
                                </Grid> : ''}</React.Fragment>
                                : '' }

                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="select-multiple-chip">Equipements</InputLabel>
                                        <Select
                                            multiple
                                            value={this.state.equipments}
                                            onChange={this.handleChange2}
                                            input={<Input id="select-multiple-chip" />}
                                            renderValue={selected => (
                                                <div className={classes.chips}>
                                                    {selected.map(value => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {all_equipments.map(name => (
                                                <MenuItem key={name._id} value={name._id} >
                                                    {name.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>





                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Modifier
                                    </Button>
                                    <Button type="button" variant="contained" color="secondary" style={{ width: '100%' }} onClick={this.handleClick}>
                                        Supprimer
                                    </Button>
                                </Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Link href={'/dashboardAlfred/addDiploma?id='+this.props.service_id}>
                                    <Button type="button" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Ajouter un diplome
                                    </Button>
                                    </Link>
                                    <Link href={'/dashboardAlfred/addCertification?id='+this.props.service_id}>
                                    <Button type="button" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Ajouter une certification
                                    </Button>
                                    </Link>
                                </Grid>
                            </form>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(editService);
