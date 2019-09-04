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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {FormLabel} from "@material-ui/core";
import Select2 from 'react-select';
import DatePicker, {registerLocale,setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from 'date-fns/locale/fr';
import Birthday from '@material-ui/icons/CakeOutlined'
import Footer from '../../hoc/Layout/Footer/Footer';
import { toast } from 'react-toastify';
registerLocale('fr', fr);





moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const ExampleCustomInput = ({ value,onClick }) => (
    <Button variant={"outlined"} className="example-custom-input" onClick={onClick}>
        {value}
    </Button>
);

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },
    hidesm: {
        minWidth: '271px',
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    }

   ,hidelg: {
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
     }

}

    ,toggle: {
        [theme.breakpoints.down('sm')]: {  marginLeft:'-75px',
        transition: 'margin-left 0.7s',
       
        '&:hover': {
            marginLeft:'0px',
            transition: 'margin-left 0.7s',
            boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',

             }
      }  
    }



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

class editProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            languages: [],
            selectedLanguages: null,
            birthday: null,






        };
        this.handleChangeLanguages = this.handleChangeLanguages.bind(this);



    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});
                this.setState({birthday:user.birthday});
                this.setState({selectedLanguages :user.languages.map(b => ({
                        label: b,
                        value: b
                    })) });



            })
            .catch(err => {
                    console.log(err);
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
        const {email, name, firstname,birthday,description,gender,phone,job,diplomes,school,emergency_phone} = this.state.user;

        axios.put(url+'myAlfred/api/users/profile/editProfile',{email,name,firstname,birthday,description,gender,phone,job,diplomes,school,
        emergency_phone,languages})
            .then(res => {
                toast.info('Profil modifié avec succès');
                this.componentDidMount();

            })
            .catch(err => console.log(err))
    };











    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {birthday} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                    <Grid className={classes.toggle}  item xs={3} style={{}}>
                         
                         <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/user-2.svg'} alt={'user'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Modifier le profil
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/user-2.svg'} alt={'user'} width={27} style={{marginRight: 4}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}} className={classes.hidesm}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes adresses de prestations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Photo
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/success.svg'} alt={'check'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/success.svg'} alt={'check'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Confiance et vérification
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Commentaires
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/recommandations'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/megaphone.svg'} alt={'speaker'} width={33} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/recommandations'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/megaphone.svg'} alt={'speaker'} width={33} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Recommandations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                            </Grid>
                        </Grid>




                        <Grid item xs={9} style={{paddingLeft: 55}}>
                            <h1 style={{color: 'dimgray',fontWeight: '100'}}>Modifier le profil</h1>
                            <form>

                            <Grid container style={{maxWidth: '60%'}}>
                                <Grid item xs={12} style={{marginTop: 20}}>

                                    <TextField
                                        id="standard-name"
                                        style={{ marginTop: 15,width: '100%'}}
                                        value={user.firstname}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'firstname'}
                                        placeholder={'Prénom'}

                                    />

                                </Grid>
                                <Grid item xs={12}>

                                    <TextField
                                        id="standard-name"
                                        style={{ marginTop: 15,width: '100%'}}
                                        value={user.name}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'name'}
                                        placeholder={'Nom'}

                                    />

                                </Grid>

                                <Grid item xs={12} style={{marginTop: 20}}>

                                    <InputLabel style={{color: 'black'}}>A propos de moi</InputLabel>
                                    <TextField
                                        id="standard-name"
                                        style={{ marginTop: 15,width: '100%'}}
                                        value={user.description}
                                        multiline
                                        rows={5}
                                        variant={'outlined'}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'description'}

                                    />

                                </Grid>
                            </Grid>
                            <Grid container style={{maxWidth: '60%'}}>
                                <h2 style={{fontWeight: '100'}}>Informations personnelles</h2>
                                <Grid item xs={12} style={{marginTop: 10}}>

                                    <TextField
                                        id="standard-name"
                                        style={{width: '100%'}}
                                        value={user.gender}
                                        select
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'gender'}
                                        placeholder={'Sexe'}
                                        helperText={'Sexe'}

                                    >

                                        <MenuItem  value={'Homme'}>
                                            Homme
                                        </MenuItem>
                                        <MenuItem  value={'Femme'}>
                                            Femme
                                        </MenuItem>
                                    </TextField>

                                </Grid>
                                <Grid item xs={12} style={{marginTop: 10,display:"flex",alignItems:"center"}}>
                                    {/*<TextField
                                        id="date"
                                        type="date"
                                        name="birthday"
                                        style={{width: '100%'}}
                                        className={classes.textField}
                                        value={moment(user.birthday).format('YYYY-MM-DD')}
                                        onChange={this.onChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />*/}
                                    <Birthday style={{marginRight:20}}/>
                                    <DatePicker
                                        selected={Date.parse(birthday)}
                                        onChange={(date)=>this.onChangeBirthday(date)}
                                        customInput={<ExampleCustomInput />}
                                        locale='fr'
                                        placeholderText="Sélectionnez votre date de naissance"
                                        showYearDropdown
                                        showMonthDropdown
                                        dateFormat="dd/MM/yyyy"
                                        style={{padding:10,fontSize: '0.9rem'}}
                                    />

                                </Grid>
                                <Grid item xs={12} style={{marginTop: 10}}>
                                    <TextField
                                        id="standard-name"
                                        style={{width: '100%'}}
                                        value={user.email}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'email'}
                                        placeholder={'Email'}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{marginTop: 10}}>
                                    <TextField
                                        id="standard-name"
                                        style={{width: '100%'}}
                                        value={user.phone}
                                        onChange={this.onChange}
                                        margin="normal"
                                        name={'phone'}
                                        placeholder={'Téléphone'}
                                    />
                                </Grid>
                            </Grid>
                                <Grid container style={{maxWidth: '60%'}}>
                                    <h2 style={{fontWeight: '100'}}>Informations facultatives</h2>
                                    <Grid item xs={12} style={{marginTop: 10}}>

                                        <TextField
                                            id="standard-name"
                                            style={{width: '100%'}}
                                            value={user.diplomes}
                                            onChange={this.onChange}
                                            margin="normal"
                                            name={'diplomes'}
                                            placeholder={'Diplomes'}

                                        />

                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: 10}}>
                                        <TextField
                                            id="standard-name"
                                            style={{width: '100%'}}
                                            value={user.school}
                                            onChange={this.onChange}
                                            margin="normal"
                                            name={'school'}
                                            placeholder={'Ecoles'}

                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: 10}}>
                                        <TextField
                                            id="standard-name"
                                            style={{width: '100%'}}
                                            value={user.job}
                                            onChange={this.onChange}
                                            margin="normal"
                                            name={'job'}
                                            placeholder={'Emploi'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: 10}}>
                                        <Grid container>
                                            <Grid item xs={2} style={{lineHeight:'1px'}}>
                                                <p>Langues</p>
                                            </Grid>
                                            <Grid item xs={10}>
                                    <Select2
                                        value={this.state.selectedLanguages}
                                        onChange={this.handleChangeLanguages}
                                        options={options}
                                        isMulti
                                        isSearchable
                                        closeMenuOnSelect={false}

                                    />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: 10}}>

                                        <TextField
                                            id="standard-name"
                                            style={{width: '100%'}}
                                            value={user.emergency_phone}
                                            onChange={this.onChange}
                                            margin="normal"
                                            name={'emergency_phone'}
                                            placeholder={'Numéro d\'urgence'}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>

                    </Grid>
                    <div style={{backgroundColor: 'lightgray',display:'flex',justifyContent:'flex-end',width:'100%',bottom:0,
                    alignItems:"center",height:60}}>
                        <Button size={'medium'} type={'button'} onClick={this.onSubmit} variant="contained" color="secondary"
                                style={{color: 'white',maxHeight:40,marginRight:20}}>
                            Enregistrer
                        </Button>
                    </div>
                </Layout>
                <Footer/>

            </Fragment>
        );
    };
}



export default withStyles(styles)(editProfile);
