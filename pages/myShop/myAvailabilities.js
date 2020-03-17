import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Footer from '../../hoc/Layout/Footer/Footer';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Schedule from '../../components/Schedule/Schedule';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';
import AlfredBanner from '../../components/shop/AlfredBanner/AlfredBanner';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';


moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },

    marginbot: {
        marginBottom: '3.5%',
    },
    hiddenone: {
        [theme.breakpoints.down('sm')]: {
            display: 'none!important',
        },
    },
    revealedone: {
        [theme.breakpoints.up('md')]: {
            display: 'none!important',
        },
    },
    containercalendar:{
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        width:'100%!important',
        }},
    containerheader:{[theme.breakpoints.down('sm')]: {
            width:'100%!important',
            marginTop:'-70px',
        }},
    bottombar:{visibility:'hidden', [theme.breakpoints.down('sm')]: {
            visibility:'visible',
            boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
        }},
    topbar:{visibility:'visible', position: 'sticky', top: 65, zIndex:999,[theme.breakpoints.down('sm')]: {
            visibility:'hidden',
        }},
    hidenimg:{
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
    ,
    dispocard:{
        minHeight:'100px',
        maxWidth:'250px',
        textAlign:'center',
        backgroundColor:'#f2f2f2',
        boxShadow: '4px 4px 41px -37px rgba(0,0,0,0.0)',
        border:'solid 1px #ccc',
        borderRadius:'10px',
        padding:'5%',
    },
    dispocardin:{
        padding:'5%',
        fontSize:'15px',
        marginBottom:10,
    },

    dispoheader:{
        height:'10%',
        color:'gray',
        width:'100%',
        backgroundColor:'#f2f2f2',
        transition: 'background-color 0.5s',
        fontSize:'15px',
        textAlign:'left',
        borderRadius:'0px',
        marginBottom:'5 px',
        '&:hover': {
            backgroundColor:'#2FBCD3',
            transition: 'background-color 0.5s',
            color: 'white',
        }
    },

    respbg:{
        [theme.breakpoints.down('sm')]: {
            marginTop: '-13%',
        }
    },
    resppic:{
        [theme.breakpoints.down('sm')]: {
            top: '17%!important',
        }
    },
});


class myAvailabilities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            availabilities: [],
            alfred:[],
            id: props.aboutId,
            shop:[],
            services: [],
            userState: false,
            userId: '',
            isOwner:false,
            have_picture: false,
            banner:[],
        };
        this.availabilityCreated = this.availabilityCreated.bind(this);
        this.availabilityDelete = this.availabilityDelete.bind(this);
        this.needRefresh = this.needRefresh.bind(this);
    }

    static getInitialProps ({ query: { id_alfred } }) {
      return { aboutId: id_alfred }
    }

    componentDidMount() {

      axios.get(url+'myAlfred/api/users/current').then(res => {
        let user = res.data;
        if(user) {
          this.setState({
            userState: true,
            userId: user._id,
          })
        }
      }).catch(function (error) {
        console.log(error);
      });

      axios.get(`${url}myAlfred/api/shop/alfred/${this.state.id}`)
        .then( response  =>  {
          let shop = response.data;
          this.setState({
            alfred: shop.alfred,
            shop:shop,
            services: shop.services,
            idAlfred: shop.alfred._id,
          }, () => this.checkIfOwner());

        })
        .catch(function (error) {
          console.log(error);
        });

      axios.get(url+'myAlfred/api/shopBanner/all')
        .then(response => {
          let banner = response.data;
          this.setState({banner: banner})
        })
        .catch(function(error){
          console.log(error);
        });

    }

    availabilityCreated(avail) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

      axios.post(url+'myAlfred/api/availability/add',avail)
          .then(res => {
              toast.info('Disponibilité ajoutée avec succès !');
              let new_availabilities = [res.data, ...this.state.availabilities];
              this.setState({availabilities: new_availabilities});
          })
          .catch(err => {
            console.log(err);
            toast.error(err);
		  })
    }

    availabilityDelete(avail) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

      axios.delete(url+'myAlfred/api/availability/'+avail)
          .then(res => {
              toast.info('Disponibilité supprimée avec succès !');
              let new_availabilities=[];
              this.state.availabilities.forEach( a => {
                if (a._id!==avail) {
                  new_availabilities.push(a);
                }
              })
              this.setState({availabilities: new_availabilities});
          })
          .catch(err => {
            console.log(err);
            toast.error(err);
          })
    }

    checkIfOwner() {
      Object.keys(this.state.services).map( result =>{
        if(this.state.services[result].user === this.state.userId){
          this.setState({isOwner: true});
        }
      });
    }

    needRefresh(){
      this.componentDidMount()
    };

    render() {
        const {classes} = this.props;
        let isOwner= this.state.idAlfred === this.state.userId;


      return (
          <Fragment>
          <Helmet>
              <title> Mes disponibilités - My Alfred </title>
              <meta property="description" content="Indiquez vos dispoinibilités pour proposer vos services entre particuliers ! Des services à proximité, rémunérés et assurés ! Vos disponibilités permettront à vos futurs clients de vous réserver directement, au créneau souhaité !" />
            </Helmet>
              <Layout>
                <AlfredBanner alfred={this.state.alfred} shop={this.state.shop} banner={this.state.banner} isOwner={isOwner}  needRefresh={this.needRefresh}/>
                {isOwner ?
                  <NavBarShop userId={this.state.userId}/>
                  : null
                }
                  <Grid container style={{padding:'2%'}} className={classes.containercalendar}>
                      <Grid style={{width:'90%'}}>
                          <Schedule height={400} availabilities={this.state.availabilities} services={this.state.services} onCreateAvailability={this.availabilityCreated} onDeleteAvailability={this.availabilityDelete} selectable={true}/>
                      </Grid>
                  </Grid>
              </Layout>
              <Grid container className={classes.bottombar} justify="center" style={{backgroundColor: 'white',bottom:0, position:'fixed', zIndex:'999'}}>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={`/shop?id_alfred=${this.state.userId}`}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/shopping-bag.png'} alt={'sign'} width={25} style={{opacity:'0.5'}}/></p></a>
                      </Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={'/reservations/messages'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speech-bubble.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                      </a></Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={'/reservations/allReservations'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/event.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                      </a></Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center",zIndex:999, borderBottom: '3px solid #4fbdd7'}}>
                      <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/calendar.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                      </a></Link>
                  </Grid>
                  <Grid item xs={2} style={{textAlign:"center"}}>
                      <Link href={'/performances/revenus'}><a style={{textDecoration:'none'}}>
                          <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                      </a></Link>
                  </Grid>
              </Grid>
            {/* <Footer/>*/}

          </Fragment>
        );
    };
}
export default withStyles(styles)(myAvailabilities);



