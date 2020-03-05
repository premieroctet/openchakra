import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../hoc/Layout/Layout';
import Link from 'next/link';
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AlgoliaPlaces from 'algolia-places-react';
import InputRange from 'react-input-range';
import moment from "moment";
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { Document,Page } from 'react-pdf'
import Footer from '../../hoc/Layout/Footer/Footer';
import Switch from "@material-ui/core/Switch";
import { toast } from 'react-toastify';
import NumberFormat from "react-number-format";
import MaterialSelect from '@material-ui/core/Select';
import Typography from "@material-ui/core/Typography";


moment.locale('fr');

const _ = require('lodash');
const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({

    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },
    pasphone:{
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    bottombar:{
        [theme.breakpoints.up('md')]: {
        display: 'none',
    }},
    topbar:{
        position: 'sticky',
        top: 65,
        zIndex:999,
    [theme.breakpoints.down('sm')]: {
        display:'none',
    }},
    validerWeb:{
        [theme.breakpoints.down('sm')]: {
            display: 'none',
    }},
    validerMobile:{
        [theme.breakpoints.up('md')]: {
            display: 'none',
    }},
    responsiveIOSswitch:{
        width: '70%',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        }
    },
    responsiveIOSswitchContent:{
        display:'flex',
        flexDirection:'row',
        width:'30%',
        alignItems: 'flex-end',
        justifyContent:'end',
        [theme.breakpoints.down('xs')]: {
            width:'50%',
        }
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '70px',
    },
    contentFiltre:{
        width:'100%',
        display:'flex',
        alignItems: 'last baseline',
        height:'50px',
        marginBottom:'2%',
        [theme.breakpoints.down('xs')]: {
            height:'90px',
        }
    },
    contentCheckBox: {
        display:'flex',
        alignItems: 'center',
        fontFamily: 'helvetica',
    },
    responsiveGrade:{
        width: '100%',
        display:'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection : 'column'
        }
    },
    responsiveGradeContent: {
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width : '100%'
        }
    },
    responsivePicsInfo: {
        border: '1px solid #BABABA',
        width:'90%',
        [theme.breakpoints.down('sm')]: {
            width : '100%'
        }
    }

});

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            allowNegative={false}
        />
    );
}

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

