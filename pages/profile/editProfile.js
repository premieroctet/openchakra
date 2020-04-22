import React, {Fragment} from 'react';
import Link from 'next/link';
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
registerLocale('fr', fr);
moment.locale('fr');

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },
    birthday2:{
        height:'55px',
        fontSize:'0.8rem',
        border: '1px solid lightgrey',
        paddingLeft:5,
        width:'80%',
        borderRadius:'2px'
    },
    hidesm: {
        minWidth: '271px',
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    },
   hidelg: {
        [theme.breakpoints.up('md')]: {
            display:'none',
        }
    },
    trigger:{
    [theme.breakpoints.down('sm')]: {
    marginTop: -10,
    width: '100%',
    marginLeft:'0px',
    height:'30px',
    backgroundColor:'#2FBCD3',
    display:'block',
    transition: 'display 0.7s',
    borderRadius:'5px',
    '&:focus': {
    display:'none',
    transition: 'display 0.7s',
       }
     },
},
    responsiveContainer: {
        [theme.breakpoints.down('sm')]: {
            width: '148%!important',
        }
    },
    toggle: {
        [theme.breakpoints.down('sm')]: {  marginLeft:'-75px',
        transition: 'margin-left 0.7s',

        '&:hover': {
            marginLeft:'0px',
            transition: 'margin-left 0.7s',
            boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',
             }
      }
    },
});

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
        state[e.target.name] = e.target.value;
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


    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {birthday} = this.state;

        return (
            <Fragment>
		<Helmet>
        <title>Profil - Modifier mon profil - My Alfred </title>
        <meta property="description" content="Plateforme d’échange de services entre particuliers. Services rémunérés à des prix justes ! Profitez des talents de nos Alfred et trouvez un Alfred bricoleur, petsitter, pâtissier, décorateur, près de chez vous dans toute la france ! Des milliers de services proposés, trouvez le vôtre !" />
      </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer} style={{overflowX:"hidden"}}>
                    <Grid className={classes.toggle}  item xs={3} style={{}}>
                         <div className={classes.trigger}/>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/user-2.svg'} alt={'user'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Modifier le profil
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/user-2.svg'} alt={'user'} width={27} height={70} style={{marginRight: 4}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'2',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes adresses de <br/>
                                                prestations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} height={70} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Photo
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/success.svg'} alt={'check'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/success.svg'} alt={'check'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Confiance et vérification
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Commentaires
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} style={{paddingLeft: 20}}>
                            <h1 style={{color: 'dimgray',fontWeight: '100'}}>Modifier votre profil</h1>
                            <form>

                            <Grid container className={classes.responsiveContainer}>
                                <Grid container>
                                <Grid item xs={10} lg={6} md={6} sm={6} style={{marginTop: 20}}>
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
                                <Grid item xs={10} lg={6} md={6} sm={6} style={{marginTop: 20}}>
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
                                <Grid item xs={10} lg={6} md={6} sm={6} style={{marginTop: 20}}>
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
                                <Grid item lg={2} xs={10} sm={5} md={3} >
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
                                <Grid item lg={3} xs={10} sm={6} md={3}  style={{marginTop:15}}>
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
                                <Grid item xs={10} lg={6} md={6} sm={6} style={{marginTop: 10}}>
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
                                <Grid item xs={10} lg={6} md={6} sm={6} style={{marginTop: 10}}>
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
                                    <Grid item xs={10} lg={6} md={6} sm={6} style={{marginTop: 10}}>

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
                                    <Grid item xs={10} lg={6} md={6} sm={6} style={{marginTop: 10}}>
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
                                    <Grid item xs={10} lg={6} md={6} sm={6} style={{marginTop: 10}}>
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
                                            <Grid item xs={10} lg={6} md={6} sm={6}>
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
                                    <Grid item xs={10} lg={6} md={6} sm={6} style={{marginTop: 10}}>

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
