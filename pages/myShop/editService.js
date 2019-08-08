
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
            service_address: {},
            all_equipments: [],
            all_prestations: [],
            all_options: [],
            current_equipments: [],
            current_options: {},
            prestations_filter: [],
            uniqFilter: [],
            options: {},
            options2: {},
            priceOptions: '',
            priceOptions2: '',
            descOptions: '',
            unityOptions: '',
            typeOptions: null,
            typeOptions2: null,
            otherOptions: false,
            optionsSelected: false,
            haveOption: false,
            clickAddress: false,

            city: '',
            zip_code: '',
            address: '',
            country: '',
            lat: '',
            lng: '',








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

        axios
            .get(url+`myAlfred/api/serviceUser/${id}`)
            .then(res => {
                let serviceUser = res.data;
                this.setState({serviceUser: serviceUser,service: serviceUser.service ,prestations: serviceUser.prestations, current_equipments: serviceUser.equipments,
                    perimeter: serviceUser.perimeter,service_address: serviceUser.service_address});
                if(typeof serviceUser.option != 'undefined'){

                this.setState({current_options: serviceUser.option,haveOption: true});
                }

                axios.get(url+`myAlfred/api/service/${serviceUser.service._id}`)
                    .then(response => {
                        const data = response.data;
                        this.setState({all_equipments: data.equipments});
                        data.equipments.forEach(e => {
                            this.state.current_equipments.forEach(h => {
                                if(h.label === e.label){
                                    this.setState({[e.label]:true});
                                    this.setState({
                                        equipments: [...this.state.equipments, h._id]
                                    })
                                } else {
                                    this.setState({[e.label]:false})
                                }
                            });

                        })
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
                        });

                        this.state.uniqFilter.forEach(f=> {

                            axios.get(url+`myAlfred/api/prestation/${serviceUser.service._id}/${f._id}`)
                                .then(data => {
                                    this.setState({[f.label]:data.data});

                                })
                                .catch(err => console.log(err))


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

    onChange2 = e => {
        this.setState({ [e.target.name]: e.target.value });


    };

    onChangeAlgolia({query, rawAnswer, suggestion, suggestionIndex}) {
        this.setState({city: suggestion.city, address: suggestion.name, zip_code: suggestion.postcode,country: suggestion.country,
            lat: suggestion.latlng.lat, lng: suggestion.latlng.lng});


    }


    validateOptions = () => {

        this.setState(prevState => ({
            options: {
                ...prevState.options,
                price: this.state.priceOptions,
                type: this.state.typeOptions.label
            }
        }));

    };

    validateOptions2 = () => {

        this.setState(prevState => ({
            options: {
                label: this.state.descOptions,
                price: this.state.priceOptions2,
                unity: this.state.unityOptions.label,
                type: this.state.typeOptions2.label
            }
        }));

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




    render() {
        const { classes } = this.props;
        const {serviceUser} = this.state;
        const {service} = this.state;
        const {all_prestations} = this.state;
        const {uniqFilter} = this.state;
        const {loaded} = this.state;
        const {service_address} = this.state;
        const {all_options} = this.state;
        const {all_equipments} = this.state;
        const {current_options} = this.state;
        const {optionsSelected} = this.state;
        const {haveOption} = this.state;
        const {clickAddress} = this.state;
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
                                <h2>Option / Supplément</h2>
                            </Grid>
                            <Grid item xs={9}>
                                {haveOption ?
                                    <React.Fragment><p>Option actuellement sélectionnée : {current_options.label} au prix de {current_options.price}€/
                                        {current_options.unity}</p>
                                        <Button onClick={()=>this.setState({haveOption:false})} color={"primary"} variant={"contained"} style={{color:"white"}}>Modifier</Button>
                                    </React.Fragment>

                                    :

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
                                    />}
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
                                        {haveOption ? null :
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

                                                <Button onClick={()=>this.setState({haveOption:true})} variant={"contained"} color={"secondary"} style={{color:"white"}}>Annuler</Button>


                                            </React.Fragment>

                                        }

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


                                                <img src={`../../${e.logo2}`} height={100} width={100}
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
                                    value={serviceUser.minimum_basket}
                                    name={'minimum_basket'}
                                    onChange={this.onChange}
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
                                    <p style={{paddingLeft:20}}>{service_address.city} ({service_address.zip_code})</p>
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
                                                label="Adresse"
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
                                                label="Ville"
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
                                                label="Code postal"
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
                                                label="Pays"
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
                                <div style={{width: 30, height: 30, borderRadius: '50%', border: '1px solid #2FBCD3', textAlign: "center", lineHeight: 1.6, cursor: 'pointer', display: 'inline-block', marginRight: 25 }}>
                                    -
                                </div>

                                <div style={{display: 'inline-block', fontSize: 20, lineHeight: 2.8}}>chiffre</div>
                                <div style={{width: 30, height: 30, borderRadius: '50%', border: '1px solid #2FBCD3', textAlign: "center", lineHeight: 1.6, cursor: 'pointer', display: 'inline-block', marginLeft: 25, marginRight: '5%' }} >
                                    +
                                </div>

                            </Grid>
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


