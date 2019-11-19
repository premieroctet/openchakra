import React from 'react';
import Router from 'next/router';
import { Formik, Field, ErrorMessage, FieldArray} from 'formik';
import styled from 'styled-components';
import axios from 'axios';
import InputRange from 'react-input-range';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import * as Yup from 'yup';
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Select from 'react-select';
import MaterialSelect from '@material-ui/core/Select';
import MultipleSelect from './MultipleSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddressFinder from './AddressFinder';
import Siret from './Siret';
import { FormControl, RadioGroup, Radio } from '@material-ui/core';
import { toast } from "react-toastify";
import Loader from 'react-loader-spinner';
import Clear from '@material-ui/icons/Clear';
import Input from '@material-ui/core/Input';
import Schedule from '../Schedule/Schedule';


//todo :fix thix
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
//

const { config } = require('../../config/config');
const url = config.apiUrl;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const styles = theme => ({
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 3rem 0 3rem',
        [theme.breakpoints.down('sm')]: {
            padding: '0'
        },
        fontFamily: 'helvetica',
        overflow: 'scroll',
        height: 'auto',
    },
    chip: {
        marginRight: 5,
        marginBottom: 5,
    },
    checkboxespart: {
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
    newContainer: {
        padding: 20,
    },
    imgDiv: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    delayDivResponsive: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
    },
    selectDelayInputRepsonsive: {
        [theme.breakpoints.down('sm')]: {
            width: '100%!important',
        },
    },
    inputDiplomaCertifResp: {
        [theme.breakpoints.down('sm')]: {
            width: '100%!important',
        },
    },
    prestationsPres: {
        [theme.breakpoints.down('sm')]: {
            padding: '0!important',
        }
    },
    contentCheckBox: {
        display:'flex',
        alignItems: 'center',
        fontFamily: 'helvetica',
    },
    inputTextField: {
        color:'white',
        fontSize: '1em',
        fontFamily: 'helvetica',
    }
});


