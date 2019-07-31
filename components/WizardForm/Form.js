import React from 'react';
import { Formik, Field, ErrorMessage, FieldArray, yupToFormErrors } from 'formik';
import styled from 'styled-components';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import InputRange from 'react-input-range';
import "../../static/inputRange.css";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from '@material-ui/core/styles';
import {fade} from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import * as Yup from 'yup';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Switch from "@material-ui/core/Switch";
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Select from 'react-select';

import { Debug } from './Debug';
import MultipleSelect from './MultipleSelect';
import Calendar from '../Calendar/calendar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CityFinder from './CityFinder';
import AddressFinder from './AddressFinder';
import Siret from './Siret';
import '../../static/form.css';
import '../../static/forminputs.css';

const { config } = require('../../config/config');
const url = config.apiUrl;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : 'Required');
const styles = theme => ({
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 3rem 0 3rem'
    },
    card: {
        minHeight: '400px !important',
        boxShadow: 'none',
        //padding: '1.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        height: '86vh',
        //maxHeight: 700,
        overflow: 'auto',
        maxWidth: 1000,
        fontFamily: 'helveticaNeue',

    },
    cardHeader: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        marginBottom: '1rem',
    },
    cardProgressBar: {
        display: 'flex',
        flexGrow: 1,
    },
    cardBody: {
        display: 'flex',
        flexGrow: 8,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        backgroundColor: 'lightgrey',
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 232,
        },
    },
    chip: {
        marginRight: 5,
        marginBottom: 5,
    },
    categoryExpansion: {
        marginBottom: 5,
    },
    textinput: {
        marginTop: '35px',
    },
    dlidentite1: {
        lineHeight: 5.3,
        '&:hover': {
            cursor: 'pointer',
            color: '#000080',
        }
    },
    dlidentite2: {
        '&:hover': {
            cursor: 'pointer',
            color: '#000080',
        }
    },
    vridentite: {
        marginTop: 35,
    },
    titre1: {
        fontSize: 18,
    },
    titre2: {
        fontSize: 18,
    },
    titre3: {
        fontSize: 18,
    },
    titre4: {
        fontSize: 18,
    },
    petit1: {
        fontSize: 12,
    },
    petit2: {
        fontSize: 12,
    },
    checkboxespart: {
        marginTop: 25,
    },
    finpres: {
        marginTop: 25,
    },
    obligations: {
        marginTop: 31,
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing,
    },
    title1: {
        backgroundColor: '#6d7892',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    title2: {
        backgroundColor: '#6d7892',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        width: '100%',
        marginTop: 10,
    },
    text1: {
        marginTop: 5,
        marginBottom: 5,
        fontFamily: 'helveticaNeue',
        letterSpacing: 1,
        fontWeight: '100',
    },
    banner: {
        marginBottom: 25,
        backgroundColor: '#2FBCD3',
    },
    newContainer: {
        padding: 20,
    },
    imgDiv: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    }

});

