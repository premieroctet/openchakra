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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from "moment";
import 'react-dates/lib/css/_datepicker.css';

const geolib = require('geolib');
const _ = require('lodash');

const { config } = require('../config/config');
const url = config.apiUrl;
moment.locale('fr');
const styles = theme => ({
    bigContainer: {
        marginTop: 80
    }
});

class searchNotLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            click: false,
            click2: false,
            categories: [],
            serviceUser: [],
            serviceUserCopy: [],
            finalServiceUser: [],
            finalServiceUserCopy: [],
            copyFilterPro: [],
            copyFilterParticulier: [],
            research: '',
            searchCity: '',
            prestations: [],
            services: [],
            uniqCategory: [],
            uniqCategoryService: [],
            uniqService: [],
            uniqShop: [],
            categoryFinal: [],
            prestationOk: false,
            serviceOk: false,
            idAlfred: [],
            checkedB: false,
            checkedParticulier: false,
            filterDate: false,
            startDate: null,
            endDate: null,
            focusedInput: null,




        }
    }

    componentDidMount() {

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.checked} );
    };

    async search() {
        await this.setState({serviceUser:[],categoryFinal: [],finalServiceUser:[],prestations:[],services:[],uniqCategory:[],uniqCategoryService:[],
            checkedParticulier:false,idAlfred:[]});
        if(this.state.searchCity.length === 0 || !this.state.searchCity.trim()){
            axios.get(url+'myAlfred/api/serviceUser/all')
                .then(res => {
                    let serviceUser = res.data;
                    const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                        ['desc','desc','desc','desc','desc']);
                    this.setState({serviceUser:sorted,serviceUserCopy: sorted});
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

            this.setState({click: true, click2:false});
        } else {
            const city = this.state.searchCity;
            axios.get(url+'myAlfred/api/serviceUser/nearCity/'+city)
                .then()
                .catch();
        }



    }

    async searchWithWord(){
        if(this.state.research !== ""){
            await this.setState({serviceUser:[],categoryFinal: [],finalServiceUser:[],prestations:[],services:[],uniqCategory:[],uniqCategoryService:[],
                checkedParticulier:false,idAlfred:[]});
            const obj = {label:this.state.research.trim()};
            await axios.post(url+'myAlfred/api/prestation/all/search',obj)
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
                    this.setState({prestationOk: true});

                })
                .catch(err => {
                    console.log(err)
                });

            await axios.post(url+'myAlfred/api/service/all/search',obj)
                .then(res => {
                    let services = res.data;
                    this.setState({services: services});
                    const arrayCategory = [];

                    services.forEach(e => {
                        arrayCategory.push(e.category);
                    });
                    const uniqCategory = _.uniqBy(arrayCategory,'label');
                    this.setState({uniqCategoryService:uniqCategory});
                    this.setState({serviceOk: true});
                })
                .catch(err => {
                    console.log(err);
                });

            if(this.state.serviceOk || this.state.prestationOk){
                const uniqCategoryPrestation = this.state.uniqCategory;
                const uniqCategoryService = this.state.uniqCategoryService;

                const categoryFinal = uniqCategoryPrestation.concat(uniqCategoryService);
                const uniqCategoryFinal = _.uniqBy(categoryFinal,'label');
                this.setState({categoryFinal: uniqCategoryFinal});

                    axios.get(url+'myAlfred/api/serviceUser/all')
                        .then(result => {
                            const finalServiceUser = [];
                            const serviceUser = result.data;
                            const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                                ['desc','desc','desc','desc','desc']);

                            this.setState({serviceUser:sorted});
                            this.state.serviceUser.forEach((s,index) => {
                                if(this.state.prestations.length){
                                    this.state.prestations.forEach(p => {
                                        const index1 = s.prestations.findIndex(i => i.prestation == p._id);

                                        if(index1 !== -1){
                                            finalServiceUser.push(sorted[index])

                                        } else {
                                            this.state.services.forEach(r => {
                                                if(s.service._id == r._id){
                                                    finalServiceUser.push(sorted[index])
                                                }
                                            })
                                        }

                                    })
                                } else {
                                    this.state.services.forEach(r => {
                                        if(s.service._id == r._id){
                                            finalServiceUser.push(sorted[index])
                                        }
                                    })
                                }

                            });
                            this.setState({finalServiceUser:finalServiceUser,finalServiceUserCopy:finalServiceUser});

                        })
                        .catch(err => console.log(err));

            }
            if(!this.state.prestations.length && !this.state.services.length){
                axios.post(url+'myAlfred/api/category/all/search',obj)
                    .then(responseCategory => {
                        let category = responseCategory.data;
                        const arrayCategory = [];

                        category.forEach(e => {
                            arrayCategory.push(e);
                        });
                        const uniqCategory = _.uniqBy(arrayCategory,'label');
                        this.setState({categoryFinal:uniqCategory});
                        const address = this.state.addressSelected;


                            axios.get(url+'myAlfred/api/serviceUser/all')
                                .then(res => {
                                    let serviceUser = res.data;
                                    const sorted = _.orderBy(serviceUser,['level','number_of_views','graduated','is_certified','user.creation_date'],
                                        ['desc','desc','desc','desc','desc']);
                                    this.setState({finalServiceUser:sorted,finalServiceUserCopy:sorted});

                                })
                                .catch(err => console.log(err));
                    })
            }

            this.setState({click: false, click2: true});
        }


    }

    async filter(){

        if((this.state.serviceUser.length && this.state.finalServiceUser.length) || this.state.finalServiceUserCopy.length){
            const arrayShop = [];
            const serviceUser = this.state.finalServiceUser;
            serviceUser.forEach(s => {
                axios.get(url+'myAlfred/api/shop/alfred/'+s.user._id)
                    .then( res => {
                        let shop = res.data;
                        const index = arrayShop.findIndex(i=>i._id == shop._id);
                        if(index === -1){
                            arrayShop.push(shop);

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            });
            await this.setState({uniqShop: arrayShop});


            if(this.state.checkedB){
                this.setState({idAlfred:[]});
                setTimeout(()=>{

                    const arrayService = this.state.finalServiceUser;
                    const arrayIndex = [];
                    this.state.uniqShop.forEach(u => {
                        if(u.is_particular){
                            this.state.idAlfred.push(u.alfred._id)
                        }
                    });
                    this.state.finalServiceUser.forEach((f,index) => {
                        this.state.idAlfred.forEach(i => {
                            if(f.user._id === i){
                                arrayIndex.push(index);
                            }
                        })
                    });
                    for (let t = arrayIndex.length -1; t >= 0; t--)
                        arrayService.splice(arrayIndex[t],1);

                    this.setState({finalServiceUser:arrayService,copyFilterPro:arrayService});
                },2000)
            } else {
                setTimeout(()=>{if(this.state.filterDate){
                    this.filterDate()
                } else {
                    this.searchWithWord()
                }},2000)
            }
        } else {
            const arrayShop = [];
            const serviceUser = this.state.serviceUser;
            serviceUser.forEach(s => {
                axios.get(url+'myAlfred/api/shop/alfred/'+s.user._id)
                    .then( res => {
                        let shop = res.data;
                        const index = arrayShop.findIndex(i=>i._id == shop._id);
                        if(index === -1){
                            arrayShop.push(shop);

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            });
            await this.setState({uniqShop: arrayShop});


            if(this.state.checkedB){
                this.setState({idAlfred:[]});
                setTimeout(()=>{

                    const arrayService = this.state.serviceUser;
                    const arrayIndex = [];
                    this.state.uniqShop.forEach(u => {
                        if(u.is_particular){
                            this.state.idAlfred.push(u.alfred._id)
                        }
                    });
                    this.state.serviceUser.forEach((f,index) => {
                        this.state.idAlfred.forEach(i => {
                            if(f.user._id === i){
                                arrayIndex.push(index);
                            }
                        })
                    });
                    for (let t = arrayIndex.length -1; t >= 0; t--)
                        arrayService.splice(arrayIndex[t],1);

                    this.setState({serviceUser:arrayService,copyFilterPro:arrayService});




                },2000)
            } else {
                setTimeout(() => {
                        if(this.state.filterDate){
                            this.filterDate()
                        } else {
                            this.search()
                        }
                    },
                    2000);
            }
        }








    }

    async filterParticulier(){
        if(this.state.serviceUser.length && this.state.finalServiceUser.length){
            const arrayShop = [];
            const serviceUser = this.state.finalServiceUser;
            serviceUser.forEach(s => {
                axios.get(url + 'myAlfred/api/shop/alfred/' + s.user._id)
                    .then(res => {
                        let shop = res.data;
                        const index = arrayShop.findIndex(i => i._id == shop._id);
                        if (index === -1) {
                            arrayShop.push(shop);

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            });
            await this.setState({uniqShop: arrayShop});

            if(this.state.checkedParticulier){
                this.setState({idAlfred:[]});
                setTimeout(() => {

                    const arrayService = this.state.finalServiceUser;
                    const arrayIndex = [];
                    this.state.uniqShop.forEach(u => {
                        if (u.is_professional) {
                            this.state.idAlfred.push(u.alfred._id)
                        }
                    });
                    this.state.finalServiceUser.forEach((f, index) => {
                        this.state.idAlfred.forEach(i => {
                            if (f.user._id === i) {
                                arrayIndex.push(index);


                            }


                        })
                    });
                    for (let t = arrayIndex.length - 1; t >= 0; t--)
                        arrayService.splice(arrayIndex[t], 1);

                    this.setState({finalServiceUser: arrayService,copyFilterParticulier:arrayService});


                }, 2000)
            } else {
                setTimeout(() => {if(this.state.filterDate){
                    this.filterDate()
                } else {
                    this.searchWithWord()
                }},2000);

            }
        } else {
            const arrayShop = [];
            const serviceUser = this.state.serviceUser;
            serviceUser.forEach(s => {
                axios.get(url + 'myAlfred/api/shop/alfred/' + s.user._id)
                    .then(res => {
                        let shop = res.data;
                        const index = arrayShop.findIndex(i => i._id == shop._id);
                        if (index === -1) {
                            arrayShop.push(shop);

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            });
            await this.setState({uniqShop: arrayShop});

            if(this.state.checkedParticulier){
                this.setState({idAlfred:[]});
                setTimeout(() => {

                    const arrayService = this.state.serviceUser;
                    const arrayIndex = [];
                    this.state.uniqShop.forEach(u => {
                        if (u.is_professional) {
                            this.state.idAlfred.push(u.alfred._id)
                        }
                    });
                    this.state.serviceUser.forEach((f, index) => {
                        this.state.idAlfred.forEach(i => {
                            if (f.user._id === i) {
                                arrayIndex.push(index);


                            }


                        })
                    });
                    for (let t = arrayIndex.length - 1; t >= 0; t--)
                        arrayService.splice(arrayIndex[t], 1);

                    this.setState({serviceUser: arrayService,copyFilterParticulier:arrayService});


                }, 2000)
            } else {
                setTimeout(() => {
                        if(this.state.filterDate){
                            this.filterDate()
                        } else {
                            this.search()
                        }
                    },
                    2000);

            }
        }

    }


    async filterDate(){
        if((this.state.serviceUser.length && this.state.finalServiceUser.length) || this.state.finalServiceUserCopy.length){
            await this.setState({finalServiceUser:this.state.finalServiceUserCopy});
            const serviceUser = this.state.finalServiceUser;
            const begin = this.state.startDate;
            const end = this.state.endDate;
            const beginDay =  moment(begin).format('dddd');
            const endDay =  moment(end).format('dddd');
            const diff = end.diff(begin,'days')+1;
            const obj = {begin,end,beginDay,endDay};

            axios.post(url+'myAlfred/api/availability/filterDate',obj)
                .then(response => {
                    let availability = response.data;
                    const idAlfred = [];
                    const services = [];
                    availability.forEach(a => {
                        idAlfred.push(a.user);
                    });
                    serviceUser.forEach(w => {

                        const index = idAlfred.findIndex(i => i == w.user._id);
                        if(index !== -1){
                            services.push(w);
                        }

                    })
                    this.setState({finalServiceUser:services,filterDate:true});


                })
                .catch(err => console.log(err));
        } else {
            await this.setState({serviceUser:this.state.serviceUserCopy});
            const serviceUser = this.state.serviceUser;
            const begin = this.state.startDate;
            const end = this.state.endDate;
            const beginDay =  moment(begin).format('dddd');
            const endDay =  moment(end).format('dddd');
            const diff = end.diff(begin,'days')+1;
            const obj = {begin,end,beginDay,endDay};

            axios.post(url+'myAlfred/api/availability/filterDate',obj)
                .then(response => {
                    let availability = response.data;
                    const idAlfred = [];
                    const services = [];
                    availability.forEach(a => {
                        idAlfred.push(a.user);
                    });
                    serviceUser.forEach(w => {

                        const index = idAlfred.findIndex(i => i == w.user._id);
                        if(index !== -1){
                            services.push(w);
                        }

                    })
                    this.setState({serviceUser:services,filterDate:true});


                })
                .catch(err => console.log(err));
        }
    }

    cancelDateFilter(){
        this.setState({startDate:null,endDate:null,filterDate:false});
        if(this.state.checkedB){
            if((this.state.serviceUser.length && this.state.finalServiceUser.length) || this.state.finalServiceUserCopy.length){
                this.setState({finalServiceUser:this.state.copyFilterPro});
            } else {
                this.setState({serviceUser:this.state.copyFilterPro});
            }
        } else if(this.state.checkedParticulier){
            if((this.state.serviceUser.length && this.state.finalServiceUser.length) || this.state.finalServiceUserCopy.length){
                this.setState({finalServiceUser:this.state.copyFilterParticulier});
            } else {
                this.setState({serviceUser:this.state.copyFilterParticulier});
            }
        } else {
            if((this.state.serviceUser.length && this.state.finalServiceUser.length) || this.state.finalServiceUserCopy.length){
                this.searchWithWord();
            } else {
                this.search();
            }
        }
    }



    render() {
        const {classes} = this.props;
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
                                    style={{width:'100%'}}
                                    value={this.state.searchCity}
                                    name={'searchCity'}
                                    onChange={this.onChange}
                                    margin="normal"
                                    variant="outlined"
                                />

                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                {this.state.research === '' ?
                                    <Button onClick={() => this.search()} variant="contained" color="primary"
                                            style={{width: '100%', color: 'white'}}>
                                        Rechercher
                                    </Button> :

                                    <Button disabled={(this.state.research.length === 0 || !this.state.research.trim())} onClick={()=>this.searchWithWord()} variant="contained" color="primary"
                                            style={{width: '100%', color: 'white'}}>
                                        Rechercher avec un mot
                                    </Button>
                                }
                            </Grid>
                            {this.state.checkedParticulier ? <Grid item xs={3}></Grid> :

                                <Grid item xs={3}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.checkedB}
                                                onChange={e=>{this.handleChange(e);this.filter()}}
                                                value={this.state.checkedB}
                                                color="primary"
                                                name={'checkedB'}
                                            />
                                        }
                                        label="Pro"
                                    />
                                </Grid>
                            }

                            {this.state.checkedB ? null : <Grid item xs={3}>



                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.checkedParticulier}
                                            onChange={e=>{this.handleChange(e);this.filterParticulier()}}
                                            value={this.state.checkedParticulier}
                                            color="primary"
                                            name={'checkedParticulier'}
                                        />
                                    }
                                    label="Particulier"
                                />


                            </Grid>}



                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <DateRangePicker
                                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                    startDatePlaceholderText={'Début'}
                                    endDatePlaceholderText={'Fin'}
                                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                    minimumNights={0}

                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={()=>this.cancelDateFilter()}>Annuler</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={()=>this.filterDate()}>Valider</Button>
                            </Grid>
                        </Grid>
                        {click ?
                            <>
                                <Grid container>
                                    <h3>Que recherchez-vous aujourd'hui ?</h3>
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
                                        ))}



                                </Grid>
                            </>




                            : null}

                        {this.state.click2 ?
                            <>
                                <p>Résultat pour la recherche : {this.state.research}</p>


                                {this.state.categoryFinal.map((e, index) => (
                                        <Grid key={index} container>
                                            <Grid item xs={12}>
                                                <h4>{e.label}</h4>
                                                {this.state.finalServiceUser.map(s => {

                                                    if (s.service.category === e._id) {
                                                        return (
                                                            <Grid item xs={3}>
                                                                <Card>
                                                                    <p>{s.service.label} par {s.user.firstname}</p>

                                                                </Card>
                                                            </Grid>
                                                        )
                                                    } else return null

                                                })}
                                            </Grid>
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


export default withStyles(styles)(searchNotLogin);
