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
const _ = require('lodash');

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
            addressSelected: {},
            click: false,
            click2: false,
            categories: [],
            serviceUser: [],
            lat: null,
            lng: null,
            research: '',
            prestations: [],
            uniqCategory: [],
            uniqService: [],
            errorsPrestations: false,


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
                this.setState({addressSelected: user.billing_address});
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
            axios.get(url+'myAlfred/api/serviceUser/near')
                .then(res => {
                    let serviceUser = res.data;
                    const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                        ['desc','desc','desc','desc','desc']);
                    this.setState({serviceUser:sorted});
                    axios.get(url+'myAlfred/api/category/all/sort')
                        .then(res => {
                            let categories = res.data;
                            this.setState({categories:categories});
                            categories.forEach(e => {
                                this.setState({[e.label]:0});
                                this.state.serviceUser.forEach(a => {
                                    if(a.service.category === e._id){
                                        this.setState(prevState => {
                                            return {[e.label]: prevState[e.label] + 1}
                                        })
                                    }
                                })
                            })
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        } else if(address==='all') {
            this.setState({lat:this.state.address.gps.lat, lng: this.state.address.gps.lng});
            axios.get(url+'myAlfred/api/serviceUser/all')
                .then(res => {
                    let serviceUser = res.data;
                    const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                        ['desc','desc','desc','desc','desc']);
                    this.setState({serviceUser:sorted});
                    axios.get(url+'myAlfred/api/category/all/sort')
                        .then(res => {
                            let categories = res.data;
                            this.setState({categories:categories});
                            categories.forEach(e => {
                                this.setState({[e.label]:0});
                                this.state.serviceUser.forEach(a => {
                                    if(a.service.category === e._id){
                                        this.setState(prevState => {
                                            return {[e.label]: prevState[e.label] + 1}
                                        })
                                    }
                                })
                            })
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        } else {
            this.setState({lat:address.lat,lng: address.lng});
            const id = address._id;
            axios.get(url+'myAlfred/api/serviceUser/nearOther/'+id)
                .then(res => {
                    let serviceUser = res.data;
                    const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                        ['desc','desc','desc','desc','desc']);
                    this.setState({serviceUser:sorted});
                    axios.get(url+'myAlfred/api/category/all/sort')
                        .then(res => {
                            let categories = res.data;
                            this.setState({categories:categories});
                            categories.forEach(e => {
                                this.setState({[e.label]:0});
                                this.state.serviceUser.forEach(a => {
                                    if(a.service.category === e._id){
                                        this.setState(prevState => {
                                            return {[e.label]: prevState[e.label] + 1}
                                        })
                                    }
                                })
                            })
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }

        this.setState({click: true, click2:false});


    }

    searchWithWord(){
        if(this.state.errorsPrestations){
            this.setState({errorsPrestations:false});
        }
        const obj = {label:this.state.research};
        axios.post(url+'myAlfred/api/prestation/all/search',obj)
            .then(res => {

                let prestations = res.data;
                this.setState({prestations:prestations});
                const arrayCategory = [];
                const arrayService = [];
                prestations.forEach(e => {
                    arrayCategory.push(e.category);
                    arrayService.push(e.service);
                });
                const uniqCategory = _.uniqBy(arrayCategory,'label');
                const uniqService = _.uniqBy(arrayService,'label');
                this.setState({uniqCategory:uniqCategory,uniqService:uniqService});

                const address = this.state.addressSelected;
                if(address.gps !== undefined) {
                    this.setState({lat: address.gps.lat, lng: address.gps.lng});
                    axios.get(url + 'myAlfred/api/serviceUser/near')
                        .then(res => {
                            let serviceUser = res.data;
                            const sorted = _.orderBy(serviceUser, ['level', 'number_of_views', 'graduated', 'is_certified', 'user.creation_date'],
                                ['desc', 'desc', 'desc', 'desc', 'desc']);
                            this.setState({serviceUser: sorted});

                        })
                        .catch(err => console.log(err));
                } else if(address==='all') {
                    this.setState({lat:this.state.address.gps.lat, lng: this.state.address.gps.lng});
                    axios.get(url+'myAlfred/api/serviceUser/all')
                        .then(res => {
                            let serviceUser = res.data;
                            const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                                ['desc','desc','desc','desc','desc']);
                            this.setState({serviceUser:sorted});

                        })
                        .catch(err => console.log(err));
                } else {
                    this.setState({lat:address.lat,lng: address.lng});
                    const id = address._id;
                    axios.get(url+'myAlfred/api/serviceUser/nearOther/'+id)
                        .then(res => {
                            let serviceUser = res.data;
                            const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                                ['desc','desc','desc','desc','desc']);
                            this.setState({serviceUser:sorted});

                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => {
                this.setState({uniqCategory:[]});
                if(err.response.status === 400){
                    this.setState({errorsPrestations: true});
                    const obj2 = {
                      label: this.state.research
                    };
                    axios.post(url+'myAlfred/api/service/all/search',obj2)
                        .then(response => {
                            let service = response.data;
                            const arrayCategory = [];

                            service.forEach(e => {
                                arrayCategory.push(e.category);
                            });
                            const uniqCategory = _.uniqBy(arrayCategory,'label');
                            this.setState({uniqCategory:uniqCategory});
                            const address = this.state.addressSelected;
                            if(address.gps !== undefined) {
                                this.setState({lat: address.gps.lat, lng: address.gps.lng});

                                    axios.get(url+'myAlfred/api/serviceUser/near/'+service[0]._id)
                                        .then(result => {
                                            const serviceUser = result.data;
                                            const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                                                ['desc','desc','desc','desc','desc']);
                                            this.setState({serviceUser: sorted});
                                        })
                                        .catch(err => console.log(err));


                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            });
        this.setState({click: false, click2: true});

    }



    render() {
        const {classes} = this.props;
        const {address} = this.state;
        const {user} = this.state;
        const {otherAddress} = this.state;
        const {click} = this.state;
        const categories = this.state.categories;
        const serviceUser = this.state.serviceUser;
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
                                    value={this.state.research}
                                    onChange={(event)=>this.setState({research: event.target.value,click2:false})}
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
                                {this.state.research === '' ?
                                    <Button onClick={() => this.search()} variant="contained" color="primary"
                                            style={{width: '100%', color: 'white'}}>
                                        Rechercher
                                    </Button> :

                                    <Button onClick={()=>this.searchWithWord()} variant="contained" color="primary"
                                            style={{width: '100%', color: 'white'}}>
                                        Rechercher avec un mot
                                    </Button>
                                }
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
                                    {this.state.addressSelected === 'all' ?

                                        categories.map(e => (
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <h4>{e.label}</h4>
                                                </Grid>
                                                {serviceUser.map(a => {
                                                    if (a.service.category === e._id) {
                                                        return (
                                                            <Grid item xs={3}>
                                                                <Card>
                                                                    <p>{a.service.label} par {a.user.firstname}</p>

                                                                    <p>{a.service_address.city}
                                                                    </p>
                                                                </Card>
                                                            </Grid>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })}
                                                {this.state[e.label] !== 0 ? <p>Voir les {this.state[e.label]} Alfred</p> : <p>Aucun Alfred pour cette catégorie pour le moment</p>}

                                            </Grid>
                                        ))


                                        :

                                            categories.map(e => (
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <h4>{e.label}</h4>
                                                    </Grid>
                                                    {serviceUser.map(a => {
                                                        if (a.service.category === e._id) {
                                                            //this.setState({[e.label]:this.state[e.label]+1});
                                                            return (
                                                                <Grid item xs={3}>
                                                                    <Card>
                                                                        <p>{a.service.label} par {a.user.firstname}</p>

                                                                        <p>{a.service_address.city}
                                                                            ({Math.round((geolib.convertDistance(
                                                                                geolib.getDistance({
                                                                                        latitude: a.service_address.gps.lat,
                                                                                        longitude: a.service_address.gps.lng
                                                                                    },
                                                                                    {
                                                                                        latitude: this.state.lat,
                                                                                        longitude: this.state.lng
                                                                                    })
                                                                                , 'km') + Number.EPSILON) * 100) / 100} kms)

                                                                        </p>
                                                                    </Card>
                                                                </Grid>
                                                            )
                                                        } else {
                                                            return null
                                                        }
                                                    })}
                                                    {this.state[e.label] !== 0 ? <p>Voir les {this.state[e.label]} Alfred</p> : <p>Aucun Alfred pour cette catégorie pour le moment</p>}
                                                </Grid>
                                            ))

                                    }
                                </Grid>
                            </>




                            : null}

                        {this.state.click2 && !this.state.errorsPrestations ?
                            <>
                            <p>Résultat pour la recherche : {this.state.research}</p>
                                {this.state.addressSelected === 'all' ?

                                    this.state.uniqCategory.map((e, index) => (
                                        <Grid key={index} container>
                                            <Grid item xs={12}>
                                                <h4>{e.label}</h4>
                                                {this.state.serviceUser.map(s => (
                                                    this.state.prestations.map(p => {
                                                        const index = s.prestations.findIndex(i => i.prestation == p._id);
                                                        if (index !== -1) {
                                                            return (
                                                                <Grid item xs={3}>
                                                                    <Card>
                                                                        <p>{s.service.label} par {s.user.firstname}</p>

                                                                        <p>{s.service_address.city}</p>
                                                                    </Card>
                                                                </Grid>
                                                            )
                                                        } else return null
                                                    })
                                                ))}
                                            </Grid>
                                        </Grid>
                                    ))
                                    :

                                        this.state.uniqCategory.map((e, index) => (
                                            <Grid key={index} container>
                                                <Grid item xs={12}>
                                                    <h4>{e.label}</h4>
                                                    {this.state.serviceUser.map(s => (
                                                        this.state.prestations.map(p => {
                                                            const index = s.prestations.findIndex(i => i.prestation == p._id);
                                                            if (index !== -1) {
                                                                return (
                                                                    <Grid item xs={3}>
                                                                        <Card>
                                                                            <p>{s.service.label} par {s.user.firstname}</p>

                                                                            <p>{s.service_address.city}
                                                                                ({Math.round((geolib.convertDistance(
                                                                                    geolib.getDistance({
                                                                                            latitude: s.service_address.gps.lat,
                                                                                            longitude: s.service_address.gps.lng
                                                                                        },
                                                                                        {
                                                                                            latitude: this.state.lat,
                                                                                            longitude: this.state.lng
                                                                                        })
                                                                                    , 'km') + Number.EPSILON) * 100) / 100} kms)

                                                                            </p>
                                                                        </Card>
                                                                    </Grid>
                                                                )
                                                            } else return null
                                                        })
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        ))

                                }


                            </>

                            : null}
                        {this.state.click2 && this.state.errorsPrestations ?

                                    <>
                                        {this.state.uniqCategory.map((e, index) => (
                                            <Grid key={index} container>
                                                <Grid item xs={12}>
                                                    <h4>{e.label}</h4>
                                                </Grid>
                                                    {this.state.serviceUser.map(s => {
                                                        if (s.service.category === e._id) {
                                                            return (
                                                                <Grid item xs={3}>
                                                                    <Card>
                                                                        <p>{s.service.label} par {s.user.firstname}</p>

                                                                        <p>{s.service_address.city}
                                                                            ({Math.round((geolib.convertDistance(
                                                                                geolib.getDistance({
                                                                                        latitude: s.service_address.gps.lat,
                                                                                        longitude: s.service_address.gps.lng
                                                                                    },
                                                                                    {
                                                                                        latitude: this.state.lat,
                                                                                        longitude: this.state.lng
                                                                                    })
                                                                                , 'km') + Number.EPSILON) * 100) / 100} kms)

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

                                    </>



                                    : null}



                    </Grid>
                </Layout>
            </Fragment>

        )
    }
}


export default withStyles(styles)(testSearch);
