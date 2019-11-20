import React, { Fragment } from 'react';
import Layout from '../../hoc/Layout/Layout';
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
import '../../static/overridedate.css';
import AlgoliaPlaces from "algolia-places-react";

const geolib = require('geolib');
const _ = require('lodash');

const { config } = require('../../config/config');
const url = config.apiUrl;
moment.locale('fr');
const styles = theme => ({
    bigContainer: {
        marginTop: 80
    },
    card: {
        margin: 20,
    },
    media: {
      height: "250px!important",
      position: 'relative',
      objectFit: 'cover',
    },
    DateInput_input__focused:{
        borderBottom: '1px solid #fb1515!important',
    },
    algol: {
        fontFamily: 'Helvetica Neue, Helvetica,sans-serif',
        '::placeholder':{
            color: '#cfcfcf',
        },
        '&:hover':{
            border: '1px solid black!important',
            transition: 'border 0.5s',
        },
        '&:focus':{
            border: '2px solid #2FBCD3!important',
            transition: 'border 0.5s',
        }
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
            clickedstatut:false,
            clickeddate:false,
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
                                this.setState({[e.label+'Array']:[]});
                                this.setState({[e.label]:0});
                                this.state.serviceUser.forEach(a => {
                                    let array = this.state[e.label+'Array'];
                                    if(a.service.category === e._id){
                                        this.setState(prevState => {
                                            return {[e.label]: prevState[e.label] + 1}
                                        })
                                        array.push(a);
                                        this.setState({[e.label+'Array']:array})
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
            const obj = {city:city};
            axios.post(url+'myAlfred/api/serviceUser/nearCity',obj)
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
        }



    }

    async searchWithWord(){
        if(this.state.searchCity.length === 0 || !this.state.searchCity.trim()){
                await this.setState({serviceUser:[],categoryFinal: [],finalServiceUser:[],prestations:[],services:[],uniqCategory:[],uniqCategoryService:[],
                    checkedParticulier:false,idAlfred:[]});
                const obj = {label:this.state.research.trim()};
                await axios.post(url+'myAlfred/api/prestation/all/search',obj)
                    .then(res => {
                        clickedfilter
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
                            this.state.categoryFinal.forEach(e => {
                                this.setState({[e.label+'Final']:0});
                                this.state.finalServiceUser.forEach(a => {
                                    if(a.service.category === e._id){
                                        this.setState(prevState => {
                                            return {[e.label+'Final']: prevState[e.label+'Final'] + 1}
                                        })
                                    }
                                })
                            })

                        })
                        .catch(err => console.log(err));

                }
                if(!this.state.prestations.length && !this.state.services.length) {
                    axios.post(url + 'myAlfred/api/category/all/search', obj)
                        .then(responseCategory => {
                            let category = responseCategory.data;
                            const arrayCategory = [];

                            category.forEach(e => {
                                arrayCategory.push(e);
                            });
                            const uniqCategory = _.uniqBy(arrayCategory, 'label');
                            this.setState({categoryFinal: uniqCategory});
                            const address = this.state.addressSelected;


                            axios.get(url + 'myAlfred/api/serviceUser/all')
                                .then(res => {
                                    let serviceUser = res.data;
                                    const sorted = _.orderBy(serviceUser, ['level', 'number_of_views', 'graduated', 'is_certified', 'user.creation_date'],
                                        ['desc', 'desc', 'desc', 'desc', 'desc']);
                                    this.setState({finalServiceUser: sorted, finalServiceUserCopy: sorted});
                                    this.state.categoryFinal.forEach(e => {
                                        this.setState({[e.label+'Final']:0});
                                        this.state.finalServiceUser.forEach(a => {
                                            if(a.service.category === e._id){
                                                this.setState(prevState => {
                                                    return {[e.label+'Final']: prevState[e.label+'Final'] + 1}
                                                })
                                            }
                                        })
                                    })

                                })
                                .catch(err => console.log(err));
                        })
                }


                this.setState({click: false, click2: true});
            } else {

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
                        const obj = {city:this.state.searchCity};
                        axios.post(url+'myAlfred/api/serviceUser/nearCity',obj)
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
                                this.state.categoryFinal.forEach(e => {
                                    this.setState({[e.label+'Final']:0});
                                    this.state.finalServiceUser.forEach(a => {
                                        if(a.service.category === e._id){
                                            this.setState(prevState => {
                                                return {[e.label+'Final']: prevState[e.label+'Final'] + 1}
                                            })
                                        }
                                    })
                                })

                            })
                            .catch(err => console.log(err));

                    }
                    if(!this.state.prestations.length && !this.state.services.length) {
                        axios.post(url + 'myAlfred/api/category/all/search', obj)
                            .then(responseCategory => {
                                let category = responseCategory.data;
                                const arrayCategory = [];

                                category.forEach(e => {
                                    arrayCategory.push(e);
                                });
                                const uniqCategory = _.uniqBy(arrayCategory, 'label');
                                this.setState({categoryFinal: uniqCategory});
                                const address = this.state.addressSelected;

                                const obj = {city: this.state.searchCity};
                                axios.post(url + 'myAlfred/api/serviceUser/nearCity', obj)
                                    .then(res => {
                                        let serviceUser = res.data;
                                        const sorted = _.orderBy(serviceUser, ['level', 'number_of_views', 'graduated', 'is_certified', 'user.creation_date'],
                                            ['desc', 'desc', 'desc', 'desc', 'desc']);
                                        this.setState({finalServiceUser: sorted, finalServiceUserCopy: sorted});
                                        this.state.categoryFinal.forEach(e => {
                                            this.setState({[e.label+'Final']:0});
                                            this.state.finalServiceUser.forEach(a => {
                                                if(a.service.category === e._id){
                                                    this.setState(prevState => {
                                                        return {[e.label+'Final']: prevState[e.label+'Final'] + 1}
                                                    })
                                                }
                                            })
                                        })

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
                    this.state.categoryFinal.forEach(e => {
                        this.setState({[e.label+'Final']:0});
                        this.state.finalServiceUser.forEach(a => {
                            if(a.service.category === e._id){
                                this.setState(prevState => {
                                    return {[e.label+'Final']: prevState[e.label] + 1}
                                })
                            }
                        })
                    })

                },1000)
            } else {
                setTimeout(()=>{if(this.state.filterDate){
                    this.filterDate()
                } else {
                    this.searchWithWord()
                }},1000)
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
                    this.state.categories.forEach(e => {
                        this.setState({[e.label]:0});
                        this.state.serviceUser.forEach(a => {
                            if(a.service.category === e._id){
                                this.setState(prevState => {
                                    return {[e.label]: prevState[e.label] + 1}
                                })
                            }
                        })
                    })




                },1000)
            } else {
                setTimeout(() => {
                        if(this.state.filterDate){
                            this.filterDate()
                        } else {
                            this.search()
                        }
                    },
                    1000);
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
                    this.state.categoryFinal.forEach(e => {
                        this.setState({[e.label+'Final']:0});
                        this.state.finalServiceUser.forEach(a => {
                            if(a.service.category === e._id){
                                this.setState(prevState => {
                                    return {[e.label+'Final']: prevState[e.label+'Final'] + 1}
                                })
                            }
                        })
                    })


                }, 1000)
            } else {
                setTimeout(() => {if(this.state.filterDate){
                    this.filterDate()
                } else {
                    this.searchWithWord()
                }},1000);

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
                    this.state.categories.forEach(e => {
                        this.setState({[e.label]:0});
                        this.state.serviceUser.forEach(a => {
                            if(a.service.category === e._id){
                                this.setState(prevState => {
                                    return {[e.label]: prevState[e.label] + 1}
                                })
                            }
                        })
                    })


                }, 1000)
            } else {
                setTimeout(() => {
                        if(this.state.filterDate){
                            this.filterDate()
                        } else {
                            this.search()
                        }
                    },
                    1000);

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
                    this.state.categoryFinal.forEach(e => {
                        this.setState({[e.label+'Final']:0});
                        this.state.finalServiceUser.forEach(a => {
                            if(a.service.category === e._id){
                                this.setState(prevState => {
                                    return {[e.label+'Final']: prevState[e.label+'Final'] + 1}
                                })
                            }
                        })
                    })


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
                    this.state.categories.forEach(e => {
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
        }
    }

    yes(){
        if(this.state.clickedstatut == true)
        {
            this.setState({clickedstatut: false});
        } else {
            this.setState({clickedstatut: true});
        }
    }

    yes2(){
        if(this.state.clickeddate == true)
        {
            this.setState({clickeddate: false});
        } else {
            this.setState({clickeddate: true});
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

    onChangeAddress({suggestion}) {
        this.setState({searchCity: suggestion.name});


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
                                    style={{width: '90%', margin: 'auto'}}
                                    onChange={(event)=>this.setState({research: event.target.value,click2:false})}
                                />
                            </Grid>
                            <Grid item xs={4} style={{textAlign: 'center',width: '90%', margin: 'auto'}}>
                                <AlgoliaPlaces
                                    className={classes.algol}
                                    style={{height: '55px'}}
                                    placeholder='Recherchez une ville'
                                    options={{
                                        appId: 'plKATRG826CP',
                                        apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                                        language: 'fr',
                                        countries: ['fr'],
                                        type: 'city',
                                        useDeviceLocation: 'true'
                                    }}


                                    onChange={(suggestion) =>this.onChangeAddress(suggestion)}
                                    onClear={()=>this.setState({searchCity:''})}
                                />

                            </Grid>

                        
                            <Grid item xs={3} style={{margin: 'auto'}}>
                                {this.state.research === '' ?
                                    <Button onClick={() => this.search()} variant="contained" color="primary"
                                            style={{width: '80%', color: 'white', margin: 'auto', height: '55px', fontSize: '0.8rem'}}>
                                        Rechercher
                                    </Button> :

                                    <Button disabled={(this.state.research.length === 0 || !this.state.research.trim())} onClick={()=>this.searchWithWord()} variant="contained" color="primary"
                                            style={{width: '80%', color: 'white', margin: 'auto', height: '55px', fontSize: '0.8rem'}}>
                                        Rechercher avec un mot
                                    </Button>
                                }
                            </Grid>

                            </Grid>

                            <Grid container>

                            {this.state.click2 ?<Fragment>
                            <Grid container>
                                {this.state.clickedstatut ?
                                    <Grid item xs={6} sm={4} md={3} onClick={()=> this.yes()} style={{borderRadius: '15px', backgroundColor: '#2FBCD3', boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset', cursor: 'pointer', padding: 20, height: '65px', margin: 10}}>
                                        <Typography style={{textAlign: 'center', color:'white'}}>Statut</Typography>
                                    </Grid> 
                                : 
                                    <Grid item xs={6} sm={4} md={3} onClick={()=> this.yes()} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', padding: 20, height: '65px', margin: 10}}>
                                        <Typography style={{textAlign: 'center'}}>Statut</Typography>
                                    </Grid> 
                                }
                                {this.state.clickeddate ?
                                    <Grid item xs={6} sm={4} md={3} onClick={()=> this.yes2()} style={{borderRadius: '15px', backgroundColor: '#2FBCD3', boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset', cursor: 'pointer', padding: 20, height: '65px', margin: 10}}>
                                        <Typography style={{textAlign: 'center', color:'white'}}>Quelle(s) date(s) ?</Typography>
                                    </Grid>
                                :
                                    <Grid item xs={6} sm={4} md={3} onClick={()=> this.yes2()} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', padding: 20, height: '65px', margin: 10}}>
                                        <Typography style={{textAlign: 'center'}}>Quelle(s) date(s) ?</Typography>
                                    </Grid>
                                }
                            </Grid>
                            <Grid container  style={{height: '10px'}}>
                                {this.state.clickedstatut ?
                                
                                <Grid item xs={6} sm={4} md={3} style={{borderRadius: '15px', backgroundColor: 'white', border: '1px solid #dbdbdb', height: '100px', margin: 10,zIndex: 1}}>
                                    <Grid container>
                                        <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                            {this.state.checkedParticulier ? <Grid item xs={3}></Grid> :
                                                
                                                <Grid item xs={6} sm={4} md={3} style={{textAlign:'center', margin: 'auto'}}>
                                                    {this.state.click2 ?
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
                                                    :null}
                                                </Grid>
                                            }
                                        </Grid>

                                        <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                            {this.state.checkedB ? null : 

                                            <Grid item xs={6} sm={4} md={3} style={{textAlign:'center', margin: 'auto'}}>
                                                {this.state.click2 ?
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
                                                    : null}
                                                </Grid>

                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                                : null}
                                {this.state.clickeddate ?
                                <Fragment>
                                    {this.state.clickedstatut ? null : <Grid item xs={6} sm={4} md={3} style={{margin: 10}}></Grid> }
                                    <Grid item xs={6} sm={4} md={3} style={{borderRadius: '15px', backgroundColor: 'white', border: '1px solid #dbdbdb', height: '100px', margin: 10,zIndex: 1, padding: 10}}>
                                        <Grid container>
                                            <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                                <DateRangePicker
                                                    style={{width: '50px'}}
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
                                            
                                            <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <Button onClick={()=>this.cancelDateFilter()}>Annuler</Button>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Button onClick={()=>this.filterDate()}>Valider</Button>
                                                    </Grid> 
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    
                                </Fragment>
                                : null}
                            </Grid>
                            </Fragment>: null}
                            
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
                            <Grid container>
                                <Typography style={{fontSize: '1.1rem', color: '#A3A3A3'}}>Résultat pour la recherche : <i style={{fontWeight: 'bold'}}>{this.state.research}</i></Typography>
                            </Grid>

                                {this.state.categoryFinal.map((e, index) => (
                                        <Grid key={index} container>
                                            <Grid item xs={12}>
                                                <h4>{e.label}</h4>

                                                <Grid container>
                                                    {this.state.finalServiceUser.map(s => {

                                                        if (s.service.category === e._id) {
                                                            return (
                                                                <Grid item md={3} sm={6} xs={12}>
                                                                    <Card className={classes.card}>
                                                                            <CardMedia
                                                                                className={classes.media}
                                                                                style={{height:150}}
                                                                                image={s.service.picture}
                                                                                title={s.service.label}
                                                                            >
                                                                                <img style={{position: 'absolute', width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', top: '60px', left: 0, right: 0, margin: 'auto'}} src={"../"+s.user.picture}/>
                                                                                {s.city != null ? 
                                                                                <Typography style={{position: 'absolute',fontSize: '0.9rem', color: 'rgb(228, 226, 226)', bottom: '10px', left: 0, right: 0, margin: 'auto', textAlign:'center'}}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16.057" height="20.521" viewBox="0 0 16.057 20.521">
                                                                                        <path id="Tracé_13306" data-name="Tracé 13306" d="M274.542,14959.223l-.392.033-.391.063-.425.061-.36.1-.391.092-.752.252-.684.348-.687.377-.587.441-.587.5-.522.566-.457.566-.391.66-.359.66-.26.725-.1.377-.1.348-.065.41-.066.377-.031.379v.406l.031.568.066.566.1.6.164.566.163.566.228.566.229.566.26.566.294.535.326.568.685,1.035.718,1.008.752.945.75.881.718.789.686.723.62.6.88.818.36.314.36-.314.88-.818.62-.6.685-.723.718-.789.752-.881.752-.945.718-1.008.685-1.035.326-.568.294-.535.26-.566.229-.566.228-.566.163-.566.164-.566.1-.6.065-.566.033-.568v-.406l-.033-.379-.065-.377-.065-.41-.1-.348-.1-.377-.26-.725-.36-.66-.392-.66-.456-.566-.522-.566-.587-.5-.587-.441-.686-.377-.684-.348-.752-.252-.391-.092-.36-.1-.425-.061-.391-.062-.394-.033Zm.784,4.439.326.064.327.061.326.125.294.127.293.188.262.189.228.221.228.221.2.25.2.285.132.283.13.314.065.313.065.318v.689l-.065.316-.065.313-.13.318-.132.281-.2.283-.2.252-.228.221-.228.221-.262.189-.293.188-.294.125-.326.127-.327.064-.326.063h-.719l-.326-.062-.327-.064-.326-.127-.294-.125-.293-.187-.262-.189-.228-.221-.228-.221-.2-.252-.2-.283-.132-.281-.13-.318-.065-.312-.065-.316v-.689l.065-.318.065-.312.13-.314.132-.283.2-.285.2-.25.228-.221.228-.221.262-.189.293-.187.294-.127.326-.125.327-.061.326-.064Z" transform="translate(-266.938 -14959.223)" fill="rgb(228, 226, 226)" fill-rule="evenodd"/>
                                                                                    </svg> 
                                                                                     {' ' + s.city}
                                                                                </Typography>: null}
                                                                            </CardMedia>
                                                                            <CardContent style={{height: '105px'}}>
                                                                                <Grid container>
                                                                                    <Grid item xs={7}>
                                                                                        <Typography style={{fontSize: '0.9rem', color: '#A3A3A3'}}>{e.label}</Typography>
                                                                                        <Typography style={{fontSize: '1rem'}}>
                                                                                            {s.service.label} par {s.user.firstname} <img src="../static/checkboxes/roundBlue2Checked.png" style={{width: '13px', height: '13px'}}/>
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={5}>
                                                                                        <Link href={"/userServicePreview?id="+ s.service._id}>
                                                                                            <Button alt={s.service._id} variant="contained" color="primary"
                                                                                                    style={{width: '80%', color: 'white', margin: '20px auto auto'}}>
                                                                                                Réserver
                                                                                            </Button>
                                                                                        </Link>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </CardContent>
                                                                    </Card>
                                                                </Grid>
                                                            )
                                                        } else null

                                                    })}
                                                </Grid>
                                                
                                                
                                                {this.state[e.label+'Final'] !== 0 ? <p>Voir les {this.state[e.label+'Final']} Alfred</p> : <p>Aucun Alfred pour cette catégorie pour le moment</p>}
                                            </Grid>
                                        </Grid>
                                    ))}{/*<br/>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Card>
                                                <Card media>

                                                </Card>
                                                <p>test</p>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Card>
                                                <p>test</p>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Card>
                                                <p>test</p>
                                            </Card>
                                        </Grid>
                                    </Grid>*/}



                            </>

                            : null}






                    </Grid>
                </Layout>
            </Fragment>

        )
    }
}


export default withStyles(styles)(searchNotLogin);
