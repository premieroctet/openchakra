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
            click: false,
            click2: false,
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

        this.setState({click: true, click2:false});
    }

   async searchWithWord(){
         if(this.state.research !== ""){
             this.setState({serviceUser:[],categoryFinal: [],finalServiceUser:[],resultCategory:[],prestations:[],services:[],uniqCategory:[],uniqCategoryService:[],
                 checkedParticulier:false,idAlfred:[],prestationOk:false,serviceOk:false,categoryOk:false});
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

             await axios.post(url + 'myAlfred/api/category/all/search', obj)
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
             this.setState({click: false, click2: true});
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
        const {click} = this.state;
        const categories = this.state.categories;
        const serviceUser = this.state.serviceUser;
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
                                    onChange={(event)=>{this.setState({research: event.target.value,click2:false});}}
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
                        {click ?
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
                                    {this.state.addressSelected === 'all' ?

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
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16.057" height="20.521" viewBox="0 0 16.057 20.521">
                                                                                        <path id="Tracé_13306" data-name="Tracé 13306" d="M274.542,14959.223l-.392.033-.391.063-.425.061-.36.1-.391.092-.752.252-.684.348-.687.377-.587.441-.587.5-.522.566-.457.566-.391.66-.359.66-.26.725-.1.377-.1.348-.065.41-.066.377-.031.379v.406l.031.568.066.566.1.6.164.566.163.566.228.566.229.566.26.566.294.535.326.568.685,1.035.718,1.008.752.945.75.881.718.789.686.723.62.6.88.818.36.314.36-.314.88-.818.62-.6.685-.723.718-.789.752-.881.752-.945.718-1.008.685-1.035.326-.568.294-.535.26-.566.229-.566.228-.566.163-.566.164-.566.1-.6.065-.566.033-.568v-.406l-.033-.379-.065-.377-.065-.41-.1-.348-.1-.377-.26-.725-.36-.66-.392-.66-.456-.566-.522-.566-.587-.5-.587-.441-.686-.377-.684-.348-.752-.252-.391-.092-.36-.1-.425-.061-.391-.062-.394-.033Zm.784,4.439.326.064.327.061.326.125.294.127.293.188.262.189.228.221.228.221.2.25.2.285.132.283.13.314.065.313.065.318v.689l-.065.316-.065.313-.13.318-.132.281-.2.283-.2.252-.228.221-.228.221-.262.189-.293.188-.294.125-.326.127-.327.064-.326.063h-.719l-.326-.062-.327-.064-.326-.127-.294-.125-.293-.187-.262-.189-.228-.221-.228-.221-.2-.252-.2-.283-.132-.281-.13-.318-.065-.312-.065-.316v-.689l.065-.318.065-.312.13-.314.132-.283.2-.285.2-.25.228-.221.228-.221.262-.189.293-.187.294-.127.326-.125.327-.061.326-.064Z" transform="translate(-266.938 -14959.223)" fill="white" fillRule="evenodd"/>
                                                                                    </svg> 
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
                                                                                            <StarRatings
                                                                                                rating={a.user.score}
                                                                                                starRatedColor={"#2FBCD3"}
                                                                                                numberOfStars={5}
                                                                                                name='rating'
                                                                                                starDimension={'20px'}
                                                                                                starHoverColor={'#2FBCD3'}
                                                                                                starSpacing={'3px'}
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
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="21.305" height="18.675" viewBox="0 0 26.305 23.675">
                                                                                                <g id="Groupe_1739" data-name="Groupe 1739" transform="translate(0 -24)">
                                                                                                    <g id="Groupe_1597" data-name="Groupe 1597" transform="translate(0 24)">
                                                                                                    <g id="Groupe_1596" data-name="Groupe 1596" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13252" data-name="Tracé 13252" d="M24.551,24H4.384a1.754,1.754,0,0,0-1.754,1.754V39.783H.438A.438.438,0,0,0,0,40.221a1.754,1.754,0,0,0,1.754,1.754H14.468v5.261a.438.438,0,0,0,.748.31l2.321-2.321,2.321,2.321a.438.438,0,0,0,.31.128.433.433,0,0,0,.168-.033.438.438,0,0,0,.271-.405V41.975h1.315a1.754,1.754,0,0,0,1.754-1.754V26.192h2.192a.438.438,0,0,0,.438-.438A1.754,1.754,0,0,0,24.551,24Zm-.759,1.315a.877.877,0,0,1,1.518,0Z" transform="translate(0 -24)" fill="#f87280"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1599" data-name="Groupe 1599" transform="translate(13.345 32.336)">
                                                                                                    <g id="Groupe_1598" data-name="Groupe 1598" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13253" data-name="Tracé 13253" d="M251.837,181.493l-.562-1.006.564-1.005a.438.438,0,0,0-.167-.6l-.033-.017-1.047-.479-.135-1.144a.438.438,0,0,0-.487-.384l-.033.005-1.13.224-.782-.847a.452.452,0,0,0-.639,0l-.005,0-.782.847-1.13-.224a.438.438,0,0,0-.515.345q0,.017-.005.033l-.135,1.144-1.046.48a.438.438,0,0,0-.216.581q.008.017.017.033l.564,1-.564,1.005a.438.438,0,0,0,.167.6l.033.017,1.046.48.135,1.145a.438.438,0,0,0,.487.384l.033-.005,1.13-.224.782.847a.438.438,0,0,0,.62.024l.024-.024.782-.847,1.13.224a.432.432,0,0,0,.343-.075.438.438,0,0,0,.175-.3l.135-1.144,1.047-.48a.438.438,0,0,0,.216-.581C251.848,181.515,251.843,181.5,251.837,181.493Zm-1.446-.792.451.8-.838.384a.438.438,0,0,0-.253.347l-.108.918-.906-.179a.432.432,0,0,0-.407.132l-.626.679-.626-.678a.438.438,0,0,0-.322-.141.4.4,0,0,0-.085.009l-.906.179-.108-.918a.438.438,0,0,0-.253-.347l-.838-.384.451-.8a.43.43,0,0,0,0-.429v0l-.451-.8.838-.384a.438.438,0,0,0,.253-.347l.108-.918.906.179a.434.434,0,0,0,.407-.132l.626-.68.626.678a.432.432,0,0,0,.407.132l.906-.179.108.918a.438.438,0,0,0,.253.347l.838.385-.451.8A.439.439,0,0,0,250.39,180.7Z" transform="translate(-243.512 -176.109)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1601" data-name="Groupe 1601" transform="translate(15.345 34.522)">
                                                                                                    <g id="Groupe_1600" data-name="Groupe 1600" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13254" data-name="Tracé 13254" d="M282.192,216a2.192,2.192,0,1,0,2.192,2.192A2.192,2.192,0,0,0,282.192,216Zm0,3.507a1.315,1.315,0,1,1,1.315-1.315A1.315,1.315,0,0,1,282.192,219.507Z" transform="translate(-280 -216)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1603" data-name="Groupe 1603" transform="translate(9.852 26.657)">
                                                                                                    <g id="Groupe_1602" data-name="Groupe 1602" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2272" data-name="Rectangle 2272" width="6" transform="translate(0.148 0.388)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1605" data-name="Groupe 1605" transform="translate(5.254 29.284)">
                                                                                                    <g id="Groupe_1604" data-name="Groupe 1604" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2273" data-name="Rectangle 2273" width="16" height="1" transform="translate(-0.254 -0.239)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1607" data-name="Groupe 1607" transform="translate(5.254 31.255)">
                                                                                                    <g id="Groupe_1606" data-name="Groupe 1606" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2274" data-name="Rectangle 2274" width="16" height="1" transform="translate(-0.254 -0.209)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1609" data-name="Groupe 1609" transform="translate(5.911 36.509)">
                                                                                                    <g id="Groupe_1608" data-name="Groupe 1608" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2275" data-name="Rectangle 2275" width="5" height="2" transform="translate(0.089 -0.463)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </svg>
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {a.is_certified == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Certifié">
                                                                                            <svg id="Groupe_1737" data-name="Groupe 1737" xmlns="http://www.w3.org/2000/svg" width="15.673" height="21.846" viewBox="0 0 22.673 28.846">
                                                                                                <g id="Groupe_1069" data-name="Groupe 1069" transform="translate(0)">
                                                                                                    <path id="Tracé_11017" data-name="Tracé 11017" d="M48.308,10.2,46.114,7.936l.442-3.123a.894.894,0,0,0-.731-1.006l-3.107-.545L41.239.476A.894.894,0,0,0,40.057.091L37.223,1.476,34.389.091a.894.894,0,0,0-1.183.384L31.728,3.263l-3.107.545a.894.894,0,0,0-.731,1.006l.442,3.123L26.138,10.2a.894.894,0,0,0,0,1.244l2.193,2.267-.442,3.125a.894.894,0,0,0,.731,1.006l2.487.436v9.671a.894.894,0,0,0,1.294.8l4.822-2.41,4.821,2.41a.894.894,0,0,0,1.294-.8V18.281l2.487-.436a.894.894,0,0,0,.731-1.006l-.442-3.125,2.193-2.267A.894.894,0,0,0,48.308,10.2ZM37.623,24.542a.894.894,0,0,0-.8,0L32.9,26.505V20.591l.31.585a.894.894,0,0,0,1.183.384l2.834-1.386,2.833,1.386a.894.894,0,0,0,1.183-.384l.31-.585v5.914Z" transform="translate(-25.886 0)" fill="#f87280"/>
                                                                                                    <path id="Tracé_11018" data-name="Tracé 11018" d="M75.792,39.507a6.115,6.115,0,1,0,6.115,6.115A6.122,6.122,0,0,0,75.792,39.507Zm0,10.442a4.327,4.327,0,1,1,4.326-4.328A4.332,4.332,0,0,1,75.792,49.949Z" transform="translate(-64.455 -34.797)" fill="#fff"/>
                                                                                                    <path id="Tracé_11019" data-name="Tracé 11019" d="M98.045,69.831,95.4,72.472l-1.005-1a.894.894,0,1,0-1.264,1.265l1.637,1.636a.894.894,0,0,0,1.264,0L99.309,71.1a.894.894,0,0,0-1.264-1.265Z" transform="translate(-84.885 -61.274)" fill="#fff"/>
                                                                                                </g>
                                                                                            </svg>
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {a.level != 0 ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        {a.level == 1 ?
                                                                                            <Tooltip title="Entre 0 et 1 an d'expérience">
                                                                                                <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                    <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                    <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                        <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                    </g>
                                                                                                    <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                    <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                    <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                    </g>
                                                                                                </svg>
                                                                                            </Tooltip> 
                                                                                            :null}{a.level == 2 ?
                                                                                                <Tooltip title="Entre 1 et 5 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
                                                                                                </Tooltip> 
                                                                                            : null} {a.level == 3 ?
                                                                                                <Tooltip title="Entre 5 et 10 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
                                                                                                </Tooltip> 
                                                                                            : null} {a.level == 4 ?
                                                                                                <Tooltip title="Plus de 10 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
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
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16.057" height="20.521" viewBox="0 0 16.057 20.521">
                                                                                        <path id="Tracé_13306" data-name="Tracé 13306" d="M274.542,14959.223l-.392.033-.391.063-.425.061-.36.1-.391.092-.752.252-.684.348-.687.377-.587.441-.587.5-.522.566-.457.566-.391.66-.359.66-.26.725-.1.377-.1.348-.065.41-.066.377-.031.379v.406l.031.568.066.566.1.6.164.566.163.566.228.566.229.566.26.566.294.535.326.568.685,1.035.718,1.008.752.945.75.881.718.789.686.723.62.6.88.818.36.314.36-.314.88-.818.62-.6.685-.723.718-.789.752-.881.752-.945.718-1.008.685-1.035.326-.568.294-.535.26-.566.229-.566.228-.566.163-.566.164-.566.1-.6.065-.566.033-.568v-.406l-.033-.379-.065-.377-.065-.41-.1-.348-.1-.377-.26-.725-.36-.66-.392-.66-.456-.566-.522-.566-.587-.5-.587-.441-.686-.377-.684-.348-.752-.252-.391-.092-.36-.1-.425-.061-.391-.062-.394-.033Zm.784,4.439.326.064.327.061.326.125.294.127.293.188.262.189.228.221.228.221.2.25.2.285.132.283.13.314.065.313.065.318v.689l-.065.316-.065.313-.13.318-.132.281-.2.283-.2.252-.228.221-.228.221-.262.189-.293.188-.294.125-.326.127-.327.064-.326.063h-.719l-.326-.062-.327-.064-.326-.127-.294-.125-.293-.187-.262-.189-.228-.221-.228-.221-.2-.252-.2-.283-.132-.281-.13-.318-.065-.312-.065-.316v-.689l.065-.318.065-.312.13-.314.132-.283.2-.285.2-.25.228-.221.228-.221.262-.189.293-.187.294-.127.326-.125.327-.061.326-.064Z" transform="translate(-266.938 -14959.223)" fill="white" fillRule="evenodd"/>
                                                                                    </svg> 
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
                                                                                            <StarRatings
                                                                                                rating={a.user.score}
                                                                                                starRatedColor={"#2FBCD3"}
                                                                                                numberOfStars={5}
                                                                                                name='rating'
                                                                                                starDimension={'20px'}
                                                                                                starHoverColor={'#2FBCD3'}
                                                                                                starSpacing={'3px'}
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
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="21.305" height="18.675" viewBox="0 0 26.305 23.675">
                                                                                                <g id="Groupe_1739" data-name="Groupe 1739" transform="translate(0 -24)">
                                                                                                    <g id="Groupe_1597" data-name="Groupe 1597" transform="translate(0 24)">
                                                                                                    <g id="Groupe_1596" data-name="Groupe 1596" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13252" data-name="Tracé 13252" d="M24.551,24H4.384a1.754,1.754,0,0,0-1.754,1.754V39.783H.438A.438.438,0,0,0,0,40.221a1.754,1.754,0,0,0,1.754,1.754H14.468v5.261a.438.438,0,0,0,.748.31l2.321-2.321,2.321,2.321a.438.438,0,0,0,.31.128.433.433,0,0,0,.168-.033.438.438,0,0,0,.271-.405V41.975h1.315a1.754,1.754,0,0,0,1.754-1.754V26.192h2.192a.438.438,0,0,0,.438-.438A1.754,1.754,0,0,0,24.551,24Zm-.759,1.315a.877.877,0,0,1,1.518,0Z" transform="translate(0 -24)" fill="#f87280"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1599" data-name="Groupe 1599" transform="translate(13.345 32.336)">
                                                                                                    <g id="Groupe_1598" data-name="Groupe 1598" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13253" data-name="Tracé 13253" d="M251.837,181.493l-.562-1.006.564-1.005a.438.438,0,0,0-.167-.6l-.033-.017-1.047-.479-.135-1.144a.438.438,0,0,0-.487-.384l-.033.005-1.13.224-.782-.847a.452.452,0,0,0-.639,0l-.005,0-.782.847-1.13-.224a.438.438,0,0,0-.515.345q0,.017-.005.033l-.135,1.144-1.046.48a.438.438,0,0,0-.216.581q.008.017.017.033l.564,1-.564,1.005a.438.438,0,0,0,.167.6l.033.017,1.046.48.135,1.145a.438.438,0,0,0,.487.384l.033-.005,1.13-.224.782.847a.438.438,0,0,0,.62.024l.024-.024.782-.847,1.13.224a.432.432,0,0,0,.343-.075.438.438,0,0,0,.175-.3l.135-1.144,1.047-.48a.438.438,0,0,0,.216-.581C251.848,181.515,251.843,181.5,251.837,181.493Zm-1.446-.792.451.8-.838.384a.438.438,0,0,0-.253.347l-.108.918-.906-.179a.432.432,0,0,0-.407.132l-.626.679-.626-.678a.438.438,0,0,0-.322-.141.4.4,0,0,0-.085.009l-.906.179-.108-.918a.438.438,0,0,0-.253-.347l-.838-.384.451-.8a.43.43,0,0,0,0-.429v0l-.451-.8.838-.384a.438.438,0,0,0,.253-.347l.108-.918.906.179a.434.434,0,0,0,.407-.132l.626-.68.626.678a.432.432,0,0,0,.407.132l.906-.179.108.918a.438.438,0,0,0,.253.347l.838.385-.451.8A.439.439,0,0,0,250.39,180.7Z" transform="translate(-243.512 -176.109)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1601" data-name="Groupe 1601" transform="translate(15.345 34.522)">
                                                                                                    <g id="Groupe_1600" data-name="Groupe 1600" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13254" data-name="Tracé 13254" d="M282.192,216a2.192,2.192,0,1,0,2.192,2.192A2.192,2.192,0,0,0,282.192,216Zm0,3.507a1.315,1.315,0,1,1,1.315-1.315A1.315,1.315,0,0,1,282.192,219.507Z" transform="translate(-280 -216)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1603" data-name="Groupe 1603" transform="translate(9.852 26.657)">
                                                                                                    <g id="Groupe_1602" data-name="Groupe 1602" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2272" data-name="Rectangle 2272" width="6" transform="translate(0.148 0.388)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1605" data-name="Groupe 1605" transform="translate(5.254 29.284)">
                                                                                                    <g id="Groupe_1604" data-name="Groupe 1604" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2273" data-name="Rectangle 2273" width="16" height="1" transform="translate(-0.254 -0.239)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1607" data-name="Groupe 1607" transform="translate(5.254 31.255)">
                                                                                                    <g id="Groupe_1606" data-name="Groupe 1606" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2274" data-name="Rectangle 2274" width="16" height="1" transform="translate(-0.254 -0.209)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1609" data-name="Groupe 1609" transform="translate(5.911 36.509)">
                                                                                                    <g id="Groupe_1608" data-name="Groupe 1608" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2275" data-name="Rectangle 2275" width="5" height="2" transform="translate(0.089 -0.463)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </svg>
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {a.is_certified == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Certifié">
                                                                                            <svg id="Groupe_1737" data-name="Groupe 1737" xmlns="http://www.w3.org/2000/svg" width="15.673" height="21.846" viewBox="0 0 22.673 28.846">
                                                                                                <g id="Groupe_1069" data-name="Groupe 1069" transform="translate(0)">
                                                                                                    <path id="Tracé_11017" data-name="Tracé 11017" d="M48.308,10.2,46.114,7.936l.442-3.123a.894.894,0,0,0-.731-1.006l-3.107-.545L41.239.476A.894.894,0,0,0,40.057.091L37.223,1.476,34.389.091a.894.894,0,0,0-1.183.384L31.728,3.263l-3.107.545a.894.894,0,0,0-.731,1.006l.442,3.123L26.138,10.2a.894.894,0,0,0,0,1.244l2.193,2.267-.442,3.125a.894.894,0,0,0,.731,1.006l2.487.436v9.671a.894.894,0,0,0,1.294.8l4.822-2.41,4.821,2.41a.894.894,0,0,0,1.294-.8V18.281l2.487-.436a.894.894,0,0,0,.731-1.006l-.442-3.125,2.193-2.267A.894.894,0,0,0,48.308,10.2ZM37.623,24.542a.894.894,0,0,0-.8,0L32.9,26.505V20.591l.31.585a.894.894,0,0,0,1.183.384l2.834-1.386,2.833,1.386a.894.894,0,0,0,1.183-.384l.31-.585v5.914Z" transform="translate(-25.886 0)" fill="#f87280"/>
                                                                                                    <path id="Tracé_11018" data-name="Tracé 11018" d="M75.792,39.507a6.115,6.115,0,1,0,6.115,6.115A6.122,6.122,0,0,0,75.792,39.507Zm0,10.442a4.327,4.327,0,1,1,4.326-4.328A4.332,4.332,0,0,1,75.792,49.949Z" transform="translate(-64.455 -34.797)" fill="#fff"/>
                                                                                                    <path id="Tracé_11019" data-name="Tracé 11019" d="M98.045,69.831,95.4,72.472l-1.005-1a.894.894,0,1,0-1.264,1.265l1.637,1.636a.894.894,0,0,0,1.264,0L99.309,71.1a.894.894,0,0,0-1.264-1.265Z" transform="translate(-84.885 -61.274)" fill="#fff"/>
                                                                                                </g>
                                                                                            </svg>
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {a.level != 0 ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        {a.level == 1 ?
                                                                                            <Tooltip title="Entre 0 et 1 an d'expérience">
                                                                                                <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                    <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                    <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                        <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                    </g>
                                                                                                    <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                    <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                    <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                    </g>
                                                                                                </svg>
                                                                                            </Tooltip> 
                                                                                            :null}{a.level == 2 ?
                                                                                                <Tooltip title="Entre 1 et 5 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
                                                                                                </Tooltip> 
                                                                                            : null} {a.level == 3 ?
                                                                                                <Tooltip title="Entre 5 et 10 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
                                                                                                </Tooltip> 
                                                                                            : null} {a.level == 4 ?
                                                                                                <Tooltip title="Plus de 10 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
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
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16.057" height="20.521" viewBox="0 0 16.057 20.521">
                                                                                        <path id="Tracé_13306" data-name="Tracé 13306" d="M274.542,14959.223l-.392.033-.391.063-.425.061-.36.1-.391.092-.752.252-.684.348-.687.377-.587.441-.587.5-.522.566-.457.566-.391.66-.359.66-.26.725-.1.377-.1.348-.065.41-.066.377-.031.379v.406l.031.568.066.566.1.6.164.566.163.566.228.566.229.566.26.566.294.535.326.568.685,1.035.718,1.008.752.945.75.881.718.789.686.723.62.6.88.818.36.314.36-.314.88-.818.62-.6.685-.723.718-.789.752-.881.752-.945.718-1.008.685-1.035.326-.568.294-.535.26-.566.229-.566.228-.566.163-.566.164-.566.1-.6.065-.566.033-.568v-.406l-.033-.379-.065-.377-.065-.41-.1-.348-.1-.377-.26-.725-.36-.66-.392-.66-.456-.566-.522-.566-.587-.5-.587-.441-.686-.377-.684-.348-.752-.252-.391-.092-.36-.1-.425-.061-.391-.062-.394-.033Zm.784,4.439.326.064.327.061.326.125.294.127.293.188.262.189.228.221.228.221.2.25.2.285.132.283.13.314.065.313.065.318v.689l-.065.316-.065.313-.13.318-.132.281-.2.283-.2.252-.228.221-.228.221-.262.189-.293.188-.294.125-.326.127-.327.064-.326.063h-.719l-.326-.062-.327-.064-.326-.127-.294-.125-.293-.187-.262-.189-.228-.221-.228-.221-.2-.252-.2-.283-.132-.281-.13-.318-.065-.312-.065-.316v-.689l.065-.318.065-.312.13-.314.132-.283.2-.285.2-.25.228-.221.228-.221.262-.189.293-.187.294-.127.326-.125.327-.061.326-.064Z" transform="translate(-266.938 -14959.223)" fill="white" fillRule="evenodd"/>
                                                                                    </svg> 
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
                                                                                            <StarRatings
                                                                                                rating={s.user.score}
                                                                                                starRatedColor={"#2FBCD3"}
                                                                                                numberOfStars={5}
                                                                                                name='rating'
                                                                                                starDimension={'20px'}
                                                                                                starHoverColor={'#2FBCD3'}
                                                                                                starSpacing={'3px'}
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
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="21.305" height="18.675" viewBox="0 0 26.305 23.675">
                                                                                                <g id="Groupe_1739" data-name="Groupe 1739" transform="translate(0 -24)">
                                                                                                    <g id="Groupe_1597" data-name="Groupe 1597" transform="translate(0 24)">
                                                                                                    <g id="Groupe_1596" data-name="Groupe 1596" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13252" data-name="Tracé 13252" d="M24.551,24H4.384a1.754,1.754,0,0,0-1.754,1.754V39.783H.438A.438.438,0,0,0,0,40.221a1.754,1.754,0,0,0,1.754,1.754H14.468v5.261a.438.438,0,0,0,.748.31l2.321-2.321,2.321,2.321a.438.438,0,0,0,.31.128.433.433,0,0,0,.168-.033.438.438,0,0,0,.271-.405V41.975h1.315a1.754,1.754,0,0,0,1.754-1.754V26.192h2.192a.438.438,0,0,0,.438-.438A1.754,1.754,0,0,0,24.551,24Zm-.759,1.315a.877.877,0,0,1,1.518,0Z" transform="translate(0 -24)" fill="#f87280"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1599" data-name="Groupe 1599" transform="translate(13.345 32.336)">
                                                                                                    <g id="Groupe_1598" data-name="Groupe 1598" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13253" data-name="Tracé 13253" d="M251.837,181.493l-.562-1.006.564-1.005a.438.438,0,0,0-.167-.6l-.033-.017-1.047-.479-.135-1.144a.438.438,0,0,0-.487-.384l-.033.005-1.13.224-.782-.847a.452.452,0,0,0-.639,0l-.005,0-.782.847-1.13-.224a.438.438,0,0,0-.515.345q0,.017-.005.033l-.135,1.144-1.046.48a.438.438,0,0,0-.216.581q.008.017.017.033l.564,1-.564,1.005a.438.438,0,0,0,.167.6l.033.017,1.046.48.135,1.145a.438.438,0,0,0,.487.384l.033-.005,1.13-.224.782.847a.438.438,0,0,0,.62.024l.024-.024.782-.847,1.13.224a.432.432,0,0,0,.343-.075.438.438,0,0,0,.175-.3l.135-1.144,1.047-.48a.438.438,0,0,0,.216-.581C251.848,181.515,251.843,181.5,251.837,181.493Zm-1.446-.792.451.8-.838.384a.438.438,0,0,0-.253.347l-.108.918-.906-.179a.432.432,0,0,0-.407.132l-.626.679-.626-.678a.438.438,0,0,0-.322-.141.4.4,0,0,0-.085.009l-.906.179-.108-.918a.438.438,0,0,0-.253-.347l-.838-.384.451-.8a.43.43,0,0,0,0-.429v0l-.451-.8.838-.384a.438.438,0,0,0,.253-.347l.108-.918.906.179a.434.434,0,0,0,.407-.132l.626-.68.626.678a.432.432,0,0,0,.407.132l.906-.179.108.918a.438.438,0,0,0,.253.347l.838.385-.451.8A.439.439,0,0,0,250.39,180.7Z" transform="translate(-243.512 -176.109)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1601" data-name="Groupe 1601" transform="translate(15.345 34.522)">
                                                                                                    <g id="Groupe_1600" data-name="Groupe 1600" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13254" data-name="Tracé 13254" d="M282.192,216a2.192,2.192,0,1,0,2.192,2.192A2.192,2.192,0,0,0,282.192,216Zm0,3.507a1.315,1.315,0,1,1,1.315-1.315A1.315,1.315,0,0,1,282.192,219.507Z" transform="translate(-280 -216)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1603" data-name="Groupe 1603" transform="translate(9.852 26.657)">
                                                                                                    <g id="Groupe_1602" data-name="Groupe 1602" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2272" data-name="Rectangle 2272" width="6" transform="translate(0.148 0.388)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1605" data-name="Groupe 1605" transform="translate(5.254 29.284)">
                                                                                                    <g id="Groupe_1604" data-name="Groupe 1604" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2273" data-name="Rectangle 2273" width="16" height="1" transform="translate(-0.254 -0.239)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1607" data-name="Groupe 1607" transform="translate(5.254 31.255)">
                                                                                                    <g id="Groupe_1606" data-name="Groupe 1606" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2274" data-name="Rectangle 2274" width="16" height="1" transform="translate(-0.254 -0.209)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1609" data-name="Groupe 1609" transform="translate(5.911 36.509)">
                                                                                                    <g id="Groupe_1608" data-name="Groupe 1608" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2275" data-name="Rectangle 2275" width="5" height="2" transform="translate(0.089 -0.463)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </svg>
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {s.is_certified == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Certifié">
                                                                                            <svg id="Groupe_1737" data-name="Groupe 1737" xmlns="http://www.w3.org/2000/svg" width="15.673" height="21.846" viewBox="0 0 22.673 28.846">
                                                                                                <g id="Groupe_1069" data-name="Groupe 1069" transform="translate(0)">
                                                                                                    <path id="Tracé_11017" data-name="Tracé 11017" d="M48.308,10.2,46.114,7.936l.442-3.123a.894.894,0,0,0-.731-1.006l-3.107-.545L41.239.476A.894.894,0,0,0,40.057.091L37.223,1.476,34.389.091a.894.894,0,0,0-1.183.384L31.728,3.263l-3.107.545a.894.894,0,0,0-.731,1.006l.442,3.123L26.138,10.2a.894.894,0,0,0,0,1.244l2.193,2.267-.442,3.125a.894.894,0,0,0,.731,1.006l2.487.436v9.671a.894.894,0,0,0,1.294.8l4.822-2.41,4.821,2.41a.894.894,0,0,0,1.294-.8V18.281l2.487-.436a.894.894,0,0,0,.731-1.006l-.442-3.125,2.193-2.267A.894.894,0,0,0,48.308,10.2ZM37.623,24.542a.894.894,0,0,0-.8,0L32.9,26.505V20.591l.31.585a.894.894,0,0,0,1.183.384l2.834-1.386,2.833,1.386a.894.894,0,0,0,1.183-.384l.31-.585v5.914Z" transform="translate(-25.886 0)" fill="#f87280"/>
                                                                                                    <path id="Tracé_11018" data-name="Tracé 11018" d="M75.792,39.507a6.115,6.115,0,1,0,6.115,6.115A6.122,6.122,0,0,0,75.792,39.507Zm0,10.442a4.327,4.327,0,1,1,4.326-4.328A4.332,4.332,0,0,1,75.792,49.949Z" transform="translate(-64.455 -34.797)" fill="#fff"/>
                                                                                                    <path id="Tracé_11019" data-name="Tracé 11019" d="M98.045,69.831,95.4,72.472l-1.005-1a.894.894,0,1,0-1.264,1.265l1.637,1.636a.894.894,0,0,0,1.264,0L99.309,71.1a.894.894,0,0,0-1.264-1.265Z" transform="translate(-84.885 -61.274)" fill="#fff"/>
                                                                                                </g>
                                                                                            </svg>
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {s.level != 0 ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        {s.level == 1 ?
                                                                                            <Tooltip title="Entre 0 et 1 an d'expérience">
                                                                                                <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                    <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                    <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                        <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                    </g>
                                                                                                    <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                    <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                    <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                    </g>
                                                                                                </svg>
                                                                                            </Tooltip> 
                                                                                            : null} {s.level == 2 ?
                                                                                                <Tooltip title="Entre 1 et 5 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
                                                                                                </Tooltip> 
                                                                                            : null} {s.level == 3 ?
                                                                                                <Tooltip title="Entre 5 et 10 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
                                                                                                </Tooltip> 
                                                                                            : null} {s.level == 4 ?
                                                                                                <Tooltip title="Plus de 10 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
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
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16.057" height="20.521" viewBox="0 0 16.057 20.521">
                                                                                        <path id="Tracé_13306" data-name="Tracé 13306" d="M274.542,14959.223l-.392.033-.391.063-.425.061-.36.1-.391.092-.752.252-.684.348-.687.377-.587.441-.587.5-.522.566-.457.566-.391.66-.359.66-.26.725-.1.377-.1.348-.065.41-.066.377-.031.379v.406l.031.568.066.566.1.6.164.566.163.566.228.566.229.566.26.566.294.535.326.568.685,1.035.718,1.008.752.945.75.881.718.789.686.723.62.6.88.818.36.314.36-.314.88-.818.62-.6.685-.723.718-.789.752-.881.752-.945.718-1.008.685-1.035.326-.568.294-.535.26-.566.229-.566.228-.566.163-.566.164-.566.1-.6.065-.566.033-.568v-.406l-.033-.379-.065-.377-.065-.41-.1-.348-.1-.377-.26-.725-.36-.66-.392-.66-.456-.566-.522-.566-.587-.5-.587-.441-.686-.377-.684-.348-.752-.252-.391-.092-.36-.1-.425-.061-.391-.062-.394-.033Zm.784,4.439.326.064.327.061.326.125.294.127.293.188.262.189.228.221.228.221.2.25.2.285.132.283.13.314.065.313.065.318v.689l-.065.316-.065.313-.13.318-.132.281-.2.283-.2.252-.228.221-.228.221-.262.189-.293.188-.294.125-.326.127-.327.064-.326.063h-.719l-.326-.062-.327-.064-.326-.127-.294-.125-.293-.187-.262-.189-.228-.221-.228-.221-.2-.252-.2-.283-.132-.281-.13-.318-.065-.312-.065-.316v-.689l.065-.318.065-.312.13-.314.132-.283.2-.285.2-.25.228-.221.228-.221.262-.189.293-.187.294-.127.326-.125.327-.061.326-.064Z" transform="translate(-266.938 -14959.223)" fill="white" fillRule="evenodd"/>
                                                                                    </svg> 
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
                                                                                            <StarRatings
                                                                                                rating={s.user.score}
                                                                                                starRatedColor={"#2FBCD3"}
                                                                                                numberOfStars={5}
                                                                                                name='rating'
                                                                                                starDimension={'20px'}
                                                                                                starHoverColor={'#2FBCD3'}
                                                                                                starSpacing={'3px'}
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
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="21.305" height="18.675" viewBox="0 0 26.305 23.675">
                                                                                                <g id="Groupe_1739" data-name="Groupe 1739" transform="translate(0 -24)">
                                                                                                    <g id="Groupe_1597" data-name="Groupe 1597" transform="translate(0 24)">
                                                                                                    <g id="Groupe_1596" data-name="Groupe 1596" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13252" data-name="Tracé 13252" d="M24.551,24H4.384a1.754,1.754,0,0,0-1.754,1.754V39.783H.438A.438.438,0,0,0,0,40.221a1.754,1.754,0,0,0,1.754,1.754H14.468v5.261a.438.438,0,0,0,.748.31l2.321-2.321,2.321,2.321a.438.438,0,0,0,.31.128.433.433,0,0,0,.168-.033.438.438,0,0,0,.271-.405V41.975h1.315a1.754,1.754,0,0,0,1.754-1.754V26.192h2.192a.438.438,0,0,0,.438-.438A1.754,1.754,0,0,0,24.551,24Zm-.759,1.315a.877.877,0,0,1,1.518,0Z" transform="translate(0 -24)" fill="#f87280"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1599" data-name="Groupe 1599" transform="translate(13.345 32.336)">
                                                                                                    <g id="Groupe_1598" data-name="Groupe 1598" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13253" data-name="Tracé 13253" d="M251.837,181.493l-.562-1.006.564-1.005a.438.438,0,0,0-.167-.6l-.033-.017-1.047-.479-.135-1.144a.438.438,0,0,0-.487-.384l-.033.005-1.13.224-.782-.847a.452.452,0,0,0-.639,0l-.005,0-.782.847-1.13-.224a.438.438,0,0,0-.515.345q0,.017-.005.033l-.135,1.144-1.046.48a.438.438,0,0,0-.216.581q.008.017.017.033l.564,1-.564,1.005a.438.438,0,0,0,.167.6l.033.017,1.046.48.135,1.145a.438.438,0,0,0,.487.384l.033-.005,1.13-.224.782.847a.438.438,0,0,0,.62.024l.024-.024.782-.847,1.13.224a.432.432,0,0,0,.343-.075.438.438,0,0,0,.175-.3l.135-1.144,1.047-.48a.438.438,0,0,0,.216-.581C251.848,181.515,251.843,181.5,251.837,181.493Zm-1.446-.792.451.8-.838.384a.438.438,0,0,0-.253.347l-.108.918-.906-.179a.432.432,0,0,0-.407.132l-.626.679-.626-.678a.438.438,0,0,0-.322-.141.4.4,0,0,0-.085.009l-.906.179-.108-.918a.438.438,0,0,0-.253-.347l-.838-.384.451-.8a.43.43,0,0,0,0-.429v0l-.451-.8.838-.384a.438.438,0,0,0,.253-.347l.108-.918.906.179a.434.434,0,0,0,.407-.132l.626-.68.626.678a.432.432,0,0,0,.407.132l.906-.179.108.918a.438.438,0,0,0,.253.347l.838.385-.451.8A.439.439,0,0,0,250.39,180.7Z" transform="translate(-243.512 -176.109)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1601" data-name="Groupe 1601" transform="translate(15.345 34.522)">
                                                                                                    <g id="Groupe_1600" data-name="Groupe 1600" transform="translate(0 0)">
                                                                                                        <path id="Tracé_13254" data-name="Tracé 13254" d="M282.192,216a2.192,2.192,0,1,0,2.192,2.192A2.192,2.192,0,0,0,282.192,216Zm0,3.507a1.315,1.315,0,1,1,1.315-1.315A1.315,1.315,0,0,1,282.192,219.507Z" transform="translate(-280 -216)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1603" data-name="Groupe 1603" transform="translate(9.852 26.657)">
                                                                                                    <g id="Groupe_1602" data-name="Groupe 1602" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2272" data-name="Rectangle 2272" width="6" transform="translate(0.148 0.388)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1605" data-name="Groupe 1605" transform="translate(5.254 29.284)">
                                                                                                    <g id="Groupe_1604" data-name="Groupe 1604" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2273" data-name="Rectangle 2273" width="16" height="1" transform="translate(-0.254 -0.239)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1607" data-name="Groupe 1607" transform="translate(5.254 31.255)">
                                                                                                    <g id="Groupe_1606" data-name="Groupe 1606" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2274" data-name="Rectangle 2274" width="16" height="1" transform="translate(-0.254 -0.209)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                    <g id="Groupe_1609" data-name="Groupe 1609" transform="translate(5.911 36.509)">
                                                                                                    <g id="Groupe_1608" data-name="Groupe 1608" transform="translate(0 0)">
                                                                                                        <rect id="Rectangle_2275" data-name="Rectangle 2275" width="5" height="2" transform="translate(0.089 -0.463)" fill="#fff"/>
                                                                                                    </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </svg>
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {s.is_certified == true ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        <Tooltip title="Certifié">
                                                                                            <svg id="Groupe_1737" data-name="Groupe 1737" xmlns="http://www.w3.org/2000/svg" width="15.673" height="21.846" viewBox="0 0 22.673 28.846">
                                                                                                <g id="Groupe_1069" data-name="Groupe 1069" transform="translate(0)">
                                                                                                    <path id="Tracé_11017" data-name="Tracé 11017" d="M48.308,10.2,46.114,7.936l.442-3.123a.894.894,0,0,0-.731-1.006l-3.107-.545L41.239.476A.894.894,0,0,0,40.057.091L37.223,1.476,34.389.091a.894.894,0,0,0-1.183.384L31.728,3.263l-3.107.545a.894.894,0,0,0-.731,1.006l.442,3.123L26.138,10.2a.894.894,0,0,0,0,1.244l2.193,2.267-.442,3.125a.894.894,0,0,0,.731,1.006l2.487.436v9.671a.894.894,0,0,0,1.294.8l4.822-2.41,4.821,2.41a.894.894,0,0,0,1.294-.8V18.281l2.487-.436a.894.894,0,0,0,.731-1.006l-.442-3.125,2.193-2.267A.894.894,0,0,0,48.308,10.2ZM37.623,24.542a.894.894,0,0,0-.8,0L32.9,26.505V20.591l.31.585a.894.894,0,0,0,1.183.384l2.834-1.386,2.833,1.386a.894.894,0,0,0,1.183-.384l.31-.585v5.914Z" transform="translate(-25.886 0)" fill="#f87280"/>
                                                                                                    <path id="Tracé_11018" data-name="Tracé 11018" d="M75.792,39.507a6.115,6.115,0,1,0,6.115,6.115A6.122,6.122,0,0,0,75.792,39.507Zm0,10.442a4.327,4.327,0,1,1,4.326-4.328A4.332,4.332,0,0,1,75.792,49.949Z" transform="translate(-64.455 -34.797)" fill="#fff"/>
                                                                                                    <path id="Tracé_11019" data-name="Tracé 11019" d="M98.045,69.831,95.4,72.472l-1.005-1a.894.894,0,1,0-1.264,1.265l1.637,1.636a.894.894,0,0,0,1.264,0L99.309,71.1a.894.894,0,0,0-1.264-1.265Z" transform="translate(-84.885 -61.274)" fill="#fff"/>
                                                                                                </g>
                                                                                            </svg>
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                    : null}
                                                                                    {s.level != 0 ?
                                                                                    <Grid item xs={3} style={{margin: 'auto', textAlign:'center'}}>
                                                                                        {s.level == 1 ?
                                                                                            <Tooltip title="Entre 0 et 1 an d'expérience">
                                                                                                <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                    <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                    <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                        <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                    </g>
                                                                                                    <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                    <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                    <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                    </g>
                                                                                                </svg>
                                                                                            </Tooltip> 
                                                                                            : null} {s.level == 2 ?
                                                                                                <Tooltip title="Entre 1 et 5 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
                                                                                                </Tooltip> 
                                                                                            : null} {s.level == 3 ?
                                                                                                <Tooltip title="Entre 5 et 10 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
                                                                                                </Tooltip> 
                                                                                            : null} {s.level == 4 ?
                                                                                                <Tooltip title="Plus de 10 ans d'expérience">
                                                                                                    <svg id="Groupe_1738" data-name="Groupe 1738" xmlns="http://www.w3.org/2000/svg" width="21.93" height="17.753" viewBox="0 0 25.93 21.753">
                                                                                                        <g id="Groupe_1072" data-name="Groupe 1072" transform="translate(0 0)">
                                                                                                        <g id="Groupe_1071" data-name="Groupe 1071" transform="translate(0 0)">
                                                                                                            <path id="Tracé_11020" data-name="Tracé 11020" d="M7.316,37.554h24.1a.906.906,0,0,0,.916-.916V20.379a.906.906,0,0,0-.916-.916H24.424V16.716a.906.906,0,0,0-.916-.916H15.244a.906.906,0,0,0-.916.916v2.769H7.316A.906.906,0,0,0,6.4,20.4V36.66A.931.931,0,0,0,7.316,37.554ZM16.16,17.631h6.432v1.854H16.16Z" transform="translate(-6.4 -15.8)" fill="#f87280"/>
                                                                                                        </g>
                                                                                                        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="25.93" height="1.266" transform="translate(0 12.031)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1817" data-name="Rectangle 1817" width="1.608" height="4.318" rx="0.804" transform="translate(6.834 10.467)" fill="#fff"/>
                                                                                                        <rect id="Rectangle_1818" data-name="Rectangle 1818" width="1.608" height="4.318" rx="0.804" transform="translate(17.555 10.467)" fill="#fff"/>
                                                                                                        </g>
                                                                                                    </svg>
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