const CheckboxCustom = withStyles({
    root: {
        color: '#1C2022',
        '&$checked': {
            color: 'white',
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

const CssTextFieldOptions = withStyles({
    root: {
        '& label': {
            color: 'white',
            fontSize: '0.8rem',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
    },
})(TextField);

const CssTextField = withStyles({
    root: {
        '& label': {
            fontSize: '0.8rem',
        },
    },
})(TextField);

class editService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceUser: {},
            service: {},
            prestations: [],
            new_prestations: [],
            equipments: [],
            perimeter: '',
            deadline_before_booking_number: '',
            deadline_before_booking_string: '',
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
            exp: '',

            diploma: {},
            haveDiploma: false,
            editDiploma: false,
            name_diploma: '',
            year_diploma: '',
            file_diploma: null,
            name_newDiploma: null,
            year_newDiploma: null,

            certification: {},
            haveCertification: false,
            editCertification: false,
            name_certification: '',
            year_certification: '',
            file_certification: null,
            name_newCertification: null,
            year_newCertification: null,

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
            .get(url+`myAlfred/api/serviceUser/${id}`)
            .then(res => {
                let serviceUser = res.data;
                this.setState({serviceUser: serviceUser,service: serviceUser.service ,prestations: serviceUser.prestations, current_equipments: serviceUser.equipments,
                    perimeter: serviceUser.perimeter,service_address: serviceUser.service_address});
                if(typeof serviceUser.option != 'undefined'){

                this.setState({current_options: serviceUser.option,haveOption: true});
                }
                if(typeof serviceUser.diploma != 'undefined'){

                    this.setState({diploma: serviceUser.diploma,name_diploma:serviceUser.diploma.name,year_diploma:serviceUser.diploma.year,
                        haveDiploma: true,extDiploma: serviceUser.diploma.file.split('.').pop()});
                }
                if(typeof serviceUser.certification != 'undefined'){

                    this.setState({certification: serviceUser.certification,name_certification:serviceUser.certification.name,year_certification:serviceUser.certification.year,
                        haveCertification: true,extCertification: serviceUser.certification.file.split('.').pop()});
                }
                const deadline = serviceUser.deadline_before_booking.split(' ');
                const deadline_number = parseInt(deadline[0]);
                this.setState({deadline_before_booking_number: deadline_number});
                this.setState({deadline_before_booking_string:serviceUser.deadline_before_booking.split(' ').pop()});
                //this.setState({new_prestations: serviceUser.prestations});
                serviceUser.prestations.forEach(q => {
                   let obj = {prestation: q.prestation._id,billing:q.billing,price: q.price};
                   this.setState({new_prestations: [...this.state.new_prestations,obj]})
                });


                axios.get(url+`myAlfred/api/service/${serviceUser.service._id}`)
                    .then(response => {
                        const data = response.data;
                        this.setState({all_equipments: data.equipments});
                        this.state.current_equipments.forEach(h => {
                            let index = _.findIndex(data.equipments,['label',h.label]);
                            if (index !== -1) {
                                this.setState({[h.label]: true});
                                this.setState({
                                    equipments: [...this.state.equipments, h._id]
                                })
                            } else {
                                this.setState({[h.label]:false})
                            }
                        });

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
                        this.state.prestations.forEach(a => {
                            let index = _.findIndex(prestations,['label',a.prestation.label]);
                            if (index !== -1) {
                                this.setState({[a.prestation.label]: true});
                                this.setState({[a.prestation.label+'price']: a.price});
                                this.setState({[a.prestation.label+'billing']: a.billing});
                            } else {
                                this.setState({[a.prestation.label]:false});
                                this.setState({[a.prestation.label+'price']: ''});
                                this.setState({[a.prestation.label+'billing']: ''});
                            }
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
        let array = [...this.state.new_prestations];
        let index = _.findIndex(array,['prestation',id]);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({new_prestations: array});
            this.setState({[label+'price']:null});
            this.setState({[label+'billing']:null});
        } else {
            const obj = {prestation: id,billing:null,price:null};
            arrayPrestations.push(obj);
            this.setState({new_prestations: [...this.state.new_prestations, obj]});
        }
    };

    onChangePrice(label,e,id) {
        let array = this.state.new_prestations;
        let index = _.findIndex(array,['prestation',id]);
        array[index].price = e.target.value;
        this.setState({new_prestations:  array});
    };

    onChangeBilling(label,e,id) {
        let array = this.state.new_prestations;
        let index = _.findIndex(array,['prestation',id]);
        array[index].billing = e.target.value;
        this.setState({new_prestations:  array});
    }


    onSubmit = e => {
        e.preventDefault();

        if(this.state.city !== null){
            let options = null;
            const prestations = this.state.new_prestations;
            if(_.isEmpty(this.state.options)){
                 options = this.state.current_options;

            } else {
                 options = this.state.options
            }
            const city = this.state.city;
            const address = this.state.address;
            const zip_code = this.state.zip_code;
            const country = this.state.country;
            const lat = this.state.lat;
            const lng = this.state.lng;
            const deadline_before_booking = this.state.deadline_before_booking_number + ' '+this.state.deadline_before_booking_string;
            const equipments = this.state.equipments;
            const perimeter = this.state.perimeter;
            const {minimum_basket,description,level } = this.state.serviceUser;
            const id = this.props.service_id;


            axios.put(`${url}myAlfred/api/serviceUser/editWithCity/${id}`,{prestations,options,minimum_basket,deadline_before_booking,equipments,perimeter
                ,city,address,zip_code,country,lat,lng,description,level})
                .then(res => {

                    toast.info('Service modifié avec succès');
                    Router.push({pathname:'/myShop/services'})
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            let options = null;
            const prestations = this.state.new_prestations;
            if(_.isEmpty(this.state.options)){
                options = this.state.current_options;

            } else {
                options = this.state.options
            }
            const deadline_before_booking = this.state.deadline_before_booking_number + ' '+this.state.deadline_before_booking_string;
            const equipments = this.state.equipments;
            const perimeter = this.state.perimeter;
            const {minimum_basket,description,level } = this.state.serviceUser;
            const id = this.props.service_id;


            axios.put(`${url}myAlfred/api/serviceUser/edit/${id}`,{prestations,options,minimum_basket,deadline_before_booking,equipments,perimeter
                ,description,level})
                .then(res => {

                    toast.info('Service modifié avec succès');
                    Router.push({pathname:'/myShop/services'})
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    editDiploma() {
        const id = this.props.service_id;
        if(this.state.name_newDiploma === null) {
            const name = this.state.name_diploma;
            const year = this.state.year_diploma;
            let diploma = this.state.file_diploma;

            if(diploma !== null) {
                diploma = this.state.file_diploma;

            }

            const formData = new FormData();
            formData.append('name',name);
            formData.append('year',year);
            formData.append('file_diploma',diploma);

            axios.post(url+'myAlfred/api/serviceUser/addDiploma/'+id,formData)
                .then(() => {
                    toast.info('Diplome modifié')
                })
                .catch(err => console.log(err))

        } else {
            const id = this.props.service_id;

                const name = this.state.name_newDiploma;
                const year = this.state.year_newDiploma;
                let diploma = this.state.file_diploma;

                const formData = new FormData();
                formData.append('name',name);
                formData.append('year',year);
                formData.append('file_diploma',diploma);

                axios.post(url+'myAlfred/api/serviceUser/addDiploma/'+id,formData)
                    .then(() => {
                        toast.info('Diplome ajouté');
                        this.componentDidMount();
                        this.setState({haveDiploma: true})
                    })
                    .catch(err => console.log(err))
        }
    }

    deleteDiploma() {
        const id = this.props.service_id;
        axios.delete(url+'myAlfred/api/serviceUser/delete/diploma/'+id)
            .then(() => {
                toast.error('Diplôme supprimé');
                this.setState({haveDiploma: false,editDiploma: false})
            })
            .catch(err => console.log(err))
    }

    editCertification() {
        const id = this.props.service_id;
        if(this.state.name_newCertification === null) {
            const name = this.state.name_certification;
            const year = this.state.year_certification;
            let certification = this.state.file_certification;

            if(certification !== null) {
                certification = this.state.file_certification;

            }

            const formData = new FormData();
            formData.append('name',name);
            formData.append('year',year);
            formData.append('file_certification',certification);

            axios.post(url+'myAlfred/api/serviceUser/addCertification/'+id,formData)
                .then(() => {
                    toast.info('Certification modifiée')
                })
                .catch(err => console.log(err))

        } else {
            const id = this.props.service_id;

            const name = this.state.name_newCertification;
            const year = this.state.year_newCertification;
            let certification = this.state.file_certification;

            const formData = new FormData();
            formData.append('name',name);
            formData.append('year',year);
            formData.append('file_certification',certification);

            axios.post(url+'myAlfred/api/serviceUser/addCertification/'+id,formData)
                .then(() => {
                    toast.info('Certification ajoutée');
                    this.componentDidMount();
                    this.setState({haveCertification: true})
                })
                .catch(err => console.log(err))
        }
    }

    deleteCertification() {
        const id = this.props.service_id;
        axios.delete(url+'myAlfred/api/serviceUser/delete/certification/'+id)
            .then(() => {
                toast.error('Certification supprimée');
                this.setState({haveCertification: false,editCertification: false})
            })
            .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props;
        const {serviceUser} = this.state;
        const {service} = this.state;
        const {all_prestations} = this.state;
        const {uniqFilter} = this.state;
        const {service_address} = this.state;
        const {all_equipments} = this.state;
        const {diploma} = this.state;
        const {certification} = this.state;
        const {haveDiploma} = this.state;
        const {editDiploma} = this.state;
        const {haveCertification} = this.state;
        const {editCertification} = this.state;
        const {clickAddress} = this.state;
        const {dates} = this.state;
        const{ extDiploma} = this.state;
        const{ extCertification} = this.state;

        return (

            <Layout>

                <Grid container className={classes.bigContainer}>
                <Grid container className={classes.topbar} justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3}}>

                            <Grid item xs={2} style={{textAlign:"center",borderBottom: '2px solid white'}}>
                                <Link href={'/myShop/services'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Ma boutique</p></a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <Link href={'/reservations/messages'}><a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Messages</p></a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <Link href={'/reservations/allReservations'}><a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Mes réservations</p></a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center",zIndex:999}}>
                                <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Mon calendrier</p></a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <Link href={'/performances/revenus'}><a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Performance</p></a>
                                </Link>
                            </Grid>

                        </Grid>
                    <Grid item sm={12} md={5} lg={6} style={{padding:'2%'}}>
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
                                                            <Grid key={index} className={classes.contentFiltre}>
                                                                <div className={classes.responsiveIOSswitch}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <IOSSwitch
                                                                              color="primary"
                                                                              type="checkbox"
                                                                              checked={!!this.state[z.label]}
                                                                              onChange={() => {
                                                                                  this.setState({[z.label]: !this.state[z.label]});
                                                                                  this.onChangePrestation(z.label,z._id)
                                                                              }}
                                                                            />
                                                                        }
                                                                        label={z.label}
                                                                    />
                                                                </div>
                                                                <div className={classes.responsiveIOSswitchContent}>
                                                                {this.state[z.label] ?
                                                                    <React.Fragment>
                                                                        <CssTextField
                                                                            className={classes.textField}
                                                                            id="standard-name"
                                                                            value={this.state[z.label+'price']}
                                                                            name={z.label+'price'}
                                                                            onChange={(event)=>{
                                                                                this.setState({[z.label+'price']:event.target.value});
                                                                                this.onChangePrice(z.label,event,z._id);
                                                                            }}
                                                                            label={`Prix`}
                                                                            disabled={!this.state[z.label]}
                                                                            InputProps={{
                                                                                endAdornment: <InputAdornment position="end">€</InputAdornment>,

                                                                            }}

                                                                    />
                                                                        <MaterialSelect
                                                                            style={{width: '100px', fontSize: '0.8rem'}}
                                                                            margin="none"
                                                                            helperText={`Méthode de facturation`}
                                                                            value={this.state[z.label+'billing'] || ''}
                                                                            name={z.label+'billing'}
                                                                            onChange={(event)=>{this.onChange2(event);
                                                                            this.onChangeBilling(z.label,event,z._id)}}
                                                                        >
                                                                            {z.billing.map(y => {
                                                                                return (
                                                                                  <MenuItem style={{fontSize:'0.8'}} key={y.value} value={y.label}>
                                                                                      {y.label}
                                                                                  </MenuItem>
                                                                                )
                                                                            })}
                                                                        </MaterialSelect>
                                                                    </React.Fragment>
                                                                    : null}
                                                                </div>
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
                        <Grid>
                            <Grid xs={12}>
                                <h2>Option / Supplément</h2>
                            </Grid>
                            <Grid xs={9} style={{maxWidth:'inherit'}}>
                                <div style={{marginBottom: '2%'}}>
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
                                            <div className={classes.contentCheckBox} style={{marginLeft: '2%', width:'10%'}}>
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
                                            <div style={{display:'flex' , alignItems:'center', width:'35%', justifyContent:'center',  marginTop: '-2%'}}>
                                                <div style={{
                                                    display: this.state.checkedB ? '' : 'none',
                                                    width:'100px',
                                                    marginRight: '1px'
                                                }}>
                                                    <CssTextFieldOptions
                                                      label={`Prix`}
                                                      type="number"
                                                      className={classes.textField}
                                                      inputProps={{
                                                          endAdornment: <InputAdornment position="start">€</InputAdornment>,
                                                          className: classes.inputTextField
                                                      }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <hr style={{ margin: '1rem 0' }}/>
                                <div style={{marginBottom: '2%'}}>
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
                                            <div className={classes.contentCheckBox} style={{marginLeft: '2%', width:'10%'}}>
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
                                                    <CssTextFieldOptions
                                                      label={`Prix`}
                                                      type="number"
                                                      className={classes.textField}
                                                      inputProps={{
                                                          className: classes.inputTextField,
                                                          endAdornment: <InputAdornment position="start">€</InputAdornment>,
                                                      }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid container>
                            <Grid xs={12}>
                            <h2>Indiquez ce que vous fournissez</h2>
                            </Grid>
                            <Grid xs={12}>
                                <p>Sélectionnez les produits et le matériel que vous fournissez dans le cadre de vos prestations de service</p>
                            </Grid>
                            {all_equipments.map((e,index)=> {
                                if(this.state[e.label]){
                                return(
                                    <Grid xs={3} style={{margin:'1%', flexBasis: 'inherit'}}>
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
                                                <img src={`../../static/equipments/${e.logo.slice(0, -4)}_Selected.svg`} height={80} width={80}
                                                     alt={e.label}/>
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
                                        <Grid item xs={3} style={{margin:'1%', flexBasis: 'inherit'}}>
                                            <label style={{cursor: 'pointer'}} key={index} onClick={() => {
                                                this.setState({[e.label]: true});
                                                this.setState({
                                                    equipments: [...this.state.equipments, e._id]
                                                })
                                            }

                                            }>
                                                <img src={`../../static/equipments/${e.logo}`} height={80} width={80}
                                                     alt={e.label}/>
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
                        <Grid style={{marginBottom:'2%'}}>
                            <Grid xs={12}>
                                <h2>Définissez votre montant minimum de réservation </h2>
                            </Grid>
                            <Grid xs={12}>
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
                                    value={serviceUser.minimum_basket}
                                    name={'minimum_basket'}
                                    onChange={this.onChange}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                    }}
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
                                    Votre périmètre d’intervention est la zone dans laquelle vous souhaitez réaliser vos services. Par défaut, nous utilisons la ville
                                    de votre profil comme référence. Cette adresse ne vous convient pas ? Vous pouvez changer votre ville de référence à tout moment !
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

                                <Grid container style={{margin:'1%'}}>
                                    <Grid item xs={12}>
                                        <p>Définissez le périmètre que vous souhaitez couvrir :</p>
                                    </Grid>
                                    <Grid item xs={10} style={{marginTop: '2%'}}>
                                        <InputRange
                                            formatLabel={value => `${value}km`}
                                            step={1}
                                            maxValue={200}
                                            minValue={1}
                                            value={this.state.perimeter}
                                            onChange={value =>this.setState({perimeter: value})}
                                        />

                                    </Grid>
                                </Grid>
                        </Grid>
                        <hr style={{marginTop:40}}/>
                        <Grid container style={{marginBottom: '2%'}}>
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
                            <Grid item xs={5}>
                                <TextField
                                    style={{width: '100%'}}
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
                        <Grid container  style={{marginBottom: '2%'}}>
                            <Grid item xs={12}>
                                <h2>Décrivez brievement votre expertise !</h2>
                            </Grid>
                            <Grid item xs={12}>
                                <p>
                                    Décrivez votre expertise et précisez votre service !
                                    Mettez en évidence vos compétences et votre expertise dans ce service.
                                    Vous pouvez également préciser la façon dont les utilisateurs doivent indiquer les quantités pour réserver.
                                    Par exemple, si vous proposez un service de confection de tapis, vous pouvez indiquer les heures nécessaires pour différentes dimension de tapis.
                                    Précisez tout ce qui peut aider votre client à réserver correctement votre service !
                                </p>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    style={{width:'100%'}}
                                    multiline
                                    rows={6}
                                    margin="normal"
                                    variant="outlined"
                                    value={serviceUser.description}
                                    name={'description'}
                                    onChange={this.onChange}
                                />
                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid container  style={{marginBottom: '2%'}}>
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
                                    select
                                    style={{width: '250px'}}
                                    variant="outlined"
                                    value={serviceUser.level}
                                    name={'level'}
                                    onChange={this.onChange}
                                >
                                    <MenuItem value="0">...</MenuItem>
                                    <MenuItem value="1">Entre 0 et 1 an</MenuItem>
                                    <MenuItem value="2">Entre 1 et 5 ans</MenuItem>
                                    <MenuItem value="3">Entre 5 et 10 ans</MenuItem>
                                    <MenuItem value="4">Plus de 10 ans</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12} className={classes.responsiveGrade}>
                                <Grid className={classes.responsiveGradeContent}>
                                    <Grid item xs={12}>
                                        <h3 style={{color:'#757575'}}>Diplômes</h3>
                                    </Grid>
                                    {haveDiploma ?
                                        <React.Fragment>
                                            <Grid container className={classes.responsivePicsInfo}>
                                                <Grid item xs={7} style={{paddingLeft:15}}>
                                                     <p style={{fontWeight:'bold'}}>{diploma.name}</p>
                                                </Grid>
                                                <hr style={{marginLeft:0,marginRight:0}}/>
                                                <Grid item xs={1} style={{paddingLeft:15}}>
                                                    <p>{diploma.year}</p>
                                                </Grid>
                                                <Grid item xs={3} style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                                                    <EditIcon onClick={()=>this.setState({editDiploma: true})} color={"primary"} style={{marginRight:20,cursor:"pointer"}}/>
                                                    <DeleteIcon onClick={()=>this.deleteDiploma()} color={"secondary"} style={{cursor:"pointer"}}/>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        style={{width: '100%'}}
                                                        type={'text'}
                                                        margin="normal"
                                                        label={'Nom du diplôme'}
                                                        variant="outlined"
                                                        placeholder={'Nom du diplôme'}
                                                        value={this.state.name_newDiploma}
                                                        name={'name_newDiploma'}
                                                        onChange={this.onChange2}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        InputLabelProps={{ shrink: true }}
                                                        style={{width: '100%'}}
                                                        label="Année d'obtention"
                                                        margin="normal"
                                                        variant="outlined"
                                                        select
                                                        value={this.state.year_newDiploma || ''}
                                                        name={'year_newDiploma'}
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
                                                    <label style={{display: 'flex', marginTop: 15,backgroundColor:'rgb(79, 189, 215)',justifyContent:"center", width:'200px', borderRadius:'5px'}}>
                                                        <p style={{cursor:"pointer",textAlign:'center', color:'white'}}>Joindre mon diplôme</p>
                                                        <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="file_diploma" type="file"
                                                               onChange={this.onChangeDiploma}
                                                               className="form-control" accept={'image/*,.pdf'}
                                                        />
                                                    </label>
                                                    <span>{this.state.file_diploma !== null ? this.state.file_diploma.name : null}</span>
                                                </Grid>

                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12} style={{marginTop:'1%', marginBottom:'1%'}}>
                                                    <p style={{fontStyle: 'italic'}}>
                                                        En téléchargeant votre diplôme, votre diplôme aura le statut de diplôme vérifié auprès des
                                                        utilisateurs mais il ne sera jamais visible par ses derniers.
                                                    </p>
                                                </Grid>
                                                <Grid item xs={3} style={{maxWidth: 'inherit', flexBasis:'inherit'}}>
                                                    <Button className={classes.validerWeb} color={"primary"} onClick={()=>this.editDiploma()} variant={"contained"} style={{color:"white"}}>Valider ce diplôme</Button>
                                                    <Button className={classes.validerMobile} color={"primary"} onClick={()=>this.editDiploma()} variant={"contained"} style={{color:"white"}}>Valider</Button>

                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                    }
                                    {editDiploma ?

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
                                                    <label style={{display: 'flex', marginTop: 15,backgroundColor:'rgb(79, 189, 215)',justifyContent:"center", width:'200px', borderRadius:'5px'}}>
                                                        <p style={{cursor:"pointer",textAlign:'center',color:'white'}}>Joindre mon diplôme</p>
                                                        <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="file_diploma" type="file"
                                                               onChange={this.onChangeDiploma}
                                                               className="form-control" accept={'image/*,.pdf'}
                                                        />
                                                    </label>
                                                    <span>{this.state.file_diploma !== null ? this.state.file_diploma.name : null}</span>
                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid xs={12}>
                                                    <p style={{fontStyle: 'italic'}}>
                                                        En téléchargeant votre diplôme, votre diplôme aura le statut de diplôme vérifié auprès des
                                                        utilisateurs mais il ne sera jamais visible par ses derniers.
                                                    </p>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Button className={classes.validerWeb} color={"primary"} onClick={()=>this.editDiploma()} variant={"contained"} style={{color:"white"}}>Valider ce diplôme</Button>
                                                    <Button className={classes.validerMobile} color={"primary"} onClick={()=>this.editDiploma()} variant={"contained"} style={{color:"white"}}>Valider</Button>

                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                        : null}
                                </Grid>
                                <Grid className={classes.responsiveGradeContent}>
                                    <Grid item xs={12}>
                                        <h3 style={{color:'#757575'}}>Certifications</h3>
                                    </Grid>
                                    {haveCertification ?
                                        <React.Fragment>
                                            <Grid container className={classes.responsivePicsInfo}>
                                                <Grid item xs={7} style={{paddingLeft:15}}>
                                                    <p style={{fontWeight:'bold'}}>{certification.name}</p>
                                                </Grid>
                                                <hr style={{marginLeft:0,marginRight:0}}/>
                                                <Grid item xs={1} style={{paddingLeft:15}}>
                                                    <p>{certification.year}</p>
                                                </Grid>
                                                <Grid item xs={3} style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                                                    <EditIcon onClick={()=>this.setState({editCertification: true})} color={"primary"} style={{marginRight:20,cursor:"pointer"}}/>
                                                    <DeleteIcon onClick={()=>this.deleteCertification()} color={"secondary"} style={{cursor:"pointer"}}/>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        style={{width: '100%'}}
                                                        type={'text'}
                                                        margin="normal"
                                                        label={'Nom de la certification'}
                                                        variant="outlined"
                                                        placeholder={'Nom de la certification'}
                                                        value={this.state.name_newCertification}
                                                        name={'name_newCertification'}
                                                        onChange={this.onChange2}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        InputLabelProps={{ shrink: true }}
                                                        style={{width: '100%'}}
                                                        label="Année d'obtention"
                                                        margin="normal"
                                                        variant="outlined"
                                                        select
                                                        value={this.state.year_newCertification || ''}
                                                        name={'year_newCertification'}
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
                                                    <label style={{display: 'flex', marginTop: 15,backgroundColor:'rgb(79, 189, 215)',justifyContent:"center", width:'200px', borderRadius:'5px'}}>
                                                        <p style={{cursor:"pointer",textAlign:'center',color:'white'}}>Joindre ma certification</p>
                                                        <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="file_certification" type="file"
                                                               onChange={this.onChangeCertification}
                                                               className="form-control" accept={'image/*,.pdf'}
                                                        />
                                                    </label>
                                                    <span>{this.state.file_certification !== null ? this.state.file_certification.name : null}</span>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12} style={{marginBottom:'1%'}}>
                                                    <p style={{fontStyle: 'italic'}}>
                                                        En téléchargeant votre certification, votre certification aura le statut de certification vérifiée auprès des
                                                        utilisateurs mais elle ne sera jamais visible par ces derniers.
                                                    </p>
                                                </Grid>
                                                <Grid item xs={3} style={{maxWidth: 'inherit', flexBasis:'inherit'}}>
                                                    <Button className={classes.validerWeb} onClick={()=>this.editCertification()} color={"primary"} variant={"contained"} style={{color:"white"}}>Valider cette certification</Button>
                                                    <Button className={classes.validerMobile} onClick={()=>this.editCertification()} color={"primary"} variant={"contained"} style={{color:"white"}}>Valider</Button>

                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                    }
                                    {editCertification ?

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
                                                    <label style={{display: 'flex', marginTop: 15,backgroundColor:'rgb(79, 189, 215)',justifyContent:"center"}}>
                                                        <p style={{cursor:"pointer",textAlign:'center',color:'white'}}>Joindre ma certification</p>
                                                        <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="file_certification" type="file"
                                                               onChange={this.onChangeCertification}
                                                               className="form-control" accept={'image/*,.pdf'}
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
                                                <Grid item xs={3} style={{maxWidth: 'inherit', width: 'inherit'}}>
                                                    <Button className={classes.validerWeb} onClick={()=>this.editCertification()} color={"primary"} variant={"contained"} style={{color:"white"}}>Valider cette certification</Button>
                                                    <Button className={classes.validerMobile} onClick={()=>this.editCertification()} color={"primary"} variant={"contained"} style={{color:"white"}}>Valider</Button>

                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                        : null}
                                </Grid>
                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid container style={{display:"flex",justifyContent:"flex-end",width:'90%'}}>
                            <Button variant={"contained"} onClick={(event)=>this.onSubmit(event)} color={"secondary"} style={{color:"white", marginBottom: '10px'}}>Enregistrer</Button>
                        </Grid>
                        </Grid>
                    <Grid item xs={7} lg={6} className={classes.pasphone} >
                        <Grid container style={{position: 'sticky',height:'88vh', backgroundImage:'url(../../static/Creation_shop_step1.png)',backgroundRepeat:'no-repeat',top:100,backgroundSize: 'cover', backgroundPosition:'center'}}></Grid>
                    </Grid>
                    </Grid>
                    <Grid container className={classes.bottombar} justify="center" style={{backgroundColor: 'white',bottom:0, position:'fixed', zIndex:'999'}}>

                         <Grid item xs={2} style={{textAlign:"center", borderBottom: '3px solid #4fbdd7'}}>
                             <Link href={'/myShop/services'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/shopping-bag.png'} alt={'sign'} width={25} style={{opacity:'0.5'}}></img></p></a>
                             </Link>
                         </Grid>
                         <Grid item xs={2} style={{textAlign:"center"}}>
                            <Link href={'/reservations/messages'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speech-bubble.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                            </a></Link>
                         </Grid>

                         <Grid item xs={2} style={{textAlign:"center"}}>
                            <Link href={'/reservations/allReservations'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/event.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                            </a></Link>
                         </Grid>

                         <Grid item xs={2} style={{textAlign:"center",zIndex:999}}>
                            <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/calendar.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                            </a></Link>
                         </Grid>

                         <Grid item xs={2} style={{textAlign:"center"}}>
                            <Link href={'/performances/revenus'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                            </a></Link>
                         </Grid>

                     </Grid>
                {/* <Footer/>*/}
            </Layout>
        );
    };
}



export default withStyles(styles)(editService);


