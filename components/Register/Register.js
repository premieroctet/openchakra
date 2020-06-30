import React from 'react';
import {toast} from 'react-toastify';
import Router from 'next/router';
import {checkPass1, checkPass2} from '../../utils/passwords';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Typography} from '@material-ui/core';
import AlgoliaPlaces from 'algolia-places-react';
import DatePicker, {registerLocale} from 'react-datepicker';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import fr from "date-fns/locale/fr";
import styles from './RegisterStyle';
import {withStyles} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

registerLocale('fr', fr);

class Register extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            name: '',
            birthday: '',
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

    onChangePassword = e => {
        this.setState({
            status1: checkPass1(this.state.password),
            status2: checkPass2(this.state.password, this.state.password2),
        })
    };

    onChangeAddress({suggestion}) {
        this.setState({city: suggestion.city, address: suggestion.name, zip_code: suggestion.postcode,country: suggestion.country,
            lat: suggestion.latlng.lat, lng: suggestion.latlng.lng});

    }

    onChangeBirthday = date => {
        this.setState({birthday: date})
    };

    handleChecked () {
        this.setState({checked: !this.state.checked});
    }

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
                        const {token} = response.data;
                        localStorage.setItem('token',token);
                        axios.defaults.headers.common['Authorization'] = token;
                        Router.push({pathname:'/addPicture'})
                    })
                    .catch(error => {
                        console.log(error);
                    })

            })
            .catch(err => {
                    console.log(err);
                    this.setState({errors: err.response.data})

                }
            );
    };


    renderSwitch(stepIndex, classes, errors) {
        switch(stepIndex) {
            case 0:
                return (
                    <Grid container>
                        <Grid className={classes.margin}>
                            <Grid container spacing={1} alignItems="flex-end" style={{width: '100%', justifyContent: 'center'}}>
                                <Grid item>
                                    <MailOutlineIcon style={{color:'rgba(84,89,95,0.95)'}}/>
                                </Grid>
                                <Grid item style={{width: '70%'}}>
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
                            <Grid container spacing={1} alignItems="flex-end" style={{width: '100%', justifyContent: 'center'}}>
                                <Grid item>
                                    <PersonOutlineIcon style={{color:'rgba(84,89,95,0.95)'}}/>
                                </Grid>
                                <Grid item style={{width: '70%'}}>
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
                            <Grid container spacing={1} alignItems="flex-end" style={{width: '100%', justifyContent: 'center'}}>
                                <Grid item>
                                    <PersonOutlineIcon style={{color:'rgba(84,89,95,0.95)'}}/>
                                </Grid>
                                <Grid item style={{width: '70%'}}>
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
                            <Grid container spacing={1} alignItems="flex-end" style={{width: '100%', justifyContent: 'center'}}>
                                <Grid item>
                                    <LockOpenOutlinedIcon style={{color:'rgba(84,89,95,0.95)'}}/>
                                </Grid>
                                <Grid item style={{width: '70%'}}>
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
                            <Grid container spacing={1} alignItems="flex-end" style={{width: '100%', justifyContent: 'center'}}>
                                <Grid item>
                                    <LockOutlinedIcon style={{color:'rgba(84,89,95,0.95)'}}/>
                                </Grid>
                                <Grid item style={{width: '70%'}}>
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
                    <Grid container style={{marginTop: 15}}>
                        <Typography style={{fontSize: '1.2rem', width:'100%'}}>Adresse postale</Typography>
                        <p>Votre adresse ne sera pas visible, mais nous l’utiliserons pour vous proposer<br/>
                            ou proposer vos services aux utilisateurs ou Alfred proches de chez vous.</p>
                        <Grid item style={{width: '100%'}}>
                            <AlgoliaPlaces
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
                        <Grid item style={{width: '100%'}}>
                            <TextField
                                label="Rue"
                                placeholder="Rue"
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                                type="text"
                                name="address"
                                value={this.state.address}
                                onChange={this.onChange}
                                error={errors.address}
                            />
                            <em style={{color:'red'}}>{errors.address}</em>
                        </Grid>
                        <Grid item style={{width: '100%'}}>
                            <TextField
                                label="Code postal"
                                placeholder="Code postal"
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                                type="text"
                                name="zip_code"
                                value={this.state.zip_code}
                                onChange={this.onChange}
                                error={errors.zip_code}
                            />
                            <em style={{color:'red'}}>{errors.zip_code}</em>
                        </Grid>
                        <Grid item style={{width: '100%'}}>
                            <TextField
                                label="Ville"
                                placeholder="Ville"
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                                type="text"
                                name="city"
                                value={this.state.city}
                                onChange={this.onChange}
                                error={errors.city}
                            />
                            <em style={{color:'red'}}>{errors.city}</em>
                        </Grid>
                        <Grid item className={classes.country}>
                            <TextField
                                label="Pays"
                                value={this.state.country}
                                name="country"
                                type="text"
                                onChange={this.onChange}
                                style={{ width: '100%' }}
                                margin="normal"
                                variant="outlined"
                                error={errors.country}
                            />
                            <em style={{color:'red'}}>{errors.country}</em>
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid>

                        <Typography style={{fontSize: '1.2rem', width:'100%', marginTop: 15}}>Date de naissance</Typography>
                        <p>Pour vous inscrire, vous devez être âgé d’au moins 16 ans. Les autres<br/>
                            utilisateurs ne verront pas votre date de naissance.
                        </p>
                        <Grid item className={classes.datenaissance} style={{display:"flex",alignItems:"center"}}>
                            <DatePicker
                                selected={this.state.birthday}
                                onChange={(date)=>this.onChangeBirthday(date)}
                                locale='fr'
                                placeholderText="jj/mm/aaaa"
                                showYearDropdown
                                showMonthDropdown
                                className={classes.birthday}
                                maxDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                            />
                        </Grid>
                        <em style={{color:'red'}}>
                            {this.state.errors.birthday}
                        </em>
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
                        <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                            <Button
                                disabled = {!(this.state.checked && this.state.status1.check && this.state.status2.check)}
                                onCLick={this.onSubmit}
                                variant="contained"
                                color="primary"
                                style={{ width: '100%',color:"white" }}>
                                Inscription
                            </Button>
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
                    <Card>
                        <Grid className={classes.newContainer}>
                            <Grid>
                                <h2 style={{
                                    textAlign: 'center', margin: '0px auto 1.6rem', fontSize: "1.6rem",
                                    color: "rgba(84,89,95,0.95)",
                                    letterSpacing: -1,
                                    fontWeight: "bold"}}>Inscription</h2>
                            </Grid>
                           <Grid style={{width: '100%', height: '100%', margin:'0px auto 1.6rem'}}>
                               {this.renderSwitch(activeStep, classes, errors)}
                           </Grid>
                            <Grid style={{marginTop: 10}}>
                                <hr/>
                                <Grid container style={{alignItems: 'center'}}>
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
                                        steps={3}
                                        position="static"
                                        activeStep={activeStep}
                                        className={classes.rootStepper}
                                        nextButton={
                                            <Button size="small" onClick={this.handleNext} disabled={activeStep === 2}>
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
                    </Card>
                </Grid>
            </Grid>
        );
    }

}

export default withStyles(styles)(Register);