class Wizard extends React.Component {
    static Page = ({ children }) => children;

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            values: props.initialValues,
            hasId: false
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(url+'myAlfred/api/users/current')
            .then(res => {
                console.log(res);
                if (typeof res.data.id_card !== 'undefined') this.setState({ hasId: true });
            })
            .catch(error => {
                console.log(error);
            })
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
        const { children } = this.props;
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
                            const newObj = {prestation: b.id, price: b.price, billing:b.billing};
                            arrayPrestations.push(newObj);

                        }
                    })
                })
                e.equipments.forEach(c => {

                    if(c.checked === true) {
                        arrayEquipments.push(c.id);
                    }
                })
                let option = null;
                if (e.option !== null) {
                    option = {label: e.option.label, price: e.option.price, unity: e.option.unity.value, type: e.option.type.value};
                }
                const experienceYears = e.experienceYears.value;
                const city = e.city.value;
                const perimeter = e.perimeter;
                const minimum_basket = e.minimumBasket;
                const deadline_before_booking = e.delayBeforeShop + ' ' + e.delayBeforeShopDWM;
                const description = e.descService;

                let graduated = false;
                let diploma = null;
                let diplomaLabel = null;
                let diplomaYear = null;
                if(e.diploma !== null) {
                    graduated = true;
                    diploma = e.diploma.diploma;
                    diplomaLabel = e.diploma.label;
                    diplomaYear = e.diploma.year;

                }
                let is_certified = false;
                let certification = null;
                let certificationYear = null;
                let certificationLabel = null;
                if(e.certification !== null) {
                     is_certified = true;
                     certification = e.certification.certification;
                     certificationLabel = e.certification.label;
                     certificationYear = e.certification.year;
                }

                let active = false;
                let price = 0;
                if(e.increases.checked === true) {
                     active = true;
                     price = e.increases.price;
                }
                const formData = new FormData();
                formData.append('service',service);
                formData.append('option', JSON.stringify(option));
                formData.append('experience_years', experienceYears);
                formData.append('prestations',JSON.stringify(arrayPrestations));
                formData.append('equipments',JSON.stringify(arrayEquipments));
                formData.append('city',city);
                formData.append('perimeter',perimeter);
                formData.append('minimum_basket',minimum_basket);
                formData.append('deadline_before_booking',deadline_before_booking);
                formData.append('graduated',graduated.toString());
                formData.append('diploma',diploma);
                formData.append('diplomaLabel', diplomaLabel);
                formData.append('diplomaYear', diplomaYear);
                formData.append('is_certified',is_certified.toString());
                formData.append('certification',certification);
                formData.append('certificationLabel', certificationLabel);
                formData.append('certificationYear', certificationYear);
                formData.append('active',active.toString());
                formData.append('price',price.toString());
                formData.append('description',description);

                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                axios.post(url+'myAlfred/api/serviceUser/add',formData)
                    .then(res => {

                            const booking_request = values.createShop.booking_request;
                            const no_booking_request = values.createShop.no_booking_request;
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

                                    axios.post(url+'myAlfred/api/shop/add',{booking_request,no_booking_request,my_alfred_conditions,profile_picture,identity_card
                                    , recommandations, welcome_message,flexible_cancel,moderate_cancel,strict_cancel,is_particular,is_professional,
                                    self_employed,individual_company,name,creation_date,naf_ape,siret,arrayService})
                                        .then(result => {

                                            const formDataIdProfile = new FormData();
                                            formDataIdProfile.append('myCardR',values.createShop.id_recto);
                                            if (values.createShop.id_verso !== null) {
                                                formDataIdProfile.append('myCardV',values.createShop.id_verso);
                                            }
                                            axios.post(url+'myAlfred/api/users/profile/idCard',formDataIdProfile)
                                                .then(res => {

                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                })

                                            const profilePicture = values.alfredUpdate.profile_picture_user;
                                            const formDataPicture = new FormData();
                                            formDataPicture.append('myImage',profilePicture);
                                            axios.post(url+'myAlfred/api/users/profile/picture',formDataPicture)
                                                .then(res => {

                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                })
                                            axios.put(url+'myAlfred/api/users/users/becomeAlfred')
                                                .then(res => {
                                                    toast.info('Boutique créée avec succès');
                                                    Router.push('/myShop/services');

                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                })

                                            return console.log(values);


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
            minimumBasket: Yup.number().typeError('Un nombre est requis pour le minimum d\'achat').moreThan(0,'Le prix doit être supérieur à 0€').required('Le minimum d\'achat est requis'),
            delayBeforeShopDWM: Yup.string().typeError('Choisissez parmi heures, jours et semaines').required('Choisissez parmi heures, jours et semaines'),
            city: Yup.string().typeError('Veuillez entrer la ville où le service sera pratiqué').required('Veuillez entrer la ville où le service sera pratiqué'),
            filters: Yup.array().of(Yup.object().shape({
                prestations: Yup.array().of(Yup.object().shape({
                    checked: Yup.boolean(),
                    price: Yup.number().when('checked', {
                        is: true,
                        then: Yup.number().typeError('Le prix doit être un nombre').moreThan(0, 'Le prix doit être supérieur à 0€').required('Veuillez entrer un prix'),
                        otherwise: Yup.number().nullable(true),
                    }),
                    billing: Yup.string().when('checked', {
                        is: true,
                        then: Yup.string().typeError('Veuillez sélectionner une méthode de facturation').required('Veuillez sélectionner une méthode de facturation'),
                        otherwise: Yup.string().notRequired().nullable(),
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
        createShop: Yup.object().shape({
            is_professional: Yup.boolean(),
            id_recto: Yup.lazy(() => {
                if (this.state.hasId === false) {
                    return Yup.mixed().required('Veuillez uploader le recto de votre carte d\'identité ou bien votre passeport');
                }
                return Yup.mixed().notRequired();
            }),
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

    schemaArray =[this.Step0Schema, this.Step1Schema, this.Step2Schema, this.Step3Schema, this.Step4Schema, this.Step5Schema];

    render() {
        const { schemaArray } = this;
        const { children } = this.props;
        const { page, values } = this.state;
        const activePage = React.Children.toArray(children)[page];
        const textLabel = values.submission.map(pc => {
            return pc.serviceLabel
        });


        return (
            <Formik
                initialValues={values}
                enableReinitialize={false}
                validationSchema={schemaArray[page]}
                validate={this.validate}
                onSubmit={this.handleSubmit}
                render={({ values, handleSubmit }) => (
                    <React.Fragment>
                        {page !== 0 && <div style={{backgroundColor: 'white'}}>
                            {page === 1 ? <h3 style={{fontFamily: 'helvetica', marginLeft: 10, color: 'black', paddingTop: '1.5rem'}}>Etape 1 - Choisissez votre catégorie puis votre service </h3> : null}
                            {page === 2 ? <h3 style={{fontFamily: 'helvetica', marginLeft: 10, color: 'black', paddingTop: '1.5rem'}}>Etape 1 - Configuration de votre service - {textLabel}</h3> : null}
                            {page === 3 ? <h3 style={{fontFamily: 'helvetica', marginLeft: 10, color: 'black', paddingTop: '1.5rem'}}>Etape 2 - Indiquez vos disponibilités et conditions</h3> : null}
                            {page === 4 ? <h3 style={{fontFamily: 'helvetica', marginLeft: 10, color: 'black', paddingTop: '1.5rem'}}>Etape 2 - Indiquez vos disponibilités et conditions</h3> : null}
                            {page === 5 ? <h3 style={{fontFamily: 'helvetica', marginLeft: 10, color: 'black', paddingTop: '1.5rem'}}>Etape 3 - Présentez vous !</h3> : null}
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
                        <form onSubmit={handleSubmit} style={{display: 'flex', flexFlow: 'row', height: '94vh'}}>
                            <div style={{position: 'relative', backgroundColor: 'white', width: page === 0 ? '100%' : 'none', height: '100%'}}>
                                <div id="bigDiv" className="noscrollbar" style={{height: page === 0 ? '100%' : '81%', overflowY: 'scroll', position: 'relative' }}>
                                    {activePage}
                                </div>
                                <div className={page === 2 || page === 5 ? 'step3buttons' : null} style={{position: 'absolute', bottom: page === 0 ? 0 : '7%', left: 0, width: '100%', padding: page !== 2 || page !== 5 ? '0rem 3rem 3rem 3rem' : null, backgroundColor: page === 5 ? 'white' : 'transparent', zIndex: '999'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', flexFlow: page === 0 ? 'row-reverse' : 'row'}}>
                                        {page !== 0 && <React.Fragment><Button
                                            color="primary"
                                            type="button"
                                            onClick={() => {
                                                const div = document.getElementById('bigDiv');
                                                div.scrollTop = 0;
                                                this.previous();
                                            }}
                                            disabled={page === 0}
                                        >
                                            Retour
                                        </Button>
                                        </React.Fragment>}
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
                                            disabled={values.submission.length <= 0}
                                            onClick={() => {
                                                const div = document.getElementById('bigDiv');
                                                div.scrollTop = 0;
                                            }}
                                        >
                                            Suivant
                                        </Button>}
                                        {page === 2 &&
                                            <Field render={({form}) => {
                                                const checkArr = [];
                                                form.values.submission.map(pc => {
                                                    if (pc.prestationsCount > 0) {
                                                        return checkArr.push(true);
                                                    } else {
                                                        return checkArr.push(false);
                                                    }
                                                });

                                                const check = el => {
                                                    return el === false;
                                                };

                                                return (
                                                    <React.Fragment>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="secondary"
                                                            style={{color: !checkArr.some(check) ? 'white' : null }}
                                                            disabled={checkArr.some(check)}
                                                            onClick={() => {
                                                                if (typeof form.errors.submission === 'undefined') {
                                                                    const div = document.getElementById('bigDiv');
                                                                    div.scrollTop = 0;
                                                                } else {
                                                                    toast.error(<div>Les services suivants n'ont pas été correctement configurés :<br />{form.errors.submission.map((service, i) => {
                                                                        if (typeof service === 'undefined') {
                                                                            return null
                                                                        } else {
                                                                            return <p>{form.values.submission[i].serviceLabel}</p>
                                                                        }
                                                                    })}</div>)
                                                                }
                                                            }}
                                                        >
                                                            Suivant
                                                        </Button>
                                                    </React.Fragment>
                                                )
                                            }}
                                        />}
                                        {page === 3 &&
                                        <Field render={({form}) => {
                                            return (
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="secondary"
                                                    style={{ color: 'white'}}
                                                    onClick={() => {
                                                        if (form.values.servicesAvailability.monday_event.length > 0 || form.values.servicesAvailability.tuesday_event.length > 0 || form.values.servicesAvailability.wednesday_event.length > 0 || form.values.servicesAvailability.thursday_event.length > 0 || form.values.servicesAvailability.friday_event.length > 0 || form.values.servicesAvailability.saturday_event.length > 0 || form.values.servicesAvailability.sunday_event.length > 0) {
                                                            const data = {
                                                                active: form.values.servicesAvailability.active,
                                                                month_begin: form.values.servicesAvailability.month_begin,
                                                                month_end: form.values.servicesAvailability.month_end,
                                                                monday_event: form.values.servicesAvailability
                                                                .monday_event,
                                                                tuesday_event: form.values.servicesAvailability
                                                                .tuesday_event,
                                                                wednesday_event: form.values.servicesAvailability
                                                                .wednesday_event,
                                                                thursday_event: form.values.servicesAvailability
                                                                .thursday_event,
                                                                friday_event: form.values.servicesAvailability
                                                                .friday_event,
                                                                saturday_event: form.values.servicesAvailability
                                                                .saturday_event,
                                                                sunday_event: form.values.servicesAvailability
                                                                .sunday_event
                                                            };

                                                            axios.defaults.headers.common["Authorization"] = localStorage.getItem(
                                                                "token"
                                                            );

                                                            axios
                                                                .post(url + "myAlfred/api/availability/add", data)
                                                                .then(() => {
                                                                toast.info("Disponibilité(s) ajoutée(s) avec succès");
                                                                form.setFieldValue(`servicesAvailability.monday_event`, []);
                                                                form.setFieldValue(`servicesAvailability.tuesday_event`, []);
                                                                form.setFieldValue(`servicesAvailability.wednesday_event`, []);
                                                                form.setFieldValue(`servicesAvailability.thursday_event`, []);
                                                                form.setFieldValue(`servicesAvailability.friday_event`, []);
                                                                form.setFieldValue(`servicesAvailability.saturday_event`, []);
                                                                form.setFieldValue(`servicesAvailability.sunday_event`, []);
                                                            })
                                                                .catch(err => console.log(err));

                                                            const div = document.getElementById('bigDiv');
                                                            div.scrollTop = 0;
                                                        } else {
                                                            const div = document.getElementById('bigDiv');
                                                            div.scrollTop = 0;
                                                        }

                                                    }}
                                                >
                                                    Suivant
                                                </Button>
                                            )
                                        }}/>
                                        }
                                        {page === 4 &&
                                        <Field render={({form}) => {
                                            let cancel = true;

                                            if (form.values.createShop.flexible_cancel === true || form.values.createShop.moderate_cancel === true || form.values.createShop.strict_cancel === true) {
                                                cancel = false;
                                            } else {
                                                cancel = true;
                                            }

                                            return (
                                                <Button type="submit" variant="contained" color="secondary" style={{color: !cancel ? 'white' : null }} disabled={cancel} onClick={() => {
                                                    const div = document.getElementById('bigDiv');
                                                    div.scrollTop = 0;
                                                }}>
                                                    Suivant
                                                </Button>
                                            )
                                        }} />}
                                        {page === 5 &&
                                            <Field render={({form}) => {
                                                let check = true;

                                                if (form.values.createShop.is_particular === true && form.values.createShop.isEngaged === true) {
                                                    check = false;
                                                } else if(form.values.createShop.is_professional === true && form.values.createShop.siret === "" && form.values.createShop.denomination === "" || form.values.createShop.isEngaged === false) {
                                                    check = true;
                                                }
                                                else if (form.values.createShop.is_professional === true && form.values.createShop.isCertified === false) {
                                                    check = true
                                                } else if(form.values.createShop.is_professional === true && form.values.createShop.siret !== "" && form.values.createShop.denomination !== "" || form.values.createShop.isEngaged === false) {
                                                    check = false;
                                                } else {
                                                    check = true;
                                                }

                                                return (
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        style={{color: !check ? 'white' : null }}
                                                        color="secondary"
                                                        disabled={check}
                                                        onClick={() => {
                                                            if (form.values.createShop.siret !== '' && form.values.createShop.siret.length === 14 || form.values.createShop.is_professional === false) {
                                                                return null;
                                                            } else {
                                                                toast.error(<div>Veuillez renseigner un numéro siret</div>);
                                                            }
                                                        }}
                                                    >
                                                        Envoyer
                                                    </Button>
                                                )
                                            }} />}
                                    </div>
                                </div>
                            </div>
                            <div className="imgDiv" style={{width:'100%', overflow: 'hidden', backgroundImage: page === 0 || page === 1 || page === 2 ? 'url("../../static/Creation_shop_step1.png")' : page === 3 ? 'url("../../static/illutration boutique - Etape du calendrier.png")' : page === 4 || page === 5 ? 'url("../../static/Creation_shop_step3.png")' : null , backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: page !== 3 ? 'center' : null}}>
                            </div>
                        </form>
                    </React.Fragment>

                )}
            />
        );
    }
}

const CheckboxCustom = withStyles({
    root: {
        color: '#1C2022',
        '&$checked': {
            color: 'white',
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

const IOSSwitch = withStyles(theme => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: '#47bdd7',
            '& + $track': {
                backgroundColor: 'white',

            },
        },
        '&$focusVisible $thumb': {
            color: 'white',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
        }}
        {...props}
      />
    );
});

const marks = [
  {
    value: 0,
    label: '0 km',
  },

  {
    value: 200,
    label: '200km et +',
  },
];

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
            loading: false,
            prestationsCount: 0,
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
            booking_request: true,
            my_alfred_conditions: true,
            profile_picture_user: false,
            identity_card: false,
            recommandations: false,
            flexible_cancel: true,
            moderate_cancel: false,
            strict_cancel: false,
            welcome_message: "",
            no_booking: false,
            all_options: [],
            currentUser: null,
            passportid: 'passport',
            diplomaName: null,
            diplomaYear: null,
            diplomaObj: null,
            certifName: null,
            certifYear: null,
            certifObj: null,
            checkedB: false,
            checkedC: false,
        };

        this.toggleCheckbox = this.toggleCheckbox.bind(this);

        this.handleChecked = this.handleChecked.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(url+'myAlfred/api/users/current')
            .then(res => {
                this.state.phone = res.data.phone;
                this.state.currentUser = res.data;
                this.state.userCity = {label: res.data.billing_address.city, value: res.data.billing_address.city};
                this.state.userAddress = {label: res.data.billing_address.address, value: res.data.billing_address.address};
                this.state.userZipCode = {label: res.data.billing_address.zip_code, value: res.data.billing_address.zip_code};
                this.state.userCountry = {label: res.data.billing_address.country, value: res.data.billing_address.country};
                if (typeof res.data.id_card !== 'undefined') this.state.userIdCardRecto = res.data.id_card.recto.substr(22);
                if (typeof res.data.id_card !== 'undefined') {
                    if (typeof res.data.id_card.verso !== 'undefined') this.state.userIdCardVerso = res.data.id_card.verso.substr(22);
                }
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(url+'myAlfred/api/category/all')
            .then(response => {
                let categories = response.data;
                if (categories === null) {
                    categories = [];
                }
                const options = categories.map(categorie => {
                    return { value: categorie._id, label: categorie.label, [categorie.label.replace(/\s/g, '') + 'Services']: [] };
                });
                this.setState({ categories: options });
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(url+'myAlfred/api/options/all')
            .then(res => {
                let options = res.data;
                this.setState({all_options: options});
            })
            .catch(err => console.log(err));
    }

    notify() {
        toast.error('erreur');
    }

    handleCategorieChange(categorie, formikCtx) {
        if (categorie === null) {
            categorie = [];
        }
        this.setState({
            categoriesFinal: [this.state.categories, categorie],
            loading: true
        });
        categorie.map((categorie, catInd) => {
            axios.get(`${url}myAlfred/api/service/all/${categorie.value}`)
                .then((response) => {
                    const services = response.data;
                    if (formikCtx.form.values.categories[catInd][categorie.label.replace(/\s/g, '') + 'Services'].length > 0) {
                        formikCtx.form.values.categories[catInd][categorie.label.replace(/\s/g, '') + 'Services'] = [];
                    }
                    const options = services.map(async (service) => {
                        let arrServ = [];
                        const servObj = { value: service._id, label: service.label, categorieId: categorie.value, categorieLabel: categorie.label, checked: false };
                        arrServ.push(servObj);
                        if (categorie.hasOwnProperty(servObj.categorieLabel.replace(/\s/g, '') + 'Services')) {
                            await formikCtx.form.values.categories[catInd][servObj.categorieLabel.replace(/\s/g, '') + 'Services'].push(servObj);
                            this.setState({
                                isDisabledCategoryInput: true,
                                isDisabledExpansionPanels: false,
                            });
                            this.setState({
                                [servObj.categorieLabel.replace(/\s/g, '') + 'Services']: []
                            });
                            this.setState({
                                [servObj.categorieLabel.replace(/\s/g, '') + 'Services']: formikCtx.form.values.categories[catInd][servObj.categorieLabel.replace(/\s/g, '') + 'Services']
                            });
                            await setTimeout(() => this.setState({ loading: false }), '2000')

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
        const { isProfessional } = this.state;
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
                            booking_request: true,
                            my_alfred_conditions: true,
                            profile_picture_user: false,
                            identity_card: false,
                            recommandations: false,
                            welcome_message: 'Je vous remercie pour votre réservation.',
                            id_recto: null,
                            id_verso: null,
                            is_particular: false,
                            is_professional: false,
                            is_microCompany: false,
                            isIndividualCompany: false,
                            flexible_cancel: true,
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
                            phone: null,
                            profile_picture_user: null,
                        },
                        servicesAvailability: {
                            monday_event: [],
                            tuesday_event: [],
                            wednesday_event: [],
                            thursday_event: [],
                            friday_event: [],
                            saturday_event: [],
                            sunday_event: [],
                            recurrent_event: [],
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
                            all_begin: '',
                            all_end: '',
                            recurrent_service: null,
                            recurrent_all_service: false,
                            all_service: []
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
                        <Grid container className={classes.cardContainer} style={{justifyContent: 'start', overflow: 'hidden'}}>

                            <div style={{padding: '0rem 2rem 1rem 2rem', width: '100%'}}>
                                <Typography variant="h6" style={{marginBottom: '.5rem', marginTop: '1rem', fontSize: 35}}>Devenez Alfred</Typography>
                                <hr style={{margin: '1rem 0'}} />
                            </div>
                            <div className="steps">
                                <div className="step1">
                                    <Typography style={{marginBottom: '.5rem', marginTop: '1rem', fontSize: 20, color: 'grey'}}>Etape 1</Typography>
                                    <hr style={{border: '4px solid grey', marginRight: '10%'}} />
                                    <Typography style={{fontSize: 18}}>Créez le premier service de votre boutique</Typography>
                                    <Typography>Sélectionnez le premier service que vous souhaitez offrir. Vous pourrez ajouter
                                    autant de services que vous le souhaitez dans votre boutique.</Typography>
                                </div>
                                <div className="step2">
                                    <Typography style={{marginBottom: '.5rem', marginTop: '1rem', fontSize: 20, color: 'grey'}}>Etape 2</Typography>
                                    <hr style={{border: '4px solid grey', marginRight: '10%'}} />
                                    <Typography style={{fontSize: 18}}>Indiquez vos disponiblités & conditions</Typography>
                                    <Typography>Indiquez vos disponibilités, paramètres de réservation et vos conditions d’annulation.</Typography>
                                </div>
                                <div className="step3">
                                    <Typography style={{marginBottom: '.5rem', marginTop: '1rem', fontSize: 20, color: 'grey'}}>Etape 3</Typography>
                                    <hr style={{border: '4px solid grey', marginRight: '10%'}} />
                                    <Typography style={{fontSize: 18}}>Présentez-vous !</Typography>
                                    <Typography>Renseignez votre profil Alfred, partagez vos réalisations et décrivez-vous !</Typography>
                                </div>
                            </div>

                        </Grid>
                    </Wizard.Page>
                    <Wizard.Page>
                        <Field>
                            {({ form }) => (
                                <React.Fragment>
                                    <Grid container className={classes.cardContainer} style={{overflow: 'hidden'}}>
                                            <div className={classes.newContainer}>
                                                <h6 style={{fontFamily: 'helvetica', fontSize: '1.25rem',fontWeight: 500, marginTop: 15, marginBottom: 10}}>
                                                    Téléchargez une photo de profil
                                                </h6>
                                                <Typography style={{fontFamily: 'helvetica',fontSize: '1rem', fontWeight:400, marginBottom: '1rem'}}>
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
                                                                                    if (typeof event.currentTarget.files[0] === 'undefined') {
                                                                                    } else {
                                                                                        form.setFieldValue("alfredUpdate.profile_picture_user", event.currentTarget.files[0]);
                                                                                    }
                                                                                }}
                                                                                name={"myImage"}
                                                                            />
                                                                            <div style={{position: 'relative'}}>
                                                                                <label htmlFor="icon-button-file">
                                                                                    <IconButton
                                                                                        color="primary"
                                                                                        className={classes.button}
                                                                                        style={{
                                                                                            width: 100,
                                                                                            height: 100,
                                                                                            backgroundColor: "lightgrey",
                                                                                            backgroundImage: "url('../../static/avatar.svg')"
                                                                                        }}
                                                                                        component="span"
                                                                                    >
                                                                                    </IconButton>
                                                                                </label>
                                                                            </div>
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
                                                    <h6 style={{fontFamily: 'helvetica', fontSize: '1.25rem',fontWeight: 500, marginTop: 15, marginBottom: 10, width: '100%'}}>
                                                        Vérifiez votre identité <span style={{color: '#F8727F' }}>*</span>
                                                    </h6>
                                                    <Typography style={{fontFamily: 'helvetica',fontSize: '1rem', fontWeight:400,}}>
                                                        Ces informations ne seront pas visibles par les utilisateurs. Un profil vérifié est plus engageant pour les utilisateurs !
                                                    </Typography>
                                                    <Grid item xs={12}>
                                                        <Typography style={{fontSize: '1rem', fontWeight:400, fontFamily:'helvetica'}}>
                                                            Vos informations ne seront pas visibles par les
                                                            autres utilisateurs
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <Grid container>
                                                            <div
                                                                style={{
                                                                    border: "0.5px solid #c4c4c4",
                                                                    borderRadius: 10,
                                                                    padding: 15,
                                                                    marginTop: 13.5
                                                                }}
                                                            >
                                                                <FormControl component="fieldset">
                                                                    <RadioGroup
                                                                        aria-label="passport/ID"
                                                                        name="passportID"
                                                                        style={{flexDirection: 'row'}}
                                                                        value={this.state.passportid}
                                                                        onChange={() => {
                                                                            this.setState({passportid: event.target.value});
                                                                            form.setFieldValue("createShop.id_recto", null);
                                                                            form.setFieldValue("createShop.id_verso", null);
                                                                        }}
                                                                    >
                                                                        <FormControlLabel
                                                                            value="passport"
                                                                            control={<Radio color="primary" />}
                                                                            label="Passeport"
                                                                            labelPlacement="start"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="id"
                                                                            control={<Radio color="primary" />}
                                                                            label="Carte d'identité"
                                                                            labelPlacement="start"
                                                                        />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                                {this.state.passportid === 'id' ?
                                                                <React.Fragment>
                                                                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                                                                        <Field render={({form}) => {
                                                                            return (
                                                                                <React.Fragment>
                                                                                    <label style={{display: 'inline-block', marginTop: 15, fontSize: '1rem', fontWeight:400, fontFamily:'helvetica'}} className="forminputs">
                                                                                        Carte identité recto
                                                                                        <input id="file" accept="image/*, application/pdf" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="myCardR" type="file" onChange={(event) => {
                                                                                            if (typeof event.currentTarget.files[0] === 'undefined') {
                                                                                            } else {
                                                                                                form.setFieldValue("createShop.id_recto", event.currentTarget.files[0]);
                                                                                                this.setState({
                                                                                                    userIdCardRecto: null
                                                                                                })
                                                                                            }
                                                                                        }} className="form-control"
                                                                                        />
                                                                                    </label>
                                                                                    {form.values.createShop.id_recto === null && typeof this.state.userIdCardRecto !== 'undefined' && this.state.userIdCardRecto !== null && typeof this.state.userIdCardVerso !== 'undefined' ?
                                                                                    <React.Fragment>
                                                                                        <span>
                                                                                            {this.state.userIdCardRecto.slice(0, 10) + '...'}
                                                                                        </span>
                                                                                        <Clear
                                                                                            color="secondary"
                                                                                            style={{ cursor: 'pointer' }}
                                                                                            onClick={() => {
                                                                                                this.setState({
                                                                                                    userIdCardRecto: null
                                                                                                })
                                                                                            }}
                                                                                        />
                                                                                    </React.Fragment>
                                                                                    :
                                                                                    null}
                                                                                    {form.values.createShop.id_recto !== null ? <React.Fragment><span>{form.values.createShop.id_recto.name.substr(0, 10) + '...'}</span><Clear color="secondary" style={{cursor: 'pointer'}} onClick={() => form.setFieldValue("createShop.id_recto", null)}/></React.Fragment> : null}
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
                                                                        <Field render={({form}) => {
                                                                            return (
                                                                                <React.Fragment>
                                                                                    <label style={{display: 'inline-block', marginTop: 15, fontSize: '1rem', fontWeight:400, fontFamily:'helvetica'}} className="forminputs">
                                                                                        Carte identité verso
                                                                                        <input id="file" accept="image/*, application/pdf" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="myCardV" type="file" onChange={(event) => {
                                                                                            if (typeof event.currentTarget.files[0] === 'undefined') {
                                                                                            } else {
                                                                                                form.setFieldValue("createShop.id_verso", event.currentTarget.files[0]);
                                                                                                this.setState({
                                                                                                    userIdCardVerso: null
                                                                                                })
                                                                                            }
                                                                                        }} className="form-control"
                                                                                        />
                                                                                    </label>
                                                                                    {form.values.createShop.id_verso === null && typeof this.state.userIdCardVerso !== 'undefined' && this.state.userIdCardVerso !== null ?
                                                                                        <React.Fragment>
                                                                                            <span>
                                                                                                {this.state.userIdCardVerso.slice(0, 10) + '...'}
                                                                                            </span>
                                                                                            <Clear
                                                                                                color="secondary"
                                                                                                style={{ cursor: 'pointer' }}
                                                                                                onClick={() => {
                                                                                                    this.setState({
                                                                                                        userIdCardVerso: null
                                                                                                    })
                                                                                                }}
                                                                                            />
                                                                                        </React.Fragment>
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                    {form.values.createShop.id_verso !== null ? <React.Fragment><span>{form.values.createShop.id_verso.name.substr(0, 10) + '...'}</span><Clear color="secondary" style={{cursor: 'pointer'}} onClick={() => form.setFieldValue("createShop.id_verso", null)}/></React.Fragment> : null}
                                                                                    <ErrorMessage name="createShop.id_verso" render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                                                </React.Fragment>
                                                                            )
                                                                        }} />
                                                                    </Grid>
                                                                </React.Fragment>
                                                                :
                                                                <Grid item xs={12} style={{ marginBottom: 10 }}>
                                                                    <Field render={({form}) => {
                                                                        return (
                                                                            <React.Fragment>
                                                                                <label style={{display: 'inline-block', marginTop: 15, fontSize: '1rem', fontWeight:400, fontFamily:'helvetica'}} className="forminputs">
                                                                                    Passeport
                                                                                    <input id="file" accept="image/*, application/pdf" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="myCardR" type="file" onChange={(event) => {
                                                                                        if (typeof event.currentTarget.files[0] === 'undefined') {
                                                                                        } else {
                                                                                            form.setFieldValue("createShop.id_recto", event.currentTarget.files[0]);
                                                                                            this.setState({
                                                                                                userIdCardRecto: null
                                                                                            })
                                                                                        }
                                                                                    }} className="form-control"
                                                                                    />
                                                                                </label>
                                                                                {form.values.createShop.id_recto === null && typeof this.state.userIdCardRecto !== 'undefined' && this.state.userIdCardRecto !== null && typeof this.state.userIdCardVerso === 'undefined'?
                                                                                    <React.Fragment>
                                                                                        <span>
                                                                                            {this.state.userIdCardRecto.slice(0, 10) + '...'}
                                                                                        </span>
                                                                                        <Clear
                                                                                            color="secondary"
                                                                                            style={{ cursor: 'pointer' }}
                                                                                            onClick={() => {
                                                                                                this.setState({
                                                                                                    userIdCardRecto: null
                                                                                                })
                                                                                            }}
                                                                                        />
                                                                                    </React.Fragment>
                                                                                    :
                                                                                    null
                                                                                }
                                                                                {form.values.createShop.id_recto !== null ? <React.Fragment><span>{form.values.createShop.id_recto.name.substr(0, 10) + '...'}</span> <Clear color="secondary" style={{cursor: 'pointer'}} onClick={() => form.setFieldValue("createShop.id_recto", null)}/></React.Fragment> : null}
                                                                                <ErrorMessage name="createShop.id_recto" render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                                            </React.Fragment>
                                                                        )
                                                                    }} />
                                                                </Grid>
                                                                }
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={2} />
                                                </Grid>
                                                <Grid container className={classes.checkboxespart}>
                                                    <Grid container>
                                                        <Grid item xs={12}>
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
                                                                                        this.setState({isProfessional: false});
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
                                                                                icon={<CircleUnchecked/>}
                                                                                checkedIcon={<RadioButtonCheckedIcon />}
                                                                            />
                                                                        }
                                                                        label={<h6 style={{fontFamily: 'helvetica', fontSize: '1.25rem',fontWeight: 500, marginTop: 15, marginBottom: 10}}>
                                                                        Je suis un particulier
                                                                </h6>}
                                                                    />
                                                                )
                                                            }} />
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <Typography style={{marginLeft: '2.5rem',fontSize: '1rem', fontWeight:400, fontFamily:'helvetica'}}>
                                                                En tant que particulier, vous pouvez rendre des services occasionnels sur My-Alfred. Si votre activité devient régulière, un statut professionnel (micro-entrepreneur,...) s’impose. Il est également requis pour certains secteurs d’activité réglementés.
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container style={{ marginTop: 10 }}>
                                                        <Grid item xs={12}>
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
                                                                                icon={<CircleUnchecked/>}
                                                                                checkedIcon={<RadioButtonCheckedIcon />}
                                                                            />
                                                                        }
                                                                        label={<h6 style={{fontFamily: 'helvetica', fontSize: '1.25rem',fontWeight: 500, marginTop: 15, marginBottom: 10}}>
                                                                        Je suis un professionnel
                                                                </h6>}
                                                                    />
                                                                )
                                                            }} />
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <Typography style={{marginLeft: '2.5rem',fontSize: '1rem', fontWeight:400, fontFamily:'helvetica'}}>
                                                                Un statut professionnel est nécessaire pour les métiers réglementés et permet une activité régulière sur My-Alfred. Seuls les professionnels peuvent proposer leurs services aux entreprises qui ont besoin d’une facture. Un statut professionnel est requis dès lors que votre activité devient régulière.
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
                                                <hr style={{margin: '1rem 0'}}/>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <h6 style={{fontFamily: 'helvetica', fontSize: '1.25rem',fontWeight: 500, marginTop: 15, marginBottom: 10}}>
                                                            Vos obligations légales <span style={{color: '#F8727F' }}>*</span>
                                                        </h6>
                                                    </Grid>
                                                    <Typography style={{fontSize: '1rem', fontWeight:400, fontFamily:'helvetica'}}>
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
/**
 * @return {null}
 * @return {null}
 */
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
                                form.values[`${props.fieldName}s`] !== '' ?
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (form.values[`${props.fieldName}s`] !== '' && form.values[`${props.fieldName}s`] != null) {
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
                    {({ form }) => {
                        return (
                            props.option.map((select, index) => {
                                return (
                                    <React.Fragment key={index}>
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

export default withStyles(styles)(Form);

