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





moment.locale('fr');

const { config } = require('../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },


});

class editPicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            picture: '',






        };



    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});



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
        this.setState({picture:e.target.files[0]});
    };



    onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('myImage',this.state.picture);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url+"myAlfred/api/users/profile/picture",formData,config)
            .then((response) => {
                alert("Photo modifiée");
                Router.push({pathname:'/profile'})
            }).catch((error) => {
            console.log(error)
        });
    };











    render() {
        const {classes} = this.props;
        const {user} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                        <Grid item xs={3} style={{borderRight: '1px solid darkgray'}}>

                            <Grid container style={{justifyContent: 'center'}}>

                                <Grid item style={{marginTop: 30,width: 270.25}}>
                                    <Link href={'/profile'}>
                                        <div style={{border: '0.5px solid darkgray',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/user.svg'} alt={'user'} width={30} style={{marginRight: 3}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Modifier le profil
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}}>
                                    <Link href={'/myAddresses'}>
                                        <div style={{border: '0.5px solid darkgray',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} width={30} style={{marginRight: 3}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes adresses de prestations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/editPicture'}>
                                        <div style={{border: '0.5px solid darkgray',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/picture.svg'} alt={'picture'} width={30} style={{marginRight: 3}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Photos
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/'}>
                                        <div style={{border: '0.5px solid darkgray',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/success.svg'} alt={'check'} width={30} style={{marginRight: 3}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Confiance et vérification
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/'}>
                                        <div style={{border: '0.5px solid darkgray',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} width={30} style={{marginRight: 3}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Commentaires
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}}>
                                    <Link href={'/'}>
                                        <div style={{border: '0.5px solid darkgray',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/megaphone.svg'} alt={'speaker'} width={30} style={{marginRight: 3}}/>
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
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Photo</h1>
                            </Grid>
                            <Grid container style={{marginTop: 20,alignItems:"center"}}>
                                <Grid item>
                            <img src={`../../${user.picture}`} width={170} style={{borderRadius:'50%'}} alt="picture"/>
                                </Grid>
                                <Grid item style={{marginLeft: 30}}>
                            <form onSubmit={this.onSubmit}>
                                <Grid item>
                                    <label style={{display: 'inline-block', marginTop: 15,color:'#2FBCD3'}} className="forminputs">
                                        <p style={{cursor:"pointer",fontSize:'1.3rem'}}>Télécharger une photo de profil</p>
                                        <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="myImage" type="file"
                                               onChange={this.onChange}
                                         className="form-control"
                                        />
                                    </label>
                                    <span>{this.state.picture.name !== null ? this.state.picture.name : null}</span>

                                </Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%',color: 'white' }}>
                                        Valider
                                    </Button>
                                </Grid>
                            </form>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Layout>

            </Fragment>
        );
    };
}



export default withStyles(styles)(editPicture);
