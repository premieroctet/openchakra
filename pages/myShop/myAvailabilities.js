import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Schedule from '../../components/Schedule/Schedule';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
const {GID_LEN} = require('../../utils/consts');
import styles from './myAvailabilities/myAvailabilitiesStyle'
import Router from 'next/router';
import cookie from 'react-cookies';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerSchedule from '../../components/DrawerSchedule/DrawerSchedule';
const I18N = require('../../utils/i18n');
moment.locale('fr');

class myAvailabilities extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
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
        this.availabilityUpdate = this.availabilityUpdate.bind(this);
        this.needRefresh = this.needRefresh.bind(this);
    }

    static getInitialProps ({ query: { id_alfred } }) {
      return { aboutId: id_alfred }
    }

    componentDidMount() {

       const auth = cookie.load('token')
       if(!this.props.aboutId && !auth) {
         localStorage.setItem('path',Router.pathname);
         Router.push('/login')
       }
      // FIX : get current availabilities
      axios.defaults.headers.common['Authorization'] = auth

      axios.get('/myAlfred/api/availability/currentAlfred')
        .then ( res => {
          this.setState({availabilities: res.data})
        })
        .catch (err => console.error(err))

      axios.get('/myAlfred/api/users/current').then(res => {
        let user = res.data;
        if(user) {
          this.setState({
            userState: true,
            userId: user._id,
          })
        }
      }).catch(function (error) {
        console.error(error);
      });

      axios.get(`/myAlfred/api/shop/alfred/${this.state.id}`)
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
          console.error();(error);
        });

      axios.get('/myAlfred/api/shopBanner/all')
        .then(response => {
          let banner = response.data;
          this.setState({banner: banner})
        })
        .catch(function(error){
          console.error(error);
        });

    }

    availabilityCreated(avail) {

      if (avail._id.length==GID_LEN) {
        avail._id = null
      }
      axios.defaults.headers.common['Authorization'] = cookie.load('token')
      axios.post('/myAlfred/api/availability/add',avail)
          .then(res => {
              toast.info('Disponibilité ajoutée avec succès !');
              axios.get('/myAlfred/api/availability/currentAlfred')
                .then ( res => {
                  this.setState({availabilities: res.data});
                })
                .catch (err => console.error(err))
          })
          .catch(err => {
            console.error(err);
            toast.error(err);
		  })
    }

    availabilityUpdate(avail) {
        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        axios.post('/myAlfred/api/availability/update', avail)
          .then( res => {


        axios.get('/myAlfred/api/availability/currentAlfred')
          .then ( res => {
            this.setState({availabilities: res.data})
          })
          .catch (err => console.error(err))
        });
    }

    availabilityDelete(avail) {
      axios.defaults.headers.common['Authorization'] = cookie.load('token')

      axios.delete('/myAlfred/api/availability/'+avail._id)
          .then(res => {
              toast.info('Disponibilité supprimée avec succès !');
              let new_availabilities=[];
              this.state.availabilities.forEach( a => {
                if (a._id!==avail._id) {
                  new_availabilities.push(a);
                }
              })
              this.setState({availabilities: new_availabilities});
          })
          .catch(err => {
            error(err);
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

    callDrawer = () =>{
        this.child.current.handleDrawerToggle();
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
                <Grid className={classes.bigContainer} style={{width: '100%'}}>
                    {isOwner ?
                      <NavBarShop userId={this.state.userId}/>
                      : null
                    }
                  <Grid className={classes.toggle}>
                      <Grid>
                          <DrawerSchedule ref={this.child}/>
                      </Grid>
                      <Grid>
                          <Grid style={{position: 'fixed', bottom: '10%', zIndex: 5, right: 0}}>
                              <Fab color="primary" aria-label="add"
                                   onClick={this.callDrawer}
                                   className={classes.menuButton}>
                                  <AddIcon style={{color: 'white'}}/>
                              </Fab>
                          </Grid>
                      </Grid>
                  </Grid>
                  <Grid container className={classes.containercalendar} style={{width:' 70%'}}>
                      <Grid>
                        <Schedule availabilities={this.state.availabilities} title={I18N.SCHEDULE_TITLE} subtitle={I18N.SCHEDULE_SUBTITLE} services={this.state.services} onCreateAvailability={this.availabilityCreated} onDeleteAvailability={this.availabilityDelete} onUpdateAvailability={this.availabilityUpdate} selectable={true}/>
                      </Grid>
                  </Grid>
                </Grid>
              </Layout>
                <NavbarMobile userId={this.state.userId}/>
          </Fragment>
        );
    };
}
export default withStyles(styles)(myAvailabilities);
