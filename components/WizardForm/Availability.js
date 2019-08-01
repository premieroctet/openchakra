import React from 'react';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from 'axios';
import Select2 from 'react-select';
import {Typography} from "@material-ui/core";

const {config} = require('../../config/config');
const url = config.apiUrl;

class Availability extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            monday_event: [],
            tuesday_event: [],
            wednesday_event: [],
            thursday_event: [],
            friday_event: [],
            saturday_event: [],
            sunday_event: [],

            active: false,
            month_begin: '',
            month_end: '',

            monday_begin: '',
            tuesday_begin: '',
            wednesday_begin: '',
            thursday_begin: '',
            friday_begin: '',
            saturday_begin: '',
            sunday_begin: '',

            monday_end: '',
            tuesday_end: '',
            wednesday_end: '',
            thursday_end: '',
            friday_end: '',
            saturday_end: '',
            sunday_end: '',

            monday_service: null,
            tuesday_service: null,
            wednesday_service: null,
            thursday_service: null,
            friday_service: null,
            saturday_service: null,
            sunday_service: null,

            monday_all_service: false,
            tuesday_all_service: false,
            wednesday_all_service: false,
            thursday_all_service: false,
            friday_all_service: false,
            saturday_all_service: false,
            sunday_all_service: false,


            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            all_service: [],



        };

        this.handleChecked=this.handleChecked.bind(this);
        this.handleClickMonday=this.handleClickMonday.bind(this);
        this.handleClickTuesday=this.handleClickTuesday.bind(this);
        this.handleClickWednesday=this.handleClickWednesday.bind(this);
        this.handleClickThursday=this.handleClickThursday.bind(this);
        this.handleClickFriday=this.handleClickFriday.bind(this);
        this.handleClickSaturday=this.handleClickSaturday.bind(this);
        this.handleClickSunday=this.handleClickSunday.bind(this);
        this.handleChangeSelectMonday=this.handleChangeSelectMonday.bind(this);
        this.handleChangeSelectTuesday=this.handleChangeSelectTuesday.bind(this);
        this.handleChangeSelectWednesday=this.handleChangeSelectWednesday.bind(this);
        this.handleChangeSelectThursday=this.handleChangeSelectThursday.bind(this);
        this.handleChangeSelectFriday=this.handleChangeSelectFriday.bind(this);
        this.handleChangeSelectSaturday=this.handleChangeSelectSaturday.bind(this);
        this.handleChangeSelectSunday=this.handleChangeSelectSunday.bind(this);

    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(url+'myAlfred/api/serviceUser/currentAlfred')
            .then(res => {
                let data = res.data;
                this.setState({all_service: data})
            })
            .catch(err => console.log(err))
    }

    handleChecked () {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        /*this.setState({
            [name]: value
        });*/
        this.props.formikCtx.setFieldValue(`servicesAvailability.${name}`, value);
        console.log(this.props.formikCtx);

    }

    handleChangeSelectMonday = monday_service => {
        //this.setState({monday_service})
        this.props.formikCtx.setFieldValue(`servicesAvailability.monday_service`, monday_service);
    };

    handleChangeSelectTuesday = tuesday_service => {
        //this.setState({tuesday_service})
        this.props.formikCtx.setFieldValue(`servicesAvailability.tuesday_service`, tuesday_service);
    };

    handleChangeSelectWednesday = wednesday_service => {
        //this.setState({wednesday_service})
        this.props.formikCtx.setFieldValue(`servicesAvailability.wednesday_service`, wednesday_service);
    };

    handleChangeSelectThursday = thursday_service => {
        //this.setState({thursday_service})
        this.props.formikCtx.setFieldValue(`servicesAvailability.thursday_service`, thursday_service);
    };

    handleChangeSelectFriday = friday_service => {
        //this.setState({friday_service})
        this.props.formikCtx.setFieldValue(`servicesAvailability.friday_service`, friday_service);
    };

    handleChangeSelectSaturday = saturday_service => {
        //this.setState({saturday_service})
        this.props.formikCtx.setFieldValue(`servicesAvailability.saturday_service`, saturday_service);
    };

    handleChangeSelectSunday = sunday_service => {
        //this.setState({sunday_service})
        this.props.formikCtx.setFieldValue(`servicesAvailability.sunday_service`, sunday_service);
    };

    handleClickMonday() {
        let arrayService = [];
        if(this.props.formikCtx.values.servicesAvailability.monday_service != null) {
            this.props.formikCtx.values.servicesAvailability.monday_service.forEach(w => {

                arrayService.push(w.value);

            });
        }
        const obj = {
            begin: this.props.formikCtx.values.servicesAvailability.monday_begin,
            end: this.props.formikCtx.values.servicesAvailability.monday_end,
            services: arrayService,
            all_services: this.props.formikCtx.values.servicesAvailability.monday_all_service

        };
        this.props.formikCtx.values.servicesAvailability.monday_event.push(obj);
        alert("Créneau lundi ajouté, vous pouvez en ajouter d'autre");

        //this.setState({monday_begin: '',monday_end: '',monday_service: null,monday_all_service: false})
        this.props.formikCtx.setFieldValue(`servicesAvailability.monday_begin`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.monday_end`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.monday_service`, null);
        this.props.formikCtx.setFieldValue(`servicesAvailability.monday_all_service`, false);
    }

    handleClickTuesday() {
        let arrayService = [];
        if(this.props.formikCtx.values.servicesAvailability.tuesday_service != null) {
            this.props.formikCtx.values.servicesAvailability.tuesday_service.forEach(w => {

                arrayService.push(w.value);

            });
        }
        const obj = {
            begin: this.props.formikCtx.values.servicesAvailability.tuesday_begin,
            end: this.props.formikCtx.values.servicesAvailability.tuesday_end,
            services: arrayService,
            all_services: this.props.formikCtx.values.servicesAvailability.tuesday_all_service

        };
        this.props.formikCtx.values.servicesAvailability.tuesday_event.push(obj);
        alert("Créneau mardi ajouté, vous pouvez en ajouter d'autre");

        //this.setState({tuesday_begin: '',tuesday_end: '',tuesday_service: null,tuesday_all_service: false})
        this.props.formikCtx.setFieldValue(`servicesAvailability.tuesday_begin`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.tuesday_end`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.tuesday_service`, null);
        this.props.formikCtx.setFieldValue(`servicesAvailability.tuesday_all_service`, false);
    }

    handleClickWednesday() {
        let arrayService = [];
        if(this.props.formikCtx.values.servicesAvailability.wednesday_service != null) {
            this.props.formikCtx.values.servicesAvailability.wednesday_service.forEach(w => {

                arrayService.push(w.value);

            });
        }
        const obj = {
            begin: this.props.formikCtx.values.servicesAvailability.wednesday_begin,
            end: this.props.formikCtx.values.servicesAvailability.wednesday_end,
            services: arrayService,
            all_services: this.props.formikCtx.values.servicesAvailability.wednesday_all_service

        };
        this.props.formikCtx.values.servicesAvailability.wednesday_event.push(obj);

        alert("Créneau mercredi ajouté, vous pouvez en ajouter d'autre");

        //this.setState({wednesday_begin: '',wednesday_end: '',wednesday_service: null,wednesday_all_service: false})
        this.props.formikCtx.setFieldValue(`servicesAvailability.wednesday_begin`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.wednesday_end`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.wednesday_service`, null);
        this.props.formikCtx.setFieldValue(`servicesAvailability.wednesday_all_service`, false);
    }

    handleClickThursday() {
        let arrayService = [];
        if(this.props.formikCtx.values.servicesAvailability.thursday_service != null) {
            this.props.formikCtx.values.servicesAvailability.thursday_service.forEach(w => {

                arrayService.push(w.value);

            });
        }
        const obj = {
            begin: this.props.formikCtx.values.servicesAvailability.thursday_begin,
            end: this.props.formikCtx.values.servicesAvailability.thursday_end,
            services: arrayService,
            all_services: this.props.formikCtx.values.servicesAvailability.thursday_all_service

        };
        this.props.formikCtx.values.servicesAvailability.thursday_event.push(obj);
        alert("Créneau jeudi ajouté, vous pouvez en ajouter d'autre");

        //this.setState({thursday_begin: '',thursday_end: '',thursday_service: null,thursday_all_service: false})
        this.props.formikCtx.setFieldValue(`servicesAvailability.thursday_begin`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.thursday_end`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.thursday_service`, null);
        this.props.formikCtx.setFieldValue(`servicesAvailability.thursday_all_service`, false);
    }

    handleClickFriday() {
        let arrayService = [];
        if(this.props.formikCtx.values.servicesAvailability.friday_service != null) {
            this.props.formikCtx.values.servicesAvailability.friday_service.forEach(w => {

                arrayService.push(w.value);

            });
        }
        const obj = {
            begin: this.props.formikCtx.values.servicesAvailability.friday_begin,
            end: this.props.formikCtx.values.servicesAvailability.friday_end,
            services: arrayService,
            all_services: this.props.formikCtx.values.servicesAvailability.friday_all_service
        };
        this.props.formikCtx.values.servicesAvailability.friday_event.push(obj);
        alert("Créneau vendredi ajouté, vous pouvez en ajouter d'autre");

        //this.setState({friday_begin: '',friday_end: '',friday_service: null,friday_all_service: false})
        this.props.formikCtx.setFieldValue(`servicesAvailability.friday_begin`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.friday_end`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.friday_service`, null);
        this.props.formikCtx.setFieldValue(`servicesAvailability.friday_all_service`, false);
    }

    handleClickSaturday() {
        let arrayService = [];
        if(this.props.formikCtx.values.servicesAvailability.saturday_service != null) {
            this.props.formikCtx.values.servicesAvailability.saturday_service.forEach(w => {

                arrayService.push(w.value);

            });
        }
        const obj = {
            begin: this.props.formikCtx.values.servicesAvailability.saturday_begin,
            end: this.props.formikCtx.values.servicesAvailability.saturday_end,
            services: arrayService,
            all_services: this.props.formikCtx.values.servicesAvailability.saturday_all_service
        };
        this.props.formikCtx.values.servicesAvailability.saturday_event.push(obj);
        alert("Créneau samedi ajouté, vous pouvez en ajouter d'autre");

        //this.setState({saturday_begin: '',saturday_end: '',saturday_service: null,saturday_all_service: false})
        this.props.formikCtx.setFieldValue(`servicesAvailability.saturday_begin`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.saturday_end`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.saturday_service`, null);
        this.props.formikCtx.setFieldValue(`servicesAvailability.saturday_all_service`, false);
    }

    handleClickSunday() {
        let arrayService = [];
        if(this.props.formikCtx.values.servicesAvailability.sunday_service != null) {
            this.props.formikCtx.values.servicesAvailability.sunday_service.forEach(w => {

                arrayService.push(w.value);

            });
        }
        const obj = {
            begin: this.props.formikCtx.values.servicesAvailability.sunday_begin,
            end: this.props.formikCtx.values.servicesAvailability.sunday_end,
            services: arrayService,
            all_services: this.props.formikCtx.values.servicesAvailability.sunday_all_service
        };
        this.props.formikCtx.values.servicesAvailability.sunday_event.push(obj);
        alert("Créneau dimanche ajouté, vous pouvez en ajouter d'autre");

        //this.setState({sunday_begin: '',sunday_end: '',sunday_service: null,sunday_all_service: false})
        this.props.formikCtx.setFieldValue(`servicesAvailability.sunday_begin`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.sunday_end`, '');
        this.props.formikCtx.setFieldValue(`servicesAvailability.sunday_service`, null);
        this.props.formikCtx.setFieldValue(`servicesAvailability.sunday_all_service`, false);
    }

    onChange = e => {
        //this.setState({ [e.target.name]: e.target.value });
        this.props.formikCtx.setFieldValue(`servicesAvailability.${e.target.name}`, e.target.value);
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
             active : this.state.active,
         month_begin : this.state.month_begin,
         month_end : this.state.month_end,
         monday_event : this.state.monday_event,
         tuesday_event : this.state.tuesday_event,
         wednesday_event : this.state.wednesday_event,
         thursday_event : this.state.thursday_event,
         friday_event : this.state.friday_event,
         saturday_event : this.state.saturday_event,
         sunday_event : this.state.sunday_event
        };



        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.post(url+'myAlfred/api/availability/add',data)
            .then(() => {
                alert('Disponibilité ajoutée')
            })
            .catch(err => console.log(err))

    };


    render() {
        const {monday} = this.state;
        const {tuesday} = this.state;
        const {wednesday} = this.state;
        const {thursday} = this.state;
        const {friday} = this.state;
        const {saturday} = this.state;
        const {sunday} = this.state;
        const {active} = this.state;
        const {all_service} = this.state;
        const formik = this.props.formikCtx.values;


        const services = this.props.formikCtx.values.submission;
        console.log(services);

        const optionsService = services.map(service => ({
            label: service.serviceLabel,
            value: service.serviceId
        }));

        return (
            <React.Fragment>
                <Layout>
                    <Grid container style={{marginTop: 70}}>
                <form onSubmit={this.onSubmit}>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.servicesAvailability.monday}
                                    onChange={this.handleChecked}
                                    value={formik.servicesAvailability.monday}
                                    color="primary"
                                    name={'monday'}
                                />
                            }
                            label="Lundi"
                        />
                    </Grid>
                    {formik.servicesAvailability.monday ?
                        <React.Fragment>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="De"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="monday_begin"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.monday_begin}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="A"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="monday_end"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.monday_end}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Typography style={{ fontSize: 17 }}>Service(s)</Typography>
                            <FormControl  style={{ width: '100%' }}>
                                <Select2
                                    value={formik.servicesAvailability.monday_service}
                                    onChange={this.handleChangeSelectMonday}
                                    options={optionsService}
                                    isMulti
                                    isSearchable
                                    closeMenuOnSelect={false}
                                    isDisabled={formik.servicesAvailability.monday_all_service}

                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.servicesAvailability.monday_all_service}
                                        onChange={this.handleChecked}
                                        value={formik.servicesAvailability.monday_all_service}
                                        color="primary"
                                        name={'monday_all_service'}
                                    />
                                }
                                label="Tous les services"
                            />




                            <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                <Button type="button" onClick={() => this.handleClickMonday()} variant="contained" color="primary" style={{ width: '100%' }}>
                                    Ajouter un créneau horaire
                                </Button>
                            </Grid>
                        </React.Fragment>
                        : null}
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.servicesAvailability.tuesday}
                                    onChange={this.handleChecked}
                                    value={formik.servicesAvailability.tuesday}
                                    color="primary"
                                    name={'tuesday'}
                                />
                            }
                            label="Mardi"
                        />
                    </Grid>
                    {formik.servicesAvailability.tuesday ?
                        <React.Fragment>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="De"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="tuesday_begin"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.tuesday_begin}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="A"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="tuesday_end"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.tuesday_end}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Typography style={{ fontSize: 17 }}>Service(s)</Typography>
                            <FormControl  style={{ width: '100%' }}>
                                <Select2
                                    value={formik.servicesAvailability.tuesday_service}
                                    onChange={this.handleChangeSelectTuesday}
                                    options={optionsService}
                                    isMulti
                                    isSearchable
                                    closeMenuOnSelect={false}
                                    isDisabled={formik.servicesAvailability.tuesday_all_service}

                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.servicesAvailability.tuesday_all_service}
                                        onChange={this.handleChecked}
                                        value={formik.servicesAvailability.tuesday_all_service}
                                        color="primary"
                                        name={'tuesday_all_service'}
                                    />
                                }
                                label="Tous les services"
                            />

                            <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                <Button type="button" onClick={() => this.handleClickTuesday()} variant="contained" color="primary" style={{ width: '100%' }}>
                                    Ajouter un créneau horaire
                                </Button>
                            </Grid>
                        </React.Fragment>:null}

                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.servicesAvailability.wednesday}
                                    onChange={this.handleChecked}
                                    value={formik.servicesAvailability.wednesday}
                                    color="primary"
                                    name={'wednesday'}
                                />
                            }
                            label="Mercredi"
                        />
                    </Grid>

                    {formik.servicesAvailability.wednesday ?
                        <React.Fragment>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="De"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="wednesday_begin"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.wednesday_begin}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="A"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="wednesday_end"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.wednesday_end}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Typography style={{ fontSize: 17 }}>Service(s)</Typography>
                            <FormControl  style={{ width: '100%' }}>
                                <Select2
                                    value={formik.servicesAvailability.wednesday_service}
                                    onChange={this.handleChangeSelectWednesday}
                                    options={optionsService}
                                    isMulti
                                    isSearchable
                                    closeMenuOnSelect={false}
                                    isDisabled={formik.servicesAvailability.wednesday_all_service}

                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.servicesAvailability.wednesday_all_service}
                                        onChange={this.handleChecked}
                                        value={formik.servicesAvailability.wednesday_all_service}
                                        color="primary"
                                        name={'wednesday_all_service'}
                                    />
                                }
                                label="Tous les services"
                            />

                            <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                <Button type="button" onClick={() => this.handleClickWednesday()} variant="contained" color="primary" style={{ width: '100%' }}>
                                    Ajouter un créneau horaire
                                </Button>
                            </Grid>
                        </React.Fragment>:null}

                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.servicesAvailability.thursday}
                                    onChange={this.handleChecked}
                                    value={formik.servicesAvailability.thursday}
                                    color="primary"
                                    name={'thursday'}
                                />
                            }
                            label="Jeudi"
                        />
                    </Grid>

                    {formik.servicesAvailability.thursday ?
                        <React.Fragment>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="De"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="thursday_begin"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.thursday_begin}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="A"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="thursday_end"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.thursday_end}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Typography style={{ fontSize: 17 }}>Service(s)</Typography>
                            <FormControl  style={{ width: '100%' }}>
                                <Select2
                                    value={formik.servicesAvailability.thursday_service}
                                    onChange={this.handleChangeSelectThursday}
                                    options={optionsService}
                                    isMulti
                                    isSearchable
                                    closeMenuOnSelect={false}
                                    isDisabled={formik.servicesAvailability.thursday_all_service}

                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.servicesAvailability.thursday_all_service}
                                        onChange={this.handleChecked}
                                        value={formik.servicesAvailability.thursday_all_service}
                                        color="primary"
                                        name={'thursday_all_service'}
                                    />
                                }
                                label="Tous les services"
                            />

                            <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                <Button type="button" onClick={() => this.handleClickThursday()} variant="contained" color="primary" style={{ width: '100%' }}>
                                    Ajouter un créneau horaire
                                </Button>
                            </Grid>
                        </React.Fragment>:null}

                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.servicesAvailability.friday}
                                    onChange={this.handleChecked}
                                    value={formik.servicesAvailability.friday}
                                    color="primary"
                                    name={'friday'}
                                />
                            }
                            label="Vendredi"
                        />
                    </Grid>

                    {formik.servicesAvailability.friday ?
                        <React.Fragment>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="De"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="friday_begin"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.friday_begin}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="A"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="friday_end"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.friday_end}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Typography style={{ fontSize: 17 }}>Service(s)</Typography>
                            <FormControl  style={{ width: '100%' }}>
                                <Select2
                                    value={formik.servicesAvailability.friday_service}
                                    onChange={this.handleChangeSelectFriday}
                                    options={optionsService}
                                    isMulti
                                    isSearchable
                                    closeMenuOnSelect={false}
                                    isDisabled={formik.servicesAvailability.friday_all_service}

                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.servicesAvailability.friday_all_service}
                                        onChange={this.handleChecked}
                                        value={formik.servicesAvailability.friday_all_service}
                                        color="primary"
                                        name={'friday_all_service'}
                                    />
                                }
                                label="Tous les services"
                            />

                            <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                <Button type="button" onClick={() => this.handleClickFriday()} variant="contained" color="primary" style={{ width: '100%' }}>
                                    Ajouter un créneau horaire
                                </Button>
                            </Grid>
                        </React.Fragment>:null}

                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.servicesAvailability.saturday}
                                    onChange={this.handleChecked}
                                    value={formik.servicesAvailability.saturday}
                                    color="primary"
                                    name={'saturday'}
                                />
                            }
                            label="Samedi"
                        />
                    </Grid>
                    {formik.servicesAvailability.saturday ?
                        <React.Fragment>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="De"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="saturday_begin"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.saturday_begin}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="A"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="saturday_end"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.saturday_end}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Typography style={{ fontSize: 17 }}>Service(s)</Typography>
                            <FormControl  style={{ width: '100%' }}>
                                <Select2
                                    value={formik.servicesAvailability.saturday_service}
                                    onChange={this.handleChangeSelectSaturday}
                                    options={optionsService}
                                    isMulti
                                    isSearchable
                                    closeMenuOnSelect={false}
                                    isDisabled={formik.servicesAvailability.saturday_all_service}

                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.servicesAvailability.saturday_all_service}
                                        onChange={this.handleChecked}
                                        value={formik.servicesAvailability.saturday_all_service}
                                        color="primary"
                                        name={'saturday_all_service'}
                                    />
                                }
                                label="Tous les services"
                            />

                            <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                <Button type="button" onClick={()=>this.handleClickSaturday()} variant="contained" color="primary" style={{ width: '100%' }}>
                                    Ajouter un créneau horaire
                                </Button>
                            </Grid>
                        </React.Fragment>:null}

                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.servicesAvailability.sunday}
                                    onChange={this.handleChecked}
                                    value={formik.servicesAvailability.sunday}
                                    color="primary"
                                    name={'sunday'}
                                />
                            }
                            label="Dimanche"
                        />
                    </Grid>
                    {formik.servicesAvailability.sunday ?
                        <React.Fragment>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="De"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="sunday_begin"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.sunday_begin}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-with-placeholder"
                                    label="A"
                                    margin="normal"
                                    style={{ width: '100%' }}
                                    type="time"
                                    name="sunday_end"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    value={formik.servicesAvailability.sunday_end}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Typography style={{ fontSize: 17 }}>Service(s)</Typography>
                            <FormControl  style={{ width: '100%' }}>
                                <Select2
                                    value={formik.servicesAvailability.sunday_service}
                                    onChange={this.handleChangeSelectSunday}
                                    options={optionsService}
                                    isMulti
                                    isSearchable
                                    closeMenuOnSelect={false}
                                    isDisabled={formik.servicesAvailability.sunday_all_service}

                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.servicesAvailability.sunday_all_service}
                                        onChange={this.handleChecked}
                                        value={formik.servicesAvailability.sunday_all_service}
                                        color="primary"
                                        name={'sunday_all_service'}
                                    />
                                }
                                label="Tous les services"
                            />

                            <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                <Button type="button" onClick={()=>this.handleClickSunday()} variant="contained" color="primary" style={{ width: '100%' }}>
                                    Ajouter un créneau horaire
                                </Button>
                            </Grid>
                        </React.Fragment>:null}

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.servicesAvailability.active}
                                onChange={this.handleChecked}
                                value={formik.servicesAvailability.active}
                                color="primary"
                                name={'active'}
                            />
                        }
                        label="Répéter pour une période ?"
                    />
                    {formik.servicesAvailability.active ?
                        <React.Fragment>
                            <FormControl style={{width: '100%'}}>
                                <InputLabel htmlFor="age-simple">A partir de</InputLabel>
                                <Select
                                    value={formik.servicesAvailability.month_begin}
                                    onChange={this.onChange}
                                    inputProps={{
                                        name: 'month_begin',
                                        id: 'age-simple',
                                    }}
                                    style={{width: '100%'}}

                                >
                                    <MenuItem value={'Janvier'}>Janvier</MenuItem>
                                    <MenuItem value={'Février'}>Février</MenuItem>
                                    <MenuItem value={'Mars'}>Mars</MenuItem>
                                    <MenuItem value={'Avril'}>Avril</MenuItem>
                                    <MenuItem value={'Mai'}>Mai</MenuItem>
                                    <MenuItem value={'Juin'}>Juin</MenuItem>
                                    <MenuItem value={'Juillet'}>Juillet</MenuItem>
                                    <MenuItem value={'Août'}>Août</MenuItem>
                                    <MenuItem value={'Septembre'}>Septembre</MenuItem>
                                    <MenuItem value={'Octobre'}>Octobre</MenuItem>
                                    <MenuItem value={'Novembre'}>Novembre</MenuItem>
                                    <MenuItem value={'Décembre'}>Décembre</MenuItem>


                                </Select>
                            </FormControl>

                            <FormControl style={{width: '100%'}}>
                                <InputLabel htmlFor="age-simple">Jusqu'à</InputLabel>
                                <Select
                                    value={formik.servicesAvailability.month_end}
                                    onChange={this.onChange}
                                    inputProps={{
                                        name: 'month_end',
                                        id: 'age-simple',
                                    }}
                                    style={{width: '100%'}}

                                >
                                    <MenuItem value={'Janvier'}>Janvier</MenuItem>
                                    <MenuItem value={'Février'}>Février</MenuItem>
                                    <MenuItem value={'Mars'}>Mars</MenuItem>
                                    <MenuItem value={'Avril'}>Avril</MenuItem>
                                    <MenuItem value={'Mai'}>Mai</MenuItem>
                                    <MenuItem value={'Juin'}>Juin</MenuItem>
                                    <MenuItem value={'Juillet'}>Juillet</MenuItem>
                                    <MenuItem value={'Août'}>Août</MenuItem>
                                    <MenuItem value={'Septembre'}>Septembre</MenuItem>
                                    <MenuItem value={'Octobre'}>Octobre</MenuItem>
                                    <MenuItem value={'Novembre'}>Novembre</MenuItem>
                                    <MenuItem value={'Décembre'}>Décembre</MenuItem>


                                </Select>
                            </FormControl>
                        </React.Fragment>

                        :null}

                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                            Valider
                        </Button>
                    </Grid>




                </form>
                    </Grid>
                </Layout>

            </React.Fragment>

        );
    };
}

export default Availability;
