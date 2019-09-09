
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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "react-select";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AlgoliaPlaces from 'algolia-places-react';
import InputRange from 'react-input-range';
import moment from "moment";
import { pdfjs } from 'react-pdf';
import Switch from "@material-ui/core/Switch";
import Footer from '../../hoc/Layout/Footer/Footer';
import { toast } from 'react-toastify';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



moment.locale('fr');


const _ = require('lodash');
const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({

    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },



});



class addService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: {},
            prestations: [],
            equipments: [],
            perimeter: '',
            minimum_basket: '',
            description: '',
            level: '',
            deadline_before_booking_number: 0,
            deadline_before_booking_string: '',
            service_address: {},
            all_equipments: [],
            all_prestations: [],
            all_options: [],
            prestations_filter: [],
            uniqFilter: [],
            options: {},
            options2: {},
            priceOptions: '',
            priceOptions2: '',
            descOptions: '',
            unityOptions: '',
            exp: '',

            diploma: {},
            haveDiploma: false,
            name_diploma: '',
            year_diploma: '',
            file_diploma: null,


            certification: {},
            haveCertification: false,
            name_certification: '',
            year_certification: '',
            file_certification: null,


            typeOptions: null,
            typeOptions2: null,
            otherOptions: false,
            optionsSelected: false,
            haveOption: false,
            clickAddress: false,
            dates: [],

            city: null,
            zip_code: null,
            address: null,
            country: null,
            lat: null,
            lng: null,

            pageNumber: 1,
            numPages: null,
            extDiploma: '',
            extCertification: '',








        };
        this.handleChecked = this.handleChecked.bind(this);
        this.onChangeAlgolia = this.onChangeAlgolia.bind(this);

    }

    static getInitialProps ({ query: { id } }) {
        return { service_id: id }

    }

    componentDidMount() {
        const id = this.props.service_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        let dates = [];
        const actualDate = new Date().getFullYear();
        for (let i = 1950; i <= actualDate; i++) {
            dates.push(i);
        }
        this.setState({dates: dates});

        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                if(user.is_alfred === false) {
                    Router.push('/becomeAlfredForm');
                } else {
                    this.setState({ city: user.billing_address.city, address: user.billing_address.address, zip_code: user.billing_address.zip_code,
                        country: user.billing_address.country, lat:user.billing_address.gps.lat, lng: user.billing_address.gps.lng});

                    axios.get(url+`myAlfred/api/service/${id}`)
                        .then(response => {
                            const data = response.data;
                            this.setState({all_equipments: data.equipments,service: data});

                            data.equipments.forEach(h => {
                                this.setState({[h.label]:false})

                            });


                        })
                        .catch(error => {
                            console.log(error);
                        });

                    axios.get(url+`myAlfred/api/prestation/${id}`)
                        .then(result => {
                            let prestations = result.data;
                            this.setState({all_prestations: prestations});
                            let arrayFilter =  [];

                            prestations.forEach(e => {
                                arrayFilter.push(e.filter_presentation);
                                let uniqFilter = _.uniqBy(arrayFilter,'label');

                                this.setState({uniqFilter: uniqFilter});
                            });
                            prestations.forEach(a => {
                                this.setState({[a.label]:false});
                                this.setState({[a.label+'price']: ''});
                                this.setState({[a.label+'billing']: ''});

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
                }




            })
            .catch(err => {
                    console.log(err);
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );




    }

    onChange2 = e => {
        this.setState({ [e.target.name]: e.target.value });


    };

    onChangeAlgolia({query, rawAnswer, suggestion, suggestionIndex}) {
        this.setState({city: suggestion.city, address: suggestion.name, zip_code: suggestion.postcode,country: suggestion.country,
            lat: suggestion.latlng.lat, lng: suggestion.latlng.lng});


    };

    onChangeDiploma = e => {
        this.setState({file_diploma: e.target.files[0]});


    };

    onChangeCertification = e => {
        this.setState({file_certification: e.target.files[0]});


    };


    validateOptions = () => {

        this.setState(prevState => ({
            options: {
                ...prevState.options,
                price: this.state.priceOptions,
                option_extra: this.state.typeOptions.label
            }
        }));

    };

    validateOptions2 = () => {

        this.setState(prevState => ({
            options: {
                label: this.state.descOptions,
                price: this.state.priceOptions2,
                unity: this.state.unityOptions.label,
                option_extra: this.state.typeOptions2.label
            }
        }));

    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
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

    handleChange = name => event => {
        this.setState({[name]: event.target.checked });
    };

    onChangePrestation(label,id) {
        const arrayPrestations = [];
        let array = [...this.state.prestations];
        let index = _.findIndex(array,['prestation',id]);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({prestations: array});
            this.setState({[label+'price']:null});
            this.setState({[label+'billing']:null});
        } else {
            const obj = {prestation: id,billing:null,price:null};
            arrayPrestations.push(obj);
            this.setState({prestations: [...this.state.prestations, obj]});
        }


    };

    onChangePrice(label,e,id) {
        let array = this.state.prestations;
        let index = _.findIndex(array,['prestation',id]);
        array[index].price = e.target.value;
        this.setState({prestations:  array});
    };

    onChangeBilling(label,e,id) {
        let array = this.state.prestations;
        let index = _.findIndex(array,['prestation',id]);
        array[index].billing = e.target.value;
        this.setState({prestations:  array});
    }


    onSubmit = e => {
        e.preventDefault();

        const service = this.props.service_id;
        const prestations = this.state.prestations;
        const options = this.state.options;
        const city = this.state.city;
        const address = this.state.address;
        const zip_code = this.state.zip_code;
        const country = this.state.country;
        const lat = this.state.lat;
        const lng = this.state.lng;
        const deadline_before_booking = this.state.deadline_before_booking_number + ' '+this.state.deadline_before_booking_string;
        const equipments = this.state.equipments;
        const perimeter = this.state.perimeter;
        const minimum_basket = this.state.minimum_basket;
        const description = this.state.description;
        const level  = this.state.level;
        const name_diploma = this.state.name_diploma;
        const year_diploma = this.state.year_diploma;
        let diploma = this.state.file_diploma;
        const name_certification = this.state.name_certification;
        const year_certification = this.state.year_certification;
        let certification = this.state.file_certification;

        const formData = new FormData();
        formData.append('service',service);
        formData.append('prestations',JSON.stringify(prestations));
        formData.append('options',JSON.stringify(options));
        formData.append('city',city);
        formData.append('address',address);
        formData.append('zip_code',zip_code);
        formData.append('country',country);
        formData.append('lat',lat);
        formData.append('lng',lng);
        formData.append('deadline_before_booking',deadline_before_booking);
        formData.append('equipments',JSON.stringify(equipments));
        formData.append('perimeter',perimeter);
        formData.append('minimum_basket',minimum_basket);
        formData.append('description',description);
        formData.append('level',level);
        formData.append('name_diploma',name_diploma);
        formData.append('year_diploma',year_diploma);
        formData.append('file_diploma',diploma);
        formData.append('name_certification',name_certification);
        formData.append('year_certification',year_certification);
        formData.append('file_certification',certification);



        axios.post(`${url}myAlfred/api/serviceUser/myShop/add`,formData)
            .then(res => {

                toast.info('Service ajouté avec succès');
                Router.push({pathname:'/myShop/services'})
            })
            .catch(err => {
                console.log(err);
            })




    };


    render() {
        const { classes } = this.props;
        const {service} = this.state;
        const {all_prestations} = this.state;
        const {uniqFilter} = this.state;
        const {all_options} = this.state;
        const {all_equipments} = this.state;
        const {optionsSelected} = this.state;
        const {diploma} = this.state;
        const {certification} = this.state;
        const {haveDiploma} = this.state;
        const {haveCertification} = this.state;
        const {clickAddress} = this.state;
        const {dates} = this.state;
        const array_option = all_options.map(e =>(
            {
                label: e.label,
                value: e._id,
                billing: e.billing
            }
        ));



        return (

            <Layout>

                <Grid container className={classes.bigContainer}>
                    <Grid item xs={7} style={{paddingLeft:20}}>
                        <h2 style={{fontWeight: '100'}}>Paramétrez votre service {service.label}</h2>

                        <Grid container>
                            <Grid item xs={12}>
                                <h2>{service.label}</h2>
                            </Grid>
                            <Grid item xs={12}>

                                {uniqFilter.map(a => {
                                    return (
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <h4>{a.label}</h4>
                                            </Grid>

                                            {all_prestations.map((z,index) => {
                                                if(z.filter_presentation.label !== a.label){
                                                    return null

                                                } else {
                                                    return (
                                                        <Grid item xs={4} key={index}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Switch
                                                                        type="checkbox"
                                                                        checked={this.state[z.label] ? true : false}
                                                                        onChange={()=> {
                                                                            this.setState({[z.label]: !this.state[z.label]});
                                                                            this.onChangePrestation(z.label,z._id)
                                                                        }


                                                                        }
                                                                        color="primary"
                                                                    />
                                                                }
                                                                label={z.label}
                                                            />
                                                            {this.state[z.label] ?
                                                                <React.Fragment><TextField
                                                                    id="standard-name"
                                                                    value={this.state[z.label+'price']}
                                                                    name={z.label+'price'}
                                                                    onChange={(event)=>{
                                                                        this.onChange2(event);
                                                                        this.onChangePrice(z.label,event,z._id);
                                                                    }}
                                                                    style={{width: 125}}
                                                                    label={`Prix`}
                                                                    type="number"
                                                                    disabled={!this.state[z.label]}
                                                                    margin="none"
                                                                    InputProps={{
                                                                        inputProps: {
                                                                            min: 0
                                                                        },
                                                                        startAdornment: <InputAdornment position="start">€</InputAdornment>,

                                                                    }}

                                                                />
                                                                    <TextField
                                                                        style={{width: '100%'}}
                                                                        select
                                                                        margin="normal"
                                                                        variant="outlined"
                                                                        helperText={`Méthode de facturation`}
                                                                        value={this.state[z.label+'billing']}
                                                                        name={z.label+'billing'}
                                                                        onChange={(event)=>{this.onChange2(event);
                                                                            this.onChangeBilling(z.label,event,z._id)}}
                                                                    >
                                                                        <MenuItem value="">...</MenuItem>
                                                                        {z.billing.map(y => (
                                                                            <MenuItem key={y.value} value={y.label}>{y.label}</MenuItem>
                                                                        ))}
                                                                    </TextField>


                                                                </React.Fragment>

                                                                : null}

                                                        </Grid>

                                                    )
                                                }
                                            })}


                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid container>
                            <Grid item xs={12}>
                                <h2>Option / Supplément</h2>
                            </Grid>
                            <Grid item xs={9}>


                                    <Select
                                        placeholder="Options disponibles"
                                        isClearable={true}
                                        isDisabled={this.state.otherOptions}
                                        options={
                                            array_option
                                        }
                                        onChange={ opt => {
                                            if(opt != null) {


                                                const optObj = {label: opt.label, price: null, unity: opt.billing, type: null};
                                                this.setState({options: optObj, optionsSelected: true})
                                            }
                                        }}
                                        theme={theme => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary: '#2FBCD3',
                                            }
                                        })}
                                    />
                            </Grid>
                            {optionsSelected ?
                                <React.Fragment>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="standard-name"
                                            disabled={this.state.otherOptions}
                                            label="Prix"
                                            type={'number'}
                                            name={'priceOptions'}
                                            className={classes.textField}
                                            value={this.state.priceOptions}
                                            onChange={this.onChange2}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                            }}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Select
                                            placeholder="Type"
                                            isClearable={true}
                                            isDisabled={this.state.otherOptions}
                                            options={[
                                                {value: 'option', label: 'Option'},
                                                {value: 'supplement', label: 'Supplément'},
                                            ]}
                                            value={this.state.typeOptions}
                                            onChange={ async typeOptions => {
                                                await this.setState({typeOptions})
                                            }}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary: '#2FBCD3',
                                                }
                                            })}
                                        />

                                    </Grid>
                                    <Button color={"primary"} variant={"contained"} style={{color:"white"}} onClick={()=> this.validateOptions()}>Valider mon option</Button>

                                </React.Fragment>

                                : null}

                            <Grid item xs={12}>

                                    <React.Fragment><FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.otherOptions}
                                                onChange={()=>this.setState({otherOptions: !this.state.otherOptions})}
                                                value={this.state.otherOptions}
                                                color="primary"
                                            />
                                        }
                                        label="Autre option"
                                    />



                                    </React.Fragment>



                            </Grid>
                            {this.state.otherOptions ?
                                <React.Fragment><Grid container>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="standard-name"
                                            label="Description"
                                            type={'text'}
                                            className={classes.textField}
                                            value={this.state.descOptions}
                                            onChange={this.onChange2}
                                            name={'descOptions'}
                                            variant={"outlined"}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Select
                                            placeholder="Unité"
                                            isClearable={true}
                                            options={[
                                                {value: 'm2', label: 'm2'},
                                                {value: 'cm2', label: 'cm2'},
                                                {value: 'mm2', label: 'mm2'},
                                            ]}
                                            onChange={async unityOptions => {
                                                await this.setState({unityOptions})
                                            }}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary: '#2FBCD3',
                                                }
                                            })}
                                        />

                                    </Grid>
                                </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="standard-name"
                                            label="Prix"
                                            type={'number'}
                                            className={classes.textField}
                                            value={this.state.priceOptions2}
                                            name={'priceOptions2'}
                                            onChange={this.onChange2}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                            }}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Select
                                            placeholder="Type"
                                            isClearable={true}
                                            options={[
                                                {value: 'option', label: 'Option'},
                                                {value: 'supplement', label: 'Supplément'},
                                            ]}
                                            onChange={async typeOptions2 => {
                                                await this.setState({typeOptions2})}}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary: '#2FBCD3',
                                                }
                                            })}
                                        />
                                    </Grid>
                                    <Button color={"primary"} variant={"contained"} style={{color:"white"}} onClick={()=> this.validateOptions2()}>Valider mon option</Button>

                                </React.Fragment>


                                : null}

                        </Grid>
                        <hr/>
                        <Grid container>
                            <Grid item xs={12}>
                                <h2>Indiquez ce que vous fournissez</h2>
                            </Grid>
                            <Grid item xs={12}>
                                <p>Sélectionnez les produits et le matériel que vous fournissez dans le cadre de vos prestations de service</p>
                            </Grid>
                            {all_equipments.map((e,index)=> {
                                if(this.state[e.label]){
                                    return(
                                        <Grid item xs={3}>
                                            <label style={{cursor: 'pointer'}} key={index} onClick={() => {
                                                this.setState({[e.label]: false});
                                                let array = [...this.state.equipments]; // make a separate copy of the array
                                                let index = array.indexOf(e._id);
                                                if (index !== -1) {
                                                    array.splice(index, 1);
                                                    this.setState({equipments: array});
                                                }

                                            }

                                            }>


                                                <img src={`../../${e.logo2}`} height={80} width={80}
                                                     alt={`logo2`}/>
                                            </label>
                                            <Checkbox
                                                style={{display: 'none'}}
                                                color="primary"
                                                type="checkbox"
                                                checked={this.state[e.label]}
                                                onChange={() =>
                                                    this.setState({[e.label]: false})

                                                }
                                            />

                                        </Grid>)
                                }else {
                                    return (
                                        <Grid item xs={3}>
                                            <label style={{cursor: 'pointer'}} key={index} onClick={() => {
                                                this.setState({[e.label]: true});
                                                this.setState({
                                                    equipments: [...this.state.equipments, e._id]
                                                })
                                            }

                                            }>


                                                <img src={`../../${e.logo}`} height={100} width={100}
                                                     alt={`logo`}/>
                                            </label>
                                            <Checkbox
                                                style={{display: 'none'}}
                                                color="primary"
                                                type="checkbox"
                                                checked={this.state[e.label]}
                                                onChange={() =>
                                                    this.setState({[e.label]: true})

                                                }
                                            />


                                        </Grid>
                                    )
                                }

                            })}
                        </Grid>
                        <hr/>
                        <Grid container>
                            <Grid item xs={12}>
                                <h2>Définissez votre montant minimum de réservation </h2>
                            </Grid>
                            <Grid item xs={12}>
                                <p>
                                    Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service. Si vous indiquez
                                    un montant de 10€, les clients ne pourront pas réserver vos services si la somme des prestations n’atteint
                                    pas ce montant.


                                </p>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="standard-name"
                                    label="Panier minimum"
                                    type={'number'}
                                    className={classes.textField}
                                    value={this.state.minimum_basket}
                                    name={'minimum_basket'}
                                    onChange={this.onChange2}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                    }}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid container>
                            <Grid item xs={12}>
                                <h2>Renseigner votre périmètre d'intervention </h2>
                            </Grid>
                            <Grid item xs={12}>
                                <p>
                                    Votre périmètre d’intervention est la zone dans laquelle vous souhaitez réaliser vos services. Par défaut, nous utiliserons la
                                    ville de l’adresse renseignée dans votre profil comme base de référence. Cette adresse ne vous convient pas ? Vous pouvez changer
                                    votre ville de référence à tout moment !
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <h3 style={{color: '#757575'}}>Ma ville de référence </h3>
                            </Grid>
                            <Grid container style={{border: '1px solid #C6C6C6',width:'60%'}}>
                                <Grid item xs={8}>
                                    <p style={{paddingLeft:20}}>{this.state.city} ({this.state.zip_code})</p>
                                </Grid>
                                <Grid item xs={4} style={{display:"flex",justifyContent:"flex-end"}}>
                                    <Button onClick={()=>this.setState({clickAddress: true})} color={"secondary"} variant={"contained"} style={{color:"white",borderRadius:"unset"}}>Modifier</Button>
                                </Grid>
                            </Grid>

                            {clickAddress ?

                                <React.Fragment>
                                    <Grid container style={{marginTop:20}}>
                                        <Grid item xs={7}>
                                            <AlgoliaPlaces
                                                placeholder='Veuillez renseigner votre adresse'

                                                options={{
                                                    appId: 'plKATRG826CP',
                                                    apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                                                    language: 'fr',
                                                    countries: ['fr'],
                                                    type: 'address',

                                                }}

                                                onChange={(suggestion) =>this.onChangeAlgolia(suggestion)}
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                inputProps={{
                                                    readOnly: true
                                                }}
                                                id="standard-with-placeholder"
                                                color="primary"
                                                variant="outlined"
                                                placeholder="Adresse"
                                                margin="normal"
                                                style={{ width: '100%' }}
                                                type="text"
                                                name="address"
                                                value={this.state.address}
                                                onChange={this.onChange2}
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                inputProps={{
                                                    readOnly: true
                                                }}
                                                id="standard-with-placeholder"
                                                color="primary"
                                                variant="outlined"
                                                placeholder="Ville"
                                                margin="normal"
                                                style={{ width: '100%' }}
                                                type="text"
                                                name="city"
                                                value={this.state.city}
                                                onChange={this.onChange2}
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                inputProps={{
                                                    readOnly: true
                                                }}
                                                id="standard-with-placeholder"
                                                color="primary"
                                                variant="outlined"
                                                placeholder="Code postal"
                                                margin="normal"
                                                style={{ width: '100%' }}
                                                type="text"
                                                name="zip_code"
                                                value={this.state.zip_code}
                                                onChange={this.onChange2}
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                inputProps={{
                                                    readOnly: true
                                                }}
                                                id="standard-with-placeholder"
                                                color="primary"
                                                variant="outlined"
                                                placeholder="Pays"
                                                margin="normal"
                                                style={{ width: '100%' }}
                                                type="text"
                                                name="country"
                                                value={this.state.country}
                                                onChange={this.onChange2}
                                            />
                                        </Grid>

                                    </Grid>
                                </React.Fragment>

                                : null}
                            <Grid container>
                                <Grid item xs={12}>
                                    <p>Définissez à présent le périmètre que vous souhaitez couvrir :</p>
                                </Grid>
                                <Grid item xs={10}>
                                    <InputRange
                                        formatLabel={value => `${value}km`}
                                        step={5}
                                        maxValue={500}
                                        minValue={5}
                                        value={this.state.perimeter}
                                        onChange={value =>this.setState({perimeter: value})}
                                    />

                                </Grid>
                            </Grid>
                        </Grid>
                        <hr style={{marginTop:40}}/>
                        <Grid container>
                            <Grid item xs={12}>
                                <h2>Indiquez votre délai de prévenance</h2>
                            </Grid>
                            <Grid item xs={12}>
                                <p>
                                    Le délai de prévenance correspond au délai nécessaire entre la réservation et la réalisation du service.
                                    Par exemple, si vous indiquez un délai de 24 heures, un client devra réserver votre service au moins 24
                                    heures avant votre intervention.


                                </p>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{width: 30, height: 30, borderRadius: '50%', border: '1px solid #2FBCD3', textAlign: "center",
                                    lineHeight: 1.6, cursor: 'pointer', display: 'inline-block', marginRight: 25 }}
                                     onClick={()=> this.setState({deadline_before_booking_number: this.state.deadline_before_booking_number -1})}>
                                    -
                                </div>

                                <div style={{display: 'inline-block', fontSize: 20, lineHeight: 2.8}}>{this.state.deadline_before_booking_number}</div>
                                <div style={{width: 30, height: 30, borderRadius: '50%', border: '1px solid #2FBCD3', textAlign: "center",
                                    lineHeight: 1.6, cursor: 'pointer', display: 'inline-block', marginLeft: 25, marginRight: '5%' }}
                                     onClick={()=> this.setState({deadline_before_booking_number: this.state.deadline_before_booking_number +1})}>
                                    +
                                </div>

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    style={{width: '30%'}}
                                    select
                                    margin="dense"
                                    variant="outlined"
                                    label="Heures / jours / semaines"
                                    value={this.state.deadline_before_booking_string}
                                    name={'deadline_before_booking_string'}
                                    onChange={this.onChange2}
                                >
                                    <MenuItem value="heures">heure(s)</MenuItem>
                                    <MenuItem value="jours">jour(s)</MenuItem>
                                    <MenuItem value="semaines">semaine(s)</MenuItem>
                                </TextField>

                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid container>
                            <Grid item xs={12}>
                                <h2>Décrivez brievement votre expertise !</h2>
                            </Grid>
                            <Grid item xs={12}>
                                <p>

                                    Mettez en évidence vos compétences et votre expertise dans ce service. Les utilisateurs auront accès à
                                    ces informations, n’hésitez pas à valoriser votre expérience, vos réalisations et vos atouts pour ce service !


                                </p>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    style={{width:'100%'}}
                                    multiline
                                    rows={6}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.description}
                                    name={'description'}
                                    onChange={this.onChange2}
                                />
                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid container>
                            <Grid item xs={12}>
                                <h2>Votre expérience, vos certifications & diplômes</h2>
                            </Grid>

                            <Grid item xs={12}>
                                <p>
                                    Si vous possédez des certifications et/ou diplômes pour ce service, mettez les en avant ! Après vérification
                                    par My-Alfred, vous aurez le statut d’Alfred certifié et/ou diplômé sur ce service.
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <h3 style={{color:'#757575'}}>Nombre d'années d'expérience</h3>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    style={{width: '100%'}}
                                    select
                                    margin="normal"
                                    variant="outlined"
                                    placeholder={'Vos années d\'expériences'}
                                    value={this.state.level}
                                    name={'level'}
                                    onChange={this.onChange2}
                                >
                                    <MenuItem value="">...</MenuItem>
                                    <MenuItem value="ZeroOrOne">Entre 0 et 1 an</MenuItem>
                                    <MenuItem value="OneToFive">Entre 1 et 5 ans</MenuItem>
                                    <MenuItem value="FiveToTen">Entre 5 et 10 ans</MenuItem>
                                    <MenuItem value="MoreThanTen">Plus de 10 ans</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <h3 style={{color:'#757575'}}>Diplômes</h3>
                            </Grid>

                                <React.Fragment>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <TextField
                                                style={{width: '100%'}}
                                                type={'text'}
                                                margin="normal"
                                                variant="outlined"
                                                placeholder={'Nom du diplôme'}
                                                value={this.state.name_diploma}
                                                name={'name_diploma'}
                                                onChange={this.onChange2}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <TextField
                                                style={{width: '100%'}}
                                                label="Année d'obtention"
                                                margin="normal"
                                                variant="outlined"
                                                select
                                                value={this.state.year_diploma}
                                                name={'year_diploma'}
                                                onChange={this.onChange2}
                                            >
                                                {dates.map(e => (
                                                    <MenuItem value={e}>{e}</MenuItem>
                                                ))}
                                            </TextField>

                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label style={{display: 'flex', marginTop: 15,backgroundColor:'#AFAFAF',justifyContent:"center"}}>
                                                <p style={{cursor:"pointer",color:'black'}}>Joindre mon diplôme</p>
                                                <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="file_diploma" type="file"
                                                       onChange={this.onChangeDiploma}
                                                       className="form-control"
                                                />
                                            </label>
                                            <span>{this.state.file_diploma !== null ? this.state.file_diploma.name : null}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <p>
                                                En téléchargeant votre diplôme, votre diplôme aura le statut de diplôme vérifié auprès des
                                                utilisateurs mais il ne sera jamais visible par ses derniers.
                                            </p>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>


                            <Grid item xs={12}>
                                <h3 style={{color:'#757575'}}>Certifications</h3>
                            </Grid>


                                <React.Fragment>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <TextField
                                                style={{width: '100%'}}
                                                type={'text'}
                                                margin="normal"
                                                variant="outlined"
                                                placeholder={'Nom de la certification'}
                                                value={this.state.name_certification}
                                                name={'name_certification'}
                                                onChange={this.onChange2}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <TextField
                                                style={{width: '100%'}}
                                                label="Année d'obtention"
                                                margin="normal"
                                                variant="outlined"
                                                select
                                                value={this.state.year_certification}
                                                name={'year_certification'}
                                                onChange={this.onChange2}
                                            >
                                                {dates.map(e => (
                                                    <MenuItem value={e}>{e}</MenuItem>
                                                ))}
                                            </TextField>

                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label style={{display: 'flex', marginTop: 15,backgroundColor:'#AFAFAF',justifyContent:"center"}}>
                                                <p style={{cursor:"pointer",color:'black'}}>Joindre ma certification</p>
                                                <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="file_certification" type="file"
                                                       onChange={this.onChangeCertification}
                                                       className="form-control"
                                                />
                                            </label>
                                            <span>{this.state.file_certification !== null ? this.state.file_certification.name : null}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <p>
                                                En téléchargeant votre certification, votre certification aura le statut de certification vérifiée auprès des
                                                utilisateurs mais elle ne sera jamais visible par ces derniers.
                                            </p>
                                        </Grid>

                                    </Grid>
                                </React.Fragment>



                        </Grid>
                        <hr/>
                        <Grid container style={{display:"flex",justifyContent:"flex-end",width:'90%'}}>
                            <Button variant={"contained"} onClick={(event)=>this.onSubmit(event)} color={"secondary"} style={{color:"white"}}>Enregistrer</Button>
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



export default withStyles(styles)(addService);


