import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select2 from 'react-select';
import DatePicker, {registerLocale} from "react-datepicker";
import fr from 'date-fns/locale/fr';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';
import styles from './editProfile/editProfileStyle'
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
const {isPhoneOk}=require('../../utils/sms');


registerLocale('fr', fr);
moment.locale('fr');

const options = [
    { value: 'Français', label: 'Français' },
    { value: 'Anglais', label: 'Anglais' },
    { value: 'Allemand', label: 'Allemand' },
    { value: 'Espagnol', label: 'Espagnol' },
    { value: 'Chinois', label: 'Chinois' },
    { value: 'Arabe', label: 'Arabe' },
    { value: 'Portugais', label: 'Portugais' },
    { value: 'Russe', label: 'Russe' },
    { value: 'Japonais', label: 'Japonais' },
];

const momentDateFormat = "dd/MM/yyyy";

class editProfile extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            user: {},
            phone: '',
            languages: [],
            selectedLanguages: null,
            birthday: null,
            dpDate: moment().toDate(),
            ipDate: moment().format(momentDateFormat)
        };
        this.handleChangeLanguages = this.handleChangeLanguages.bind(this);
        this.callDrawer = this.callDrawer.bind(this)
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get('/myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user,phone:user.phone});
                this.setState({birthday:user.birthday});
                this.setState({selectedLanguages :user.languages.map(b => ({
                        label: b,
                        value: b
                    })) });
            })
            .catch(err => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );
    }

    onChange = e => {
        const state = this.state.user;
        var {name, value}=e.target;
        if( name==='phone') {
          const phoneOk=isPhoneOk(value);
          if (phoneOk && e.target.value.startsWith('0')) {
            value='33'+value.substring(1);
          }
        }

        state[e.target.name] = value;
        this.setState({user:state});
    };

    onChangeBirthday = date => {
        this.setState({birthday: date})
    };

    handleChangeLanguages = selectedLanguages => {
        this.setState({ selectedLanguages });

    };

    onSubmit = e => {
        e.preventDefault();
        let arrayLanguages = [];
        if(this.state.selectedLanguages != null){
            this.state.selectedLanguages.forEach(w => {
                arrayLanguages.push(w.value);
            });
        }
        const languages = arrayLanguages;
        const birthday = this.state.birthday;
        const {email, name, firstname,description,gender,phone,job,diplomes,school,emergency_phone} = this.state.user;

        axios.put('/myAlfred/api/users/profile/editProfile',{email,name,firstname,birthday,description,gender,phone,job,diplomes,school,
        emergency_phone,languages})
            .then(res => {
                toast.info('Profil modifié avec succès');
                this.componentDidMount();

            })
            .catch()
    };

    callDrawer(){
        this.child.current.handleDrawerToggle();
    }


    render() {
        const {classes} = this.props;
        const {user, birthday} = this.state;

        return (
            <Fragment>
                <Helmet>
                    <title>Profil - Modifier mon profil - My Alfred </title>
                    <meta property="description" content="Plateforme d’échange de services entre particuliers. Services rémunérés à des prix justes ! Profitez des talents de nos Alfred et trouvez un Alfred bricoleur, petsitter, pâtissier, décorateur, près de chez vous dans toute la france ! Des milliers de services proposés, trouvez le vôtre !" />
                  </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid style={{zIndex: 0}}>
                            <ResponsiveDrawer ref={this.child} isActiveIndex={0} itemsDrawers={'profil'}/>
                        </Grid>
                        <Grid>
                            <Grid>
                                <IconButton
                                  color="inherit"
                                  aria-label="open drawer"
                                  edge="start"
                                  onClick={this.callDrawer}
                                  className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} className={classes.containerLeft}>
                            <h1 style={{color: 'dimgray',fontWeight: '100'}}>Modifier votre profil</h1>
                            <form>

                            <Grid container className={classes.responsiveContainer}>
                                <Grid container>
                                <Grid item lg={6} md={6} sm={6} style={{marginTop: 20}}>
                                    <TextField
                                        id="standard-name"
                                        style={{ marginTop: 15,width: '100%'}}
                                        value={user.firstname || ''}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'firstname'}
                                        placeholder={'Prénom'}
                                        variant={"outlined"}
                                        label={'Prénom'}
                                    />
                                </Grid>
                                </Grid>
                                <Grid container>
                                <Grid item lg={6} md={6} sm={6} style={{marginTop: 20}}>
                                    <TextField
                                        id="standard-name"
                                        style={{ marginTop: 15,width: '100%'}}
                                        value={user.name || ''}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'name'}
                                        placeholder={'Nom'}
                                        variant={"outlined"}
                                        label={'Nom'}
                                    />
                                </Grid>
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} style={{marginTop: 20}}>
                                    <TextField
                                        id="standard-name"
                                        style={{ marginTop: 15,width: '100%'}}
                                        value={user.description || ''}
                                        multiline
                                        rows={5}
                                        variant={'outlined'}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'description'}
                                        label={'A propos de moi'}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className={classes.responsiveContainer}>
                                <Grid item xs={12}>
                                <h2 style={{fontWeight: '100'}}>Informations personnelles</h2>
                                </Grid>
                                <Grid container style={{marginTop:10}}>
                                <Grid item lg={2} xs={6} sm={5} md={3} >
                                    <TextField
                                        id="standard-name"
                                        style={{width: '100%'}}
                                        value={user.gender || ''}
                                        select
                                        variant={"outlined"}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'gender'}
                                        placeholder={'Sexe'}
                                        label={'Sexe'}
                                    >
                                        <MenuItem  value={'Homme'}>
                                            Homme
                                        </MenuItem>
                                        <MenuItem  value={'Femme'}>
                                            Femme
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                    <Grid item xs={1}/>
                                <Grid item lg={3} xs={6} sm={6} md={3}  style={{marginTop:15}}>
                                    <DatePicker
                                        selected={Date.parse(birthday)}
                                        onChange={(date) => this.onChangeBirthday(date)}
                                        locale='fr'
                                        placeholderText="Date de naissance"
                                        showYearDropdown
                                        showMonthDropdown
                                        className={classes.birthday2}
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={new Date()}
                                    />
                                </Grid>
                                </Grid>
                                <Grid container>
                                <Grid item xs={6} lg={6} md={6} sm={6} style={{marginTop: 10}}>
                                    <TextField
                                        id="standard-name"
                                        style={{width: '100%'}}
                                        value={user.email || ''}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'email'}
                                        placeholder={'Email'}
                                        variant={"outlined"}
                                        label={'Adresse email'}
                                    />
                                </Grid>
                                </Grid>
                                <Grid item xs={6} lg={6} md={6} sm={6} style={{marginTop: 10}}>
                                    <TextField

                                        id="standard-name"
                                        style={{width: '100%'}}
                                        value={user.phone || ''}
                                        type={'number'}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'phone'}
                                        placeholder={'Téléphone'}
                                        variant={"outlined"}
                                        label={'Téléphone'}
                                    />
                                </Grid>
                            </Grid>
                                <Grid container className={classes.responsiveContainer}>
                                    <Grid item xs={12}>
                                    <h2 style={{fontWeight: '100'}}>Informations facultatives</h2>
                                    </Grid>
                                    <Grid item xs={6} lg={6} md={6} sm={6} style={{marginTop: 10}}>

                                        <TextField
                                            id="standard-name"
                                            style={{width: '100%'}}
                                            value={user.diplomes || ''}
                                            onChange={this.onChange}
                                            margin="normal"
                                            name={'diplomes'}
                                            placeholder={'Diplomes'}
                                            variant={"outlined"}
                                            label={'Diplômes'}

                                        />

                                    </Grid>
                                    <Grid container>
                                    <Grid item xs={6} lg={6} md={6} sm={6} style={{marginTop: 10}}>
                                        <TextField
                                            id="standard-name"
                                            style={{width: '100%'}}
                                            value={user.school || ''}
                                            onChange={this.onChange}
                                            margin="normal"
                                            name={'school'}
                                            placeholder={'Ecoles'}
                                            variant={"outlined"}
                                            label={'Ecoles'}

                                        />
                                    </Grid>
                                    </Grid>
                                    <Grid container>
                                    <Grid item xs={6} lg={6} md={6} sm={6} style={{marginTop: 10}}>
                                        <TextField
                                            id="standard-name"
                                            style={{width: '100%'}}
                                            value={user.job || ''}
                                            onChange={this.onChange}
                                            margin="normal"
                                            name={'job'}
                                            placeholder={'Emploi'}
                                            variant={"outlined"}
                                            label={'Emploi'}
                                        />
                                    </Grid>
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: 10}}>
                                        <Grid container>
                                            <Grid item xs={6} lg={6} md={6} sm={6}>
                                            <Grid item xs={2} style={{lineHeight:'1px'}}>
                                                <p>Langues</p>
                                            </Grid>
                                            <Grid item xs={12}>
                                    <Select2
                                        value={this.state.selectedLanguages}
                                        onChange={this.handleChangeLanguages}
                                        options={options}
                                        styles={{
                                            menu: provided => ({ ...provided, zIndex: 9999 })
                                        }}
                                        isMulti
                                        isSearchable
                                        closeMenuOnSelect={false}
                                        placeholder={'Sélectionnez vos langues'}
                                        noOptionsMessage={()=>'Plus d\'options disponibles'}

                                    />
                                            </Grid>
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} lg={6} md={6} sm={6} style={{marginTop: 10}}>

                                        <TextField
                                            id="standard-name"
                                            style={{width: '100%'}}
                                            value={user.emergency_phone || ''}
                                            type={'number'}
                                            onChange={this.onChange}
                                            margin="normal"
                                            name={'emergency_phone'}
                                            placeholder={'Numéro d\'urgence'}
                                            variant={"outlined"}
                                            label={'Numéro d\'urgence'}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container style={{marginBottom:20}}>
                                    <Grid item xs={6} style={{display:"flex",justifyContent:"flex-end"}}>
                                    <Button  size={'medium'} type={'button'} onClick={this.onSubmit} variant="contained" color="secondary"
                                             style={{color: 'white',maxHeight:40}}>
                                        Enregistrer
                                    </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>

                    </Grid>

                </Layout>
                {/* <Footer/>*/}


            </Fragment>
        );
    };
}

export default withStyles(styles)(editProfile);
