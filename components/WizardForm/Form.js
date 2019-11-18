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
        fontFamily: 'helveticaNeue',
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
        fontFamily: 'helveticaNeue',
    },
    inputTextField: {
        color:'white',
        fontSize: '1em',
        fontFamily: 'helveticaNeue',
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
                        <Grid container className={classes.cardContainer} style={{display: 'flex', justifyContent: 'start', height:'100%'}}>
                                <div style={{padding: '0rem 2rem 1rem 2rem'}}>
                                    <Typography variant="h6" style={{marginBottom: '.5rem', marginTop: '1rem'}}>Votre catégorie de service</Typography>
                                    <Typography>
                                        Commencez par sélectionner votre catégorie de service. Par exemple, si vous souhaitez réaliser un service de coiffure, sélectionnez la catégorie «Beauté et bien-être».
                                    </Typography>
                                </div>
                                <FieldArray
                                    name="categories"
                                    render={(arrayHelpers) => (
                                        this.state.categories && this.state.categories.length > 0 ? (
                                            <div style={{padding: '.5rem 2rem'}}>
                                             <Select
                                               noOptionsMessage="Pas de catégorie disponible"
                                               className="indicator"
                                               classNamePrefix="indicator"
                                               closeMenuOnSelect={true}
                                               placeholder="Sélectionnez votre catégorie..."
                                               value={arrayHelpers.form.values.categories}
                                               options={this.state.categories}
                                               onChange={categorie => {
							                                    console.log("Catégories:"+this.state.categories);
                                                      if (categorie === null) {
                                                          arrayHelpers.form.setFieldValue('categories', []);
                                                      } else {
                                                          arrayHelpers.form.setFieldValue('categories', [categorie]);
                                                      }
                                                      arrayHelpers.form.setFieldValue('submission', []);
                                                      arrayHelpers.form.setFieldValue('services', []);
                                                      this.setState({ isDisabledExpansionPanels: true });
                                                  }}

                                               theme={theme => ({
                                                   ...theme,
                                                   colors: {
                                                       ...theme.colors,
                                                       primary: '#2FBCD3',
                                                   }
                                               })}
                                               styles={{
                                                   indicatorsContainer: (styles) => {
                                                       return {
                                                           ...styles,
                                                           ':nth-child(1)': {
                                                               color: '#F8727F !important',
                                                           }
                                                       }
                                                   }
                                               }}
                                           />
                                                <Button
                                                    color="primary"
                                                    style={{marginTop: '1rem', marginBottom: '2rem', color: 'white', borderRadius: 8}}
                                                    type="button"
                                                    variant="contained"
                                                    onClick={() => {
                                                        if (arrayHelpers.form.values.categories !== '' && arrayHelpers.form.values.categories != null) {
                                                            this.handleCategorieChange(arrayHelpers.form.values.categories, arrayHelpers);
                                                        }
                                                    }}>
                                                    Je valide cette catégorie
                                                </Button>
                                                <div>
                                                    <Typography variant="h6" style={{marginBottom: '.5rem'}}>Votre service</Typography>
                                                    <Typography>
                                                        Sélectionnez maintenant le service que vous souhaitez proposer dans la catégorie sélectionnée. Vous pourrez choisir les prestations que vous souhaitez proposer dès la prochaine étape !
                                                    </Typography>
                                                    <Typography>
                                                        Un service n'apparaît pas ? Contactez l’équipe My-Alfred à l’adresse <a href="mailto:unservicedeplus@my-alfred.io">unservicedeplus@my-alfred.io</a>
                                                    </Typography>
                                                </div>
                                                <div style={{marginTop: '1rem'}}>
                                                    {arrayHelpers.form.values.categories && arrayHelpers.form.values.categories.length > 0 && this.state.loading === false ? (
                                                        arrayHelpers.form.values.categories.map((categorie, index) => {
                                                            const servName = categorie.label.replace(/\s/g, '') + 'Services';
                                                            return (

                                              <Select
                                                noOptionsMessage="Pas de service disponible"
                                                className="indicator"
                                                classNamePrefix="indicator"
                                                closeMenuOnSelect={true}
                                                placeholder="Sélectionnez votre Service..."
                                                value={arrayHelpers.form.values.services}
                                                options={categorie[categorie.label.replace(/\s/g, '') + 'Services']}
                                                onChange={service => {
                                                  console.log("Service:"+Object.keys(service));
                                                  if (service===null) {
                               					            arrayHelpers.form.setFieldValue('services', []);
                                                  }
                                                  else {
                               					            arrayHelpers.form.setFieldValue('services', [service]);
						                                    	}
                                              const servicesLength = arrayHelpers.form.values.services.length;
                                              this.setState({
                                                  servicesLength,
                                                  servicesValues: arrayHelpers.form.values.services
                                              })
                                                }}
                                                theme={theme => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: '#2FBCD3',
                                                    }
                                                })}
                                                styles={{
                                                    indicatorsContainer: (styles) => {
                                                        return {
                                                            ...styles,
                                                            ':nth-child(1)': {
                                                                color: '#F8727F !important',
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                            )})
                                                    ):(this.state.loading === true
                                                        ? <Loader
                                                            type="TailSpin"
                                                            color="#2FBCD3"
                                                            height={100}
                                                            width={100}
                                                            style={{textAlign: 'center'}}
                                                        />
                                                        :
                                                        <Typography align="center" style={{fontSize: 15, marginTop: '2rem', color: '#F8727F'}}>Sélectionnez votre catégorie pour afficher les services disponibles</Typography>)}
                                                </div>
                                            </div>
                                        ): (<p style={{padding: '0 2rem'}}>Chargement...</p>)
                                    )}
                                />
                                <Field>
                                    {({form}) => {
                                        return form.values.services && form.values.services.length > 0 ?
                                            <div style={{padding: '0 2rem 1rem 2rem'}}>
                                                <Button
                                                    color="primary"
                                                    style={{marginTop: '3rem', color: 'white', borderRadius: 8}}
                                                    variant="contained"
                                                    type="button"
                                                    onClick={() => {
                                                        let servCompObjArr = [];
                                                        let uniqueIdFilters = [];
                                                        let uniqueIdPrestations = [];
                                                        const services = form.values.services;
                                                        services.map((service, index) => {
                                                            this.setState({
                                                                [`userCityClicked${index}`]: false,
                                                                [`otherOptionChecked${index}`]: false
                                                            });
							                                              console.log('Service:'+service.value);
                                                            axios.get(`${url}myAlfred/api/service/${service.value}`)
                                                                .then(res => {
                                                                    let servCompObj = {
                                                                        CategoryLabel : res.data.category.label,
                                                                        serviceId: res.data._id,
                                                                        serviceLabel: res.data.label,
                                                                        descService: '',
                                                                        minimumBasket: '1',
                                                                        diploma: {
                                                                            label: null,
                                                                            year: null,
                                                                            diploma: null
                                                                        }, certification: {
                                                                            label : null,
                                                                            year: null,
                                                                            certification: null
                                                                        }, perimeter: 50,
                                                                        delayBeforeShop: 1,
                                                                        delayBeforeShopDWM: 'jours',
                                                                        city: this.state.userCity,
                                                                        address: this.state.userAddress,
                                                                        postal_code: this.state.userZipCode,
                                                                        country: this.state.userCountry,
                                                                        experienceYears: '',
                                                                        option: null,
                                                                        increases: {
                                                                            label: res.data.majoration,
                                                                            price: 0, checked: false
                                                                        },
                                                                        prestationsCount: 0,
                                                                        cancelChoice: false,
                                                                        equipments: [],
                                                                        filters: []
                                                                    };
                                                                    res.data.equipments.map(e => {
                                                                        const equipObj = { id: e._id, label: e.label, logo: e.logo, name_logo: e.name_logo, checked: false };
                                                                        servCompObj.equipments.push(equipObj);
                                                                    });
                                                                    this.state.arrServicesLabel.push(res.data)

                                                                    axios.get(`${url}myAlfred/api/prestation/${service.value}`)
                                                                        .then(res => {
                                                                            res.data.map(filters => {
                                                                                const filterObj = { id: filters.filter_presentation._id, label: filters.filter_presentation.label, prestations : [] };
                                                                                servCompObj.filters.push(filterObj);
                                                                                uniqueIdFilters = Array.from(new Set(servCompObj.filters.map(a => a.id)))
                                                                                    .map(id => {
                                                                                        return servCompObj.filters.find(a => a.id === id)
                                                                                    });
                                                                                servCompObj.filters = uniqueIdFilters;

                                                                                axios.get(`${url}myAlfred/api/prestation/${service.value}/${filterObj.id}`)
                                                                                    .then(res => {
                                                                                        res.data.map(prestation => {
                                                                                            const prestationObj = { id: prestation._id, label: prestation.label, filterId: prestation.filter_presentation, price: null, billingChoice: prestation.billing, billing: null, checked: false };
                                                                                            servCompObj.filters.map(p => {
                                                                                                if (p.id === prestationObj.filterId) {
                                                                                                    p.prestations.push(prestationObj);
                                                                                                    uniqueIdPrestations = Array.from(new Set(p.prestations.map(a => a.id)))
                                                                                                        .map(id => {
                                                                                                            return p.prestations.find(a => a.id === id)
                                                                                                        });
                                                                                                    p.prestations = uniqueIdPrestations;
                                                                                                }
                                                                                            })
                                                                                        })
                                                                                    })
                                                                            });
                                                                            servCompObjArr.push(servCompObj);
                                                                            this.state.arrServices.push(res.data);
                                                                            this.setState({
                                                                                allInOneServ: servCompObjArr
                                                                            });
                                                                            form.setFieldValue('submission', this.state.allInOneServ);
                                                                        })
                                                                })
                                                        });
                                                    }}
                                                >
                                                    Je valide ce service
                                                </Button>
                                            </div>
                                                :
                                            <div style={{padding: '0 2rem 1rem 2rem'}}>
                                                <Button
                                                    color="primary"
                                                    style={{marginTop: '3rem', color: 'white', borderRadius: 8}}
                                                    variant="contained"
                                                    type="button"
                                                    disabled={true}
                                                >
                                                    Je valide ce service
                                                </Button>
                                            </div>
                                    }}
                                </Field>
                        </Grid>
                    </Wizard.Page>
                    <Wizard.Page>
                        <Grid container className={classes.cardContainer} style={{overflow: 'hidden'}}>

                                <FieldArray
                                    name="submission"
                                    render={(arrayHelpers) => {
                                        return this.state.allInOneServ && this.state.allInOneServ.length > 0 ?
                                            <React.Fragment>
                                                <div style={{padding: '2rem 2rem 1rem 2rem'}}>
                                                    <Typography variant="h6" style={{marginBottom: '.5rem'}}>Paramétrez vos prestations<span style={{color: '#F8727F' }}>*</span></Typography>
                                                    <Typography>
                                                        Indiquez les prestations que vous souhaitez réaliser. Pour chacune, indiquez votre tarif et le mode de facturation que vous souhaitez appliquer.
                                                    </Typography>
                                                </div>
                                                    {this.state.allInOneServ.map((s, index) => {
                                                        return(
                                                            <div style={{padding: '0 2rem'}}>
                                                                <div style={{paddingBottom: '1rem'}}>
                                                                    <Grid>
                                                                        {s.filters.map((f, indexf) => {
                                                                            return (
                                                                                <Grid
                                                                                    item
                                                                                    xs={12}
                                                                                    key={f.id}
                                                                                    className={classes.prestationsPres}
                                                                                >
                                                                                    <Grid>
                                                                                    {f.prestations.map((p, indexp) => {
                                                                                        return(
                                                                                            <Grid key={p.id} style={{width:'100%', display:'flex' /*backgroundColor:'blue'*/ , alignItems: 'center' , height:'50px'}}>
                                                                                              <div style={{width: '70%', /*backgroundColor:'purple'*/ }}>
                                                                                                <FormControlLabel
                                                                                                    control={
                                                                                                        <IOSSwitch
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
                                                                                              </div>
                                                                                              <div style={{display:'flex', flexDirection:'row', width:'30%', alignItems: 'end', marginBottom: '2%' /*backgroundColor:'grey'*/}}>
                                                                                                {p.checked === true ?
                                                                                                    <React.Fragment>
                                                                                                        <Field
                                                                                                          name={`submission.${index}.filters[${indexf}].prestations[${indexp}].price`}
                                                                                                          placeholder="prix"
                                                                                                          render={({field}) => {
                                                                                                              return (
                                                                                                                  <React.Fragment>
                                                                                                                      <TextField
                                                                                                                          {...field}
                                                                                                                          value={field.value}
                                                                                                                          style={{width: '200px'}}
                                                                                                                          label={`Prix`}
                                                                                                                          type="number"
                                                                                                                          disabled={!p.checked}
                                                                                                                          margin="none"
                                                                                                                          InputProps={{
                                                                                                                              inputProps: {
                                                                                                                                  min: 0
                                                                                                                              },
                                                                                                                              endAdornment: <InputAdornment position="start">€</InputAdornment>,

                                                                                                                          }}
                                                                                                                      />
                                                                                                                      <ErrorMessage name={`submission.${index}.filters[${indexf}].prestations[${indexp}].price`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                                                                                  </React.Fragment>
                                                                                                              )
                                                                                                          }}
                                                                                                        />
                                                                                                          <Field
                                                                                                              name={`submission.${index}.filters[${indexf}].prestations[${indexp}].billing`}
                                                                                                              placeholder="méthode de facturation"
                                                                                                              render={({field, form}) => {
                                                                                                                  return (
                                                                                                                      <React.Fragment>
                                                                                                                          <MaterialSelect
                                                                                                                              {...field}
                                                                                                                              style={{width: '200px'}}
                                                                                                                              helperText={`Méthode de facturation`}
                                                                                                                              disabled={!p.checked}
                                                                                                                              margin="none"
                                                                                                                              onChange={event => {
                                                                                                                                  this.setState({
                                                                                                                                      [`billingChoice${index}${indexf}${indexp}`]: event.target.value
                                                                                                                                  });
                                                                                                                                  form.setFieldValue(`submission.${index}.filters[${indexf}].prestations[${indexp}].billing`, event.target.value);
                                                                                                                              }}
                                                                                                                              value={p.billingChoice.map((option, indexc) => {
                                                                                                                                  if (indexc === 0) {
                                                                                                                                      if (typeof this.state[`billingChoice${index}${indexf}${indexp}`] === 'undefined' || this.state[`billingChoice${index}${indexf}${indexp}`] === null) {
                                                                                                                                          this.setState({
                                                                                                                                              [`billingChoice${index}${indexf}${indexp}`]: option.label
                                                                                                                                          });
                                                                                                                                          form.setFieldValue(`submission.${index}.filters[${indexf}].prestations[${indexp}].billing`, option.label);
                                                                                                                                      }
                                                                                                                                      return this.state[`billingChoice${index}${indexf}${indexp}`];
                                                                                                                                  }
                                                                                                                              })}
                                                                                                                          >
                                                                                                                              {p.billingChoice.map(option => {
                                                                                                                                  return (
                                                                                                                                  <MenuItem key={option._id} value={option.label}>
                                                                                                                                      {option.label}
                                                                                                                                  </MenuItem>
                                                                                                                                  )
                                                                                                                              })}
                                                                                                                          </MaterialSelect>
                                                                                                                          <ErrorMessage name={`submission.${index}.filters[${indexf}].prestations[${indexp}].billing`} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                                                                                                      </React.Fragment>
                                                                                                                  )
                                                                                                              }}

                                                                                                          />
                                                                                                    </React.Fragment>
                                                                                                  : null}
                                                                                              </div>
                                                                                            </Grid>
                                                                                        )
                                                                                    })}
                                                                                    </Grid>
                                                                                </Grid>
                                                                            )
                                                                        })
                                                                        }
                                                                    </Grid>
                                                                    <hr style={{margin: '1rem 0'}}/>
                                                                    <div>
                                                                        <Typography variant="h6" style={{marginBottom: '.5rem'}}>Où acceptez-vous de réaliser vos prestations ?</Typography>
                                                                        <Grid item>
                                                                          <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                  color="primary"
                                                                                  icon={<CircleUnchecked/>}
                                                                                  checkedIcon={<RadioButtonCheckedIcon/>}
                                                                                />
                                                                            }
                                                                            label={<React.Fragment>
                                                                                <p style={{fontFamily: 'helveticaNeue'}}>A l'adresse de prestation de mon client</p>
                                                                            </React.Fragment>}
                                                                          />
                                                                        </Grid>
                                                                        <Grid item>
                                                                          <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                  color="primary"
                                                                                  icon={<CircleUnchecked/>}
                                                                                  checkedIcon={<RadioButtonCheckedIcon />}
                                                                                />
                                                                            }
                                                                            label={<React.Fragment>
                                                                                <p style={{fontFamily: 'helveticaNeue'}}>A mon domicile</p>
                                                                            </React.Fragment>}
                                                                          />
                                                                        </Grid>
                                                                    </div>
                                                                    <hr style={{ margin: '1rem 0' }}/>
                                                                    <div>
                                                                        <Typography variant="h6" style={{marginBottom: '.5rem'}}>Frais de déplacement</Typography>
                                                                        <Typography style={{marginBottom: '1rem'}}>
                                                                            Les frais de déplacement s'appliquent pour toutes les prestations réalisées à l'adresse de
                                                                            préstation indiquée par votre client. Si vous choisissez d'appliquer des frais de déplacements,
                                                                            ils seront automatiquement appliqués lors de la réservation.
                                                                        </Typography>
                                                                        <form noValidate autoComplete="off">
                                                                            <div style={{
                                                                                display: 'flex',
                                                                                width: '100%',
                                                                                flexDirection:'row',
                                                                                backgroundColor: this.state.checkedB ? '#47bdd7' : 'white',
                                                                                border: '1px solid #47bdd7',
                                                                                borderRadius: '50px',
                                                                                color: this.state.checkedB ? 'white' : '#47bdd7',
                                                                            }}>
                                                                                <div className={classes.contentCheckBox} style={{marginLeft: '2%', width:'5%'}}>
                                                                                    <FormControlLabel
                                                                                      control={
                                                                                          <CheckboxCustom
                                                                                            checked={this.checkedB}
                                                                                            onChange={() => {
                                                                                                this.setState({ checkedB: !this.state.checkedB });
                                                                                            }}
                                                                                            value="checkedG"
                                                                                          />
                                                                                      }
                                                                                    />
                                                                                </div>
                                                                                <div className={classes.contentCheckBox} style={{ width: '60%'}}>
                                                                                    <label style={{ padding: '1%'}}>
                                                                                        Frais de déplacement (montant forfaitaire)
                                                                                    </label>
                                                                                </div>
                                                                                <div style={{display:'flex' , alignItems:'center', width:'35%'}}>
                                                                                    <div style={{
                                                                                        display: this.state.checkedB ? '' : 'none',
                                                                                        width:'100px',
                                                                                        marginRight: '1px'
                                                                                    }}>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                              endAdornment={<InputAdornment position="end">€</InputAdornment>}
                                                                                              inputProps={{
                                                                                                  className: classes.inputTextField
                                                                                              }}
                                                                                            />
                                                                                        </FormControl>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                    <hr style={{ margin: '1rem 0' }}/>
                                                                    <div>
                                                                        <Typography variant="h6" style={{marginBottom: '.5rem'}}>Options</Typography>
                                                                        <Typography style={{marginBottom: '1rem'}}>
                                                                            Les options vous permettent de proposer des prestations complémentaires à vos clients. Dans le cadre de prestation de repassage par exemple,
                                                                            vous pouvez proposer à votre client de procéder au retrait et à la livraison du linge.
                                                                        </Typography>
                                                                        <form noValidate autoComplete="off">
                                                                            <div style={{
                                                                                display: 'flex',
                                                                                width: '100%',
                                                                                flexDirection:'row',
                                                                                backgroundColor: this.state.checkedC ? '#47bdd7' : 'white',
                                                                                border: '1px solid #47bdd7',
                                                                                borderRadius: '50px',
                                                                                color: this.state.checkedC ? 'white' : '#47bdd7',
                                                                            }}>
                                                                                <div className={classes.contentCheckBox} style={{marginLeft: '2%', width:'5%'}}>
                                                                                    <FormControlLabel
                                                                                      control={
                                                                                          <CheckboxCustom
                                                                                            checked={this.checkedC}
                                                                                            onChange={() => {
                                                                                                this.setState({ checkedC: !this.state.checkedC });
                                                                                            }}
                                                                                            value="checkedG"
                                                                                          />
                                                                                      }
                                                                                    />
                                                                                </div>
                                                                                <div className={classes.contentCheckBox} style={{ width: '60%'}}>
                                                                                    <label style={{ padding: '1%'}}>
                                                                                        Retrait & livraison
                                                                                    </label>
                                                                                </div>
                                                                                <div style={{display:'flex' , alignItems:'center', width:'35%'}}>
                                                                                    <div style={{
                                                                                        display: this.state.checkedC ? '' : 'none',
                                                                                        width:'100px',
                                                                                        marginRight: '1px'
                                                                                    }}>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                              endAdornment={<InputAdornment position="end">€</InputAdornment>}
                                                                                              inputProps={{
                                                                                                  className: classes.inputTextField
                                                                                              }}
                                                                                            />
                                                                                        </FormControl>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                    <hr style={{ margin: '1rem 0' }}/>
                                                                    {s.equipments.length === 0 ? null :
                                                                        <React.Fragment>
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
                                                                                    }
                                                                                    return (
                                                                                        <Grid item xs={3} sm={3} md={2} key={e.id}>
                                                                                        <label style={{cursor: 'pointer'}} onClick={() => {
                                                                                            e.checked = !e.checked;
                                                                                            arrayHelpers.form.setFieldValue(`submission[${index}].equipments[${indexe}].checked`, e.checked);
                                                                                        }}>

                                                                                            {e.checked === true ? <img src={`../../static/equipments/${e.logo.slice(0, -4)}_Selected.svg`} height={100} width={100} alt={`${e.name_logo.slice(0, -4)}_Selected.svg`} /> : <img src={`../../static/equipments/${e.logo}`} height={100} width={100} alt={e.name_logo} />}
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
                                                                            <hr style={{margin: '1rem 0'}}/>
                                                                        </React.Fragment>
                                                                    }

                                                                    <div>
                                                                        <Typography variant="h6" style={{marginBottom: '.5rem'}}>Définissez votre montant minimum de réservation <span style={{color: '#F8727F' }}>*</span></Typography>
                                                                        <Typography>
                                                                            Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service. Si vous indiquez un montant de 10€, les clients ne pourront pas réserver vos services si la somme des prestations n’atteint pas ce montant.
                                                                        </Typography>
                                                                        <div style={{marginTop: '1rem', width: '200px'}}>
                                                                            <Field
                                                                                name={`submission.${index}.minimumBasket`}
                                                                                render={({field}) => {
                                                                                    return(
                                                                                        <TextField
                                                                                            {...field}
                                                                                            type="number"
                                                                                            value={field.value}
                                                                                            fullWidth
                                                                                            label="Panier minimum"
                                                                                            margin="dense"
                                                                                            variant="outlined"
                                                                                            InputProps={{
                                                                                                inputProps: {
                                                                                                    min: 0
                                                                                                },
                                                                                                endAdornment: <InputAdornment position="start">€</InputAdornment>,
                                                                                            }}
                                                                                        />
                                                                                    )
                                                                                }}
                                                                            />
                                                                            <ErrorMessage name={`submission.${index}.minimumBasket`} render={msg => <div style={{color: 'red'}}>{msg}</div>}/>
                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ margin: '1rem 0' }}/>
                                                                    <div>
                                                                        <Typography variant="h6" style={{marginBottom: '.5rem'}}>Renseignez votre périmètre d’intervention <span style={{color: '#F8727F' }}>*</span></Typography>
                                                                        <Typography>
                                                                            Votre périmètre d’intervention est la zone dans laquelle vous souhaitez réaliser vos services. Par défaut, nous utilisons la ville de votre profil comme référence. Cette adresse ne vous convient pas ? Vous pouvez changer votre ville de référence à tout moment !
                                                                        </Typography>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state[`userCityClicked${index}`]}
                                                                                    color="primary"
                                                                                    type="checkbox"
                                                                                    onChange={async () => {
                                                                                        let userCityChecked = !this.state[`userCityClicked${index}`];
                                                                                        this.setState({[`userCityClicked${index}`]: userCityChecked});

                                                                                        if (userCityChecked === true) {
                                                                                            arrayHelpers.form.setFieldValue(`submission[${index}].city`, null);
                                                                                            arrayHelpers.form.setFieldValue(`submission[${index}].address`, null);
                                                                                            arrayHelpers.form.setFieldValue(`submission[${index}].postal_code`, null);
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
                                                                            <Typography style={{marginBottom: '1.5rem', fontSize: 17}}>Définissez le périmètre que vous souhaitez couvrir :</Typography>
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
                                                                    <hr style={{ margin: '1rem 0' }}/>
                                                                    <div>
                                                                        <Typography variant="h6" style={{marginBottom: '.5rem'}}>Indiquez votre délai de prévenance <span style={{color: '#F8727F' }}>*</span></Typography>
                                                                        <Typography>
                                                                            Le délai de prévenance correspond au délai nécessaire entre la réservation et la réalisation du service. Par exemple, si vous indiquez un délai de 24 heures, un client pourra réserver votre service 24 heures avant votre intervention.
                                                                        </Typography>
                                                                        <Grid item xs={12} className={classes.delayDivResponsive}>
                                                                            <Field
                                                                                name={`submission.${index}.delayBeforeShop`}
                                                                                render={() => {
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
                                                                                render={({field, form}) => {
                                                                                    return (
                                                                                        <TextField
                                                                                            {...field}
                                                                                            value={field.value}
                                                                                            style={{width: '30%'}}
                                                                                            className={classes.selectDelayInputRepsonsive}
                                                                                            select
                                                                                            margin="dense"
                                                                                            variant="outlined"
                                                                                            label="Heures / jours / semaines"
                                                                                            InputLabelProps={{shrink: form.values.submission[index].delayBeforeShopDWM !== null}}
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
                                                                    <hr style={{ margin: '1rem 0' }}/>
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
                                                                                        value={field.value}
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
                                                                    <hr style={{ margin: '1rem 0' }}/>
                                                                    <div>
                                                                        <Typography variant="h6" style={{marginBottom: '.5rem'}}>Votre expérience, vos certifications & diplômes</Typography>
                                                                        <Typography>
                                                                            Si vous possédez des certifications et/ou diplômes pour ce service, mettez les en avant ! Après vérification par My-Alfred, vous aurez le statut d’Alfred certifié et/ou diplômé sur ce service.
                                                                        </Typography>
                                                                        <Grid container style={{marginTop: '.5rem'}}>
                                                                            <Grid item xs={12}>
                                                                                <Typography>Nombre d'années d'expériences</Typography>
                                                                                <Select
                                                                                    isClearable={true}
                                                                                    placeholder="Vos années d'expériences"
                                                                                    value={arrayHelpers.form.values.submission[index].experienceYears}
                                                                                    options={[
                                                                                        {value: '', label: "Aucune année d'expérience"},
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
                                                                                {arrayHelpers.form.values.submission[index].diploma.label !== null && arrayHelpers.form.values.submission[index].diploma.year !== null && arrayHelpers.form.values.submission[index].diploma.diploma !== null ?
                                                                                    <React.Fragment>
                                                                                        <div style={{border: '1px solid lightgrey', width: '50%', textAlign: 'center', marginBottom: '1.5rem', position: 'relative'}}>
                                                                                            <div onClick={() => {
                                                                                                    arrayHelpers.form.setFieldValue(`submission.${index}.diploma.label`, null);
                                                                                                    arrayHelpers.form.setFieldValue(`submission.${index}.diploma.year`, null);
                                                                                                    arrayHelpers.form.setFieldValue(`submission.${index}.diploma.diploma`, null);
                                                                                                }
                                                                                            } style={{position: 'absolute', top: 2, right: 2, cursor: 'pointer'}}><Clear color="secondary"/></div>
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
                                                                                                <TextField
                                                                                                    value={this.state.diplomaName}
                                                                                                    style={{width: '50%', marginRight: '5%'}}
                                                                                                    className={classes.inputDiplomaCertifResp}
                                                                                                    label="Nom du diplôme"
                                                                                                    margin="dense"
                                                                                                    variant="outlined"
                                                                                                    onChange={() => {
                                                                                                        this.setState({ diplomaName: event.target.value })
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
                                                                                                                value={field.value}
                                                                                                                style={{width: '50%', marginRight: '5%'}}
                                                                                                                className={classes.inputDiplomaCertifResp}
                                                                                                                label="Année d'obtention"
                                                                                                                margin="dense"
                                                                                                                variant="outlined"
                                                                                                                select
                                                                                                                InputLabelProps={{shrink: arrayHelpers.form.values.submission[index].diploma.year !== null}}
                                                                                                            >
                                                                                                                {dates.map(date => {
                                                                                                                    return <MenuItem key={date} style={{zIndex: 9999}} value={date}>{date}</MenuItem>
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
                                                                                                        if (typeof event.currentTarget.files[0] === 'undefined') {

                                                                                                        } else {
                                                                                                            this.setState({ diplomaObj: event.currentTarget.files[0] })
                                                                                                        }
                                                                                                    }} className="form-control"
                                                                                                    />
                                                                                                </label>
                                                                                                <span>{this.state.diplomaObj !== null ? this.state.diplomaObj.name : null}</span>
                                                                                                <p>En téléchargeant votre diplôme, votre diplôme aura le statut de diplôme vérifié auprès des utilisateurs mais il ne sera jamais visible par ses derniers</p>
                                                                                                <Button
                                                                                                    variant="contained"
                                                                                                    color="primary"
                                                                                                    style={{color: 'white'}}
                                                                                                    onClick={() => {
                                                                                                        arrayHelpers.form.setFieldValue(`submission.${index}.diploma.label`, this.state.diplomaName);
                                                                                                        arrayHelpers.form.setFieldValue(`submission.${index}.diploma.diploma`, this.state.diplomaObj);
                                                                                                    }}
                                                                                                    disabled={this.state.diplomaName === null || this.state.diplomaName === '' || arrayHelpers.form.values.submission[index].diploma.year === null || this.state.diplomaObj === null || arrayHelpers.form.values.submission[index].diploma.label !== null && arrayHelpers.form.values.submission[index].diploma.diploma !== null}
                                                                                                >Valider</Button>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </ExpansionPanelDetails>
                                                                                </ExpansionPanel>
                                                                            </Grid>
                                                                            <Grid item xs={12}>
                                                                            <Typography style={{margin: '1rem 0', fontSize: 20, color: 'grey'}}>Votre certification</Typography>
                                                                                {arrayHelpers.form.values.submission[index].certification.label !== null && arrayHelpers.form.values.submission[index].certification.year !== null && arrayHelpers.form.values.submission[index].certification.certification !== null ?
                                                                                    <React.Fragment>
                                                                                        <div style={{border: '1px solid lightgrey', width: '50%', textAlign: 'center', marginBottom: '1.5rem', position: 'relative'}}>
                                                                                        <div onClick={() => {
                                                                                                    arrayHelpers.form.setFieldValue(`submission.${index}.certification.label`, null);
                                                                                                    arrayHelpers.form.setFieldValue(`submission.${index}.certification.year`, null);
                                                                                                    arrayHelpers.form.setFieldValue(`submission.${index}.certification.certification`, null);
                                                                                            }
                                                                                            } style={{position: 'absolute', top: 2, right: 2, cursor: 'pointer'}}><Clear color="secondary"/></div>
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
                                                                                                <TextField
                                                                                                    value={this.state.certifName}
                                                                                                    onChange={() => {
                                                                                                        this.setState({ certifName: event.target.value })
                                                                                                    }}
                                                                                                    style={{width: '50%', marginRight: '5%'}}
                                                                                                    className={classes.inputDiplomaCertifResp}
                                                                                                    label="Nom du certificat"
                                                                                                    margin="dense"
                                                                                                    variant="outlined"
                                                                                                />
                                                                                            </Grid>
                                                                                            <Grid item xs={12}>
                                                                                            <Field
                                                                                                    name={`submission.${index}.certification.year`}
                                                                                                    render={({field}) => {
                                                                                                        return (
                                                                                                            <TextField
                                                                                                                {...field}
                                                                                                                value={field.value}
                                                                                                                style={{width: '50%', marginRight: '5%'}}
                                                                                                                className={classes.inputDiplomaCertifResp}
                                                                                                                label="Année d'obtention"
                                                                                                                margin="dense"
                                                                                                                variant="outlined"
                                                                                                                select
                                                                                                                InputLabelProps={{shrink: arrayHelpers.form.values.submission[index].certification.year !== null}}
                                                                                                            >
                                                                                                                {dates.map(date => {
                                                                                                                    return <MenuItem key={date} value={date}>{date}</MenuItem>
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
                                                                                                        if (typeof event.currentTarget.files[0] === 'undefined') {
                                                                                                        } else {
                                                                                                            this.setState({ certifObj: event.currentTarget.files[0] })
                                                                                                        }
                                                                                                    }} className="form-control"
                                                                                                    />
                                                                                                </label>
                                                                                                <span>{this.state.certifObj !== null ? (typeof this.state.certifObj.name !== undefined ? this.state.certifObj.name : null) : null}</span>
                                                                                                <p>En téléchargeant votre certification, votre certification aura le statut de certification vérifiée auprès des utilisateurs mais elle ne sera jamais visible par ses derniers</p>
                                                                                                <Button
                                                                                                    variant="contained"
                                                                                                    color="primary"
                                                                                                    style={{color: 'white'}}
                                                                                                    onClick={() => {
                                                                                                        arrayHelpers.form.setFieldValue(`submission.${index}.certification.label`, this.state.certifName);
                                                                                                        arrayHelpers.form.setFieldValue(`submission.${index}.certification.certification`, this.state.certifObj);
                                                                                                    }}
                                                                                                    disabled={this.state.certifName === null || this.state.certifName === '' || arrayHelpers.form.values.submission[index].certification.year === null || this.state.certifObj === null || arrayHelpers.form.values.submission[index].diploma.label !== null && arrayHelpers.form.values.submission[index].diploma.diploma !== null}
                                                                                                >Valider</Button>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </ExpansionPanelDetails>
                                                                                </ExpansionPanel>

                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                            </React.Fragment> : null
                                    }}
                                />
                        </Grid>
                    </Wizard.Page>
                    <Wizard.Page>
                         <Schedule/>
                    </Wizard.Page>
                    <Wizard.Page>
                        <Grid container className={classes.cardContainer} style={{overflow: 'hidden'}}>
                            <div className={classes.newContainer}>
                                    <Grid container>
                                            <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                                Comment les utilisateurs peuvent réserver ? <span style={{color: '#F8727F' }}>*</span>
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
                                        Il se peut que vous ayez moins de réservations si vous ajoutez des conditions. Les personnes qui ne répondent pas à vos critères peuvent quand même envoyer une demande.
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
                                                        Numéro de téléphone confirmé, adresse e-mail, informations de paiement et acceptation du règlement intérieur.
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
                                                            Si vous activez cette condition, vous ne pourrez voir les photos de profil des utilisateurs qu'une fois la réservation confirmée.
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
                                                            Ces utilisateurs ont vérifié leur identité.
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
                                                                Ces utilisateurs ont déjà utilisé des services avec My-Alfred, sont recommandés par d'autres Alfred et n'ont pas reçu de commentaires négatifs.
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
                                            réservation <span style={{color: '#F8727F' }}>*</span>
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
                                                        value={form.values.createShop.welcome_message}
                                                    />
                                                )
                                            }} />
                                            <ErrorMessage name={'createShop.welcome_message'} render={msg => <div style={{color: 'red'}}>{msg}</div>} />
                                        </Grid>
                                    </Grid>
                                    <hr style={{border: 0, borderTop: '1px solid lightgrey',marginTop: 20}}/>
                                    <Grid container>

                                        <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                            Conditions d’annulation <span style={{color: '#F8727F' }}>*</span>
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
                                                                    Remboursement intégral jusqu’à un jour avant la prestation
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
                                                                    Remboursement intégral jusqu’à 5 jours avant la prestation
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
                                                                style={{ marginTop: -20 }}
                                                            />
                                                        }
                                                        label={
                                                            <React.Fragment>
                                                                <p style={{ marginBottom: 0,fontSize: 18, fontFamily: 'helveticaNeue' }}>Strictes</p>
                                                                <p style={{marginTop: 0,fontSize: 16, fontFamily: 'helveticaNeue'}}>
                                                                    Remboursement intégral jusqu’à 10 jours avant la prestation
                                                                </p>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                )
                                            }} />
                                        </Grid>
                                    </Grid>
                                </div>
                        </Grid>
                    </Wizard.Page>
                    <Wizard.Page>
                        <Field>
                            {({ form }) => (
                                <React.Fragment>
                                    <Grid container className={classes.cardContainer} style={{overflow: 'hidden'}}>
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
                                                    <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10, width: '100%'}}>
                                                        Vérifiez votre identité <span style={{color: '#F8727F' }}>*</span>
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
                                                                        <Field render={({field, form}) => {
                                                                            return (
                                                                                <React.Fragment>
                                                                                    <label style={{display: 'inline-block', marginTop: 15}} className="forminputs">
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
                                                                                    <label style={{display: 'inline-block', marginTop: 15}} className="forminputs">
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
                                                                    <Field render={({field, form}) => {
                                                                        return (
                                                                            <React.Fragment>
                                                                                <label style={{display: 'inline-block', marginTop: 15}} className="forminputs">
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
                                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                                checkedIcon={<FilledButton />}
                                                                            />
                                                                        }
                                                                        label={<h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                                                        Je suis un particulier
                                                                </h6>}
                                                                    />
                                                                )
                                                            }} />
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <Typography style={{marginLeft: '2.5rem'}}>
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
                                                                                icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                                                checkedIcon={<FilledButton />}
                                                                            />
                                                                        }
                                                                        label={<h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                                                        Je suis un professionnel
                                                                </h6>}
                                                                    />
                                                                )
                                                            }} />
                                                        </Grid>
                                                        <Grid item xs={11}>
                                                            <Typography style={{marginLeft: '2.5rem'}}>
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
                                                        <h6 style={{fontFamily: 'helveticaNeue', fontSize: '1.5rem',fontWeight: 100, marginTop: 15, marginBottom: 10}}>
                                                            Vos obligations légales <span style={{color: '#F8727F' }}>*</span>
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

// STYLE
export const FirstStep = styled.div`
  width: 75%;
  margin: 0 auto;
  padding: 2rem;
  height: 500px;
  border: 1px solid black;
`;

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