class Wizard extends React.Component {
    static Page = ({ children }) => children;

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            values: props.initialValues,
        };
    }

    next = values =>
        this.setState(state => ({
            page: Math.min(state.page + 1, this.props.children.length - 1),
            values,
        }));

    previous = () =>
        this.setState(state => ({
            page: Math.max(state.page - 1, 0),
        }));
        
    validate = values => {
        const activePage = React.Children.toArray(this.props.children)[
            this.state.page
            ];
        return activePage.props.validate ? activePage.props.validate(values) : {};
    };

    handleSubmit = (values, bag) => {
        const { children, onSubmit } = this.props;
        const { page } = this.state;
        const isLastPage = page === React.Children.count(children) - 1;
        if (isLastPage) {
            values.submission.forEach(e => {
                let arrayPrestations = [];
                let arrayEquipments = [];
                const service = e.serviceId;
                e.filters.forEach(a => {
                    a.prestations.forEach(b => {

                        if(b.checked === true) {
                            const newObj = {prestation: b.id, price: b.price};
                            arrayPrestations.push(newObj);

                        }
                    })
                })
                e.equipments.forEach(c => {

                    if(c.checked === true) {
                        arrayEquipments.push(c.id);
                    }
                })
                const city = e.city.value;
                const perimeter = e.perimeter;
                const minimum_basket = e.minimumBasket;
                const deadline_before_booking = e.delayBeforeShop + ' ' + e.delayBeforeShopDWM;
                const description = e.descService;

                let graduated = false;
                let diploma = null;
                if(e.diploma !== null) {
                    graduated = true;
                    diploma = e.diploma;

                }
                let is_certified = false;
                let certification = null;
                if(e.certification !== null) {
                     is_certified = true;
                     certification = e.certification;

                }

                let active = false;
                let price = 0;
                if(e.increases.checked === true) {
                     active = true;
                     price = e.increases.price;
                }
                const formData = new FormData();
                formData.append('service',service);
                formData.append('prestations',JSON.stringify(arrayPrestations));
                formData.append('equipments',JSON.stringify(arrayEquipments));
                formData.append('city',city);
                formData.append('perimeter',perimeter);
                formData.append('minimum_basket',minimum_basket);
                formData.append('deadline_before_booking',deadline_before_booking);
                formData.append('graduated',graduated.toString());
                formData.append('diploma',diploma);
                formData.append('is_certified',is_certified.toString());
                formData.append('certification',certification);
                formData.append('active',active.toString());
                formData.append('price',price.toString());
                formData.append('description',description);

                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                axios.post(url+'myAlfred/api/serviceUser/add',formData)
                    .then(res => {
                        alert("Service ajouté");

                            const booking_request = values.createShop.booking_request;
                            const my_alfred_conditions = values.createShop.my_alfred_conditions;
                            const profile_picture = values.createShop.profile_picture_user;
                            const identity_card = values.createShop.identity_card;
                            const recommandations = values.createShop.recommandations;
                            const welcome_message = values.createShop.welcome_message;
                            const flexible_cancel = values.createShop.flexible_cancel;
                            const moderate_cancel = values.createShop.moderate_cancel;
                            const strict_cancel = values.createShop.strict_cancel;



                            const is_particular = values.createShop.is_particular;
                            const is_professional = values.createShop.is_professional;
                            const self_employed = values.createShop.is_microCompany;
                            const individual_company = values.createShop.isIndividualCompany;
                            const name = values.createShop.denomination;
                            const creation_date = values.createShop.creationDate;
                            const naf_ape = values.createShop.nafape;
                            const siret = values.createShop.siret;

                            axios.get(`${url}myAlfred/api/serviceUser/currentAlfred`)
                                .then(response => {
                                    let data = response.data;
                                    let arrayService = [];

                                    data.forEach(q => {

                                        arrayService.push(q._id);

                                    });

                                    axios.post(url+'myAlfred/api/shop/add',{booking_request,my_alfred_conditions,profile_picture,identity_card
                                    , recommandations, welcome_message,flexible_cancel,moderate_cancel,strict_cancel,is_particular,is_professional,
                                    self_employed,individual_company,name,creation_date,naf_ape,siret,arrayService})
                                        .then(result => {
                                            alert('Shop créée avec succès !');


                                        })
                                        .catch(error => {
                                            console.log(error);
                                        })
                                })



                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
            const formDataIdProfile = new FormData();
            formDataIdProfile.append('myCardR',values.createShop.id_recto);
            formDataIdProfile.append('myCardV',values.createShop.id_verso);
            axios.post(url+'myAlfred/api/users/profile/idCard',formDataIdProfile)
                .then(res => {
                    alert('Profil mis à jours')
                })
                .catch(err => {
                    console.log(err);
                })

            const profilePicture = values.alfredUpdate.profile_picture_user;
            const formDataPicture = new FormData();
            formDataPicture.append('myImage',profilePicture);
            axios.post(url+'myAlfred/api/users/profile/picture',formDataPicture)
                .then(res => {
                    alert('Photo ajoutée')
                })
                .catch(err => {
                    console.log(err);
                })

            const phoneUser = values.alfredUpdate.phone;
            axios.post(url+'myAlfred/api/users/profile/phone',phoneUser)
                .then(res => {
                    alert('Téléphone ajouté');
                })
                .catch(err => {
                    console.log(err);
                });
            axios.put(url+'myAlfred/api/users/users/becomeAlfred')
                .then(res => {
                    alert('Vous êtes maintenant un Alfred');
                })
                .catch(err => {
                    console.log(err);
                })

            return console.log(values);
        } else {
            bag.setTouched({});
            bag.setSubmitting(false);
            this.next(values);
        }
    };

    phoneRegEx = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    Step0Schema = null;
    Step1Schema = null;
    Step2Schema = Yup.object().shape({
          submission: Yup.array().of(Yup.object().shape({
            descService: Yup.string().min(10, 'La description de votre service doit faire au moins 10 caractères').required('Veuillez entrer une description pour votre service'),
            minimumBasket: Yup.number().typeError('Un nombre est requis pour le minimum d\'achat').required('Le minimum d\'achat est requis'),
            delayBeforeShopDWM: Yup.string().typeError('Choisissez parmi heures, jours et semaines').required(),
            city: Yup.string().typeError('Veuillez entrer la ville où le service sera pratiqué').required('Veuillez entrer la ville où le service sera pratiqué'),
            filters: Yup.array().of(Yup.object().shape({
                prestations: Yup.array().of(Yup.object().shape({
                    checked: Yup.boolean(),
                    price: Yup.number().when('checked', {
                        is: true,
                        then: Yup.number().typeError('Le prix doit être un nombre').moreThan(0, 'Le prix doit être supérieur à 0€').required('Veuillez entrer un prix'),
                        otherwise: Yup.number().notRequired(),
                    })
                }))
            }))
        }))
    });
    Step3Schema = null;
    Step4Schema = Yup.object().shape({
        createShop: Yup.object().shape({
            welcome_message: Yup.string().min(10, 'Votre message doit faire au minimum 10 caractères').required('Veuillez entrer un message de bienvenue'),
        })
    });
    Step5Schema = Yup.object().shape({
        alfredUpdate: Yup.object().shape({
            phone: Yup.string().matches(this.phoneRegEx, 'Numéro de téléphone invalide')
        }),
        createShop: Yup.object().shape({
            is_professional: Yup.boolean(),
            id_recto: Yup.mixed().required('Veuillez uploader le recto de votre carte d\'identité ou bien votre passeport'),
            id_verso: Yup.mixed(),
            siret: Yup.string()
                .when('is_professional', {
                    is: true,
                    then: Yup.string().length(14, 'Mauvais code siret').required('Veuillez entrer un code siret'),
                    otherwise: Yup.string().notRequired(),
                }),
            denomination: Yup.string()
                .when('is_professional', {
                    is: true,
                    then: Yup.string().required('Veuillez entrer une dénomination'),
                    otherwise: Yup.string().notRequired(),
                }),
            creationDate: Yup.string()
                .when('is_professional', {
                    is: true,
                    then: Yup.string().required('Veuillez entrer une date de création'),
                    otherwise: Yup.string().notRequired(),
                }),
            nafape: Yup.string()
                .when('is_professional', {
                    is: true,
                    then: Yup.string().length(5, 'Code APE invalide'),
                    otherwise: Yup.string().notRequired(),
                }),
            nature_juridique: Yup.string()
                .when('is_professional', {
                    is: true,
                    then: Yup.string().required('Veuillez renseigner le statut juridique'),
                    otherwise: Yup.string().notRequired(),
                }),
            isEngaged: Yup.boolean().oneOf([true], 'Veuillez vous engager'),
            isCertified: Yup.boolean()
                .when('is_professional', {
                    is: true,
                    then: Yup.boolean().oneOf([true], 'Veuillez vous certifier'),
                    otherwise: Yup.boolean(),
                }),
        })
    })

    schemaArray =[this.Step0Schema, this.Step1Schema, this.Step2Schema, this.Step3Schema, this.Step4Schema, this.Step5Schema]

    render() {
        const { schemaArray } = this;
        const { children } = this.props;
        const { page, values } = this.state;
        const activePage = React.Children.toArray(children)[page];
        const isLastPage = page === React.Children.count(children) - 1;
        return (
            <Formik
                initialValues={values}
                enableReinitialize={false}
                validationSchema={schemaArray[page]}
                validate={this.validate}
                onSubmit={this.handleSubmit}
                render={({ values, handleSubmit, isSubmitting, setFieldValue, handleReset }) => (
                    <React.Fragment>
                        {page !== 0 && <div style={{backgroundColor: 'white'}}>
                            {page === 1 ? <h3 style={{fontFamily: 'helveticaNeue', marginLeft: 10, color: 'black', paddingTop: '1.5rem'}}>Etape 1 - Choisissez vos catégories et services</h3> : null}
                            {page === 2 ? <h3 style={{fontFamily: 'helveticaNeue', marginLeft: 10, color: 'black', paddingTop: '1.5rem'}}>Etape 1 - Configuration de vos services</h3> : null}
                            {page === 3 ? <h3 style={{fontFamily: 'helveticaNeue', marginLeft: 10, color: 'black', paddingTop: '1.5rem'}}>Etape 2 - Indiquez vos disponibilités et conditions</h3> : null}
                            {page === 4 ? <h3 style={{fontFamily: 'helveticaNeue', marginLeft: 10, color: 'black', paddingTop: '1.5rem'}}>Etape 2 - Indiquez vos disponibilités et conditions</h3> : null}
                            {page === 5 ? <h3 style={{fontFamily: 'helveticaNeue', marginLeft: 10, color: 'black', paddingTop: '1.5rem'}}>Etape 3 - Présentez vous !</h3> : null}
                            <div>
                                <Bar style={{backgroundColor: '#cacfe4'}}>
                                    {page === 1 ? <Fill width={'20%'} /> : null}
                                    {page === 2 ? <Fill width={'40%'} /> : null}
                                    {page === 3 ? <Fill width={'60%'} /> : null}
                                    {page === 4 ? <Fill width={'80%'} /> : null}
                                    {page === 5 ? <Fill width={'100%'} /> : null}
                                </Bar>
                            </div>
                        </div>}
                        <form onSubmit={handleSubmit} style={{display: 'flex', flexFlow: 'row'}}>
                            <div style={{position: 'relative', backgroundColor: 'white', width: page === 0 ? '100%' : 'none'}}>
                                <div style={{height: page !== 0 ? '85%' : '94vh', overflowY: 'scroll'}}>
                                    {activePage}
                                </div>
                                <div className="buttons" style={{position: 'absolute', bottom: 0, left: 0, top: page === 2 ? '726px' : 'none', width: '100%', padding: '0 3rem 3rem 3rem', backgroundColor: 'transparent', zIndex: '9999999'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', flexFlow: page === 0 ? 'row-reverse' : 'row'}}>
                                        {page !== 0 && <Button
                                            color="primary"
                                            type="button"
                                            onClick={this.previous}
                                            disabled={page === 0 ? true : false}
                                        >
                                            Retour
                                        </Button>}
                                        {page === 0 && <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            style={{color: 'white'}}
                                        >
                                            Suivant
                                        </Button>}
                                        {page === 1 && <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            style={{color: 'white'}}
                                            disabled={values.submission.length > 0 ? false : true}
                                        >
                                            Suivant
                                        </Button>}
                                        {page === 2 && 
                                            <Field render={({form}) => {
                                                const checkArr = [];

                                                form.values.submission.map(pc => {
                                                    if (pc.prestationsCount > 0) {
                                                        return checkArr.push(true);
                                                        //return form.values.checkArr.push(true);
                                                    } else {
                                                        return checkArr.push(false);
                                                        //return form.values.checkArr.push(false);
                                                    }
                                                })

                                                const check = el => {
                                                    return el === false;
                                                }

                                                return (
                                                    <Button type="submit" variant="contained" color="secondary" style={{marginTop: '45px', color: !checkArr.some(check) ? 'white' : null }} disabled={checkArr.some(check) ? true : false}>
                                                        Suivant
                                                    </Button>
                                                )
                                            }} 
                                        />}
                                        {page === 3 && <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            style={{marginTop: '45px', color: 'white'}}
                                        >
                                            Suivant
                                        </Button>}
                                        {page === 4 && 
                                        <Field render={({form}) => {
                                            let cancel = true;
        
                                            if (form.values.createShop.flexible_cancel === true || form.values.createShop.moderate_cancel === true || form.values.createShop.strict_cancel === true) {
                                                cancel = false;
                                            } else {
                                                cancel = true;
                                            }
        
                                            return (
                                                <Button type="submit" variant="contained" color="secondary" style={{marginTop: '45px', color: !cancel ? 'white' : null }} disabled={cancel}>
                                                    Suivant
                                                </Button>
                                            )
                                        }} />}
                                        {page === 5 &&
                                            <Field render={({form}) => {
                                                let check = true;

                                                if (form.values.createShop.is_particular === true) {
                                                    check = false;
                                                } else if(form.values.createShop.is_professional === true) {
                                                    check = false;
                                                } else if (form.values.createShop.is_professional === true) {
                                                    check = false;
                                                } else {
                                                    check = true;
                                                }

                                                return (
                                                    <Button type="submit" variant="contained" style={{marginTop: '45px', color: !check ? 'white' : null }} color="secondary" disabled={check}>
                                                        Envoyer
                                                    </Button>
                                                )
                                            }} />}
                                    </div>
                                    {/* POUR REVENIR EN ARRIERE */}
                                    {/*page > 0 && (
                        <button
                        type="button"
                        className="secondary"
                        onClick={this.previous}
                        >
                        « Previous
                        </button>
                    )*/}

                                    {/*!isLastPage && <button type="submit">Next »</button>*/}
                                    {/*isLastPage && (
                                        <button type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    )*/}
                                </div>
                            </div>
                            <div className="imgDiv" style={{width: '40%', overflow: 'hidden'}}>
                                <img src='../../static/backgrounds-blank-blue-953214.jpg' height='100%'  width='100%'/>
                            </div>
                        </form>
                    </React.Fragment>
                    
                )}
            />
        );
    }
}

class Thumb extends React.Component {
    state = {
        loading: false,
        thumb: undefined,
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) { return null; }

        if (loading) { return <p>loading...</p>; }

        return (<img src={thumb}
                     alt={file.name}
                     height={50}
                     width={50} />);
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isServicesReady: 0,
            isFilterReady: 0,
            isPrestationReady: 0,
            isEquipmentReady: 0,
            categories: [],
            services: [],
            filters: [],
            equipments: [],
            prestations: [],
            prestationsCheckboxes: [],

            servicesLength: 0,
            servicesValues: [],
            arrServices: [],
            arrServicesLabel: [],
            allInOneServ: null,

            isDisabledCategoryInput: false,
            isDisabledExpansionPanels: true,

            prestationsCount: 0,

            // TRUC OSEF
            serviceDescription: [],
            profile_picture: "",
            phone: "",
            recto: "",
            verso: "",
            isChecked: false,
            isParticular: false,
            isProfessional: false,
            isMicro_company: false,
            isIndividualCompany: false,
            siret: "",
            creationDate: "",
            denomination: "",
            nafape: "",
            isEngaged: false,
            isCertified: false,
            booking_request: false,
            my_alfred_conditions: false,
            profile_picture_user: false,
            identity_card: false,
            recommandations: false,
            flexible_cancel: false,
            moderate_cancel: false,
            strict_cancel: false,
            welcome_message: "",

            no_booking: false
        }

        this.toggleCheckbox = this.toggleCheckbox.bind(this);

        // Ca va dégager
        this.handleChecked = this.handleChecked.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(url+'myAlfred/api/users/current')
            .then(res => {
                this.state.userCity = {label: res.data.billing_address.city, value: res.data.billing_address.city};
                this.state.userAddress = {label: res.data.billing_address.address, value: res.data.billing_address.address};
                this.state.userZipCode = {label: res.data.billing_address.zip_code, value: res.data.billing_address.zip_code};
                this.state.userCountry = {label: res.data.billing_address.country, value: res.data.billing_address.country};
            })
            .catch(error => {
                console.log(error);
            })
        axios.get(url+'myAlfred/api/category/all')
            .then(response => {
                let categories = response.data;
                if (categories === null) {
                    categories = [];
                }
                const options = categories.map(categorie => {
                    return { value: categorie._id, label: categorie.label, [categorie.label.replace(/\s/g, '') + 'Services']: [] };
                })
                this.setState({ categories: options });
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleCategorieChange(categorie, formikCtx) {
        if (categorie === null) {
            categorie = [];
        }
        this.setState({
            categories: [this.state.categories, categorie]
        });
        categorie.map((categorie, catInd) => {
            axios.get(`${url}myAlfred/api/service/all/${categorie.value}`)
                .then(response => {
                    //let difference = this.state.services.filter(x => !value.includes(x));
                    //console.log('Removed: ', difference);
                    const services = response.data;
                    const options = services.map((service) => {
                        let arrServ = [];
                        const servObj = { value: service._id, label: service.label, categorieId: categorie.value, categorieLabel: categorie.label, checked: false }
                        arrServ.push(servObj);
                        if (categorie.hasOwnProperty(servObj.categorieLabel.replace(/\s/g, '') + 'Services')) {
                            formikCtx.form.values.categories[catInd][servObj.categorieLabel.replace(/\s/g, '') + 'Services'].push(servObj);
                            this.setState({
                                [servObj.categorieLabel.replace(/\s/g, '') + 'Services']: []
                            })
                            this.setState({
                                [servObj.categorieLabel.replace(/\s/g, '') + 'Services']: formikCtx.form.values.categories[catInd][servObj.categorieLabel.replace(/\s/g, '') + 'Services']
                            })

                        }
                    });
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    toggleCheckbox(index) {
        const { prestationsCheckboxes } = this.state;

        prestationsCheckboxes[index].checked = !prestationsCheckboxes[index].checked;

        this.setState({
            prestationsCheckboxes
        });
    }

    handleChecked() {
        this.setState({ isChecked: !this.state.isChecked });
        this.setState({ isMicro_company: false });
        this.setState({ isIndividualCompany: false });
        this.setState({ siret: "" });
        this.setState({ denomination: "" });
        this.setState({ nafape: "" });
        this.setState({ creationDate: "" });
        this.setState({ isCertified: false });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {classes} = this.props;
        // Ca va dégager
        const { isChecked, isProfessional } = this.state;
        let dates = [];
        const actualDate = new Date().getFullYear();
            for (let i = 1950; i <= actualDate; i++) {
                dates.push(i);
            }

        return (
            <div className="App" style={{marginTop: 64}}>

                <Wizard
                    initialValues={{
                        categories: [],
                        services: [],
                        submission: [],
                        createShop: {
                            booking_request: false,
                            my_alfred_conditions: false,
                            profile_picture_user: false,
                            identity_card: false,
                            recommandations: false,
                            welcome_message: '',
                            id_recto: null,
                            id_verso: null,
                            is_particular: false,
                            is_professional: false,
                            is_microCompany: false,
                            isIndividualCompany: false,
                            flexible_cancel: false,
                            moderate_cancel: false,
                            strict_cancel: false,
                            siret: '',
                            creationDate: '',
                            denomination: '',
                            nafape: '',
                            nature_juridique: '',
                            isEngaged: false,
                            isCertified: false,
                        },
                        alfredUpdate: {
                            phone: '',
                            profile_picture_user: null,
                        },
                        checkArr: []
                    }}
                    onSubmit={(values, actions) => {
                        sleep(300).then(() => {
                            window.alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        });
                    }}
                >
                    <Wizard.Page>
                        <Grid container className={classes.cardContainer}>
                            <Card className={classes.card} style={{width: '100%'}}>
                                <div style={{padding: '0rem 2rem 1rem 2rem'}}>
                                    <Typography variant="h6" style={{marginBottom: '.5rem', marginTop: '1rem', fontSize: 35}}>Devenez Alfred</Typography>
                                    <hr style={{margin: '1rem 0'}} />
                                </div>
                                <div className="steps">
                                    <div className="step1">
                                        <Typography style={{marginBottom: '.5rem', marginTop: '1rem', fontSize: 20, color: 'grey'}}>Etape 1</Typography>
                                        <hr style={{border: '4px solid grey', marginRight: 150}} />
                                        <Typography style={{fontSize: 18}}>Créez votre boutique de service</Typography>
                                        <Typography>Sélectionnez les services que vous souhaitez offrir</Typography>
                                    </div>
                                    <div className="step2">
                                        <Typography style={{marginBottom: '.5rem', marginTop: '1rem', fontSize: 20, color: 'grey'}}>Etape 2</Typography>
                                        <hr style={{border: '4px solid grey', marginRight: 150}} />
                                        <Typography style={{fontSize: 18}}>Indiquez vos disponiblités & conditions</Typography>
                                        <Typography>Indiquez vos disponibilités ,paramètres de réservation et vos conditions d’annulation</Typography>
                                    </div>
                                    <div className="step3">
                                        <Typography style={{marginBottom: '.5rem', marginTop: '1rem', fontSize: 20, color: 'grey'}}>Etape 3</Typography>
                                        <hr style={{border: '4px solid grey', marginRight: 150}} />
                                        <Typography style={{fontSize: 18}}>Présentez-vous !</Typography>
                                        <Typography>Renseignez votre profil Alfred, partager vos réalisa- tions, et décrivez vous !</Typography>
                                    </div>
                                </div> 
                            </Card>
                        </Grid>
                    </Wizard.Page>
                    <Wizard.Page>
                        <Grid container className={classes.cardContainer}>
                            <Card className={classes.card}>
                                <div style={{padding: '0rem 2rem 1rem 2rem'}}>
                                    <Typography variant="h6" style={{marginBottom: '.5rem', marginTop: '1rem'}}>Vos catégories de service</Typography>
                                    <Typography>
                                        Commencez par sélectionner vos catégories de services. Par exemple, si vous souhaitez réaliser un service de coiffure, sélectionnez la catégorie «Beauté et bien-être».
                                        Ne vous limitez pas ! Vous pouvez selectionner plusieurs catégories.
                                    </Typography>
                                </div>
                                <FieldArray
                                    name="categories"
                                    render={(arrayHelpers) => (
                                        this.state.categories && this.state.categories.length > 0 ? (
                                            <div style={{padding: '.5rem 2rem'}}>
                                                <MultipleSelect
                                                    placeholder="Sélectionnez vos catégories..."
                                                    option={this.state.categories}
                                                    value={arrayHelpers.form.values.categories}
                                                    disabled={this.state.isDisabledCategoryInput}
                                                    update={async categorie => {
                                                        await arrayHelpers.form.setFieldValue('categories', categorie)
                                                    }}
                                                />
                                                <Button
                                                    color="primary"
                                                    style={{marginTop: '1rem', marginBottom: '2rem', color: 'white', borderRadius: 8}}
                                                    type="button"
                                                    variant="contained"
                                                    disabled={this.state.isDisabledCategoryInput}
                                                    onClick={() => {
                                                        if (arrayHelpers.form.values.categories != '' && arrayHelpers.form.values.categories != null) {
                                                            this.handleCategorieChange(arrayHelpers.form.values.categories, arrayHelpers);
                                                            this.setState({
                                                                isDisabledCategoryInput: true,
                                                                isDisabledExpansionPanels: false,
                                                            })
                                                        }
                                                    }}>
                                                    Je valide mes catégories
                                                </Button>
                                                <div>
                                                    <Typography variant="h6" style={{marginBottom: '.5rem'}}>Vos services</Typography>
                                                    <Typography>
                                                        Identifiez maintenant les services que vous souhaitez réaliser dans chacune des catégories sélectionnées. Ne vous limitez pas ! Plusieurs services peuvent être sélectionnés. Vous pourrez choisir le type de prestation que vous souhaitez réaliser dans chacun de vos services dès la prochaine étape !
                                                    </Typography>
                                                </div>
                                                <div style={{marginTop: '1rem'}}>
                                                    {arrayHelpers.form.values.categories && arrayHelpers.form.values.categories.length > 0 ? (
                                                        arrayHelpers.form.values.categories.map((categorie, index) => {
                                                            return (
                                                                <ExpansionPanel
                                                                    disabled={this.state.isDisabledExpansionPanels}
                                                                    key={index}
                                                                >
                                                                    <ExpansionPanelSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                        aria-controls={`panel${index + 1}a-header`}
                                                                        id={`panel${index + 1}a-header`}
                                                                    >
                                                                        <Typography>{categorie.label}</Typography>
                                                                        <Typography align="center" style={{marginLeft: 80, color: "grey"}}>Choisissez vos services pour {categorie.label}</Typography>
                                                                    </ExpansionPanelSummary>
                                                                    <ExpansionPanelDetails>
                                                                        <Grid container>
                                                                            {categorie[categorie.label.replace(/\s/g, '') + 'Services'].map((service, index) => {
                                                                                return (
                                                                                    <Grid item xs={3}>
                                                                                        <FormControlLabel
                                                                                            key={index}
                                                                                            control={
                                                                                                <Switch
                                                                                                    color="primary"
                                                                                                    type="checkbox"
                                                                                                    checked={service.checked}
                                                                                                    onChange={() => {
                                                                                                        service.checked = !service.checked
                                                                                                        if(service.checked === true) {
                                                                                                            arrayHelpers.form.values.services.push(service.value);
                                                                                                            const servicesLength = arrayHelpers.form.values.services.length;
                                                                                                            this.setState({
                                                                                                                servicesLength,
                                                                                                                servicesValues: arrayHelpers.form.values.services
                                                                                                            })

                                                                                                        } else if (service.checked === false) {
                                                                                                            const index = arrayHelpers.form.values.services.indexOf(service.value);
                                                                                                            arrayHelpers.form.values.services.splice(index, 1);
                                                                                                            const servicesLength = arrayHelpers.form.values.services.length;
                                                                                                            this.setState({
                                                                                                                servicesLength,
                                                                                                                servicesValues: arrayHelpers.form.values.services
                                                                                                            })
                                                                                                        }
                                                                                                        arrayHelpers.form.setFieldValue(`categories[${categorie.label.replace(/\s/g, '') + 'Services'}].checked`, service.checked)
                                                                                                    }}
                                                                                                />
                                                                                            }
                                                                                            label={service.label}
                                                                                        />
                                                                                    </Grid>
                                                                                )
                                                                            })}
                                                                        </Grid>
                                                                    </ExpansionPanelDetails>
                                                                </ExpansionPanel>
                                                            )
                                                        })
                                                    ):(<Typography align="center" style={{fontSize: 15, marginTop: '2rem'}}>Afin d'afficher la sélection des services, veuillez sélectionner vos catégories...</Typography>)}
                                                </div>
                                            </div>
                                        ): (<p style={{padding: '0 2rem'}}>Chargement...</p>)
                                    )}
                                />
                                <Field>
                                    {({form}) => {
                                        return form.values.services && form.values.services.length > 0 ?
                                            <div style={{padding: '0 2rem'}}>
                                                <Button
                                                    color="primary"
                                                    style={{marginTop: '.5rem', color: 'white', borderRadius: 8}}
                                                    variant="contained"
                                                    type="button"
                                                    onClick={() => {
                                                        let servCompObjArr = [];
                                                        let uniqueIdFilters = [];
                                                        let uniqueIdPrestations = [];
                                                        const services = form.values.services;
                                                        let arrServices = [];
                                                        services.map((service, index) => {
                                                            this.setState({
                                                                [`userCityClicked${index}`]: false,
                                                                [`otherOptionChecked${index}`]: false
                                                            })
                                                            axios.get(`${url}myAlfred/api/service/${service}`)
                                                                .then(res => {
                                                                    let servCompObj = { CategoryLabel : res.data.category.label, serviceId: res.data._id, serviceLabel: res.data.label, descService: '', minimumBasket: '', diploma: { label: null, year: null, document: null }, certification: { label : null, year: null, document: null }, perimeter: 50, delayBeforeShop: 1, delayBeforeShopDWM: null, city: this.state.userCity, address: this.state.userAddress, postal_code: this.state.userZipCode, country: this.state.userCountry, experienceYears: null, option: null, increases: { label: res.data.majoration, price: 0, checked: false }, prestationsCount: 0, cancelChoice: false, equipments: [], filters: [] }
                                                                    res.data.equipments.map(e => {
                                                                        const equipObj = { id: e._id, label: e.label, logo: e.logo, name_logo: e.name_logo, checked: false }
                                                                        servCompObj.equipments.push(equipObj);
                                                                    })
                                                                    this.state.arrServicesLabel.push(res.data)

                                                                    axios.get(`${url}myAlfred/api/prestation/${service}`)
                                                                        .then(res => {
                                                                            res.data.map(filters => {
                                                                                const filterObj = { id: filters.filter_presentation._id, label: filters.filter_presentation.label, prestations : [] }
                                                                                servCompObj.filters.push(filterObj);
                                                                                uniqueIdFilters = Array.from(new Set(servCompObj.filters.map(a => a.id)))
                                                                                    .map(id => {
                                                                                        return servCompObj.filters.find(a => a.id === id)
                                                                                    })
                                                                                servCompObj.filters = uniqueIdFilters;

                                                                                axios.get(`${url}myAlfred/api/prestation/${service}/${filterObj.id}`)
                                                                                    .then(res => {
                                                                                        res.data.map(prestation => {
                                                                                            const prestationObj = { id: prestation._id, label: prestation.label, filterId: prestation.filter_presentation, price: 0, billing: prestation.billing.label, checked: false };
                                                                                            servCompObj.filters.map(p => {
                                                                                                if (p.id === prestationObj.filterId) {
                                                                                                    p.prestations.push(prestationObj);
                                                                                                    uniqueIdPrestations = Array.from(new Set(p.prestations.map(a => a.id)))
                                                                                                        .map(id => {
                                                                                                            return p.prestations.find(a => a.id === id)
                                                                                                        })
                                                                                                    p.prestations = uniqueIdPrestations;
                                                                                                }
                                                                                            })
                                                                                        })
                                                                                    })
                                                                            })
                                                                            servCompObjArr.push(servCompObj);
                                                                            this.state.arrServices.push(res.data);
                                                                            this.setState({
                                                                                allInOneServ: servCompObjArr
                                                                            });
                                                                            //form.values.submission = this.state.allInOneServ;
                                                                            form.setFieldValue('submission', this.state.allInOneServ);
                                                                        })
                                                                })
                                                        });
                                                        //console.log(this.state.arrServices);
                                                        //console.log(this.state.arrServicesLabel);
                                                    }}
                                                >
                                                    Je valide mes services
                                                </Button>
                                                {/*form.values.submission.length > 0 ?
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                          Étape suivante
                        </Button> : null*/
                                                }
                                            </div> : null;
                                    }}
                                </Field>
                            </Card>
                        </Grid>
                    </Wizard.Page>
                    <Wizard.Page>
                        <Grid container className={classes.cardContainer}>
                            <Card className={classes.card}>
                                <FieldArray
                                    name="submission"
                                    render={(arrayHelpers) => {
                                        // POUR LES DATES D OBTENTIONS DE DIPLOME ET CERTIFS
                                        
                                        return this.state.allInOneServ && this.state.allInOneServ.length > 0 ?
                                            <React.Fragment>
                                                <div style={{padding: '0rem 2rem 1rem 2rem'}}>
                                                    <Typography variant="h6" style={{marginBottom: '.5rem'}}>Paramétrez vos services & prestations</Typography>
                                                    <Typography>
                                                        Indiquez les prestations que vous souhaitez réaliser dans chacun de vos services. Indiquez vos tarifs et vos éventuelles majoration sur les services éligibles.
                                                    </Typography>
                                                </div>
                                                <Tabs>
                                                    <TabList style={{padding: '0 2rem'}}>
                                                        {this.state.allInOneServ.map((data, index) => {
                                                            return <Tab key={index} style={{zIndex: 999999999 - index}}><div style={{padding: '0 2rem 0 2rem'}}>{data.serviceLabel}</div></Tab>
                                                        })}
                                                    </TabList>
                                                    {this.state.allInOneServ.map((s, index) => {
                                                        return(
                                                            <TabPanel key={index}>
                                                                {/*<div style={{padding: '0 2rem'}}>
                                                                    <h2 className={classes.text1} style={{margin: '15px 0'}}>{s.CategoryLabel}</h2>
                                                                    <div className={classes.title2} style={{marginBottom: '0 !important'}}>
                                                                        <h4 style={{color: 'white'}} className={classes.text1}>{s.serviceLabel}</h4>
                                                                    </div>
                                                        </div>*/}
                                                                <div style={{padding: '0 2rem'}}>
                                                                    <div style={{paddingBottom: '1rem'}}>
                                                                        <Grid container spacing={8}>
                                                                            {s.filters.map((f, indexf) => {
                                                                                return (
                                                                                    <Grid
                                                                                        item
                                                                                        xs={12}
                                                                                        key={indexf}
                                                                                        style={{padding: '0 2rem'}}
                                                                                    >
                                                                                        <p>{f.label}</p>
                                                                                        <Grid container>
                                                                                        {f.prestations.map((p, indexp) => {
                                                                                            return(
                                                                                                <Grid item xs={3} key={indexp}>
                                                                                                    <FormControlLabel
                                                                                                        control={
                                                                                                            <Switch
                                                                                                                color="primary"
                                                                                                                type="checkbox"
                                                                                                                checked={p.checked}
                                                                                                                onChange={() => {
                                                                                                                    p.checked = !p.checked;
                                                                                                                    if (p.checked === true) {
                                                                                                                        arrayHelpers.form.setFieldValue(`submission[${index}].prestationsCount`, arrayHelpers.form.values.submission[index].prestationsCount + 1);
                                                                                                                    } else {
                                                                                                                        arrayHelpers.form.setFieldValue(`submission[${index}].prestationsCount`, arrayHelpers.form.values.submission[index].prestationsCount - 1);
                                                                                                                    }
                                                                                                                    arrayHelpers.form.setFieldValue(`submission[${index}].filters[${indexf}].prestations[${indexp}].checked`, p.checked);
                                                                                                                }}
                                                                                                            />
                                                                                                        }
                                                                                                        label={p.label}
                                                                                                    />
                                                                                                    {p.checked === true ?
                                                                                                        <Field
                                                                                                            name={`submission.${index}.filters[${indexf}].prestations[${indexp}].price`}
                                                                                                            placeholder="prix"
                                                                                                            render={({field, form}) => {
                                                                                                                return (
                                                                                                                    <React.Fragment>
                                                                                                                        <TextField
                                                                                                                            {...field}
                                                                                                                            style={{width: 90}}
                                                                                                                            label={`Prix/${p.billing}`}
                                                                                                                            type="number"
                                                                                                                            disabled={!p.checked}
                                                                                                                            margin="none"
                                                                                                                            InputProps={{
                                                                                                                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                                                                                                            }}
                                                                                                                        />
                                                                                                                        <ErrorMessage name={`submission.${index}.filters[${indexf}].prestations[${indexp}].price`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                                                                                    </React.Fragment>
                                                                                                                )
                                                                                                            }}
                                                                                                        /> : null}
                                                                                                </Grid>
                                                                                            )
                                                                                        })}
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                )
                                                                            })}
                                                                        </Grid>
                                                                        <hr style={{margin: '1rem 0'}}></hr>
                                                                        <div>
                                                                            <Typography variant="h6" style={{marginBottom: '.5rem'}}>Options</Typography>
                                                                            <Field render={({form}) => {
                                                                                return (
                                                                                    <Select 
                                                                                        placeholder="Options disponibles"
                                                                                        isDisabled={this.state[`otherOptionChecked${index}`]}
                                                                                        options={[
                                                                                            {value: 'Option1', label: 'Option1', unity: 'm2'},
                                                                                            {value: 'Option2', label: 'Option2', unity: 'prestation'},
                                                                                            {value: 'Option3', label: 'Option3', unity: 'mm2'},
                                                                                            {value: 'Option4', label: 'Option4', unity: 'mm2'},
                                                                                        ]}
                                                                                        onChange={async opt => {
                                                                                            const optObj = { label: opt.value, price: null, unity: null, type: null }
                                                                                            await form.setFieldValue(`submission[${index}].option`, optObj);
                                                                                        }}
                                                                                        theme={theme => ({
                                                                                            ...theme,
                                                                                            colors: {
                                                                                                ...theme.colors,
                                                                                                primary: '#2FBCD3',
                                                                                            }
                                                                                        })}
                                                                                    />
                                                                                )
                                                                            }} />
                                                                            {arrayHelpers.form.values.submission[index].option !== null ? 
                                                                                <Field 
                                                                                    name={`submission.${index}.option.price`}
                                                                                    render={({form, field}) => {
                                                                                        return (
                                                                                            <TextField 
                                                                                                {...field}
                                                                                                type="number"
                                                                                                InputProps={{
                                                                                                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                                                                                }}
                                                                                            />
                                                                                        )
                                                                                    }} 
                                                                                />
                                                                                : null
                                                                            }
                                                                            <div>
                                                                                <FormControlLabel 
                                                                                    control={
                                                                                        <Checkbox 
                                                                                            color="primary"
                                                                                            type="checkbox"
                                                                                            checked={this.state[`otherOptionChecked${index}`]}
                                                                                            onChange={() => {
                                                                                                this.setState({
                                                                                                    [`otherOptionChecked${index}`]: !this.state[`otherOptionChecked${index}`]
                                                                                                });
                                                                                                const optObj = { label: null, price: null, unity: null, type: null } 
                                                                                                arrayHelpers.form.setFieldValue(`submission.${index}.option`, optObj)
                                                                                            }}
                                                                                        />
                                                                                    }
                                                                                    label="Entrer une autre option"
                                                                                />
                                                                                {this.state[`otherOptionChecked${index}`] === true ?
                                                                                    <Grid container spacing={3}>
                                                                                        <Grid item xs={3}>
                                                                                            <Field 
                                                                                                name={`submission.${index}.option.label`}
                                                                                                render={({form, field}) => {
                                                                                                    return (
                                                                                                        <TextField 
                                                                                                            {...field}
                                                                                                            type="text"
                                                                                                        />
                                                                                                    )
                                                                                                }} 
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={3}>
                                                                                            <Field 
                                                                                                name={`submission.${index}.option.price`}
                                                                                                render={({form, field}) => {
                                                                                                    return (
                                                                                                        <TextField 
                                                                                                            {...field}
                                                                                                            type="number"
                                                                                                            InputProps={{
                                                                                                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                                                                                            }}
                                                                                                        />
                                                                                                    )
                                                                                                }} 
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={3}>
                                                                                            <Field 
                                                                                                name={`submission.${index}.option.unity`}
                                                                                                render={({form, field}) => {
                                                                                                    return (
                                                                                                        <Select 
                                                                                                            placeholder="Unité"
                                                                                                            options={[
                                                                                                                {value: 'm2', label: 'm2'},
                                                                                                                {value: 'cm2', label: 'cm2'},
                                                                                                                {value: 'mm2', label: 'mm2'},
                                                                                                            ]}
                                                                                                            onChange={async unity => {
                                                                                                                await form.setFieldValue(`submission[${index}].option.unity`, unity);
                                                                                                            }}
                                                                                                            theme={theme => ({
                                                                                                                ...theme,
                                                                                                                colors: {
                                                                                                                    ...theme.colors,
                                                                                                                    primary: '#2FBCD3',
                                                                                                                }
                                                                                                            })}
                                                                                                        />
                                                                                                    )
                                                                                                }} 
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={3}>
                                                                                            <Field 
                                                                                                name={`submission.${index}.option.type`}
                                                                                                render={({form, field}) => {
                                                                                                    return (
                                                                                                        <Select 
                                                                                                            placeholder="Type"
                                                                                                            options={[
                                                                                                                {value: 'option', label: 'Option'},
                                                                                                                {value: 'supplement', label: 'Supplément'},
                                                                                                            ]}
                                                                                                            onChange={async type => {
                                                                                                                await form.setFieldValue(`submission[${index}].option.type`, type);
                                                                                                            }}
                                                                                                            theme={theme => ({
                                                                                                                ...theme,
                                                                                                                colors: {
                                                                                                                    ...theme.colors,
                                                                                                                    primary: '#2FBCD3',
                                                                                                                }
                                                                                                            })}
                                                                                                        />
                                                                                                    )
                                                                                                }} 
                                                                                            />
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    : null
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <hr style={{margin: '1rem 0'}}></hr>
                                                                        <div>
                                                                            <Typography variant="h6" style={{marginBottom: '.5rem'}}>Indiquez ce que vous fournissez</Typography>
                                                                            <Typography style={{marginBottom: '1rem'}}>
                                                                            Sélectionnez les produits et le matériel que vous fournissez dans le cadre de vos prestations de service. 
                                                                            </Typography>
                                                                        </div>
                                                                        <div>
                                                                            <Grid container>
                                                                            {s.equipments.map((e, indexe) => {
                                                                                if (e.label.includes('Selected')) {
                                                                                    return null;
                                                                                };
                                                                                return (
                                                                                    <Grid item xs={3}>
                                                                                    <label key={indexe} onClick={() => {
                                                                                        e.checked = !e.checked;
                                                                                        arrayHelpers.form.setFieldValue(`submission[${index}].equipments[${indexe}].checked`, e.checked);
                                                                                    }}>
                                                                                        
                                                                                        {e.checked === true ? <img src={`../../${e.logo.slice(0, -4)}Selected.svg`} height={100} width={100} alt={`${e.name_logo.slice(0, -4)}Selected.svg`} /> : <img src={`../../${e.logo}`} height={100} width={100} alt={e.name_logo} />}
                                                                                        <Checkbox
                                                                                            style={{display: 'none'}}
                                                                                            color="primary"
                                                                                            type="checkbox"
                                                                                            checked={e.checked}
                                                                                            onChange={() => {
                                                                                                e.checked = !e.checked;
                                                                                                arrayHelpers.form.setFieldValue(`submission[${index}].equipments[${indexe}].checked`, e.checked);
                                                                                            }}
                                                                                        />
                                                                                    </label>
                                                                                    </Grid>
                                                                                )
                                                                            })}
                                                                            </Grid>
                                                                        </div>
                                                                        <hr style={{margin: '1rem 0'}}></hr>
                                                                        <div>
                                                                            <Typography variant="h6" style={{marginBottom: '.5rem'}}>Définissez votre montant minimum de réservation</Typography>
                                                                            <Typography>
                                                                                Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service. Si vous indiquez un montant de 10€, les clients ne pourront pas réserver vos services si la somme des prestations n’atteint pas ce montant.
                                                                            </Typography>
                                                                            <div style={{marginTop: '1rem', width: '30%'}}>
                                                                                <Field
                                                                                    name={`submission.${index}.minimumBasket`}
                                                                                    render={({field, form}) => {
                                                                                        return(
                                                                                            <TextField
                                                                                                {...field}
                                                                                                fullWidth
                                                                                                label="Panier minimum"
                                                                                                margin="dense"
                                                                                                variant="outlined"
                                                                                                //helperText="Choisissez le montant minimum du panier afin de passer une commande pour ce service"
                                                                                                InputProps={{
                                                                                                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                                                                                }}
                                                                                            />
                                                                                        )
                                                                                    }}
                                                                                />
                                                                                <ErrorMessage name={`submission.${index}.minimumBasket`} render={msg => <div style={{color: 'red'}}>{msg}</div>}/>
                                                                            </div>
                                                                        </div>
                                                                        <hr style={{margin: '1rem 0'}}></hr>
                                                                        <div>
                                                                            <Typography variant="h6" style={{marginBottom: '.5rem'}}>Renseignez votre périmètre d’intervention</Typography>
                                                                            <Typography>
                                                                                Votre périmètre d’intervention est la zone dans laquelle vous souhaitez réaliser vos services. Par défaut, nous utiliserons la ville de l’adresse renseignée dans votre profil comme base de référence. Cette adresse ne vous convient pas ? Vous pouvez changer votre ville de référence à tout moment !
                                                                            </Typography>
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={this.state[`userCityClicked${index}`]}
                                                                                        color="primary"
                                                                                        type="checkbox"
                                                                                        onChange={async () => {
                                                                                            let userCityChecked = !this.state[`userCityClicked${index}`];
                                                                                            this.setState({[`userCityClicked${index}`]: userCityChecked})

                                                                                            if (userCityChecked === true) {
                                                                                                arrayHelpers.form.setFieldValue(`submission[${index}].city`, null)
                                                                                                arrayHelpers.form.setFieldValue(`submission[${index}].address`, null)
                                                                                                arrayHelpers.form.setFieldValue(`submission[${index}].postal_code`, null)
                                                                                                arrayHelpers.form.setFieldValue(`submission[${index}].country`, null)
                                                                                            } else {
                                                                                                arrayHelpers.form.setFieldValue(`submission[${index}].city`, this.state.userCity);
                                                                                                arrayHelpers.form.setFieldValue(`submission[${index}].address`, this.state.userAddress);
                                                                                                arrayHelpers.form.setFieldValue(`submission[${index}].postal_code`, this.state.userZipCode);
                                                                                                arrayHelpers.form.setFieldValue(`submission[${index}].country`, this.state.country);
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                }
                                                                                label={`Sélectionner une autre ville`}
                                                                            />
                                                                            {this.state[`userCityClicked${index}`] === true ?
                                                                                <AddressFinder formikCtx={arrayHelpers} index={index}/>
                                                                            : null}
                                                                            <div style={{padding: '1rem 0'}}>
                                                                                <Typography style={{marginBottom: '1.5rem', fontSize: 17}}>Définissez à présent le périmètre que vous souhaitez couvrir :</Typography>
                                                                                <InputRange
                                                                                    formatLabel={value => `${value}km`}
                                                                                    step={5}
                                                                                    maxValue={500}
                                                                                    minValue={5}
                                                                                    value={arrayHelpers.form.values.submission[index].perimeter}
                                                                                    onChange={inputRangeValue => arrayHelpers.form.setFieldValue(`submission[${index}].perimeter`, inputRangeValue)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <hr style={{margin: '1rem 0'}}></hr>
                                                                        <div>
                                                                            <Typography variant="h6" style={{marginBottom: '.5rem'}}>Indiquez votre délai de prévenance</Typography>
                                                                            <Typography>
                                                                                Le délai de prévenance correspond au délai nécessaire entre la réservation et la réalisation du service. Par exemple, si vous indiquez un délai de 24 heures, un client pourra réserver votre service 24 heures avant votre intervantion.
                                                                            </Typography>
                                                                            <Grid item xs={12}>
                                                                                <Field
                                                                                    name={`submission.${index}.delayBeforeShop`}
                                                                                    render={({field}) => {
                                                                                        return (
                                                                                            <React.Fragment>
                                                                                                <div style={{width: 30, height: 30, borderRadius: '50%', border: '1px solid #2FBCD3', textAlign: "center", lineHeight: 1.6, cursor: 'pointer', display: 'inline-block', marginRight: 25 }} onClick={() => {
                                                                                                    if (arrayHelpers.form.values.submission[index].delayBeforeShop === 0) {
                                                                                                        return arrayHelpers.form.setFieldValue(`submission.${index}.delayBeforeShop`, 0);
                                                                                                    }
                                                                                                    const minusOne = arrayHelpers.form.values.submission[index].delayBeforeShop - 1;
                                                                                                    arrayHelpers.form.setFieldValue(`submission.${index}.delayBeforeShop`, minusOne);
                                                                                                }}>
                                                                                                    -
                                                                                                </div>
                                                                                                
                                                                                                <div style={{display: 'inline-block', fontSize: 20, lineHeight: 2.8}}>{arrayHelpers.form.values.submission[index].delayBeforeShop}</div>
                                                                                                <div style={{width: 30, height: 30, borderRadius: '50%', border: '1px solid #2FBCD3', textAlign: "center", lineHeight: 1.6, cursor: 'pointer', display: 'inline-block', marginLeft: 25, marginRight: '5%' }} onClick={() => {
                                                                                                    const plusOne = arrayHelpers.form.values.submission[index].delayBeforeShop + 1;
                                                                                                    arrayHelpers.form.setFieldValue(`submission.${index}.delayBeforeShop`, plusOne);
                                                                                                }}>
                                                                                                    +
                                                                                                </div>
                                                                                            </React.Fragment>
                                                                                        )
                                                                                    }}
                                                                                />
                                                                                <Field
                                                                                    name={`submission.${index}.delayBeforeShopDWM`}
                                                                                    render={({field}) => {
                                                                                        return (
                                                                                            <TextField
                                                                                                {...field}
                                                                                                style={{width: '30%'}}
                                                                                                select
                                                                                                margin="dense"
                                                                                                variant="outlined"
                                                                                                label="Heures / jours / semaines"
                                                                                            >
                                                                                                <MenuItem value="heures">heure(s)</MenuItem>
                                                                                                <MenuItem value="jours">jour(s)</MenuItem>
                                                                                                <MenuItem value="semaines">semaine(s)</MenuItem>
                                                                                            </TextField>
                                                                                        )
                                                                                    }}
                                                                                />
                                                                                <ErrorMessage name={`submission.${index}.delayBeforeShopDWM`} render={msg => <div style={{color: 'red'}}>{msg}</div>}/>
                                                                            </Grid>
                                                                        </div>
                                                                        <hr style={{margin: '1rem 0'}}></hr>
                                                                        <div>
                                                                            <Typography variant="h6" style={{marginBottom: '.5rem'}}>Décrivez brievement votre expertise !</Typography>
                                                                            <Typography>
                                                                                Mettez en évidence vos compétences et votre expertise dans ce service. Les utilisateurs auront accès à ces informations, n’hésitez pas à valoriser votre expérience, vos réalisations et vos atouts pour ce service !
                                                                            </Typography>
                                                                            <Field
                                                                                name={`submission[${index}].descService`}
                                                                                render={({field}) => {
                                                                                    return (
                                                                                        <TextField
                                                                                            {...field}
                                                                                            id="outlined-multiline-static"
                                                                                            label="Description du service"
                                                                                            multiline
                                                                                            rows="6"
                                                                                            margin="normal"
                                                                                            variant="outlined"
                                                                                            style={{ width: "100%" }}
                                                                                        />
                                                                                    )
                                                                                }}
                                                                            />
                                                                            <ErrorMessage name={`submission[${index}].descService`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                                        </div>
                                                                        <hr style={{margin: '1rem 0'}}></hr>
                                                                        <div>
                                                                            <Typography variant="h6" style={{marginBottom: '.5rem'}}>Votre expérience, vos certifications & diplômes</Typography>
                                                                            <Typography>
                                                                                Si vous possédez des certifications et/ou diplômes pour ce service, mettez les en avant ! Après vérification par My-Alfred, vous aurez le statut d’Alfred certifié et/ou diplômé sur ce service.
                                                                            </Typography>
                                                                            <Grid container style={{marginTop: '.5rem'}}>
                                                                                <Grid item xs={12}>
                                                                                    <Typography>Nombre d'années d'expériences</Typography>
                                                                                    <Select 
                                                                                        placeholder="Vos années d'expériences"
                                                                                        options={[
                                                                                            {value: 'ZeroOrOne', label: 'Entre 0 et 1 an'},
                                                                                            {value: 'OneToFive', label: 'Entre 1 et 5 ans'},
                                                                                            {value: 'FiveToTen', label: 'Entre 5 et 10 ans'},
                                                                                            {value: 'MoreThanTen', label: 'Plus de 10 ans'},
                                                                                        ]}
                                                                                        onChange={async exp => {
                                                                                            await arrayHelpers.form.setFieldValue(`submission[${index}].experienceYears`, exp);
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
                                                                                <Grid item xs={12}>
                                                                                    <Typography style={{margin: '1rem 0', fontSize: 20, color: 'grey'}}>Votre diplôme</Typography>
                                                                                    {arrayHelpers.form.values.submission[index].diploma.label !== null && arrayHelpers.form.values.submission[index].diploma.year !== null && arrayHelpers.form.values.submission[index].diploma.document !== null ?
                                                                                        <React.Fragment>
                                                                                            <div style={{border: '1px solid lightgrey', width: '50%', textAlign: 'center', marginBottom: '1.5rem'}}>
                                                                                                <p>{arrayHelpers.form.values.submission[index].diploma.label} | {arrayHelpers.form.values.submission[index].diploma.year}</p>
                                                                                            </div>
                                                                                        </React.Fragment>
                                                                                        : null
                                                                                    }
                                                                                    <ExpansionPanel>
                                                                                        <ExpansionPanelSummary
                                                                                            expandIcon={<ExpandMoreIcon />}
                                                                                        >
                                                                                            <Typography>Ajouter / modifier votre diplôme</Typography>
                                                                                        </ExpansionPanelSummary>
                                                                                        <ExpansionPanelDetails>
                                                                                            <Grid container>
                                                                                                <Grid item xs={12}>
                                                                                                <Field
                                                                                                    name={`submission.${index}.diploma.label`}
                                                                                                    render={({field}) => {
                                                                                                        return (
                                                                                                            <TextField
                                                                                                                {...field}
                                                                                                                style={{width: '50%', marginRight: '5%'}}
                                                                                                                label="Nom du diplôme"
                                                                                                                margin="dense"
                                                                                                                variant="outlined"
                                                                                                                //helperText="Délai de prévenance avant réservation."
                                                                                                            />
                                                                                                        )
                                                                                                    }}
                                                                                                />
                                                                                                </Grid>
                                                                                                <Grid item xs={12}>
                                                                                                    <Field
                                                                                                        name={`submission.${index}.diploma.year`}
                                                                                                        render={({field}) => {
                                                                                                            return (
                                                                                                                <TextField
                                                                                                                    {...field}
                                                                                                                    style={{width: '50%', marginRight: '5%'}}
                                                                                                                    label="Année d'obtention"
                                                                                                                    margin="dense"
                                                                                                                    variant="outlined"
                                                                                                                    select
                                                                                                                    //helperText="Délai de prévenance avant réservation."
                                                                                                                >
                                                                                                                    {dates.map(date => {
                                                                                                                        return <MenuItem value={date}>{date}</MenuItem>
                                                                                                                    })}
                                                                                                                </TextField>
                                                                                                            )
                                                                                                        }}
                                                                                                    />
                                                                                                </Grid>
                                                                                                <Grid item xs={12}>
                                                                                                    <label style={{display: 'inline-block', marginTop: 15}} className="forminputs">
                                                                                                        Joindre mon diplôme
                                                                                                        <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="diploma" type="file" onChange={(event) => {
                                                                                                            arrayHelpers.form.setFieldValue(`submission.${index}.diploma.document`, event.currentTarget.files[0]);
                                                                                                        }} className="form-control"
                                                                                                        />
                                                                                                    </label>
                                                                                                    <span>{arrayHelpers.form.values.submission[index].diploma.document !== null ? arrayHelpers.form.values.submission[index].diploma.document.name : null}</span>
                                                                                                    <p>En téléchargeant votre diplôme, votre diplôme aura le statut de diplôme vérifié auprès des utilisateurs mais il ne sera jamais visible par ses derniers</p>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </ExpansionPanelDetails>
                                                                                    </ExpansionPanel>
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                <Typography style={{margin: '1rem 0', fontSize: 20, color: 'grey'}}>Votre certification</Typography>
                                                                                    {arrayHelpers.form.values.submission[index].certification.label !== null && arrayHelpers.form.values.submission[index].certification.year !== null && arrayHelpers.form.values.submission[index].certification.document !== null ?
                                                                                        <React.Fragment>
                                                                                            <div style={{border: '1px solid lightgrey', width: '50%', textAlign: 'center', marginBottom: '1.5rem'}}>
                                                                                                <p>{arrayHelpers.form.values.submission[index].certification.label} | {arrayHelpers.form.values.submission[index].certification.year}</p>
                                                                                            </div>
                                                                                        </React.Fragment>
                                                                                        : null
                                                                                    }
                                                                                    <ExpansionPanel>
                                                                                        <ExpansionPanelSummary
                                                                                            expandIcon={<ExpandMoreIcon />}
                                                                                        >
                                                                                            <Typography>Ajouter / modifier votre certification</Typography>
                                                                                        </ExpansionPanelSummary>
                                                                                        <ExpansionPanelDetails>
                                                                                            <Grid container>
                                                                                                <Grid item xs={12}>
                                                                                                    <Field
                                                                                                        name={`submission.${index}.certification.label`}
                                                                                                        render={({field}) => {
                                                                                                            return (
                                                                                                                <TextField
                                                                                                                    {...field}
                                                                                                                    style={{width: '50%', marginRight: '5%'}}
                                                                                                                    label="Nom du certificat"
                                                                                                                    margin="dense"
                                                                                                                    variant="outlined"
                                                                                                                    //helperText="Délai de prévenance avant réservation."
                                                                                                                />
                                                                                                            )
                                                                                                        }}
                                                                                                    />
                                                                                                </Grid>
                                                                                                <Grid item xs={12}>
                                                                                                <Field
                                                                                                        name={`submission.${index}.certification.year`}
                                                                                                        render={({field}) => {
                                                                                                            return (
                                                                                                                <TextField
                                                                                                                    {...field}
                                                                                                                    style={{width: '50%', marginRight: '5%'}}
                                                                                                                    label="Année d'obtention"
                                                                                                                    margin="dense"
                                                                                                                    variant="outlined"
                                                                                                                    select
                                                                                                                    //helperText="Délai de prévenance avant réservation."
                                                                                                                >
                                                                                                                    {dates.map(date => {
                                                                                                                        return <MenuItem value={date}>{date}</MenuItem>
                                                                                                                    })}
                                                                                                                </TextField>
                                                                                                            )
                                                                                                        }}
                                                                                                    />
                                                                                                </Grid>
                                                                                                <Grid item xs={12}>
                                                                                                    <label style={{display: 'inline-block', marginTop: 15}} className="forminputs">
                                                                                                        Joindre ma certification
                                                                                                        <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="certification" type="file" onChange={(event) => {
                                                                                                            arrayHelpers.form.setFieldValue(`submission.${index}.certification.document`, event.currentTarget.files[0]);
                                                                                                        }} className="form-control"
                                                                                                        />
                                                                                                    </label>
                                                                                                    <span>{arrayHelpers.form.values.submission[index].certification.document !== null ? arrayHelpers.form.values.submission[index].certification.document.name : null}</span>
                                                                                                    <p>En téléchargeant votre certification, votre certification aura le statut de certification vérifiée auprès des utilisateurs mais elle ne sera jamais visible par ses derniers</p>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </ExpansionPanelDetails>
                                                                                    </ExpansionPanel>
                                            
                                                                                </Grid>
                                                                            </Grid>
                                                                            
                                                                        </div>
                                                                        <hr style={{margin: '1rem 0'}}></hr>
                                                                    </div>
                                                                </div>
                                                                <div style={{padding: '2rem'}}>
                                                            

                                                                    {/*<Grid container>
                                                                        {s.increases.label !== undefined ? (
                                                                            <React.Fragment>
                                                                                <Grid item xs={12}>
                                                                                    <p>Option</p>
                                                                                    <FormControlLabel
                                                                                        control={
                                                                                            <Checkbox
                                                                                                color="primary"
                                                                                                type="checkbox"
                                                                                                checked={s.increases.checked}
                                                                                                onChange={() => {
                                                                                                    s.increases.checked = !s.increases.checked;

                                                                                                    arrayHelpers.form.setFieldValue(`submission[${index}].increases.checked`, s.increases.checked)
                                                                                                }}
                                                                                            />
                                                                                        }
                                                                                        label={s.increases.label}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid xs={12}>
                                                                                    {s.increases.checked === true ?
                                                                                        <Field
                                                                                            name={`submission.${index}.increases.price`}
                                                                                            placeholder="prix"
                                                                                            render={({field, form}) => {
                                                                                                return (
                                                                                                    <React.Fragment>
                                                                                                        <TextField
                                                                                                            {...field}
                                                                                                            style={{width: '15%'}}
                                                                                                            label="Prix"
                                                                                                            type="number"
                                                                                                            disabled={!s.increases.checked}
                                                                                                            margin="none"
                                                                                                            InputProps={{
                                                                                                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                                                                                            }}
                                                                                                        />
                                                                                                    </React.Fragment>
                                                                                                )
                                                                                            }}
                                                                                        /> : null
                                                                                    }
                                                                                </Grid>
                                                                            </React.Fragment>
                                                                        ) : null}
                                                                        <label htmlFor="raised-button-file">
                                    <Button variant="contained" component="span">
                                        Ajouter un diplôme
                                    </Button>
                                        </label>
                                                                                </Grid>*/}
                                                                </div>
                                                            </TabPanel>
                                                        )
                                                    })}
                                                </Tabs>
                                            </React.Fragment> : null
                                    }}
                                />
                                {/*<div>*/}
                                
                                {/*</div>*/}
                            </Card>
                        </Grid>
                        
                    </Wizard.Page>
                    <Wizard.Page>
                        <Calendar />
                    </Wizard.Page>
                    <Wizard.Page>
                        <Grid container className={classes.cardContainer}>
                            <Card className={classes.card}>
                            <div className={classes.newContainer}>
                                    <Grid container>

                                            <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                                Comment les utilisateurs peuvent réserver ?
                                            </h6>

                                        <Grid item style={{marginLeft: 20}}>
                                            <Field render={({form}) => {
                                                return (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={form.values.createShop.booking_request}
                                                                onChange={() => {
                                                                    form.values.createShop.booking_request = !form.values.createShop.booking_request;
                                                                    form.setFieldValue('createShop.booking_request', form.values.createShop.booking_request);
                                                                    if (form.values.createShop.booking_request === true) {
                                                                        form.setFieldValue('createShop.no_booking_request', false);
                                                                        this.setState({no_booking: false})
                                                                    }
                                                                }}
                                                                value={form.values.createShop.booking_request}
                                                                color="primary"
                                                                name={"booking_request"}
                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                checkedIcon={<FilledButton />}

                                                            />
                                                        }
                                                        label={<Typography style={{fontSize: 18, fontFamily: 'helveticaNeue'}}>Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H.</Typography>}


                                                    />
                                                )
                                            }} />
                                        </Grid>
                                        <Grid item style={{marginLeft: 20, marginTop: 15}}>
                                            <Field render={({form}) => {
                                                return (
                                                    <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.no_booking}
                                                            onChange={() => {
                                                                form.values.createShop.no_booking_request = !form.values.createShop.no_booking_request;
                                                                this.setState({no_booking: form.values.createShop.no_booking_request})
                                                                form.setFieldValue('createShop.no_booking_request', form.values.createShop.no_booking_request);
                                                                if (form.values.createShop.no_booking_request === true) {
                                                                    form.setFieldValue('createShop.booking_request', false);
                                                                }
                                                            }}
                                                            value={form.values.createShop.no_booking_request}
                                                            color="primary"
                                                            name={"no_booking_request"}
                                                            icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                            checkedIcon={<FilledButton />}

                                                        />
                                                    }
                                                        label={<Typography style={{fontSize: 18, fontFamily: 'helveticaNeue'}}>Les utilisateurs peuvent réserver mes services directement sans demande de réservation.</Typography>}

                                                    />
                                                )
                                            }} />
                                        </Grid>
                                    </Grid>
                                    <hr style={{border: 0, borderTop: '1px solid lightgrey',marginTop: 20}}/>
                                    <Grid container>
                                        <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                            Vos conditions de réservations
                                        </h6>

                                        <Typography style={{marginBottom: 20,fontFamily: 'helveticaNeue'}}>
                                            Il se peut que vous ayez moins de réservation si vous
                                            ajoutez des conditions. Les personnes qui ne répondent pas
                                            à vos critères peuvent quand même envoyer une demande
                                        </Typography>

                                        <Grid item style={{ marginLeft: 20 }}>
                                            <Field render={({form}) => {
                                                return (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={form.values.createShop.my_alfred_conditions}
                                                                onChange={() => {
                                                                    form.values.createShop.my_alfred_conditions = !form.values.createShop.my_alfred_conditions;
                                                                    form.setFieldValue('createShop.my_alfred_conditions', form.values.createShop.my_alfred_conditions);
                                                                }}
                                                                value={form.values.createShop.my_alfred_conditions}
                                                                color="primary"
                                                                name={"my_alfred_conditions"}
                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                checkedIcon={<FilledButton />}
                                                                style={{marginTop: -39}}
                                                            />
                                                        }
                                                        label={<React.Fragment>
                                                            <p style={{marginBottom: 0,fontSize: 18, fontFamily: 'helveticaNeue'}}>Conditions My-Alfred</p>
                                                    <p style={{marginTop: 0,fontSize: 16, fontFamily: 'helveticaNeue'}}>
                                                        Numéro de téléphone confirmé, adresse e-mail, informations de paiements et acceptation
                                                        du règlement intérieur.
                                                </p>
                                            </React.Fragment>}

                                                    />
                                                )
                                            }} />

                                        </Grid>
                                        <Grid item style={{ marginLeft: 20 }} >
                                            <Field render={({form}) => {
                                                return (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={form.values.createShop.profile_picture_user}
                                                                onChange={() => {
                                                                    form.values.createShop.profile_picture_user = !form.values.createShop.profile_picture_user;
                                                                    form.setFieldValue('createShop.profile_picture_user', form.values.createShop.profile_picture_user);
                                                                }}
                                                                value={form.values.createShop.profile_picture_user}
                                                                color="primary"
                                                                name={"profile_picture_user"}
                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                checkedIcon={<FilledButton />}
                                                                style={{marginTop: -39}}
                                                            />
                                                        }
                                                        label={<React.Fragment>
                                                        <p style={{marginBottom: 0,fontSize: 18, fontFamily: 'helveticaNeue'}}>Photo de profil</p>
                                                        <p style={{marginTop: 0,fontSize: 16, fontFamily: 'helveticaNeue'}}>
                                                            Si vous activez cette condition, vous ne pourrez voir les photos de profil des
                                                            voyageurs qu'une fois la réservation confirmée. En savoir plus
                                                        </p>
                                                    </React.Fragment>}

                                                    />
                                                )
                                            }} />
                                        </Grid>
                                        <Grid item style={{ marginLeft: 20 }}>
                                            <Field render={({form}) => {
                                                return (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={form.values.createShop.identity_card}
                                                                onChange={() => {
                                                                    form.values.createShop.identity_card = !form.values.createShop.identity_card;
                                                                    form.setFieldValue('createShop.identity_card', form.values.createShop.identity_card);
                                                                }}
                                                                value={form.values.createShop.identity_card}
                                                                color="primary"
                                                                name={"identity_card"}
                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                checkedIcon={<FilledButton />}
                                                                style={{marginTop: -11}}
                                                            />
                                                        }
                                                        label={<React.Fragment>
                                                        <p style={{marginBottom: 0,fontSize: 18, fontFamily: 'helveticaNeue'}}>Pièce d'identité officielle</p>
                                                        <p style={{marginTop: 0,fontSize: 16, fontFamily: 'helveticaNeue'}}>
                                                            Ces voyageurs ont vérifié leur identité.
                                                        </p>
                                                    </React.Fragment>}

                                                    />
                                                )
                                            }} />
                                        </Grid>
                                        <Grid item style={{ marginLeft: 20 }}>
                                            <Field render={({form}) => {
                                                return (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={form.values.createShop.recommandations}
                                                                onChange={() => {
                                                                    form.values.createShop.recommandations = !form.values.createShop.recommandations;
                                                                    form.setFieldValue('createShop.recommandations', form.values.createShop.recommandations);
                                                                }}
                                                                value={form.values.createShop.recommandations}
                                                                color="primary"
                                                                name={"recommandations"}
                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                checkedIcon={<FilledButton />}
                                                                style={{marginTop: -39}}
                                                            />
                                                        }
                                                        label={<React.Fragment>
                                                            <p style={{marginBottom: 0,fontSize: 18, fontFamily: 'helveticaNeue'}}>Recommandations d'autres Alfred</p>
                                                            <p style={{marginTop: 0,fontSize: 16, fontFamily: 'helveticaNeue'}}>
                                                                Ces utilisateurs ont déjà utilisés des services avec My-Alfred, sont recommandés par d'autres Alfred et n'ont pas reçu de commen- taires négatifs.
                                                            </p>
                                                        </React.Fragment>}

                                                    />
                                                )
                                            }} />
                                        </Grid>

                                    </Grid>
                                    <hr style={{border: 0, borderTop: '1px solid lightgrey',marginTop: 20}}/>
                                    <Grid container>
                                        <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                            Votre message de bienvenue validant votre
                                            réservation
                                        </h6>
                                        <Typography>Les utilisateurs recevront votre message lorsque vous confirmerez leur réservation.</Typography>
                                        <Grid item style={{ marginTop: 15, width: "100%" }}>
                                            <Field name="createShop.welcome_message" render={({field, form}) => {
                                                return (
                                                    <TextField
                                                        {...field}
                                                        id="outlined-multiline-static"
                                                        label={
                                                            'Votre message'
                                                        }
                                                        multiline
                                                        rows="6"
                                                        margin="normal"
                                                        variant="outlined"
                                                        style={{ width: "100%" }}
                                                        //name={"welcome_message"}
                                                    />
                                                )
                                            }} />
                                            <ErrorMessage name={'createShop.welcome_message'} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                        </Grid>
                                    </Grid>
                                    <hr style={{border: 0, borderTop: '1px solid lightgrey',marginTop: 20}}/>
                                    <Grid container>

                                        <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                           Vos conditions d'annulation
                                        </h6>

                                        <Typography style={{fontFamily: 'helveticaNeue', width: '100%'}}>
                                            Choisissez vos conditions en cas d'annulation de la part
                                            des utilisateurs.
                                        </Typography>
                                        <Grid
                                            item
                                            style={{ width: "100%", marginTop: 10, marginBottom: 10, marginLeft: 20 }}
                                        >
                                            <Field render={({form}) => {
                                                return (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={form.values.createShop.flexible_cancel}
                                                                onChange={() => {
                                                                    form.values.createShop.flexible_cancel = !form.values.createShop.flexible_cancel;
                                                                    form.setFieldValue('createShop.flexible_cancel', form.values.createShop.flexible_cancel);

                                                                    if (form.values.createShop.flexible_cancel === true) {
                                                                        form.setFieldValue('createShop.moderate_cancel', false);
                                                                        form.setFieldValue('createShop.strict_cancel', false);
                                                                    }
                                                                }}
                                                                value={form.values.createShop.flexible_cancel}
                                                                color="primary"
                                                                name={"flexible_cancel"}
                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                checkedIcon={<FilledButton />}
                                                                style={{marginTop: -20}}
                                                            />
                                                        }
                                                        label={
                                                            <React.Fragment>
                                                                <p style={{marginBottom: 0,fontSize: 18, fontFamily: 'helveticaNeue'}}>Flexibles</p>

                                                                <p style={{marginTop: 0,fontSize: 16, fontFamily: 'helveticaNeue'}}>
                                                                    Remboursement intégral jusqu'à 1 jour avant la
                                                                    prestation
                                                                </p>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                )
                                            }} />
                                        </Grid>
                                        <Grid item style={{ width: "100%", marginLeft: 20 }}>
                                            <Field render={({form}) => {
                                                return (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={form.values.createShop.moderate_cancel}
                                                                onChange={() => {
                                                                    form.values.createShop.moderate_cancel = !form.values.createShop.moderate_cancel;
                                                                    form.setFieldValue('createShop.moderate_cancel', form.values.createShop.moderate_cancel);

                                                                    if (form.values.createShop.moderate_cancel === true) {
                                                                        form.setFieldValue('createShop.flexible_cancel', false);
                                                                        form.setFieldValue('createShop.strict_cancel', false);
                                                                    }
                                                                }}
                                                                value={form.values.createShop.moderate_cancel}
                                                                color="primary"
                                                                name={"moderate_cancel"}
                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                checkedIcon={<FilledButton />}
                                                                style={{marginTop: -20}}
                                                            />
                                                        }
                                                        label={
                                                            <React.Fragment>
                                                                <p style={{marginBottom: 0,fontSize: 18, fontFamily: 'helveticaNeue'}}>Modérées</p>
                                                                <p style={{marginTop: 0,fontSize: 16, fontFamily: 'helveticaNeue'}}>
                                                                    Remboursement intégral jusqu'à 5 jours avant la
                                                                    prestation
                                                                </p>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                )
                                            }} />
                                        </Grid>
                                        <Grid item style={{marginLeft: 20}}>
                                            <Field render={({form}) => {
                                                return (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={form.values.createShop.strict_cancel}
                                                                onChange={() => {
                                                                    form.values.createShop.strict_cancel = !form.values.createShop.strict_cancel;
                                                                    form.setFieldValue('createShop.strict_cancel', form.values.createShop.strict_cancel);

                                                                    if (form.values.createShop.strict_cancel === true) {
                                                                        form.setFieldValue('createShop.flexible_cancel', false);
                                                                        form.setFieldValue('createShop.moderate_cancel', false);
                                                                    }
                                                                }}
                                                                value={form.values.createShop.strict_cancel}
                                                                color="primary"
                                                                name={"strict_cancel"}
                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                checkedIcon={<FilledButton />}
                                                                style={{ marginTop: -100 }}
                                                            />
                                                        }
                                                        label={
                                                            <React.Fragment>
                                                                <p style={{ marginBottom: 0,fontSize: 18, fontFamily: 'helveticaNeue' }}>Strictes</p>
                                                                <p style={{marginTop: 0,fontSize: 16, fontFamily: 'helveticaNeue'}}>
                                                                    Remboursement intégral pour les annulations
                                                                    effectuées dans les 48 heures suivant la
                                                                    réservation, si la date de ma prestation
                                                                    intervient dans 14 jours ou plus. Remboursement à
                                                                    hauteur de 50 % pour les annulations effectuées au
                                                                    moins 7 jours avant la date de la prestation.
                                                                    Aucun remboursement pour les annulations
                                                                    effectuées dans les 7 jours précédant la date de
                                                                    la prestation.
                                                                </p>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                )
                                            }} />
                                        </Grid>
                                    </Grid>
                                </div>

                                {/*<Field render={({form}) => {
                                    let cancel = true;

                                    if (form.values.createShop.flexible_cancel === true || form.values.createShop.moderate_cancel === true || form.values.createShop.strict_cancel === true) {
                                        cancel = false;
                                    } else {
                                        cancel = true;
                                    }

                                    return (
                                        <Button type="submit" variant="contained" style={{marginTop: '45px', color: !cancel ? 'white' : null }} color="primary" disabled={cancel}>
                                            Étape suivante
                                        </Button>
                                    )
                                }} />*/}
                            </Card>
                        </Grid>
                    </Wizard.Page>
                    <Wizard.Page>
                        <Field>
                            {({ form, field }) => (
                                <React.Fragment>
                                    <Grid container className={classes.cardContainer}>
                                        <Card className={classes.card}>
                                            <div className={classes.newContainer}>
                                                <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                                    Téléchargez une photo de profil
                                                </h6>
                                                <Typography style={{fontFamily: 'helveticaNeue', marginBottom: '1rem'}}>
                                                    Téléchargez une photo de claire et lumineuse, de bonne qualité. Pour un rendu optimal, la photo doit être cadrée, sans lunette de soleil, en regardant l’objectif, avec seulement vous sur la photo.
                                                </Typography>
                                                <Grid container style={{ marginBottom: 15 }}>
                                                    <Grid item xs={1} />
                                                    <Grid item xs={2}>
                                                        <div>
                                                            <div>
                                                                <Field render={({form}) => {
                                                                    return (
                                                                        <React.Fragment>
                                                                            <input
                                                                                accept="image/*"
                                                                                className="input"
                                                                                style={{ display: "none" }}
                                                                                id="icon-button-file"
                                                                                type="file"
                                                                                onChange={(event) => {
                                                                                    form.setFieldValue("alfredUpdate.profile_picture_user", event.currentTarget.files[0])
                                                                                }}
                                                                                name={"myImage"}
                                                                            />
                                                                            <label htmlFor="icon-button-file">
                                                                                <IconButton
                                                                                    color="primary"
                                                                                    className={classes.button}
                                                                                    style={{
                                                                                        width: 100,
                                                                                        height: 100,
                                                                                        backgroundColor: "lightgrey"
                                                                                    }}
                                                                                    component="span"
                                                                                >
                                                                                    <PhotoCamera />
                                                                                </IconButton>
                                                                            </label>
                                                                        </React.Fragment>
                                                                    )
                                                                }} />
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={1} />
                                                    <Grid item xs={7}>
                                                    </Grid>
                                                </Grid>
                                                <hr style={{border: 0, borderTop: '1px solid lightgrey',marginTop: 20}}/>
                                                <Grid container>
                                                    <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                                        Vérifiez votre identité
                                                    </h6>
                                                    <Typography style={{fontFamily: 'helveticaNeue'}}>
                                                        Ces informations ne seront pas visibles par les utilisateurs. Un profil vérifié est plus engageant pour les utilisateurs !
                                                    </Typography>
                                                    <Grid item xs={12}>
                                                        <Typography>
                                                            Vos informations ne seront pas visibles par les
                                                            autres utilisateurs
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1} />
                                                    <Grid item xs={12} md={4}>
                                                        <Field name={"alfredUpdate.phone"} render={({field}) => {
                                                            return (
                                                                <TextField
                                                                    {...field}
                                                                    id="outlined-name"
                                                                    label="Téléphone"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    type="tel"
                                                                />
                                                            )
                                                        }} />
                                                        <ErrorMessage name="alfredUpdate.phone" render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                    </Grid>
                                                    <Grid item xs={1} />
                                                    <Grid item xs={5}>
                                                        <Grid container>
                                                            <div
                                                                style={{
                                                                    border: "0.5px solid #c4c4c4",
                                                                    borderRadius: 10,
                                                                    padding: 15,
                                                                    marginTop: 13.5
                                                                }}
                                                            >

                                                                {/*<label>
                                    Diplôme
                                    <input id="file" name="file" type="file" onChange={(event) => {
                                      arrayHelpers.form.setFieldValue(`submission.${index}.diploma`, event.currentTarget.files[0]);
                                      }} className="form-control"
                                    />
                                  </label>
                                    <Thumb file={arrayHelpers.form.values.submission[index].diploma} />*/}

                                                                <Grid item xs={12} style={{ marginBottom: 10 }}>
                                                                    <Field render={({field, form}) => {
                                                                        return (
                                                                            <React.Fragment>
                                                                                <label style={{display: 'inline-block', marginTop: 15}} className="forminputs">
                                                                                    Carte identité recto / passeport
                                                                                    <input id="file" accept="image/*" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="myCardR" type="file" onChange={(event) => {
                                                                                        form.setFieldValue("createShop.id_recto", event.currentTarget.files[0])
                                                                                    }} className="form-control"
                                                                                    />
                                                                                </label>
                                                                                <span>{form.values.createShop.id_recto !== null ? form.values.createShop.id_recto.name.substr(0, 10) + '...' : null}</span>
                                                                                <ErrorMessage name="createShop.id_recto" render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                                            </React.Fragment>
                                                                        )
                                                                    }} />
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    style={{ fontSize: "small" }}
                                                                >
                                                                    <Field render={({field, form}) => {
                                                                        return (
                                                                            <React.Fragment>
                                                                                <label style={{display: 'inline-block', marginTop: 15}} className="forminputs">
                                                                                    Carte identité verso
                                                                                    <input id="file" accept="image/*" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="myCardV" type="file" onChange={(event) => {
                                                                                        form.setFieldValue("createShop.id_verso", event.currentTarget.files[0])
                                                                                    }} className="form-control"
                                                                                    />
                                                                                </label>
                                                                                <span>{form.values.createShop.id_verso !== null ? form.values.createShop.id_verso.name.substr(0, 10) + '...' : null}</span>
                                                                                <ErrorMessage name="createShop.id_verso" render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                                            </React.Fragment>
                                                                        )
                                                                    }} />
                                                                </Grid>
                                                                {/*<Button
                                  type="button"
                                  variant="contained"
                                  style={{ fontSize: 11, marginTop: 7 }}
                                  color={"primary"}
                                  size="small"
                                  onClick={() => {
                                    this.addCard();
                                  }}
                                >
                                  Ajouter
                                </Button>*/}
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={2} />
                                                </Grid>

                                                <Grid container className={classes.checkboxespart}>
                                                    <Grid container>
                                                        <Grid item xs={1}>
                                                            <Field render={({form}) => {
                                                                return (
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={form.values.createShop.is_particular}
                                                                                onChange={() => {
                                                                                    form.values.createShop.is_particular = !form.values.createShop.is_particular;
                                                                                    form.setFieldValue("createShop.is_particular", form.values.createShop.is_particular);

                                                                                    if (form.values.createShop.is_particular === true && form.values.createShop.is_professional === true) {
                                                                                        form.setFieldValue('createShop.is_professional', false);
                                                                                        this.setState({isProfessional: false})
                                                                                        form.setFieldValue('createShop.is_microCompany', false);
                                                                                        form.setFieldValue('createShop.isIndividualCompany', false);
                                                                                        form.setFieldValue('createShop.isCertified', false);
                                                                                        form.setFieldValue('createShop.siret', '');
                                                                                        form.setFieldValue('createShop.creationDate', '');
                                                                                        form.setFieldValue('createShop.denomination', '');
                                                                                        form.setFieldValue('createShop.nafape', '');
                                                                                        form.setFieldValue('createShop.nature_juridique', '');
                                                                                    }
                                                                                }}
                                                                                name={"isParticular"}
                                                                                color="primary"
                                                                                value={form.values.createShop.is_particular}
                                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                                checkedIcon={<FilledButton />}
                                                                            />
                                                                        }
                                                                    />
                                                                )
                                                            }} />
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                                                Je suis un particulier
                                                            </h6>
                                                            <Typography>
                                                                En tant que particulier, vous pouvez rendre des
                                                                services occasionnels sur My-Alfred. Si votre
                                                                activité devient régulière, un statut
                                                                professionnel (mi-cro-entrepreuneur,...)
                                                                s’impose. Il est également requis pour certains
                                                                sec-teurs d’activité réglementés (travaux de
                                                                plomberie, peinture, électricité...)
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container style={{ marginTop: 10 }}>
                                                        <Grid item xs={1}>
                                                            <Field render={({form}) => {
                                                                return (
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={form.values.createShop.is_professional}
                                                                                onChange={() => {
                                                                                    form.values.createShop.is_professional = !form.values.createShop.is_professional;
                                                                                    form.setFieldValue("createShop.is_professional", form.values.createShop.is_professional);

                                                                                    if (form.values.createShop.is_professional === true && form.values.createShop.is_particular === true) {
                                                                                        form.setFieldValue("createShop.is_particular", false)
                                                                                    }

                                                                                    if (form.values.createShop.is_professional === false) {
                                                                                        form.setFieldValue("createShop.is_microCompany", false);
                                                                                        form.setFieldValue("createShop.isIndividualCompany", false);
                                                                                    }
                                                                                    this.setState({isProfessional: form.values.createShop.is_professional})
                                                                                }}
                                                                                name={"isProfessional"}
                                                                                color="primary"
                                                                                value={form.values.createShop.is_professional}
                                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                                checkedIcon={<FilledButton />}
                                                                            />
                                                                        }
                                                                    />
                                                                )
                                                            }} />
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                                                Je suis un professionnel
                                                            </h6>
                                                            <Typography>
                                                                Un statut professionnel est nécessaire pour les
                                                                métiers réglementés et permet une activité
                                                                régulière sur My-Alfred. Seuls les
                                                                professionnels peuvent proposer leurs services
                                                                aux entreprises qui ont besoin d’une facture.Un
                                                                statut professionnel est requis dès que votre
                                                                activité devient régulière
                                                            </Typography>
                                                            {isProfessional ? (
                                                                <React.Fragment>
                                                                    <Field render={({form}) => {
                                                                        return (
                                                                            <div style={{}}>
                                                                                <Siret formikCtx={form}/>
                                                                            </div>
                                                                        )
                                                                    }}
                                                                    />
                                                                    <Field render={({form}) => {
                                                                        return (
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={form.values.createShop.isCertified}
                                                                                        onChange={() => {
                                                                                            form.values.createShop.isCertified = !form.values.createShop.isCertified;
                                                                                            form.setFieldValue('createShop.isCertified', form.values.createShop.isCertified);
                                                                                        }}
                                                                                        color="primary"
                                                                                        name="isCertified"
                                                                                        value={form.values.createShop.isCertified}
                                                                                    />
                                                                                }
                                                                                label={
                                                                                    "Je certifie sur l’honneur qu’il s’agit bien de mon entreprise."
                                                                                }
                                                                            />
                                                                        )
                                                                    }} />
                                                                    <ErrorMessage name={`createShop.isCertified`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                                </React.Fragment>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <hr style={{margin: '1rem 0'}}></hr>

                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                                            Vos obligations légales
                                                        </h6>
                                                    </Grid>

                                                    <Typography>
                                                        Dans le cadre des prestations effectuées via My-Alfred, vous devez respecter toutes les obligations légales et réglementaires (fiscales, sociales, comptables, administratives etc...) liées à votre statut.
                                                    </Typography>

                                                    <Grid container>
                                                        <Grid item>
                                                            <Field render={({form}) => {
                                                                return (
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={form.values.createShop.isEngaged}
                                                                                onChange={() => {
                                                                                    form.values.createShop.isEngaged = !form.values.createShop.isEngaged;

                                                                                    form.setFieldValue('createShop.isEngaged', form.values.createShop.isEngaged)
                                                                                }}
                                                                                color="primary"
                                                                                name="isEngaged"
                                                                                value={form.values.createShop.isEngaged}
                                                                            />
                                                                        }
                                                                        label={
                                                                            "Je m’engage à respecter toutes les obligations légales correspondant à mon statut."
                                                                        }
                                                                    />
                                                                )
                                                            }} />
                                                            <ErrorMessage name={`createShop.isEngaged`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container>
                                                        {isProfessional ? (
                                                            <React.Fragment>
                                                                <Grid item>
                                                                    
                                                                </Grid>
                                                            </React.Fragment>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Card>
                                    </Grid>
                                </React.Fragment>
                            )}
                        </Field>
                    </Wizard.Page>
                </Wizard>
            </div>
        )
    }
};

// FUNCTIONS
export function FormSelect(props) {
    if (props.ready === 1) {
        return (
            <React.Fragment>
                <Field name={props.fieldName}>
                    {({ field, form }) => {
                        return (
                            props.option.map((select, index) => {
                                return (
                                    <MultipleSelect
                                        key={select.value}
                                        option={props.option[index]}
                                        value={field.value}
                                        update={async select => {
                                            await form.setFieldValue(`${props.fieldName}s.${index}`, select)
                                        }}
                                    />
                                )
                            })
                        )
                    }}
                </Field>
                {props.handleFunction === null ? null :
                    <Field>
                        {({ form }) => {
                            return (
                                form.values[`${props.fieldName}s`] != '' ?
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (form.values[`${props.fieldName}s`] != '' && form.values[`${props.fieldName}s`] != null) {
                                                props.handleFunction(form.values[`${props.fieldName}s`]);
                                            }
                                        }}
                                    >Valider {props.fieldName}</button>
                                    : null
                            )
                        }}
                    </Field>
                }
            </React.Fragment>
        )
    } else {
        return null;
    }
}

export function CheckboxSelect(props) {
    if (props.ready === 1) {
        return (
            <React.Fragment>
                <Field name={props.fieldName}>
                    {({ field, form }) => {
                        return (
                            props.option.map((select, index) => {
                                return (
                                    <React.Fragment>
                                        <p>Prestation(s) pour : {select.serviceLabel} ({select.filterLabel})</p>
                                        <label>
                                            {select.label}
                                            <input
                                                value={select.label}
                                                type="checkbox"
                                                checked={select.checked}
                                                onChange={() => {
                                                    props.update(index);
                                                    if (form.values.prestations.includes(select.label)) {
                                                        const nextValue = form.values.prestations.filter(
                                                            value => value !== select.label
                                                        );
                                                        form.values.prestations = nextValue;
                                                    } else {
                                                        const nextValue = form.values.prestations.concat(select.label);
                                                        form.values.prestations = nextValue;
                                                    }

                                                }}
                                            />
                                        </label>
                                    </React.Fragment>
                                )
                            })
                        )
                    }}
                </Field>
            </React.Fragment>
        )
    } else {
        return null;
    }
}

// STYLE
export const FirstStep = styled.div`
  width: 75%;
  margin: 0 auto;
  padding: 2rem;
  height: 500px;
  border: 1px solid black;
`

const Bar = styled.div`
  position: relative;
  height: 10px;
  width: 100%;
  border-radius: 3px; 
`;

const Fill = styled.div`
  background: #2FBCD3;
  height: 100%;
  border-radius: inherit;
  transition: width .2s ease-in;
  width: ${props => props.width};
`;

const FilledButton = styled.div`
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: #2FBCD3;
    margin-right: 5px;
`;

export default withStyles(styles)(Form);
