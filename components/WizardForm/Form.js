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
                            <div style={{position: 'relative', backgroundColor: 'white', width: page === 0 ? '100%' : 'none', height: '100%', overflow: 'hidden'}}>
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
              <Schedule/>
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

