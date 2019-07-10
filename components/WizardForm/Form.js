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

import { Debug } from './Debug';
import MultipleSelect from './MultipleSelect';
import Calendar from '../Calendar/calendar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CityFinder from './CityFinder';

const { config } = require('../../config/config');
const url = config.apiUrl;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : 'Required');
const styles = theme => ({
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        //padding: '1.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        //maxHeight: 700,
        overflow: 'auto',
        width: 800,
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
        backgroundColor: '#00abed',
    },
    newContainer: {
        padding: 20,
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

                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                axios.post(url+'myAlfred/api/serviceUser/add',formData)
                    .then(res => {
                        alert("C'est passé !!");

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
                                    let descriptionService = e.descService;
                                    data.forEach(q => {

                                        let objService = {label: q._id, description:descriptionService};
                                        arrayService.push(objService);
                                        console.log(arrayService);
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

            return console.log(values);
        } else {
            bag.setTouched({});
            bag.setSubmitting(false);
            this.next(values);
            console.log(this.state);
        }
    };

    phoneRegEx = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    Step1Schema = null;
    Step2Schema = Yup.object().shape({
          submission: Yup.array().of(Yup.object().shape({
            descService: Yup.string().min(10, 'La description de votre service doit faire au moins 10 caractères').required('Veuillez entrer une description pour votre service'),
            minimumBasket: Yup.number().typeError('Un nombre est requis pour le minimum d\'achat').required('Le minimum d\'achat est requis'),
            delayBeforeShop: Yup.number().typeError('Le délais doit être un nombre').required(),
            delayBeforeShopDWM: Yup.string().typeError('Choisissez parmi jours, semaines et mois').required(),
            city: Yup.object().typeError('Veuillez entrer la ville où le service sera pratiqué').required('Veuillez entrer la ville où le service sera pratiqué'),
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
            is_microCompany: Yup.boolean(),
            isIndividualCompany: Yup.boolean(),
            id_recto: Yup.mixed().required('Veuillez uploader le recto de votre carte d\'identité'),
            id_verso: Yup.mixed().required('Veuillez uploader le verso de votre carte d\'identité'),
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
            isEngaged: Yup.boolean().oneOf([true], 'Veuillez vous engager'),
            isCertified: Yup.boolean()
                .when('is_professional', {
                    is: true,
                    then: Yup.boolean().oneOf([true], 'Veuillez vous certifier'),
                    otherwise: Yup.boolean(),
                }),
        })
    })

    schemaArray =[this.Step1Schema, this.Step2Schema, this.Step3Schema, this.Step4Schema, this.Step5Schema]

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
                    <form onSubmit={handleSubmit}>
                        {activePage}
                        <div className="buttons">
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

                            {!isLastPage && <button type="submit">Next »</button>}
                            {isLastPage && (
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            )}
                        </div>
                        <Debug />
                    </form>
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
            welcome_message: ""
        }

        this.toggleCheckbox = this.toggleCheckbox.bind(this);

        // Ca va dégager
        this.handleChecked = this.handleChecked.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
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

        return (
            <div className="App">
                <h1>Devenir Alfred </h1>
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
                            isEngaged: false,
                            isCertified: false,
                        },
                        alfredUpdate: {
                            phone: '',
                            profile_picture_user: null,
                        }
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
                            <Card className={classes.card} style={{minHeight: '400px !important'}}>
                                <div className={classes.banner}>
                                    <h3 style={{fontFamily: 'helveticaNeue', marginLeft: 10, color: 'white'}}>Etape 1 - Choisissez vos catégories et services</h3>
                                    <div>
                                        <Bar style={{width: '15% !important'}}>
                                            <Fill />
                                        </Bar>
                                    </div>
                                </div>
                                <label style={{padding: '0 2rem'}}>Vos catégories</label>
                                <FieldArray
                                    name="categories"
                                    render={(arrayHelpers) => (
                                        this.state.categories && this.state.categories.length > 0 ? (
                                            <div style={{padding: '2rem'}}>
                                                <MultipleSelect
                                                    option={this.state.categories}
                                                    value={arrayHelpers.form.values.categories}
                                                    disabled={this.state.isDisabledCategoryInput}
                                                    update={async categorie => {
                                                        await arrayHelpers.form.setFieldValue('categories', categorie)
                                                    }}
                                                />
                                                <Button
                                                    color="primary"
                                                    type="button"
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
                                                    Valider vos catégories
                                                </Button>
                                                <p>Vos services</p>
                                                <div>
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
                                                                    </ExpansionPanelSummary>
                                                                    <ExpansionPanelDetails>
                                                                        {categorie[categorie.label.replace(/\s/g, '') + 'Services'].map((service, index) => {
                                                                            return (
                                                                                <FormControlLabel
                                                                                    key={index}
                                                                                    control={
                                                                                        <Checkbox
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
                                                                            )
                                                                        })}
                                                                    </ExpansionPanelDetails>
                                                                </ExpansionPanel>
                                                            )
                                                        })
                                                    ):(<p>Veuillez choisir vos catégories</p>)}
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
                                                    type="button"
                                                    onClick={() => {
                                                        let servCompObjArr = [];
                                                        let uniqueIdFilters = [];
                                                        let uniqueIdPrestations = [];
                                                        const services = form.values.services;
                                                        //console.log(services);
                                                        let arrServices = [];
                                                        services.map((service, index) => {
                                                            axios.get(`${url}myAlfred/api/service/${service}`)
                                                                .then(res => {
                                                                    let servCompObj = { CategoryLabel : res.data.category.label, serviceId: res.data._id, serviceLabel: res.data.label, descService: '', minimumBasket: '', diploma: null,certification: null, perimeter: 50, delayBeforeShop: '', delayBeforeShopDWM: null, city: null, increases: { label: res.data.majoration, price: 0, checked: false }, prestationsCount: 0, cancelChoice: false, equipments: [], filters: [] }
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
                                                                                            console.log(prestation)
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
                                                    Valider vos services
                                                </Button>
                                                {/*form.values.submission.length > 0 ?
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                          Étape suivante
                        </Button> : null*/
                                                }
                                            </div> : null;
                                    }}
                                </Field>
                                <Field
                                    render={({form}) => (
                                        <Button type="submit" variant="contained" color="primary" style={{marginTop: '45px', color: form.values.submission.length > 0 ? 'white' : null }} disabled={form.values.submission.length > 0 ? false : true}>
                                            Étape suivante
                                        </Button>
                                    )}
                                />
                            </Card>
                        </Grid>
                    </Wizard.Page>
                    <Wizard.Page>
                        <Grid container className={classes.cardContainer}>
                            <Card className={classes.card}>
                                <div className={classes.banner}>
                                    <h3 style={{fontFamily: 'helveticaNeue', marginLeft: 10, color: 'white'}}>Etape 1 - Configuration de vos services</h3>
                                    <div>
                                        <Bar style={{width: '40%!important'}}>
                                            <Fill />
                                        </Bar>
                                    </div>
                                </div>
                                <FieldArray
                                    name="submission"
                                    render={(arrayHelpers) => {
                                        return this.state.allInOneServ && this.state.allInOneServ.length > 0 ?
                                            <Tabs>
                                                <TabList>
                                                    {this.state.allInOneServ.map((data, index) => {
                                                        return <Tab key={index} style={{backgroundColor: '#00abed', color: 'white', fontSize: '25px', border: '1px solid white'}}>{data.serviceLabel}</Tab>
                                                    })}
                                                </TabList>
                                                {this.state.allInOneServ.map((s, index) => {
                                                    return(
                                                        <TabPanel key={index}>
                                                            <div style={{padding: '0 2rem'}}>
                                                                <h2 className={classes.text1} style={{margin: '15px 0'}}>{s.CategoryLabel}</h2>
                                                                <div className={classes.title2} style={{marginBottom: '0 !important'}}>
                                                                    <h4 style={{color: 'white'}} className={classes.text1}>{s.serviceLabel}</h4>
                                                                </div>
                                                            </div>
                                                            <div style={{padding: '0 2rem'}}>
                                                                <div style={{backgroundColor: '#f5f2f2', paddingBottom: '1rem'}}>
                                                                    <Grid container spacing={8}>
                                                                        {s.filters.map((f, indexf) => {
                                                                            return (
                                                                                <Grid
                                                                                    item
                                                                                    xs={6}
                                                                                    key={indexf}
                                                                                    style={{padding: '0 2rem'}}
                                                                                >
                                                                                    <p>{f.label}</p>
                                                                                    {f.prestations.map((p, indexp) => {
                                                                                        return(
                                                                                            <div key={indexp}>
                                                                                                <FormControlLabel
                                                                                                    control={
                                                                                                        <Checkbox
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
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </Grid>
                                                                            )
                                                                        })}
                                                                    </Grid>
                                                                    <hr style={{margin: '1rem 2rem 1rem 2rem'}}></hr>


                                                                    <div style={{padding: '0 2rem'}}>
                                                                        <Typography>Je fournis</Typography>
                                                                        {s.equipments.map((e, indexe) => {
                                                                            return (
                                                                                <label key={indexe}>
                                                                                    {e.label}
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        value={e.checked}
                                                                                        onChange={() => {
                                                                                            e.checked = !e.checked;
                                                                                            arrayHelpers.form.setFieldValue(`submission[${index}].equipments[${indexe}].checked`, e.checked);
                                                                                        }}
                                                                                    />
                                                                                </label>
                                                                            )
                                                                        })}
                                                                    </div>

                                                                    <div style={{padding: '1rem 2rem 1rem 2rem'}}>
                                                                        <Typography style={{marginBottom: '1rem'}}>Localisation : définissez le périmètre que vous souhaitez couvrir</Typography>
                                                                        <InputRange
                                                                            maxValue={100}
                                                                            minValue={5}
                                                                            value={arrayHelpers.form.values.submission[index].perimeter}
                                                                            onChange={inputRangeValue => arrayHelpers.form.setFieldValue(`submission[${index}].perimeter`, inputRangeValue)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{padding: '1.5rem 2rem'}}>
                                                            <Grid container>
                                                    <div className={classes.title1}>
                                                        <h4
                                                            style={{ color: "white" }}
                                                            className={classes.text1}
                                                        >
                                                            Décrivez brievement vos services et votre
                                                            expertise.
                                                        </h4>
                                                    </div>
                                                    <Typography>
                                                        Rédigez un résumé rapide de vos services. Mettez en
                                                        évidence vos savoir faire, vos expériences et ce qui
                                                        vous démarque des autres Alfred !
                                                    </Typography>
                                                    <Grid item xs={1} />
                                                    <Grid item xs={2} />
                                                        <Grid
                                                            item
                                                            key={index}
                                                            style={{ width: "100%", marginBottom: 15 }}
                                                        >
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
                                                                            //name={s.serviceLabel}
                                                                            //value={this.state[s.serviceLabel]}
                                                                            //onChange={this.handleInputChange}
                                                                        />
                                                                    )
                                                                }}
                                                            />
                                                            <ErrorMessage name={`submission[${index}].descService`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                        </Grid>

                                                    <Grid item xs={2} />
                                                </Grid>

                                                <hr style={{margin: '1rem 2rem 1rem 2rem'}}></hr>
                                                                <Grid container>
                                                                    <Grid item xs={12}>
                                                                        <CityFinder formikCtx={arrayHelpers} index={index} />
                                                                    </Grid>
                                                                    <div style={{width: '100%'}}>
                                                                        <hr style={{margin: '1rem 2rem 1rem 2rem'}}></hr>
                                                                    </div>
                                                                    <Grid item xs={12}>
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
                                                                                        helperText="Choisissez le montant minimum du panier afin de passer une commande pour ce service"
                                                                                        InputProps={{
                                                                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                                                                        }}
                                                                                    />
                                                                                )
                                                                            }}
                                                                        />
                                                                        <ErrorMessage name={`submission.${index}.minimumBasket`} render={msg => <div style={{color: 'red'}}>{msg}</div>}/>
                                                                    </Grid>
                                                                    <div style={{width: '100%'}}>
                                                                        <hr style={{margin: '1rem 2rem 1rem 2rem'}}></hr>
                                                                    </div>
                                                                    <Grid item xs={12}>
                                                                        <Field
                                                                            name={`submission.${index}.delayBeforeShop`}
                                                                            render={({field}) => {
                                                                                return (
                                                                                    <TextField
                                                                                        {...field}
                                                                                        style={{width: '55%', marginRight: '5%'}}
                                                                                        label="Délais"
                                                                                        margin="dense"
                                                                                        variant="outlined"
                                                                                        helperText="Délais de prévenance avant réservation."
                                                                                    />
                                                                                )
                                                                            }}
                                                                        />
                                                                        <Field
                                                                            name={`submission.${index}.delayBeforeShopDWM`}
                                                                            render={({field}) => {
                                                                                console.log(field)
                                                                                return (
                                                                                    <TextField
                                                                                        {...field}
                                                                                        style={{width: '40%'}}
                                                                                        select
                                                                                        variant="outlined"
                                                                                        margin="dense"
                                                                                        label="Jours / semaines / mois"
                                                                                    >
                                                                                        <MenuItem value="day">Jour(s)</MenuItem>
                                                                                        <MenuItem value="week">semaine(s)</MenuItem>
                                                                                        <MenuItem value="month">mois</MenuItem>
                                                                                    </TextField>
                                                                                )
                                                                            }}
                                                                        />
                                                                        <ErrorMessage name={`submission.${index}.delayBeforeShop`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                                        <ErrorMessage name={`submission.${index}.delayBeforeShopDWM`} render={msg => <div style={{color: 'red'}}>{msg}</div>}/>
                                                                    </Grid>
                                                                    <div style={{width: '100%'}}>
                                                                        <hr style={{margin: '1rem 2rem 1rem 2rem'}}></hr>
                                                                    </div>
                                                                    <Grid item xs={12}>
                                                                        <label>
                                                                            Diplôme
                                                                            <input id="file" name="diploma" type="file" onChange={(event) => {
                                                                                arrayHelpers.form.setFieldValue(`submission.${index}.diploma`, event.currentTarget.files[0]);
                                                                            }} className="form-control"
                                                                            />
                                                                        </label>
                                                                        <Thumb file={arrayHelpers.form.values.submission[index].diploma} />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <label>
                                                                            Certification
                                                                            <input id="file" name="certification" type="file" onChange={(event) => {
                                                                                arrayHelpers.form.setFieldValue(`submission.${index}.certification`, event.currentTarget.files[0]);
                                                                            }} className="form-control"
                                                                            />
                                                                        </label>
                                                                        <Thumb file={arrayHelpers.form.values.submission[index].certification} />
                                                                    </Grid>
                                                                    <div style={{width: '100%'}}>
                                                                        <hr style={{margin: '1rem 2rem 1rem 2rem'}}></hr>
                                                                    </div>
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
                                                                    {/*<label htmlFor="raised-button-file">
                                  <Button variant="contained" component="span">
                                    Ajouter un diplôme
                                  </Button>
                                    </label> */}
                                                                </Grid>
                                                            </div>
                                                        </TabPanel>
                                                    )
                                                })}
                                            </Tabs> : null
                                    }}
                                />
                                {/*<div>*/}
                                <Field render={({form}) => {
                                    const checkArr = [];

                                    form.values.submission.map(pc => {
                                        if (pc.prestationsCount > 0) {
                                            return checkArr.push(true);
                                        } else {
                                            return checkArr.push(false);
                                        }
                                    })

                                    const check = el => {
                                        return el === false;
                                    }

                                    return (
                                        <Button type="submit" variant="contained" color="primary" style={{marginTop: '45px', color: !checkArr.some(check) ? 'white' : null }} disabled={checkArr.some(check) ? true : false}>
                                            Étape suivante
                                        </Button>
                                    )
                                }} />
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
                                <div className={classes.banner}>
                                    <h3
                                        style={{
                                            fontFamily: "helveticaNeue",
                                            marginLeft: 10,
                                            color: "white"
                                        }}
                                    >
                                        Etape 2
                                    </h3>

                                    <div>
                                        <Bar>
                                            <Fill />
                                        </Bar>
                                    </div>
                                </div>
                                <div className={classes.newContainer}>
                                    <Typography>Paramètres de réservation</Typography>
                                    <Grid container>
                                        <div className={classes.title1}>
                                            <h4 style={{ color: "white" }} className={classes.text1}>
                                                Comment les utilisateurs peuvent réserver
                                            </h4>
                                        </div>
                                        <Grid item>
                                            <Field render={({form}) => {
                                                return (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={form.values.createShop.booking_request}
                                                                onChange={() => {
                                                                    form.values.createShop.booking_request = !form.values.createShop.booking_request;
                                                                    form.setFieldValue('createShop.booking_request', form.values.createShop.booking_request);
                                                                }}
                                                                value={form.values.createShop.booking_request}
                                                                color="primary"
                                                                name={"booking_request"}
                                                            />
                                                        }
                                                        label="Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H"
                                                    />
                                                )
                                            }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <div className={classes.title1}>
                                            <h4 style={{ color: "white" }} className={classes.text1}>
                                                Conditions de réservation
                                            </h4>
                                        </div>
                                        <Typography>
                                            Il se peut que vous ayez moins de réservation si vous
                                            ajoutez des conditions. Les personnes qui ne répondent pas
                                            à vos critères peuvent quand même envoyer une demande
                                        </Typography>

                                        <Grid item style={{ marginRight: 62 }}>
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
                                                            />
                                                        }
                                                        label="Conditions My-Alfred"
                                                        style={{ marginRight: 5 }}
                                                    />
                                                )
                                            }} />

                                            <Tooltip
                                                title="Numéro de téléphone confirmé, adresse e-mail, informations de paiements et acceptation
                                du règlement intérieur."
                                            >
                                                <button
                                                    disabled
                                                    style={{
                                                        border: 0,
                                                        borderRadius: 20,
                                                        color: "white",
                                                        backgroundColor: "#00abed"
                                                    }}
                                                >
                                                    ?
                                                </button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
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
                                                            />
                                                        }
                                                        label="+ Photo de profil"
                                                        style={{ marginRight: 5 }}
                                                    />
                                                )
                                            }} />
                                            <Tooltip title="Si vous activez cette condition, vous ne pourrez voir les photos de profil des voyageurs qu'une fois la réservation confirmée.">
                                                <button
                                                    disabled
                                                    style={{
                                                        border: 0,
                                                        borderRadius: 20,
                                                        color: "white",
                                                        backgroundColor: "#00abed"
                                                    }}
                                                >
                                                    ?
                                                </button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item style={{ marginRight: 30 }}>
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
                                                            />
                                                        }
                                                        label="+ Carte d'identité officielle"
                                                        style={{ marginRight: 5 }}
                                                    />
                                                )
                                            }} />
                                            <Tooltip title="Ces voyageurs ont vérifié leur identité.">
                                                <button
                                                    disabled
                                                    style={{
                                                        border: 0,
                                                        borderRadius: 20,
                                                        color: "white",
                                                        backgroundColor: "#00abed"
                                                    }}
                                                >
                                                    ?
                                                </button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
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
                                                            />
                                                        }
                                                        label="+ Recommandations d'autres Alfred"
                                                        style={{ marginRight: 5 }}
                                                    />
                                                )
                                            }} />
                                            <Tooltip title="Ces utilisateurs ont déjà utilisés des services avec My-Alfred, sont recommandés par d'autres Alfred et n'ont pas reçu de commen- taires négatifs.">
                                                <button
                                                    disabled
                                                    style={{
                                                        border: 0,
                                                        borderRadius: 20,
                                                        color: "white",
                                                        backgroundColor: "#00abed"
                                                    }}
                                                >
                                                    ?
                                                </button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item style={{ marginTop: 15, width: "100%" }}>
                                            <Field name="createShop.welcome_message" render={({field, form}) => {
                                                return (
                                                    <TextField
                                                        {...field}
                                                        id="outlined-multiline-static"
                                                        label={
                                                            <React.Fragment>
                                                                Votre message de bienvenue validant votre
                                                                réservation
                                                                <br />
                                                                <em style={{ fontSize: 13 }}>
                                                                    Les utilisateurs verront votre message lorsque
                                                                    vous confirmerez leur réservation.
                                                                </em>
                                                            </React.Fragment>
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
                                    <Grid container>
                                        <div className={classes.title1}>
                                            <h4 style={{ color: "white" }} className={classes.text1}>
                                                Conditions d'annulation
                                            </h4>
                                        </div>
                                        <Typography>
                                            Choisissez vos conditions en cas d'annulation de la part
                                            des utilisateurs.
                                        </Typography>
                                        <Grid
                                            item
                                            style={{ width: "100%", marginTop: 10, marginBottom: 10 }}
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
                                                            />
                                                        }
                                                        label={
                                                            <React.Fragment>
                                                                Flexibles
                                                                <br />
                                                                <em>
                                                                    Remboursement intégral jusqu'à 1 jour avant la
                                                                    prestation
                                                                </em>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                )
                                            }} />
                                        </Grid>
                                        <Grid item style={{ width: "100%" }}>
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
                                                            />
                                                        }
                                                        label={
                                                            <React.Fragment>
                                                                Modérées
                                                                <br />
                                                                <em>
                                                                    Remboursement intégral jusqu'à 5 jours avant la
                                                                    prestation
                                                                </em>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                )
                                            }} />
                                        </Grid>
                                        <Grid item>
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
                                                                style={{ marginTop: -72 }}
                                                            />
                                                        }
                                                        label={
                                                            <React.Fragment>
                                                                <p style={{ marginBottom: 0 }}>Strictes</p>
                                                                <em>
                                                                    Remboursement intégral pour les annulations
                                                                    effectuées dans les 48 heures suivant la
                                                                    réservation, si la date de ma prestation
                                                                    intervient dans 14 jours ou plus. Remboursement à
                                                                    hauteur de 50 % pour les annulations effectuées au
                                                                    moins 7 jours avant la date de la prestation.
                                                                    Aucun remboursement pour les annulations
                                                                    effectuées dans les 7 jours précédant la date de
                                                                    la prestation.
                                                                </em>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                )
                                            }} />
                                        </Grid>
                                    </Grid>
                                </div>
                                <Field render={({form}) => {
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
                                }} />
                            </Card>
                        </Grid>
                    </Wizard.Page>
                    <Wizard.Page>
                        <Field>
                            {({ form, field }) => (
                                <React.Fragment>
                                    <Grid container className={classes.cardContainer}>
                                        <Card className={classes.card}>
                                            <div className={classes.banner}>
                                                <h3
                                                    style={{
                                                        fontFamily: "helveticaNeue",
                                                        marginLeft: 10,
                                                        color: "white"
                                                    }}
                                                >
                                                    Etape 3
                                                </h3>

                                                <div>
                                                    <Bar>
                                                        <Fill2 />
                                                    </Bar>
                                                </div>
                                            </div>
                                            <div className={classes.newContainer}>
                                                <Typography style={{ paddingBottom: 20 }}>
                                                    Présentez vous !
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
                                                        <Typography>
                                                            Téléchargez votre photo de profil
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                
                                                <Grid container>
                                                    <Grid item xs={12} className={classes.vridentite}>
                                                        <div className={classes.title1}>
                                                            <h4
                                                                style={{ color: "white" }}
                                                                className={classes.text1}
                                                            >
                                                                Vérifiez votre identité
                                                            </h4>
                                                        </div>
                                                    </Grid>
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
                                                                                <label
                                                                                    htmlFor="icon-button-file"
                                                                                    style={{ fontSize: "small" }}
                                                                                >
                                                                                    Téléchargez votre pièce d'identité(recto)
                                                                                </label>
                                                                                <input
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    className="input"
                                                                                    id="icon-button-file"
                                                                                    name="myCardR"
                                                                                    onChange={(event) => {
                                                                                        form.setFieldValue("createShop.id_recto", event.currentTarget.files[0])
                                                                                    }}
                                                                                />
                                                                                <Thumb file={form.values.createShop.id_recto} />
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
                                                                                <label htmlFor="icon-button-file">
                                                                                    Téléchargez votre pièce d'identité(verso)
                                                                                </label>
                                                                                <input
                                                                                    accept="image/*"
                                                                                    className="input"
                                                                                    name="myCardV"
                                                                                    onChange={(event) => {
                                                                                        form.setFieldValue("createShop.id_verso", event.currentTarget.files[0]);
                                                                                        console.log(form)
                                                                                    }}
                                                                                    id="icon-button-file"
                                                                                    type="file"
                                                                                />
                                                                                <Thumb file={form.values.createShop.id_verso} />
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
                                                    <div
                                                        className={classes.title1}
                                                        style={{ marginBottom: 15 }}
                                                    >
                                                        <h4
                                                            style={{ color: "white" }}
                                                            className={classes.text1}
                                                        >
                                                            Votre statut
                                                        </h4>
                                                    </div>
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
                                                                                    }
                                                                                }}
                                                                                name={"isParticular"}
                                                                                color="primary"
                                                                                value={form.values.createShop.is_particular}
                                                                            />
                                                                        }
                                                                    />
                                                                )
                                                            }} />
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <Typography className={classes.titre1}>
                                                                Je suis un Particulier
                                                            </Typography>
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
                                                                            />
                                                                        }
                                                                    />
                                                                )
                                                            }} />
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <Typography className={classes.titre2}>
                                                                Je suis un Professionnel
                                                            </Typography>
                                                            <Typography>
                                                                Un statut professionnel est nécessaire pour les
                                                                métiers réglementés et permet une activité
                                                                régulière sur My-Alfred. Seuls les
                                                                professionnels peuvent proposer leurs services
                                                                aux entreprises qui ont besoin d’une facture.Un
                                                                statut professionnel est requis dès que votre
                                                                activité devient régulière
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    {isProfessional ? (
                                                        <React.Fragment>
                                                            <Grid container>
                                                                <Grid item>
                                                                    <Field render={({form}) => {
                                                                        return (
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={form.values.createShop.is_microCompany}
                                                                                        onChange={() => {
                                                                                            form.values.createShop.is_microCompany = !form.values.createShop.is_microCompany;
                                                                                            form.setFieldValue("createShop.is_microCompany", form.values.createShop.is_microCompany);

                                                                                            if (form.values.createShop.isIndividualCompany === true && form.values.createShop.is_microCompany === true) {
                                                                                                form.setFieldValue('createShop.isIndividualCompany', false)
                                                                                            }
                                                                                        }}
                                                                                        color="primary"
                                                                                        name="isMicro_company"
                                                                                        value={form.values.createShop.is_microCompany}
                                                                                    />
                                                                                }
                                                                                label="Micro-entreprise, auto-entrepreneur"
                                                                            />
                                                                        )
                                                                    }} />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container>
                                                                <Grid item>
                                                                    <Field render={({form}) => {
                                                                        return (
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={form.values.createShop.isIndividualCompany}
                                                                                        onChange={() => {
                                                                                            form.values.createShop.isIndividualCompany = !form.values.createShop.isIndividualCompany;
                                                                                            form.setFieldValue("createShop.isIndividualCompany", form.values.createShop.isIndividualCompany);

                                                                                            if (form.values.createShop.isIndividualCompany === true && form.values.createShop.is_microCompany === true) {
                                                                                                form.setFieldValue('createShop.is_microCompany', false)
                                                                                            }
                                                                                        }}
                                                                                        color="primary"
                                                                                        name="isIndividualCompany"
                                                                                        value={form.values.createShop.isIndividualCompany}
                                                                                    />
                                                                                }
                                                                                label="Entreprise individuelle, EIRL, MDA, professions libérales..."
                                                                            />
                                                                        )
                                                                    }} />
                                                                </Grid>
                                                            </Grid>
                                                        </React.Fragment>
                                                    ) : (
                                                        ""
                                                    )}
                                                </Grid>

                                                {isProfessional ? (
                                                    <Grid container>
                                                        <Grid item xs={12} md={6}>
                                                            <Field name="createShop.siret" render={({field}) => {
                                                                return (
                                                                    <TextField
                                                                        {...field}
                                                                        id="filled-with-placeholder"
                                                                        label="Siret"
                                                                        placeholder="Siret"
                                                                        margin="normal"
                                                                        variant="filled"
                                                                        type="text"
                                                                    />
                                                                )
                                                            }} />
                                                            <ErrorMessage name={`createShop.siret`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Field name="createShop.creationDate" render={({field}) => {
                                                                return (
                                                                    <TextField
                                                                        {...field}
                                                                        id="date"
                                                                        label="Date de création"
                                                                        type="date"
                                                                        variant="filled"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        style={{ marginTop: 14.5 }}
                                                                    />
                                                                )
                                                            }} />
                                                            <ErrorMessage name={`createShop.creationDate`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Field name="createShop.denomination" render={({field}) => {
                                                                return (
                                                                    <TextField
                                                                        {...field}
                                                                        id="filled-with-placeholder"
                                                                        label="Dénomination"
                                                                        placeholder="Dénomination"
                                                                        margin="normal"
                                                                        variant="filled"
                                                                        type="text"
                                                                    />
                                                                )
                                                            }} />
                                                            <ErrorMessage name={`createShop.denomination`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Field name="createShop.nafape" render={({field}) => {
                                                                return (
                                                                    <TextField
                                                                        {...field}
                                                                        id="filled-with-placeholder"
                                                                        label="Code NAF/APE"
                                                                        placeholder="Code NAF/APE"
                                                                        margin="normal"
                                                                        variant="filled"
                                                                        type="text"
                                                                    />
                                                                )
                                                            }} />
                                                            <ErrorMessage name={`createShop.nafape`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                        </Grid>
                                                    </Grid>
                                                ) : (
                                                    ""
                                                )}

                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={classes.title1}
                                                            style={{ marginBottom: 15 }}
                                                        >
                                                            <h4
                                                                style={{ color: "white" }}
                                                                className={classes.text1}
                                                            >
                                                                Vos obligations légales
                                                            </h4>
                                                        </div>
                                                    </Grid>

                                                    <Typography>
                                                        Dans le cadre des prestations effectuées via
                                                        MyAlfred, vous devez respecter toutes les
                                                        obligations légales et réglementaires (fiscales,
                                                        sociales, comptables, administratives, etc...)
                                                        correspondant à votre statut.
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
                                                                </Grid>
                                                            </React.Fragment>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <Field render={({form}) => {
                                                let check = true;

                                                if (form.values.createShop.is_particular === true) {
                                                    check = false;
                                                } else if(form.values.createShop.is_professional === true && form.values.createShop.is_microCompany === true) {
                                                    check = false;
                                                } else if (form.values.createShop.is_professional === true && form.values.createShop.isIndividualCompany === true) {
                                                    check = false;
                                                } else {
                                                    check = true;
                                                }

                                                return (
                                                    <Button type="submit" variant="contained" style={{marginTop: '45px', color: !check ? 'white' : null }} color="primary" disabled={check}>
                                                        Envoyer
                                                    </Button>
                                                )
                                            }} />
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
  background: #cacfe4;
  height: 100%;
  border-radius: inherit;
  transition: width .2s ease-in;
  width: 80%;
`;

const Fill2 = styled.div`
    background: #cacfe4;
    height: 100%;
    border-radius: inherit;
    transition: width .2s ease-in;
    width: 95%;
`;

export default withStyles(styles)(Form);
