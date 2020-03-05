import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import Select from "react-select";
import Footer from '../../hoc/Layout/Footer/Footer';



const _ = require('lodash');
const { config } = require('../../config/config');
const url = config.apiUrl;
const styles = theme => ({

bigContainer: {
    marginTop: 68,
    flexGrow: 1,
},
sidebg: {
  display:'block',
  [theme.breakpoints.down('sm')]: {
      display: 'none!important',
  },
   suivant: {
      [theme.breakpoints.down('sm')]: {
          right:10
      },
   }
     },
    maincontainer: {
      [theme.breakpoints.down('sm')]: {
          width:'98% !important',
          margin:'auto',
      },
    },
    bottombar: {
      visibility:'hidden',
      [theme.breakpoints.down('sm')]: {
        visibility:'visible',
        boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
    }},
    topbar: {
      visibility:'visible',
      position: 'sticky',
      top: 65,
      zIndex:999,[theme.breakpoints.down('sm')]: {
        visibility:'hidden',
    }},
});

class selectCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all_category: [],
            selectedCategory: null,
            categoryOk: false,
            step1:false,
            step2:false,

            all_services: [],
            selectedService: null,
            serviceOk: false,


        };


    }


    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                if(user.is_alfred === false) {
                    Router.push('/creaShop/creaShop');
                } else {
                    axios.get(url+'myAlfred/api/category/all')
                        .then(res => {
                            let category = res.data;
                            this.setState({all_category: category});
                        })
                        .catch(err => console.log(err));
                }
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

    handleChangeCategory = selectedCategory => {
        this.setState({selectedCategory});
        this.setState({step1:true});
    };

    handleChangeService = selectedService => {
        this.setState({selectedService});
        this.setState({step2:true});
    };

    handleCategory() {
        const id_category = this.state.selectedCategory.value;
        axios.get(url+'myAlfred/api/service/all/'+id_category)
            .then(res => {
                let services = res.data;
                this.setState({all_services: services})
            })
            .catch(err => console.log(err));

        axios.get(url+'myAlfred/api/serviceUser/currentAlfred')
            .then(response => {
                let current_services = response.data;
                current_services.forEach(e => {


                    let test2 = _.pullAllBy(this.state.all_services, [{'label': e.service.label}], 'label');


                    this.setState({all_services: test2});


                })
            });
        this.setState({categoryOk: true});
    }

    handleService() {
        const id_service = this.state.selectedService.value;
        this.setState({serviceOk: true});
    }








    render() {
        const { classes } = this.props;
        const {categoryOk} = this.state;
        const {serviceOk} = this.state;
        const {all_category} = this.state;
        const {all_services} = this.state;

        const array_category = all_category.map(e => ({
            label: e.label,
            value: e._id
        }));

        const array_services = all_services.map(e => ({
            label: e.label,
            value: e._id
        }));


        return (

            <Layout>

                <Grid container className={classes.bigContainer}>
                  <Grid container className={classes.topbar} justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3}}>
                      <Grid item xs={2} style={{textAlign:"center",borderBottom: '2px solid white'}}>
                          <Link href={'/myShop/services'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}>Ma boutique</p></a>
                          </Link>
                      </Grid>
                      <Grid item xs={2} style={{textAlign:"center"}}>
                          <Link href={'/myShop/messages'}><a style={{textDecoration:'none'}}>
                              <p style={{color: "white",cursor: 'pointer'}}>Messages</p></a>
                          </Link>
                      </Grid>
                      <Grid item xs={2} style={{textAlign:"center"}}>
                          <Link href={'/myShop/mesreservations'}><a style={{textDecoration:'none'}}>
                              <p style={{color: "white",cursor: 'pointer'}}>Mes réservations</p></a>
                          </Link>
                      </Grid>
                      <Grid item xs={2} style={{textAlign:"center",zIndex:999}}>
                          <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                              <p style={{color: "white",cursor: 'pointer'}}>Mon calendrier</p></a>
                          </Link>
                      </Grid>
                      <Grid item xs={2} style={{textAlign:"center"}}>
                          <Link href={'/myShop/performances'}><a style={{textDecoration:'none'}}>
                              <p style={{color: "white",cursor: 'pointer'}}>Performance</p></a>
                          </Link>
                      </Grid>
                  </Grid>
                    <Grid className={classes.maincontainer} item xs={12} md={7} style={{paddingLeft:20}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <h2 style={{fontWeight: '100'}}>Votre catégorie de service</h2>
                            </Grid>
                            <Grid item xs={12}>
                                <p>
                                    Commencez par sélectionner votre catégories de service. Par exemple, si vous souhaitez proposer un service
                                    de coiffure, sélectionnez la catégorie «Beauté et bien-être».
                                </p>
                            </Grid>
                            <Grid item xs={10}>
                                <Select
                                    placeholder="Sélectionnez votre catégorie"
                                    isClearable={true}
                                    options={
                                        array_category
                                    }
                                    onChange={ this.handleChangeCategory}
                                    theme={theme => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: '#2FBCD3',
                                        }
                                    })}
                                />
                            </Grid>
                            <Grid item xs={5} style={{marginTop:20}}>
                                <Button disabled={!this.state.step1} onClick={()=>this.handleCategory()} type="submit" variant="contained" color="primary" style={{ color:"white" }}>
                                    Je valide la catégorie
                                </Button>
                            </Grid>
                        </Grid>

                        {categoryOk ?
                            <React.Fragment>
                                <Grid container>

                                    <Grid item xs={12}>
                                        <h2 style={{fontWeight: '100'}}>Votre service</h2>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p>
                                            Sélectionnez maintenant le service que vous souhaitez proposer dans la catégorie sélectionnée.
                                            Vous pourrez choisir le type de prestation que vous souhaitez proposer dans ce service dès la prochaine étape !
                                        </p>
                                    </Grid>

                                    <Grid item xs={10}>
                                        <Select
                                            placeholder="Sélectionnez votre service"
                                            isClearable={true}
                                            options={
                                                array_services
                                            }
                                            onChange={ this.handleChangeService}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary: '#2FBCD3',
                                                }
                                            })}
                                        />
                                    </Grid>
                                    <Grid item xs={5} style={{marginTop:20}}>
                                        <Button disabled={!this.state.step2} onClick={()=>this.handleService()} type="submit" variant="contained" color="primary" style={{ color:"white" }}>
                                            Je valide le service
                                        </Button>
                                    </Grid>

                                </Grid>
                            </React.Fragment>

                            :null}

                        <hr/>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Link href={'/myShop/services'}>
                                        <Button type="button" variant="contained" color="primary" style={{ color:"white", marginBottom: 10 }}>
                                            Retour
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>
                                    {serviceOk ?
                                        <Link href={'/myShop/addService?id='+this.state.selectedService.value}>
                            <Button type="submit" variant="contained" color="secondary" className={classes.suivant} style={{ color:"white", marginBottom: 10 }}>
                                Suivant
                            </Button>
                                        </Link>
                                        : null}
                                </Grid>
                            </Grid>



                    </Grid>






                    <Grid item xs={5} className={classes.sidebg} >
                        <Grid container style={{position: 'sticky',height:'88vh', backgroundImage:'url(../../static/Creation_shop_step1.png)',backgroundRepeat:'no-repeat',top:100,backgroundSize: 'cover', backgroundPosition:'center'}}></Grid>
                    </Grid>



                </Grid>
                <Grid container className={classes.bottombar} justify="center" style={{backgroundColor: 'white',bottom:0, position:'fixed', zIndex:'999'}}>

                         <Grid item xs={2} style={{textAlign:"center", borderBottom: '3px solid #4fbdd7'}}>
                             <Link href={'/myShop/services'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/shopping-bag.png'} alt={'sign'} width={25} style={{opacity:'0.5'}}></img></p></a>
                             </Link>
                         </Grid>

                         <Grid item xs={2} style={{textAlign:"center"}}>
                            <Link href={'/myShop/messages'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speech-bubble.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                            </a></Link>
                         </Grid>

                         <Grid item xs={2} style={{textAlign:"center"}}>
                            <Link href={'/myShop/mesreservations'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/event.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                            </a></Link>
                         </Grid>

                         <Grid item xs={2} style={{textAlign:"center",zIndex:999}}>
                            <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/calendar.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                            </a></Link>
                         </Grid>

                         <Grid item xs={2} style={{textAlign:"center"}}>
                            <Link href={'/myShop/performances'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}></img></p>
                            </a></Link>
                         </Grid>

                     </Grid>
              {/* <Footer/>*/}

            </Layout>


        );
    };
}



export default withStyles(styles)(selectCategory);


