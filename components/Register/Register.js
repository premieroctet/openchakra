import React from 'react';
import {toast} from 'react-toastify';
import {checkPass1, checkPass2} from '../../utils/passwords';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Typography} from '@material-ui/core';
import AlgoliaPlaces from 'algolia-places-react';
import {registerLocale} from 'react-datepicker';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import fr from "date-fns/locale/fr";
import styles from './RegisterStyle';
import {withStyles} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
const {isPhoneOk}=require('../../utils/sms');
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import Router from 'next/router';

registerLocale('fr', fr);


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


class Register extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            name: '',
            birthday: new Date(),
            email: '',
            password: '',
            password2: '',
            address: '',
            city: '',
            zip_code: '',
            country: '',
            checked: false,
            status1: {error:'', check:false},
            status2: {error:'', check:false},
            errors: {},
            lat: '',
            lng: '',
            activeStep: 0,
            file: null,
            picture: '',
            value:'',
            phone: '',
            phoneOk: false,
            // Phone sendVerificationSMS
            smsCodeOpen: false, // Show/hide SMS code modal
            smsCode: '', // Typed SMS code
            smsError: null,
            phoneConfirmed: false,
            serverError:false, // Si erreur serveur pour l''envoi du SMS, continuer quand même
        };
        this.handleChecked = this.handleChecked.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
    }


    componentDidMount() {
        const token = localStorage.getItem('token');
        if(token !== null) {
            toast.warn('Vous êtes déjà inscrit');
            Router.push('/')
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangePhone(e) {
        var {name, value} = e.target;
        this.setState({ [name]: value });
        if( name==='phone') {
            const phoneOk=isPhoneOk(value);
            if (phoneOk && value.startsWith('0')) {
                value='33'+value.substring(1);
            }
            this.setState({'phone': value,phoneOk:isPhoneOk(value)})
        }
    };

    onChangePicture = e => {
        this.setState({picture:e.target.files[0]});
    };

    handleChange(event) {
        this.setState({
            file:
                event.target.files[0] ? URL.createObjectURL(event.target.files[0]):null })
    }

    onChangePassword = e => {
        this.setState({
            status1: checkPass1(this.state.password),
            status2: checkPass2(this.state.password, this.state.password2),
        })
    };

    onChangeAddress({suggestion}) {
        this.setState({city: suggestion.city, address: suggestion.name, zip_code: suggestion.postcode,country: suggestion.country,
            lat: suggestion.latlng.lat, lng: suggestion.latlng.lng});

    };

    handleChecked () {
        this.setState({checked: !this.state.checked});
    };

    sendSms = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post('/myAlfred/api/users/sendSMSVerification', this.state.phone)
            .then (res => {
                var txt="Le SMS a été envoyé";
                toast.info(txt);
                this.setState({smsCodeOpen:true})
            })
            .catch(err => {
                toast.error("Impossible d'envoyer le SMS");
                this.setState({serverError: true});
            })
    };

    checkSmsCode = () => {
        axios.post("/myAlfred/api/users/checkSMSVerification",  this.state.smsCode)
            .then( res => {
                if (res.data.sms_code_ok) {
                    toast.info("Votre numéro de téléphone est validé");
                    this.setState({smsCodeOpen: false, phoneConfirmed:true});
                }
                else {
                    toast.error("Le code est incorrect")
                }
            })
            .catch(err => toast.error("Erreur à la vérification du code"))
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            firstname: this.state.firstname,
            name: this.state.name,
            birthday: this.state.birthday,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            address: this.state.address,
            zip_code: this.state.zip_code,
            city: this.state.city,
            country: this.state.country,
            lat: this.state.lat,
            lng: this.state.lng,
        };

        const username = this.state.email;
        const password = this.state.password;



        console.log("Submitting");
        axios
            .post('/myAlfred/api/users/register', newUser)
            .then(res => {
                toast.info('Inscription réussie');
                axios.post('/myAlfred/api/users/login',{username, password})
                    .then(response => {
                        console.log(response, 'first response');
                        const {token} = response.data;
                        localStorage.setItem('token',token);
                        axios.defaults.headers.common['Authorization'] = token;
                    })
                    .catch( err => {
                        console.log(err)
                    }).then(this.addPhoto).catch(err => console.log(err))
            })
            .catch(err => {
                    console.log(err);
                    this.setState({errors: err.response.data})
                }
            );
    };

    addPhoto = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('myImage',this.state.picture);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        if(this.state.picture === ''){
            Router.push('/checkEmail');
        }else{
            axios.post("/myAlfred/api/users/profile/picture",formData,config)
                .then(() => {
                    Router.push('/checkEmail');
                }).catch((error) => {
                console.log(error)
            })
        }
    };


    onSubmitPhone = e => {
        e.preventDefault();

        if (!this.state.phoneConfirmed && !this.state.serverError) {
            this.sendSms();
            return false;
        }

        const newPhone = {
            phone: this.state.phone,
            phone_confirmed: this.state.phoneConfirmed
        };
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .put('/myAlfred/api/users/profile/phone', newPhone)
            .then(res => {
                toast.info('Téléphone ajouté');
            })
            .catch(err =>
                console.log(err)
            );
    };

    onChangeBirthdayDate = (e) =>{
        let day = new Date(this.state.birthday);
        day.setDate(e.target.value);
        this.setState({birthday: day})
    };

    onChangeBirthdayMonth = (e) =>{
        let month = new Date(this.state.birthday);
        month.setMonth(e.target.value - 1 );
        this.setState({birthday: month})
    };

    onChangeBirthdayYear = (e) =>{
        let year = new Date(this.state.birthday);
        year.setFullYear(e.target.value);
        this.setState({birthday: year})
    };


    renderSwitch(stepIndex, classes, errors) {
        switch(stepIndex) {
            case 0:
                return (
                    <Grid container>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end"  className={classes.genericContainer}>
                                <Grid item>
                                    <MailOutlineIcon className={classes.colorIcon}/>
                                </Grid>
                                <Grid item className={classes.widthTextField}>
                                    <TextField
                                        id="input-with-icon-grid"
                                        label="Email"
                                        placeholder="Email"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                    />
                                    <em style={{color:'red'}}>{errors.email}</em>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <Grid item>
                                    <PersonOutlineIcon className={classes.colorIcon}/>
                                </Grid>
                                <Grid item className={classes.widthTextField}>
                                    <TextField
                                        id="standard-with-placeholder"
                                        label="Prénom"
                                        placeholder="Prénom"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="firstname"
                                        value={this.state.firstname}
                                        onChange={this.onChange}
                                        error={errors.firstname}
                                    />
                                </Grid>
                                <em style={{color:'red'}}>{errors.firstname}</em>
                            </Grid>
                        </Grid>
                        <Grid  className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <Grid item>
                                    <PersonOutlineIcon className={classes.colorIcon}/>
                                </Grid>
                                <Grid item className={classes.widthTextField}>
                                    <TextField
                                        label="Nom"
                                        placeholder="Nom"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                </Grid>
                                <em style={{color:'red'}}>{errors.name}</em>
                            </Grid>
                        </Grid>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <Grid item>
                                    <LockOpenOutlinedIcon className={classes.colorIcon}/>
                                </Grid>
                                <Grid item className={classes.widthTextField}>
                                    <TextField
                                        label="Créer un mot de passe"
                                        placeholder="Créer un mot de passe"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        onKeyUp ={this.onChangePassword}
                                        error={this.state.status1.error}
                                        helperText={this.state.status1.error}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <Grid item>
                                    <LockOutlinedIcon className={classes.colorIcon}/>
                                </Grid>
                                <Grid item className={classes.widthTextField}>
                                    <TextField
                                        label="Confirmer mot de passe"
                                        placeholder="Confirmer mot de passe"
                                        margin="normal"
                                        style={{ width: '100%' }}
                                        type="password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                        onKeyUp ={this.onChangePassword}
                                        error={this.state.status2.error}
                                        helperText={this.state.status2.error}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <input accept="image/*"
                                       className="input"
                                       style={{display:'none'}}
                                       id="icon-button-file"
                                       type="file"
                                       onChange={(event) =>{this.handleChange(event);this.onChangePicture(event)}}
                                       name={"myImage"}
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton
                                        color="primary"
                                        className={classes.button}
                                        style={{backgroundImage:`url('${this.state.file}')`,}}
                                        component="span"
                                    >
                                        {this.state.file === null ?
                                            <PhotoCamera style={{fontSize: '2rem'}} />
                                            : null
                                        }
                                    </IconButton>
                                </label>
                            </Grid>
                        </Grid>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <Grid>
                                    <Typography className={classes.subtitle}>Adresse postale</Typography>
                                </Grid>
                                <Grid>
                                    <p className={classes.textStyle}>Votre adresse ne sera pas visible, mais nous l’utiliserons pour vous proposer
                                        ou proposer vos services aux utilisateurs ou Alfred proches de chez vous.</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <Grid item style={{width: '100%'}}>
                                    <AlgoliaPlaces
                                        className={classes.textFieldAlgo}
                                        placeholder='Recherchez votre adresse'
                                        options={{
                                            appId: 'plKATRG826CP',
                                            apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                                            language: 'fr',
                                            countries: ['fr'],
                                            type: 'address',

                                        }}
                                        onChange={(suggestion) =>this.onChangeAddress(suggestion)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <Grid>
                                    <Typography className={classes.subtitle}>Date de naissance</Typography>
                                </Grid>
                                <Grid>
                                    <p className={classes.textStyle}>Pour vous inscrire, vous devez être âgé d’au moins 16 ans. Les autres
                                        utilisateurs ne verront pas votre date de naissance.
                                    </p>
                                </Grid>
                                <Grid item className={classes.datenaissance} style={{display:"flex",alignItems:"center"}}>
                                    <Grid container style={{justifyContent:'space-between', flexWrap: 'nowrap'}}>
                                       <Grid item style={{width: '30%'}}>
                                           <TextField
                                               label="Jour"
                                               placeholder="Jour"
                                               onChange={this.onChangeBirthdayDate}
                                               inputProps={{
                                                   maxLength: 2,
                                               }}
                                               InputProps={{
                                                   inputComponent: NumberFormatCustom
                                               }}
                                           />
                                       </Grid>
                                        <Grid item style={{width: '30%'}}>
                                            <TextField
                                                label="Mois"
                                                placeholder="Mois"
                                                onChange={this.onChangeBirthdayMonth}
                                                inputProps={{
                                                    maxLength: 2,
                                                }}
                                                InputProps={{
                                                    inputComponent: NumberFormatCustom,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item style={{width: '30%'}}>
                                            <TextField
                                                label="Année"
                                                placeholder="Année"
                                                onChange={this.onChangeBirthdayYear}
                                                inputProps={{
                                                    maxLength: 4
                                                }}
                                                InputProps={{
                                                    inputComponent: NumberFormatCustom,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <Grid className={classes.newContainer}>
                                    <Grid>
                                        <Typography className={classes.subtitle}>Téléphone</Typography>
                                    </Grid>
                                    <Grid>
                                        <p className={classes.textStyle}>L'ajout de votre numéro de téléphone permet aux membres My-Alfred
                                            de disposer d'un moyen pour vous contacter.
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                    <Grid item>
                                        <PhoneIphoneOutlinedIcon className={classes.colorIcon}/>
                                    </Grid>
                                    <Grid item style={{width: '70%'}}>
                                        <TextField
                                            id="standard-with-placeholder"
                                            label="Numéro de téléphone"
                                            placeholder="Numéro de téléphone"
                                            margin="normal"
                                            style={{ width: '100%' }}
                                            type={'number'}
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={(e)=>this.onChangePhone(e)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Grid item className={classes.genericContainerAndMargin}>
                                        <Button
                                            disabled={!this.state.phoneOk}
                                            onClick={this.onSubmitPhone}
                                            variant="contained"
                                            color="primary"
                                            style={{ width: '100%', color: 'white' }}
                                        >
                                            {this.state.phoneConfirmed ? `Suivant` : this.state.serverError ? `Confirmer plus tard` : `Je confirme mon numéro`}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <Dialog open={this.state.smsCodeOpen} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Confirmation du numéro de téléphone</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>Saisissez le code reçu par SMS</DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Code"
                                            type="number"
                                            placeholder="0000"
                                            maxLength="4"
                                            value={this.state.smsCode}
                                            onChange={ e => { console.log(e.target.value); this.setState({smsCode: e.target.value})}}
                                            fullWidth
                                            errors={this.state.smsError}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => this.setState({smsCodeOpen:false})} color="primary">
                                            Annuler
                                        </Button>
                                        <Button
                                            disabled={this.state.smsCode.length!==4}
                                            onClick={() => this.checkSmsCode()}
                                            color="primary">
                                            Confirmer
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                        </Grid>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                                <Grid>
                                    <Grid container style={{marginTop: 15, alignItems: 'center'}}>
                                        <Grid>
                                            <Checkbox
                                                checked={this.state.checked}
                                                onChange={this.handleChecked}
                                                value="checked"
                                                color="primary"
                                            />
                                        </Grid>
                                        <Grid>
                                            <a href={"footer/cguPage"} target="_blank">J’accepte les conditions générales d’utilisation de My-Alfred.</a>
                                        </Grid>
                                    </Grid>
                                    <Grid item className={classes.genericContainerAndMargin}>
                                        <Button
                                            disabled = {!(this.state.checked && this.state.status1.check && this.state.status2.check)}
                                            onClick={this.onSubmit}
                                            variant="contained"
                                            color="primary"
                                            style={{ width: '100%',color:"white" }}>
                                            Inscription
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
        }
    }

    handleNext = () => {
        this.setState({activeStep: this.state.activeStep + 1 });
    };

    handleBack = () => {
        this.setState({activeStep: this.state.activeStep - 1 });
    };


    render(){
        const { classes } = this.props;
        const { errors, activeStep } = this.state;

        return(
            <Grid  className={classes.fullContainer}>
                <Grid>
                    <Grid className={classes.newContainer}>
                        {
                            activeStep === 0 ?
                                <Grid>
                                    <h2 className={classes.titleRegister}>Inscription</h2>
                                </Grid> : null
                        }

                       <Grid className={classes.containerSwitch}>
                           {this.renderSwitch(activeStep, classes, errors)}
                       </Grid>
                        <Grid style={{marginTop: 10}}>
                            <hr/>
                            <Grid container className={classes.bottomContainer}>
                                <Grid item>
                                    <p>Vous avez déjà un compte My Alfred ? </p>
                                </Grid>
                                <Grid item style={{marginLeft: 5}}>
                                    <Button color={"primary"} onClick={this.props.callLogin}>Connexion</Button>
                                </Grid>
                            </Grid>
                            <Grid>
                                <MobileStepper
                                    variant="progress"
                                    steps={2}
                                    position="static"
                                    activeStep={activeStep}
                                    className={classes.rootStepper}
                                    classes={{
                                        progress: classes.progress
                                    }}
                                    nextButton={
                                        <Button size="small" onClick={this.handleNext} disabled={activeStep === 1}>
                                            Suivant
                                            <KeyboardArrowRight />
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                                            <KeyboardArrowLeft />
                                            Précédent
                                        </Button>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}

export default withStyles(styles)(Register);
