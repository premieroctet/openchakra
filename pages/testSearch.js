import React, { Fragment } from 'react';
import Layout from '../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import axios from "axios";
import Router from "next/dist/client/router";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Link from 'next/link';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const geolib = require('geolib');

const { config } = require('../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 80
    }
});

function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

class testSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            address: {},
            otherAddress: [],
            addressSelected: '',
            click: false,
            categories: [],
            serviceUser: [],
            lat: null,
            lng: null,


        }
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});
                this.setState({address: user.billing_address});
                this.setState({otherAddress: user.service_address});

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

    search() {
        const address = this.state.addressSelected;
        if(address.gps !== undefined){
            this.setState({lat:address.gps.lat, lng: address.gps.lng});
            //const result = geolib.getDistance({latitude: 49.4459653, longitude:1.0683586},{latitude:address.gps.lat,longitude:address.gps.lng});
            //console.log(Math.round( ( geolib.convertDistance(result,'km') + Number.EPSILON ) * 100 ) / 100);
        } else {
            this.setState({lat:address.lat,lng: address.lng});
            //const result = geolib.getDistance({latitude: 49.4459653, longitude:1.0683586},{latitude:address.lat,longitude:address.lng});
            //console.log(Math.round( ( geolib.convertDistance(result,'km') + Number.EPSILON ) * 100 ) / 100);
        }

        this.setState({click: true});
        axios.get(url+'myAlfred/api/category/all')
            .then(res => {
                let categories = res.data;
                this.setState({categories:categories})
            })
            .catch(err => console.log(err));
        axios.get(url+'myAlfred/api/serviceUser/all')
            .then(res => {
                let serviceUser = res.data;
                this.setState({serviceUser:serviceUser})
            })
            .catch(err => console.log(err));
    }


    render() {
        const {classes} = this.props;
        const {address} = this.state;
        const {user} = this.state;
        const {otherAddress} = this.state;
        const {click} = this.state;
        const categories = shuffleArray(this.state.categories);
        const serviceUser = shuffleArray(this.state.serviceUser);
        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    id="input-with-icon-textfield"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder={'Quel service ?'}
                                    variant={"outlined"}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    style={{width:'100%'}}
                                    value={this.state.addressSelected}
                                    name={'addressSelected'}
                                    onChange={this.onChange}
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem value={address}>
                                        Adresse principale, <em> {' '+address.address} {address.zip_code},{address.city}</em>
                                    </MenuItem>
                                    {otherAddress.map(e => (
                                        <MenuItem key={e._id} value={e}>
                                            {e.label+', '} <em> {' '+e.address},{e.zip_code} {e.city}</em>

                                        </MenuItem>
                                    ))}
                                    <MenuItem value={'all'}>
                                        Partout, Rechercher des Alfred partout
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href={'/profile/myAddresses'}><a style={{textDecoration:"none"}}>
                                        <p style={{ color: '#2FBCD3',cursor:'pointer' }}>
                                            Ajouter une adresse
                                        </p>
                                        </a></Link>
                                    </MenuItem>
                                </TextField>
                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <Button onClick={()=>this.search()} variant="contained" color="primary" style={{ width: '100%', color: 'white' }}>
                                    Rechercher
                                </Button>
                            </Grid>
                        </Grid>
                        {click ?
                            <>
                            <Grid container>
                                <h3>Que recherchez-vous {user.firstname} ?</h3>
                            </Grid>
                                <Grid container>
                                    {categories.map((e,index) => (
                                        <Grid key={index} item xs={3}>
                                        <Card  className={classes.card}>
                                            <CardActionArea>
                                                <CardMedia
                                                    style={{height:150}}
                                                    image={'../'+e.picture}
                                                    title={e.label}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {e.label}
                                                    </Typography>

                                                </CardContent>
                                            </CardActionArea>

                                        </Card>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Grid container>
                                    <h3>Nos meilleurs Alfred ...</h3>
                                    {categories.map(e => (
                                        <Grid container>
                                            <Grid item xs={12}>
                                            <h4>{e.label}</h4>
                                            </Grid>
                                            {serviceUser.map(a => {
                                                if(a.service.category === e._id){
                                                    return (
                                                        <Grid item xs={3}>
                                                        <Card>
                                                        <p>{a.service.label} par {a.user.firstname}</p>

                                                            <p>{a.user.billing_address.city}
                                                                ({Math.round(( geolib.convertDistance(
                                                                    geolib.getDistance({latitude: a.user.billing_address.gps.lat, longitude:a.user.billing_address.gps.lng},
                                                                        {latitude:this.state.lat,longitude:this.state.lng})
                                                                    ,'km') + Number.EPSILON ) * 100 ) / 100} kms)

                                                            </p>
                                                        </Card>
                                                        </Grid>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            })}
                                        </Grid>
                                    ))}
                                </Grid>
                            </>




                            : null}

                    </Grid>
                </Layout>
            </Fragment>

        )
    }
}


export default withStyles(styles)(testSearch);
