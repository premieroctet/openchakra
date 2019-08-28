import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
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
import AlgoliaPlaces from 'algolia-places-react';



moment.locale('fr');

const { config } = require('../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },


});

class myAddresses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            address: '',
            city: '',
            country: '',
            zip_code: '',
            currentAddress: '',
            currentCity: '',
            currentZip_code: '',
            currentCountry: '',
            label_address: '',
            new_address: '',
            new_city: '',
            new_zip_code: '',
            floor: '',
            note: '',
            phone: '',
            lat: '',
            lng: '',
            service_address: [],
            clickAdd: false,
            clickEdit: false,
            address_selected: {},
            edit_label: '',
            edit_address: '',
            edit_city: '',
            edit_zip_code: '',
            edit_floor: '',
            edit_note: '',
            edit_phone: '',
            edit_lat: '',
            edit_lng: '',





        };
        this.onChangeAlgolia=this.onChangeAlgolia.bind(this);
        this.onChangeAlgolia2=this.onChangeAlgolia2.bind(this);


    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});


                if(typeof user.billing_address != 'undefined') {
                    this.setState({address: true, currentAddress: user.billing_address.address,currentCity: user.billing_address.city,
                        currentZip_code: user.billing_address.zip_code,currentCountry: user.billing_address.country})
                } else {
                    this.setState({address:false})
                }
                this.setState({service_address: user.service_address});

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
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeAlgolia({query, rawAnswer, suggestion, suggestionIndex}) {
        this.setState({new_city: suggestion.city, new_address: suggestion.name, new_zip_code: suggestion.postcode,
            lat: suggestion.latlng.lat, lng: suggestion.latlng.lng});


    }
    onChangeAlgolia2({query, rawAnswer, suggestion, suggestionIndex}) {
        this.setState({edit_city: suggestion.city, edit_address: suggestion.name, edit_zip_code: suggestion.postcode,
            edit_lat: suggestion.latlng.lat, edit_lng: suggestion.latlng.lng});


    }

    handleClick = (id) => {
      this.setState({clickAdd: false, clickEdit: true});
      axios.get(url+'myAlfred/api/users/profile/address/'+id)
          .then(res => {
              let result = res.data;
              this.setState({address_selected: result,edit_label: result.label,edit_address:result.address,edit_zip_code:result.zip_code,
              edit_city:result.city, edit_floor:result.floor, edit_note: result.note,edit_phone: result.phone_address,edit_lat: result.lat,edit_lng: result.lng});
          })
          .catch(err => console.log(err));
    };

    onSubmit = e => {
      e.preventDefault();
      const address = {
          address: this.state.currentAddress.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
          city: this.state.currentCity,
          zip_code: this.state.currentZip_code,
          country: this.state.currentCountry
      };
        axios
            .put(url+'myAlfred/api/users/profile/billingAddress', address)
            .then(res => {
                alert('Adresse principale modifiée');
                Router.push({pathname:'/myAddresses'})
            })
            .catch(err =>
                console.log(err)
            );
    };

    onSubmit2 = e => {
        e.preventDefault();
        const newAddress = {
            address: this.state.new_address,
            city: this.state.new_city,
            zip_code: this.state.new_zip_code,
            lat: this.state.lat,
            lng: this.state.lng,
            label: this.state.label_address,
            floor: this.state.floor,
            note: this.state.note,
            phone: this.state.phone,
        };
        axios.put(url+'myAlfred/api/users/profile/serviceAddress',newAddress)
            .then(() => {
                alert('Adresse ajoutée');
                this.setState({clickAdd: false});
                this.componentDidMount();
            })
            .catch(err => console.log(err))

    };

    onSubmit3 = (e,id) => {
      e.preventDefault();
      const editAddress = {
            address: this.state.edit_address,
            city: this.state.edit_city,
            zip_code: this.state.edit_zip_code,
            lat: this.state.edit_lat,
            lng: this.state.edit_lng,
            label: this.state.edit_label,
            floor: this.state.edit_floor,
            note: this.state.edit_note,
            phone: this.state.edit_phone,
      };

      axios.put(url+'myAlfred/api/users/profile/address/'+id,editAddress)
          .then(()=> {
              alert('Adresse modifiée avec succès');
              this.setState({clickEdit: false});
              this.componentDidMount();

          })
          .catch(err => console.log(err));
    };

    deleteAddress = (id) => {
        axios.delete(url+'myAlfred/api/users/profile/address/'+id)
            .then(() => {
                alert('Adresse supprimée');
                this.setState({clickEdit: false});
                this.componentDidMount();
            })
            .catch(err => console.log(err));
    };







    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {currentAddress} = this.state;
        const {clickAdd} = this.state;
        const {clickEdit} = this.state;
        const {service_address} = this.state;
        const {address_selected} = this.state;

        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                        <Grid item xs={3} style={{borderRight: '1px solid darkgray'}}>

                            <Grid container style={{justifyContent: 'center'}}>

                                <Grid item style={{marginTop: 30,width: 270.25}}>
                                    <Link href={'/profile'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/user.svg'} alt={'user'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Modifier le profil
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}}>
                                    <Link href={'/myAddresses'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/sign-2.svg'} alt={'sign'} width={27} style={{marginRight: 4}}/>
                                        <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                             Mes adresses de prestations
                                        </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/editPicture'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Photo
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/trustAndVerification'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/success.svg'} alt={'check'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Confiance et vérification
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/reviews'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Commentaires
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/recommandations'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/megaphone.svg'} alt={'speaker'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Recommandations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                            </Grid>
                        </Grid>


                        <Grid item xs={9} style={{paddingLeft: 55}}>
                            <Grid container>
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Mes adresses de prestations</h1>
                                <Grid container>
                                    <Grid item>
                                        <h2 style={{fontWeight: '100'}}>Mon adresse principale</h2>
                                        <form onSubmit={this.onSubmit}>
                                            <Grid container>
                                            <Grid item xs={10}>
                                                <TextField
                                                    id="outlined-name"
                                                    style={{width: '100%'}}
                                                    value={this.state.currentAddress}
                                                    name={'currentAddress'}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    id="outlined-name"
                                                    className={classes.textField}
                                                    value={this.state.currentZip_code}
                                                    name={'currentZip_code'}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="outlined-name"
                                                        style={{width: '100%'}}
                                                        value={this.state.currentCity}
                                                        name={'currentCity'}
                                                        onChange={this.onChange}
                                                        margin="normal"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            <Grid item xs={7}>
                                                <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    style={{width: '100%'}}
                                                    value={this.state.currentCountry}
                                                    onChange={this.onChange}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            className: classes.menu,
                                                        },
                                                    }}
                                                    margin="normal"
                                                    variant="outlined"
                                                    name={'currentCountry'}
                                                >
                                                    <MenuItem value="">
                                                        <em>...</em>
                                                    </MenuItem>
                                                    <MenuItem value={"France"}>France</MenuItem>
                                                    <MenuItem value={"Maroc"}>Maroc</MenuItem>
                                                </TextField>
                                            </Grid>

                                            </Grid>
                                            <Button size={'large'} type={'submit'} variant="contained" color="primary"
                                                    style={{color: 'white',marginTop: 15}}>
                                                Modifier
                                            </Button>
                                        </form>
                                    </Grid>
                                </Grid>
                                <Grid container style={{marginTop: 20}}>
                                    {service_address.map((e,index) =>(
                                       <React.Fragment> <Grid item xs={10} key={index} style={{marginLeft: -55}}>
                                            <hr style={{borderColor: '#fefefe',width:'125%'}}/>
                                            <h4 style={{paddingLeft: 40}}>{e.label}</h4>
                                            <p style={{paddingLeft: 40,marginBottom: 0}}>{e.address}</p>
                                            <p style={{paddingLeft: 40,marginTop:0,marginBottom:0}}>{e.zip_code} {e.city}</p>
                                            <p style={{paddingLeft: 40,marginTop:0}}>France</p>
                                            <hr style={{borderColor: '#fefefe',width:'125%'}}/>
                                        </Grid>
                                           <Grid item xs={2}>
                                               <p style={{marginTop:20,color:'#F8727F',cursor:'pointer'}} onClick={()=>this.handleClick(e._id)}>Modifier</p>
                                           </Grid>
                                       </React.Fragment>
                                    ))}
                                </Grid>
                                <Grid container style={{marginTop: 20}}>
                                    <h2 style={{fontWeight: '100',color: '#2FBCD3',cursor:'pointer'}} onClick={()=>this.setState({clickAdd:true,clickEdit:false})}>Ajouter une adresse</h2>
                                </Grid>
                                {clickAdd ?
                                    <form onSubmit={this.onSubmit2}>
                                        <Grid container style={{width: '52%'}}>
                                            <Grid item xs={12}>

                                                <InputLabel style={{color: 'black'}}>Nom de l'adresse</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{marginLeft: -126, marginTop: 30,width: '100%'}}
                                                    value={this.state.label_address}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'label_address'}
                                                    placeholder={'Ecrire ici'}
                                                />

                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: 20}}>
                                                <AlgoliaPlaces
                                                    placeholder='Recherchez votre adresse'

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

                                            <Grid item xs={12} style={{marginTop: 20}}>

                                                <InputLabel style={{color: 'black'}}>Adresse</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{ marginTop: 15,width: '100%'}}
                                                    value={this.state.new_address}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'new_address'}
                                                    placeholder={'Ecrire ici'}
                                                />

                                            </Grid>

                                            <Grid item xs={12} style={{marginTop: 20}}>

                                                <InputLabel style={{color: 'black'}}>Code postal</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{ marginTop: 15,width: '100%'}}
                                                    value={this.state.new_zip_code}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'new_zip_code'}
                                                    placeholder={'Ecrire ici'}
                                                />

                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: 20}}>

                                                <InputLabel style={{color: 'black'}}>Ville</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{ marginTop: 15,width: '100%'}}
                                                    value={this.state.new_city}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'new_city'}
                                                    placeholder={'Ecrire ici'}
                                                />
                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: 20}}>

                                                <InputLabel style={{color: 'black'}}>Etage</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{ marginTop: 15,width: '100%'}}
                                                    value={this.state.floor}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'floor'}
                                                    placeholder={'Ecrire ici'}
                                                />

                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: 20}}>

                                                <InputLabel style={{color: 'black'}}>Note (optionnel)</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{ marginTop: 15,width: '100%'}}
                                                    value={this.state.note}
                                                    multiline
                                                    rows={3}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'note'}
                                                    placeholder={'Ecrire ici'}
                                                />

                                            </Grid>

                                        </Grid>
                                        <p style={{color: '#F8727F',marginTop:25}}>OPTION DE CONTACT</p>
                                        <Grid item>
                                            <p style={{marginBottom: 0}}>Nous avons besoin d’un numéro de téléphone dans le cas où votre Alfred</p>
                                            <p style={{marginTop:0,marginBottom:0}}>aurait besoin de vous contacter
                                                ou de contacter la personne de confiance</p><p style={{marginTop:0}}> associée à cette adresse</p>
                                        </Grid>
                                        <Grid item xs={12} style={{marginTop: 20,maxWidth:'52%'}}>

                                            <InputLabel style={{color: 'black'}}>Téléphone</InputLabel>
                                            <TextField
                                                id="standard-name"
                                                style={{ marginTop: 15,width: '100%'}}
                                                value={this.state.phone}
                                                onChange={this.onChange}
                                                margin="normal"
                                                name={'phone'}
                                                placeholder={'Ecrire ici'}
                                            />

                                        </Grid>
                                        <Button size={'large'} type={'submit'} variant="contained" color="secondary"
                                                style={{color: 'white',marginTop: 15}}>
                                            Enregistrer
                                        </Button>
                                    </form>


                                    : null}



                                {clickEdit ?
                                    <form onSubmit={(event)=>this.onSubmit3(event,address_selected._id)}>
                                        <Grid container style={{width: '52%'}}>
                                            <Grid item xs={12}>

                                                <InputLabel style={{color: 'black'}}>Nom de l'adresse</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{marginLeft: -126, marginTop: 30,width: '100%'}}
                                                    value={this.state.edit_label}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'edit_label'}
                                                    placeholder={'Ecrire ici'}
                                                />

                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: 20}}>
                                                <AlgoliaPlaces
                                                    placeholder='Recherchez votre adresse'

                                                    options={{
                                                        appId: 'plKATRG826CP',
                                                        apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                                                        language: 'fr',
                                                        countries: ['fr'],
                                                        type: 'address',

                                                    }}

                                                    onChange={(suggestion) =>this.onChangeAlgolia2(suggestion)}
                                                />
                                            </Grid>

                                            <Grid item xs={12} style={{marginTop: 20}}>

                                                <InputLabel style={{color: 'black'}}>Adresse</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{ marginTop: 15,width: '100%'}}
                                                    value={this.state.edit_address}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'edit_address'}
                                                    placeholder={'Ecrire ici'}
                                                />

                                            </Grid>

                                            <Grid item xs={12} style={{marginTop: 20}}>

                                                <InputLabel style={{color: 'black'}}>Code postal</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{ marginTop: 15,width: '100%'}}
                                                    value={this.state.edit_zip_code}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'edit_zip_code'}
                                                    placeholder={'Ecrire ici'}
                                                />

                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: 20}}>

                                                <InputLabel style={{color: 'black'}}>Ville</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{ marginTop: 15,width: '100%'}}
                                                    value={this.state.edit_city}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'edit_city'}
                                                    placeholder={'Ecrire ici'}
                                                />
                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: 20}}>

                                                <InputLabel style={{color: 'black'}}>Etage</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{ marginTop: 15,width: '100%'}}
                                                    value={this.state.edit_floor}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'edit_floor'}
                                                    placeholder={'Ecrire ici'}
                                                />

                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: 20}}>

                                                <InputLabel style={{color: 'black'}}>Note (optionnel)</InputLabel>
                                                <TextField
                                                    id="standard-name"
                                                    style={{ marginTop: 15,width: '100%'}}
                                                    value={this.state.edit_note}
                                                    multiline
                                                    rows={3}
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    name={'edit_note'}
                                                    placeholder={'Ecrire ici'}
                                                />

                                            </Grid>

                                        </Grid>
                                        <p style={{color: '#F8727F',marginTop:25}}>OPTION DE CONTACT</p>
                                        <Grid item>
                                            <p style={{marginBottom: 0}}>Nous avons besoin d’un numéro de téléphone dans le cas où votre Alfred</p>
                                            <p style={{marginTop:0,marginBottom:0}}>aurait besoin de vous contacter
                                                ou de contacter la personne de confiance</p><p style={{marginTop:0}}> associée à cette adresse</p>
                                        </Grid>
                                        <Grid item xs={12} style={{marginTop: 20,maxWidth:'52%'}}>

                                            <InputLabel style={{color: 'black'}}>Téléphone</InputLabel>
                                            <TextField
                                                id="standard-name"
                                                style={{ marginTop: 15,width: '100%'}}
                                                value={this.state.edit_phone}
                                                onChange={this.onChange}
                                                margin="normal"
                                                name={'edit_phone'}
                                                placeholder={'Ecrire ici'}
                                            />

                                        </Grid>
                                        <Button size={'large'} type={'submit'} variant="contained" color="secondary"
                                                style={{color: 'white',marginTop: 15}}>
                                            Enregistrer
                                        </Button>
                                        <Button size={'large'} onClick={()=>this.deleteAddress(address_selected._id)} type={'button'} variant="contained" color="secondary"
                                                style={{color: 'white',marginTop: 15,marginLeft: 15}}>
                                            Supprimer
                                        </Button>
                                    </form>


                                    : null}


                            </Grid>
                        </Grid>

                    </Grid>
                </Layout>

            </Fragment>
        );
    };
}



export default withStyles(styles)(myAddresses);
