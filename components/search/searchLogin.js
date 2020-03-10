import React, { Fragment } from 'react';
import Layout from '../../hoc/Layout/Layout';
import Footer from '../../hoc/Layout/Footer/Footer';
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
import StarRatings from 'react-star-ratings';
import 'react-dates/lib/css/_datepicker.css';
import Tooltip from '@material-ui/core/Tooltip';

const geolib = require('geolib');
const _ = require('lodash');

const { config } = require('../../config/config');
const url = config.apiUrl;
moment.locale('fr');
const styles = theme => ({
    bigContainer: {
        marginTop: 80,
        minHeight: 530
    },
    card: {
        margin: 20,
    },
    media: {
      height: "250px!important",
      position: 'relative',
      objectFit: 'cover',
    },
    respfilter:{
        [theme.breakpoints.down('sm')]: {
            top: 200,
        }
    },
    mobilevoir: {
        [theme.breakpoints.up("md")]: {
            display: "none!important"
        }
    },
    webvoir: {
        [theme.breakpoints.down("sm")]: {
            display: "none!important"
        }
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

class searchLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            address: {},
            otherAddress: [],
            addressSelected: {},
            categories: [],
            serviceUser: [],
            serviceUserCopy: [],
            finalServiceUser: [],
            finalServiceUserCopy: [],
            copyFilterPro: [],
            copyFilterParticulier: [],
            lat: null,
            lng: null,
            research: '',
            prestations: [],
            services: [],
            resultCategory: [],
            uniqCategory: [],
            uniqCategoryService: [],
            uniqService: [],
            uniqShop: [],
            categoryFinal: [],
            prestationOk: false,
            serviceOk: false,
            categoryOk: [],
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
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({
                  user:user,
                  address: user.billing_address,
                  addressSelected: user.billing_address,
                  otherAddress: user.service_address,
                });
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

    handleChange = event => {
        this.setState({[event.target.name]: event.target.checked} );
    };

     search() {
         this.setState({serviceUser:[],categoryFinal: [],finalServiceUser:[],prestations:[],services:[],uniqCategory:[],uniqCategoryService:[],
             checkedParticulier:false,idAlfred:[]});
        const address = this.state.addressSelected;
        if(address.gps !== undefined){
            this.setState({lat:address.gps.lat, lng: address.gps.lng});
            axios.get(url+'myAlfred/api/serviceUser/near')
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
        } else if(address==='all') {
            this.setState({lat:this.state.address.gps.lat, lng: this.state.address.gps.lng});
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
        } else {
            this.setState({lat:address.lat,lng: address.lng});
            const id = address._id;
            axios.get(url+'myAlfred/api/serviceUser/nearOther/'+id)
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
        }

    }

   searchWithWord(){
         if(this.state.research !== ""){
             this.setState({serviceUser:[],categoryFinal: [],finalServiceUser:[],resultCategory:[],prestations:[],services:[],uniqCategory:[],uniqCategoryService:[],
                 checkedParticulier:false,idAlfred:[],prestationOk:false,serviceOk:false,categoryOk:false});
             const obj = {label:this.state.research.trim()};
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
                     this.setState({prestationOk: true});

                 })
                 .catch(err => {
                     console.log(err)
                 });

             axios.post(url+'myAlfred/api/service/all/search',obj)
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

             axios.post(url + 'myAlfred/api/category/all/search', obj)
                 .then(responseCategory => {
                     let category = responseCategory.data;
                     this.setState({resultCategory:category});
                     const arrayCategory = [];

                     category.forEach(e => {
                         arrayCategory.push(e);
                     });
                     const uniqCategory = _.uniqBy(arrayCategory, 'label');
                     this.setState({categoryFinal: uniqCategory});
                     this.setState({categoryOk: true});
                 })
                 .catch(err => {
                     console.log(err)
                 });

             if(this.state.serviceOk || this.state.prestationOk || this.state.categoryOk){
                 const uniqCategoryPrestation = this.state.uniqCategory;
                 const uniqCategoryService = this.state.uniqCategoryService;
                 const uniqCategoryCategory = this.state.categoryFinal;

                 const categoryFinal = uniqCategoryPrestation.concat(uniqCategoryService).concat(uniqCategoryCategory);
                 const uniqCategoryFinal = _.uniqBy(categoryFinal,'label');
                 this.setState({categoryFinal: uniqCategoryFinal});

                 const address = this.state.addressSelected;
                 if(address.gps !== undefined) {
                     this.setState({lat: address.gps.lat, lng: address.gps.lng});

                     axios.get(url+'myAlfred/api/serviceUser/near')
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
                                                 } else {
                                                     this.state.resultCategory.forEach(z => {
                                                         if(s.service.category == z._id){
                                                             finalServiceUser.push(sorted[index])
                                                         }
                                                     })
                                                 }
                                             })
                                         }

                                     })
                                 } else if(this.state.services.length) {
                                     this.state.services.forEach(r => {
                                         if(s.service._id == r._id){
                                             finalServiceUser.push(sorted[index])
                                         } else {
                                             this.state.resultCategory.forEach(z => {
                                                 if(s.service.category == z._id){
                                                     finalServiceUser.push(sorted[index])
                                                 }
                                             })
                                         }
                                     })
                                 } else {
                                     this.state.resultCategory.forEach(z => {
                                         if(s.service.category == z._id){
                                             finalServiceUser.push(sorted[index])
                                         }
                                     })
                                 }

                             });
                             this.setState({finalServiceUser:_.uniqBy(finalServiceUser,'_id'),finalServiceUserCopy:_.uniqBy(finalServiceUser,'_id')});
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
                 } else if(address==='all'){
                     this.setState({lat:this.state.address.gps.lat, lng: this.state.address.gps.lng});
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
                                                 } else {
                                                     this.state.resultCategory.forEach(z => {
                                                         if(s.service.category == z._id){
                                                             finalServiceUser.push(sorted[index])
                                                         }
                                                     })
                                                 }
                                             })
                                         }

                                     })
                                 } else if(this.state.services.length) {
                                     this.state.services.forEach(r => {
                                         if(s.service._id == r._id){
                                             finalServiceUser.push(sorted[index])
                                         } else {
                                             this.state.resultCategory.forEach(z => {
                                                 if(s.service.category == z._id){
                                                     finalServiceUser.push(sorted[index])
                                                 }
                                             })
                                         }
                                     })
                                 } else {
                                     this.state.resultCategory.forEach(z => {
                                         if(s.service.category == z._id){
                                             finalServiceUser.push(sorted[index])
                                         }
                                     })
                                 }

                             });
                             this.setState({finalServiceUser:_.uniqBy(finalServiceUser,'_id'),finalServiceUserCopy:_.uniqBy(finalServiceUser,'_id')});
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
                     this.setState({lat:address.lat,lng: address.lng});
                     const id = address._id;
                     axios.get(url+'myAlfred/api/serviceUser/nearOther/'+id)
                         .then(res => {
                             const finalServiceUser = [];
                             const serviceUser = res.data;
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
                                                 } else {
                                                     this.state.resultCategory.forEach(z => {
                                                         if(s.service.category == z._id){
                                                             finalServiceUser.push(sorted[index])
                                                         }
                                                     })
                                                 }
                                             })
                                         }

                                     })
                                 } else if(this.state.services.length) {
                                     this.state.services.forEach(r => {
                                         if(s.service._id == r._id){
                                             finalServiceUser.push(sorted[index])
                                         } else {
                                             this.state.resultCategory.forEach(z => {
                                                 if(s.service.category == z._id){
                                                     finalServiceUser.push(sorted[index])
                                                 }
                                             })
                                         }
                                     })
                                 } else {
                                     this.state.resultCategory.forEach(z => {
                                         if(s.service.category == z._id){
                                             finalServiceUser.push(sorted[index])
                                         }
                                     })
                                 }

                             });
                             this.setState({finalServiceUser:_.uniqBy(finalServiceUser,'_id'),finalServiceUserCopy:_.uniqBy(finalServiceUser,'_id')});
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
             }
         }


    }

      filter(){
        if((this.state.serviceUser.length && this.state.finalServiceUser.length) || this.state.finalServiceUserCopy.length){
          const serviceUser = this.state.finalServiceUser;

            if(this.state.checkedB){
                    const serviceFilter = [];
                    serviceUser.forEach(s => {
                        if(s.status === 'Pro'){
                            serviceFilter.push(s)
                        }
                    });
                    const sorted = _.orderBy(serviceFilter,['level','number_of_views','graduated','is_certified','user.creation_date'],
                        ['desc','desc','desc','desc','desc']);
                    this.setState({finalServiceUser: sorted, copyFilterPro: sorted});
                    this.state.categoryFinal.forEach(e => {
                        this.setState({[e.label+'Final']:0});
                        this.state.serviceUser.forEach(a => {
                            if(a.service.category === e._id){
                                this.setState(prevState => {
                                    return {[e.label+'Final']: prevState[e.label+'Final'] + 1}
                                })
                            }
                        })
                    })
            } else {
                if(this.state.filterDate){
                    this.filterDate()
                } else {
                    this.searchWithWord()
                }
            }
        } else {
            const serviceUser =  this.state.serviceUser;
            if(this.state.checkedB){
                    const serviceFilter = [];
                    serviceUser.forEach(s => {
                        if(s.status === 'Pro'){
                            serviceFilter.push(s)
                        }
                    });
                    const sorted = _.orderBy(serviceFilter,['level','number_of_views','graduated','is_certified','user.creation_date'],
                        ['desc','desc','desc','desc','desc']);

                    this.setState({serviceUser:sorted,copyFilterPro:sorted});
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
            } else {
                        if(this.state.filterDate){
                            this.filterDate()
                        } else {
                            this.search()
                        }
            }
        }
     }

    filterParticulier(){
        if(this.state.serviceUser.length && this.state.finalServiceUser.length){
            const serviceUser =  this.state.finalServiceUser;
            if(this.state.checkedParticulier){
                this.setState({idAlfred:[]});
                    const serviceFilter = [];
                    serviceUser.forEach(s => {
                        if(s.status === 'Particulier'){
                            serviceFilter.push(s)
                        }
                    });
                    const sorted = _.orderBy(serviceFilter,['level','number_of_views','graduated','is_certified','user.creation_date'],
                        ['desc','desc','desc','desc','desc']);

                    this.setState({finalServiceUser: sorted,copyFilterParticulier:sorted});
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
            } else {
                if(this.state.filterDate){
                    this.filterDate()
                } else {
                    this.searchWithWord()
                }

            }
        } else {
            const serviceUser =  this.state.serviceUser;
            if(this.state.checkedParticulier){
                    const serviceFilter = [];
                    serviceUser.forEach(s => {
                        if(s.status === 'Particulier'){
                            serviceFilter.push(s)
                        }
                    });
                    const sorted = _.orderBy(serviceFilter,['level','number_of_views','graduated','is_certified','user.creation_date'],
                        ['desc','desc','desc','desc','desc']);

                    this.setState({serviceUser: sorted,copyFilterParticulier:sorted});
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
            } else {
                    if(this.state.filterDate){
                        this.filterDate()
                    } else {
                        this.search()
                    }

            }
        }

    }


   filterDate(){
        if((this.state.serviceUser.length && this.state.finalServiceUser.length) || this.state.finalServiceUserCopy.length){
            this.setState({finalServiceUser:this.state.finalServiceUserCopy});
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
            this.setState({serviceUser:this.state.serviceUserCopy});
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

     keyPress(e) {
         if(e.keyCode === 13){
             if(this.state.research.length === 0 || !this.state.research.trim()){
                 this.search()
             } else {
                 this.searchWithWord()
             }
         }
     }



    render() {
        const {classes} = this.props;
        const {address} = this.state;
        const {user} = this.state;
        const {otherAddress} = this.state;
        var {research} = this.state;
        const categories = this.state.categories;
        const serviceUser = this.state.serviceUser;

        research = research.trim();  
        console.log("search:"+research);

        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container style={{boxShadow: 'rgba(51, 51, 51, 0.31) 0px 5px 7px -5px', paddingBottom: '10px', paddingTop: '10px', position: 'sticky', top: '55px', backgroundColor: 'white', zIndex: 11}}>
                            <Grid item xs={4} style={{textAlign: 'center',width: '100%', margin: 'auto', color: '#545659' }}>
                                <TextField
                                    id="input-with-icon-textfield"
                                    InputProps={{
                                        style:{height: 40, color: '#545659'},
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder={'Quel service ?'}
                                    variant={"outlined"}
                                    value={this.state.research}
                                    style={{width: '100%', margin: 'auto'}}
                                    onChange={(event)=>{this.setState({research: event.target.value});}}
                                    onKeyDown={(e)=>this.keyPress(e)}
                                />
                            </Grid>
                            <Grid item xs={4} style={{fontFamily: 'Helvetica Neue, Helvetica,sans-serif',width: '100%', margin: 'auto'}}>
                            <TextField
                            InputProps={{
                                style:{height: 40},
                            }}
                                    id="outlined-select-currency"
                                    select
                                    style={{width:'100%', marginTop: '6px'}}
                                    value={this.state.addressSelected}
                                    name={'addressSelected'}
                                    onChange={(e) => {this.onChange(e);}}
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
                            <Grid item xs={3} className={classes.webvoir} style={{display:"flex",alignItems:"center"}}>
                                {this.state.research.length === 0 || !this.state.research.trim() ?
                                    <Button variant={"contained"} onClick={()=>this.search()} color={"primary"} style={{color:'white'}}>Rechercher</Button>
                                    :
                                    <Button variant={"contained"}  onClick={()=>this.searchWithWord()} color={"primary"} style={{color:'white'}}>Rechercher</Button>
                                }
                            </Grid>
                            <Grid item xs={3} className={classes.mobilevoir} style={{display:"flex",alignItems:"center"}}>
                                {this.state.research.length === 0 || !this.state.research.trim() ?
                                    <Button variant={"contained"} onClick={()=>this.search()} color={"primary"} style={{color:'white'}}><img src="../../static/search-solid1.svg" style={{width: 15, height: 15}}/></Button>
                                    :
                                    <Button variant={"contained"}  onClick={()=>this.searchWithWord()} color={"primary"} style={{color:'white'}}><img src="../../static/search-solid1.svg" style={{width: 15, height: 15}}/></Button>
                                }
                            </Grid>
                        </Grid>
                        <Grid container className={classes.respfilter} style={{position: 'sticky', top: '125px', zIndex: 10, background: 'white', height: 60}}>
                            <Grid item xs={12} style={{height: 50}}>
                                <Grid container>
                                    {this.state.clickedstatut ?
                                        <Grid item xs={5} md={3}  style={{borderRadius: '15px', backgroundColor: '#2FBCD3', boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset', cursor: 'pointer', height: '45px', margin: 10}}>
                                            <Typography onClick={()=> this.yes()} style={{textAlign: 'center', color:'white', fontSize: '0.8rem', paddingTop: 13, height:43}}>Statut</Typography>

                                            <Grid id="status" item xs={12}  style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', height: '100px', marginTop: 8,padding:10,zIndex: 1}}>
                                                <Grid container>
                                                    <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                                        {this.state.checkedParticulier ? <Grid item xs={3}></Grid> :

                                                            <Grid item xs={6} sm={4} md={3} style={{textAlign:'center', margin: 'auto'}}>
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
                                                    </Grid>

                                                    <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                                        {this.state.checkedB ? null :

                                                            <Grid item xs={6} sm={4} md={3} style={{textAlign:'center', margin: 'auto'}}>
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
                                                            </Grid>

                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        :
                                        <Grid item xs={5} md={3} onClick={()=> this.yes()} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', height: '45px', margin: 10}}>
                                            <Typography style={{textAlign: 'center', fontSize: '0.8rem', height:43,paddingTop: 13}}>Statut</Typography>
                                        </Grid>
                                    }
                                    {this.state.clickeddate ?
                                        <>

                                            <Grid item xs={5} md={3}  style={{borderRadius: '15px', backgroundColor: '#2FBCD3', boxShadow: 'rgba(125, 125, 125, 0.5) 0px 0px 10px 3px inset', cursor: 'pointer', height: '45px', margin: 10}}>
                                                <Typography onClick={()=> this.yes2()} style={{textAlign: 'center', color:'white', fontSize: '0.8rem',paddingTop:13,height:43}}>Quelle(s) date(s) ?</Typography>
                                                <Grid id="thedate" item xs={12} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', height: 'auto', marginTop: 8,zIndex: 1, padding: 10}}>
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
                                                                numberOfMonths={1}


                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} style={{textAlign:'center', margin: 'auto'}}>
                                                            <Grid container>
                                                                <Grid item xs={6}>
                                                                    <Button style={{fontSize: '0.8rem',}} onClick={()=>this.cancelDateFilter()}>Annuler</Button>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Button style={{fontSize: '0.8rem',}} onClick={()=>this.filterDate()}>Valider</Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>


                                        </>

                                        :
                                        <Grid item xs={5} md={3} onClick={()=> this.yes2()} style={{borderRadius: '15px', backgroundColor: 'white', boxShadow: 'rgba(164, 164, 164, 0.5) 0px 0px 5px 0px', cursor: 'pointer', height: '45px', margin: 10}}>
                                            <Typography style={{textAlign: 'center', fontSize: '0.8rem',paddingTop:13,height:43 }}>Quelle(s) date(s) ?</Typography>
                                        </Grid>

                                    }
                                </Grid>
                            </Grid>

                            
                        </Grid>
                        {research=='' ?
                            <>
                                <Grid container>
                                    <h3 style={{marginLeft: '15px', fontSize: '1.1rem', color: '#545659'}}>Que recherchez-vous {user.firstname} ?</h3>
                                </Grid>
                                <Grid container className="scrollLittle" style={{overflowX: 'scroll', whiteSpace: 'nowrap', display: 'inline-block', minHeight: '250px'}}>
                                    {categories.map((e,index) => (
                                        <Grid key={index} style={{display: 'inline-block', width: '300px', margin: 'auto 20px'}}>
                                            <Link href={'/serviceByCategory?category='+e._id}>
                                            <Card  style={{width: '300px', margin: '20px auto', borderRadius: '35px', height: '250px'}} className={classes.card}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        style={{height:200}}
                                                        image={e.picture}
                                                        title={e.label}
                                                    />
                                                    <CardContent style={{padding: '5px'}}>
                                                        <Typography gutterBottom style={{fontSize: '1.1rem', textAlign: 'center'}}>
                                                            {e.label}
                                                        </Typography>

                                                    </CardContent>
                                                </CardActionArea>

                                            </Card>
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Grid container>
                                    <h3 style={{marginLeft: '15px', fontSize: '1.1rem', color: '#545659'}}>Nos meilleurs Alfred ...</h3>
                                    {/* Toutes adresses */ this.state.addressSelected === 'all' ?

                                        categories.map(e => (
                                            <Grid container>
                                                {this.state[e.label] !==0 ?
                                                    <Grid item xs={12}>
                                                        <h3 style={{marginLeft:15}}>{e.label}</h3>
                                                    </Grid>
                                                    : null}

                                                {serviceUser.map(a => {
                                                    if (a.service.category === e._id) {
                                                        return (
                                                            <Grid item xs={12} sm={6} md={3}>
                                                                <Card className={classes.card} style={{height: '420px'}}>
                                                                            <CardMedia
                                                                                className={classes.media}
                                                                                style={{height:150}}
                                                                                image={a.service.picture}
                                                                                title={a.service.label}
                                                                            >
                                                                                <img style={{position: 'absolute', width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', top: '60px', left: 0, right: 0, margin: 'auto'}} src={"../"+a.user.picture}/>
                                                                                {a.service_address.city != undefined ? 
                                                                                <Typography style={{position: 'absolute',fontSize: '0.9rem', color: 'white', textShadow:'0px 0px 3px black',fontWeight:600,bottom: '10px', left: 0, right: 0, margin: 'auto', textAlign:'center'}}>
                                                                                     <img src='/static/assets/img/blanc.svg' />
                                                                                     {' ' + a.service_address.city}
                                                                                </Typography>: null}
                                                                                {a.status ==  'Pro' ? <Typography style={{color: 'white', position: 'absolute', top: '10px', left: '10px',background: '#F87280', border: 'white solid 2px', borderRadius: '15px', width: '50px', textAlign: 'center'}}>Pro</Typography> : null}
                                                                            </CardMedia>
                                                                            <CardContent style={{height: 'auto'}}>
                                                                                <Grid container>
                                                                                    <Grid item xs={7}>
                                                                                        <Typography style={{fontSize: '0.9rem', color: '#A3A3A3'}}>{e.label}</Typography>
                                                                                        <Typography style={{fontSize: '1rem'}}>
                                                                                            {a.service.label} par {a.user.firstname}  <img src="../static/checkboxes/roundBlue2Checked.png" style={{width: '13px', height: '13px'}}/>
                                                                                        </Typography>
                                                                                            <StarRatings rating={a.user.score} starRatedColor={"#2FBCD3"} numberOfStars={5} name='rating' starDimension={'20px'} starHoverColor={'#2FBCD3'} starSpacing={'3px'} />
                                                                                            <span style={{marginBottom: '15px', fontSize: '0.6rem'}}>({a.user.number_of_reviews})</span>
                                                                                    </Grid>
                                                                                    <Grid item xs={5}>
                                                                                        <Typography style={{marginBottom: '-20px',marginLeft: '10px', fontSize: '0.8rem'}}>à partir de {a.minimum_basket}€</Typography>
                                                                                        <Link href={"/userServicePreview?id="+ a._id}>
                                                                                            <Button onClick={()=>localStorage.setItem('address',JSON.stringify(this.state.addressSelected))} alt={a.service._id} variant="contained" color="primary"
                                                                                                    style={{width: '80%', color: 'white', margin: '20px auto auto'}}>
                                                                                                Réserver
                                                                                            </Button>
                                                                                        </Link>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                {a.graduated == true || a.is_certified == true || a.level != 0 ?
                                                                                <Grid container style={{marginTop: '20px', marginBottom: '-15px'}}>
                                                                                    {a.graduated == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Diplomé">
                                                                                            <img src='/static/assets/img/diplome.svg' />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {a.is_certified == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Certifié">
                                                                                            <img src='/static/assets/img/certificat.svg' />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {a.level != 0 ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        {a.level == 1 ?
                                                                                            <Tooltip title="Entre 0 et 1 an d'expérience">
                                                                                                <img src='/static/assets/img/experience.svg' />
                                                                                            </Tooltip> 
                                                                                            :null}{a.level == 2 ?
                                                                                                <Tooltip title="Entre 1 et 5 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null} {a.level == 3 ?
                                                                                                <Tooltip title="Entre 5 et 10 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null} {a.level == 4 ?
                                                                                                <Tooltip title="Plus de 10 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            :null}
                                                                                    </Grid>
                                                                                    : null}
                                                                                </Grid> : null}
                                                                            </CardContent>
                                                                    </Card>
                                                            </Grid>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })}

                                                {this.state[e.label] !== 0 ?
                                                    <Grid item xs={12}>
                                                        <hr style={{width: '10%', margin: 'auto', border:'none', height: '10px', marginBottom: '80px', marginTop: '55px', backgroundColor: '#2FBCD3'}} /></Grid>
                                                    : null}

                                            </Grid>
                                        ))

                                        :
                                        /* Adresse spécifique  */
                                        categories.map(e => (
                                            <Grid container>
                                                {this.state[e.label] !== 0 ?
                                                    <Grid item xs={12}>
                                                        <h3 style={{marginLeft:15}}>{e.label}</h3>
                                                    </Grid>
                                                    : null}

                                                <Grid container style={{paddingLeft: '25px'}}>
                                                {serviceUser.map(a => {
                                                    if (a.service.category === e._id) {
                                                        return (
                                                            <Grid item xs={12} sm={6} md={3}>
                                                                <Card className={classes.card} style={{height: '420px'}}>
                                                                            <CardMedia
                                                                                className={classes.media}
                                                                                style={{height:150}}
                                                                                image={a.service.picture}
                                                                                title={a.service.label}
                                                                            >
                                                                                <img style={{position: 'absolute', width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', top: '60px', left: 0, right: 0, margin: 'auto'}} src={"../"+a.user.picture}/>
                                                                                {a.service_address.city != undefined ? 
                                                                                <Typography style={{position: 'absolute',fontSize: '0.9rem', color: 'white',textShadow:'0px 0px 3px black',fontWeight:600, bottom: '10px', left: 0, right: 0, margin: 'auto', textAlign:'center'}}>
                                                                                  <img src='/static/assets/img/blanc.svg' />
                                                                                     {' ' + a.service_address.city}
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
                                                                                </Typography>: null}
                                                                                {a.status ==  'Pro' ? <Typography style={{color: 'white', position: 'absolute', top: '10px', left: '10px',background: '#F87280', border: 'white solid 2px', borderRadius: '15px', width: '50px', textAlign: 'center'}}>Pro</Typography> : null}
                                                                            </CardMedia>
                                                                            <CardContent style={{height: 'auto'}}>
                                                                                <Grid container>
                                                                                    <Grid item xs={7}>
                                                                                        <Typography style={{fontSize: '0.9rem', color: '#A3A3A3'}}>{e.label}</Typography>
                                                                                        <Typography style={{fontSize: '1rem'}}>
                                                                                            {a.service.label} par {a.user.firstname}  <img src="../static/checkboxes/roundBlue2Checked.png" style={{width: '13px', height: '13px'}}/>
                                                                                        </Typography>
                                                                                            <StarRatings rating={a.user.score} starRatedColor={"#2FBCD3"} numberOfStars={5} name='rating' starDimension={'20px'} starHoverColor={'#2FBCD3'} starSpacing={'3px'}
                                                                                            />
                                                                                            <span style={{marginBottom: '15px', fontSize: '0.6rem'}}>({a.user.number_of_reviews})</span>
                                                                                    </Grid>
                                                                                    <Grid item xs={5}>
                                                                                        <Typography style={{marginBottom: '-20px',marginLeft: '10px', fontSize: '0.8rem'}}>à partir de {a.minimum_basket}€</Typography>
                                                                                        <Link href={"/userServicePreview?id="+ a._id}>
                                                                                            <Button onClick={()=>localStorage.setItem('address',JSON.stringify(this.state.addressSelected))} alt={a.service._id} variant="contained" color="primary"
                                                                                                    style={{width: '80%', color: 'white', margin: '20px auto auto'}}>
                                                                                                Réserver
                                                                                            </Button>
                                                                                        </Link>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                {a.graduated == true || a.is_certified == true || a.level != 0 ?
                                                                                <Grid container style={{marginTop: '20px', marginBottom: '-15px'}}>
                                                                                    {a.graduated == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Diplomé">
                                                                                            <img src='/static/assets/img/diplome.svg' />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {a.is_certified == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Certifié">
                                                                                            <img src='/static/assets/img/certificat.svg' />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {a.level != 0 ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        {a.level == 1 ?
                                                                                            <Tooltip title="Entre 0 et 1 an d'expérience">
                                                                                              <img src='/static/assets/img/experience.svg' />
                                                                                            </Tooltip> 
                                                                                            :null}{a.level == 2 ?
                                                                                                <Tooltip title="Entre 1 et 5 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null} {a.level == 3 ?
                                                                                                <Tooltip title="Entre 5 et 10 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null} {a.level == 4 ?
                                                                                                <Tooltip title="Plus de 10 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            :null}
                                                                                    </Grid>
                                                                                    : null}
                                                                                </Grid> : null}
                                                                            </CardContent>
                                                                    </Card>
                                                            </Grid>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })}
                                                </Grid>
                                                {this.state[e.label] !== 0 ?
                                                    <hr style={{width: '10%', margin: 'auto', border:'none', height: '10px', marginBottom: '80px', marginTop: '55px', backgroundColor: '#2FBCD3'}} />
                                                    : null}

                                            </Grid>
                                        ))

                                    }
                                </Grid>
                            </>




                            : null}

                            <>
                            
                            {this.state.research.length === 0 || !this.state.research.trim() ?
                            null
                            :<Grid container>
                                <Typography style={{fontSize: '1.1rem', color: '#A3A3A3', marginLeft: '15px',}}>Résultat pour la recherche : <i style={{fontWeight: 'bold'}}>{this.state.research}</i></Typography>
                            </Grid>}
                                {!this.state.finalServiceUser.length && !this.state.serviceUser.length ? <p>Aucun résultat</p> : null}
                                {this.state.addressSelected === 'all' ?

                                    this.state.categoryFinal.map((e, index) => (
                                        <Grid key={index} container>
                                                {this.state[e.label+'Final'] !== 0 ?
                                            <Grid item xs={12}>
                                                    <h3 style={{marginLeft:15}}>{e.label}</h3>
                                            </Grid>
                                                    : null}

                                                <Grid container style={{paddingLeft: '25px'}}>
                                                {this.state.finalServiceUser.map(s => {

                                                    if (s.service.category === e._id) {
                                                        return (
                                                            <Grid item md={3} sm={6} xs={12}>
                                                                    <Card className={classes.card} style={{height: '420px'}}>
                                                                            <CardMedia
                                                                                className={classes.media}
                                                                                style={{height:150}}
                                                                                image={s.service.picture}
                                                                                title={s.service.label}
                                                                            >
                                                                                <img style={{position: 'absolute', width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', top: '60px', left: 0, right: 0, margin: 'auto'}} src={"../"+s.user.picture}/>
                                                                                {s.service_address.city != undefined ? 
                                                                                <Typography style={{position: 'absolute',fontSize: '0.9rem', color: 'white', textShadow:'0px 0px 3px black',fontWeight:600,bottom: '10px', left: 0, right: 0, margin: 'auto', textAlign:'center'}}>
                                                                                    <img src='/static/assets/img/blanc.svg' />
                                                                                     {' ' + s.service_address.city}
                                                                                </Typography>: null}
                                                                                {s.status ==  'Pro' ? <Typography style={{color: 'white', position: 'absolute', top: '10px', left: '10px',background: '#F87280', border: 'white solid 2px', borderRadius: '15px', width: '50px', textAlign: 'center'}}>Pro</Typography> : null}
                                                                            </CardMedia>
                                                                            <CardContent style={{height: 'auto'}}>
                                                                                <Grid container>
                                                                                    <Grid item xs={7}>
                                                                                        <Typography style={{fontSize: '0.9rem', color: '#A3A3A3'}}>{e.label}</Typography>
                                                                                        <Typography style={{fontSize: '1rem'}}>
                                                                                            {s.service.label} par {s.user.firstname}  <img src="../static/checkboxes/roundBlue2Checked.png" style={{width: '13px', height: '13px'}}/>
                                                                                        </Typography>
                                                                                            <StarRatings rating={s.user.score} starRatedColor={"#2FBCD3"} numberOfStars={5} name='rating' starDimension={'20px'} starHoverColor={'#2FBCD3'} starSpacing={'3px'}
                                                                                            />
                                                                                            <span style={{marginBottom: '15px', fontSize: '0.6rem'}}>({s.user.number_of_reviews})</span>
                                                                                    </Grid>
                                                                                    <Grid item xs={5}>
                                                                                        <Typography style={{marginBottom: '-20px',marginLeft: '10px', fontSize: '0.8rem'}}>à partir de {s.minimum_basket}€</Typography>
                                                                                        <Link href={"/userServicePreview?id="+ s._id}>
                                                                                            <Button onClick={()=>localStorage.setItem('address',JSON.stringify(this.state.addressSelected))} alt={s.service._id} variant="contained" color="primary"
                                                                                                    style={{width: '80%', color: 'white', margin: '20px auto auto'}}>
                                                                                                Réserver
                                                                                            </Button>
                                                                                        </Link>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                {s.graduated == true || s.is_certified == true || s.level != 0 ?
                                                                                <Grid container style={{marginTop: '20px', marginBottom: '-15px'}}>
                                                                                    {s.graduated == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Diplomé">
                                                                                          <img src='/static/assets/img/diplome.svg' />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {s.is_certified == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Certifié">
                                                                                          <img src='/static/assets/img/certificat.svg' />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {s.level != 0 ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        {s.level == 1 ?
                                                                                            <Tooltip title="Entre 0 et 1 an d'expérience">
                                                                                              <img src='/static/assets/img/experience.svg' />
                                                                                            </Tooltip> 
                                                                                            : null} {s.level == 2 ?
                                                                                                <Tooltip title="Entre 1 et 5 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null} {s.level == 3 ?
                                                                                                <Tooltip title="Entre 5 et 10 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null} {s.level == 4 ?
                                                                                                <Tooltip title="Plus de 10 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null}
                                                                                    </Grid>
                                                                                    : null}
                                                                                </Grid> : null}
                                                                            </CardContent>
                                                                    </Card>
                                                                </Grid>
                                                        )
                                                    } else return null

                                                })}
                                                </Grid>
                                                {this.state[e.label+'Final'] !== 0 ?
                                                    <hr style={{width: '10%', margin: 'auto', border:'none', backgroundColor: '#2FBCD3', height: '10px', marginBottom: '80px', marginTop: '55px'}} />
                                                    : null}

                                            </Grid>

                                    ))

                                    :

                                    this.state.categoryFinal.map((e, index) => (
                                        <Grid key={index} container>
                                                {this.state[e.label+'Final'] !== 0 ?
                                            <Grid item xs={12}>
                                                    <h3 style={{marginLeft:15}}>{e.label}</h3>
                                            </Grid>
                                                    : null}

                                                <Grid container style={{paddingLeft: '25px'}}>
                                                {this.state.finalServiceUser.map(s => {

                                                    if (s.service.category === e._id) {
                                                        return (
                                                            <Grid item md={3} sm={6} xs={12}>
                                                            <Card className={classes.card} style={{height: '420px'}}>
                                                                            <CardMedia
                                                                                className={classes.media}
                                                                                style={{height:150}}
                                                                                image={s.service.picture}
                                                                                title={s.service.label}
                                                                            >
                                                                                <img style={{position: 'absolute', width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', top: '60px', left: 0, right: 0, margin: 'auto'}} src={"../"+s.user.picture}/>
                                                                                {s.service_address.city != undefined ? 
                                                                                <Typography style={{position: 'absolute',fontSize: '0.9rem', color: 'white', textShadow:'0px 0px 3px black',fontWeight:600,bottom: '10px', left: 0, right: 0, margin: 'auto', textAlign:'center'}}>
                                                                                    <img src='/static/assets/img/blanc.svg' />
                                                                                     {' ' + s.service_address.city}
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
                                                                                </Typography>: null}
                                                                                {s.status ==  'Pro' ? <Typography style={{color: 'white', position: 'absolute', top: '10px', left: '10px',background: '#F87280', border: 'white solid 2px', borderRadius: '15px', width: '50px', textAlign: 'center'}}>Pro</Typography> : null}
                                                                            </CardMedia>
                                                                            <CardContent style={{height: 'auto'}}>
                                                                                <Grid container>
                                                                                    <Grid item xs={7}>
                                                                                        <Typography style={{fontSize: '0.9rem', color: '#A3A3A3'}}>{e.label}</Typography>
                                                                                        <Typography style={{fontSize: '1rem'}}>
                                                                                            {s.service.label} par {s.user.firstname}  <img src="../static/checkboxes/roundBlue2Checked.png" style={{width: '13px', height: '13px'}}/>
                                                                                        </Typography>
                                                                                            <StarRatings rating={s.user.score} starRatedColor={"#2FBCD3"} numberOfStars={5} name='rating' starDimension={'20px'} starHoverColor={'#2FBCD3'} starSpacing={'3px'} />
                                                                                            <span style={{marginBottom: '15px', fontSize: '0.6rem'}}>({s.user.number_of_reviews})</span>
                                                                                    </Grid>
                                                                                    <Grid item xs={5}>
                                                                                        <Typography style={{marginBottom: '-20px',marginLeft: '10px', fontSize: '0.8rem'}}>à partir de {s.minimum_basket}€</Typography>
                                                                                        <Link href={"/userServicePreview?id="+ s._id}>
                                                                                            <Button onClick={()=>localStorage.setItem('address',JSON.stringify(this.state.addressSelected))} alt={s.service._id} variant="contained" color="primary"
                                                                                                    style={{width: '80%', color: 'white', margin: '20px auto auto'}}>
                                                                                                Réserver
                                                                                            </Button>
                                                                                        </Link>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                {s.graduated == true || s.is_certified == true || s.level != 0 ?
                                                                                <Grid container style={{marginTop: '20px', marginBottom: '-15px'}}>
                                                                                    {s.graduated == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Diplomé">
                                                                                          <img src='/static/assets/img/diplome.svg' />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {s.is_certified == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Certifié">
                                                                                          <img src='/static/assets/img/certificat.svg' />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {s.level != 0 ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        {s.level == 1 ?
                                                                                            <Tooltip title="Entre 0 et 1 an d'expérience">
                                                                                              <img src='/static/assets/img/experience.svg' />
                                                                                            </Tooltip> 
                                                                                            : null} {s.level == 2 ?
                                                                                                <Tooltip title="Entre 1 et 5 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null} {s.level == 3 ?
                                                                                                <Tooltip title="Entre 5 et 10 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null} {s.level == 4 ?
                                                                                                <Tooltip title="Plus de 10 ans d'expérience">
                                                                                                  <img src='/static/assets/img/experience.svg' />
                                                                                                </Tooltip> 
                                                                                            : null}
                                                                                    </Grid>
                                                                                    : null}
                                                                                </Grid> : null}
                                                                            </CardContent>
                                                                    </Card>        
                                                            </Grid>
                                                        )
                                                    } else return null

                                                })}
                                                </Grid>
                                                {this.state[e.label+'Final'] !== 0 ?
                                                    <hr style={{width: '10%', margin: 'auto', border:'none', backgroundColor: '#2FBCD3', height: '10px', marginBottom: '80px', marginTop: '55px'}} />
                                                    : null}


                                        </Grid>
                                    ))

                                }


                            </>
                    </Grid>
                    <Footer/>
                </Layout>
            </Fragment>

        )
    }
}


export default withStyles(styles)(searchLogin);
