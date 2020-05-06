import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Schedule from '../../components/Schedule/Schedule';
import { toast } from 'react-toastify';
import {Helmet} from 'react-helmet';
import { SCHEDULE_SUBTITLE } from '../../utils/messages';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
import styles from './myAvailabilities/myAvailabilitiesStyle'

moment.locale('fr');

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

      // FIX : get current availabilities

      axios.get('/myAlfred/api/users/current').then(res => {
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
          console.log(error);
        });

      axios.get('/myAlfred/api/shopBanner/all')
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

      axios.post('/myAlfred/api/availability/add',avail)
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

      axios.delete('/myAlfred/api/availability/'+avail)
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
                {isOwner ?
                  <NavBarShop userId={this.state.userId}/>
                  : null
                }
                <Grid container className={classes.containercalendar}>
                  <Grid style={{width:'90%'}}>
                    <Schedule height={700} availabilities={this.state.availabilities} subtitle={SCHEDULE_SUBTITLE} services={this.state.services} onCreateAvailability={this.availabilityCreated} onDeleteAvailability={this.availabilityDelete} selectable={true}/>
                  </Grid>
                </Grid>
              </Layout>
            <NavbarMobile userId={this.state.userId}/>
          </Fragment>
        );
    };
}
export default withStyles(styles)(myAvailabilities);
