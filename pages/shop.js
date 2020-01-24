import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import AlfredBanner from '../components/shop/AlfredBanner/AlfredBanner';
import NavBarShop from '../components/NavBar/NavBarShop/NavBarShop';
import About from '../components/About/About';
import SkillsAlfred from '../components/SkillsAlfred/SkillsAlfred';
import Typography from '@material-ui/core/Typography';
import CardPreview from '../components/CardPreview/CardPreview';
import CardAddService from '../components/CardAddService/CardAddService';
import Layout from '../hoc/Layout/Layout';
import AlfredConditions from '../components/AlfredConditions/AlfredConditions';
import axios from 'axios';
import AlfredConditionsBooking from '../components/AlfredConditionsBooking/AlfredConditionsBooking';
import AlfredConditionsCancel from '../components/AlfredConditionsCancel/AlfredConditionsCancel';
import AlfredWelcomedMessage from '../components/AlfredWelcomedMessage/AlfredWelcomedMessage';
import Footer from '../hoc/Layout/Footer/Footer';
import Router from 'next/router';

const { config } = require('../config/config');
const url = config.apiUrl;

class shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alfred:[],
            id: '',
            logged: false,
            shop:[],
            languages:[],
            services: [],
            userState: false,
            userId: '',
            shopUserId: '',
            isOwner:false,
            idShopUser: []
        };
        this.needRefresh = this.needRefresh.bind(this);
    }

    static getInitialProps ({ query: { id_alfred } }) {
        return { aboutId: id_alfred }
    }

    componentWillMount() {
        this.setState({id: this.props.aboutId});

    }

    componentDidMount() {
        let self = this;

        axios.get(url+'myAlfred/api/users/current').then(res => {
            let user = res.data;
            if(user) {
                self.setState({
                    userState: true,
                    userId: user._id
                })
            }
        }).catch(function (error) {
            console.log(error);
        });

        axios.get(`${url}myAlfred/api/shop/alfred/${this.state.id}`)
          .then(function (response) {
              let shop = response.data;
              self.setState({
                  alfred: shop.alfred,
                  idAlfred: shop.alfred._id,
                  languages: shop.alfred.languages,
                  services: shop.services,
                  shop:shop,
              });
              self.checkIfOwner();
          })
          .catch(function (error) {
              console.log(error);
          });
    }

    checkIfOwner() {
        Object.keys(this.state.services).map( result =>{
          if(this.state.services[result].user === this.state.userId){
              this.setState({isOwner: true});
          }else{

          }
        });
    }


    needRefresh(){
        this.componentDidMount();
    }

    render() {
        return (
            <Fragment>
                <Layout>
                    <AlfredBanner shop={this.state.id}/>
                    <NavBarShop/>
                    <Grid style={{marginLeft: '5%', marginRight: '5%'}}>
                        <Grid style={{display:'flex', alignItems: 'baseline', justifyContent: 'space-between', marginLeft: '5%', marginRight: '5%' }}>
                            <Grid style={{display:'flex', alignItems: 'center', flexDirection: 'column', marginTop: '3%'}}>
                                <About alfred={this.state.alfred} languages={this.state.languages} shop={this.state.shop}/>
                            </Grid>
                            <Grid style={{display:'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <SkillsAlfred alfred={this.state.alfred}/>
                            </Grid>
                        </Grid>
                        <Grid style={{display: 'flex', marginLeft: '5%', marginRight: '5%', flexDirection: 'column', marginTop: '3%'}}>
                            <Grid style={{width: '100%'}}>
                                <Typography variant="h6">
                                    Les services de {this.state.alfred.firstname}
                                </Typography>
                            </Grid>
                            <Grid container style={{marginTop:30}}>
                                { Object.keys(this.state.services).map( result => {
                                    return (
                                      <Grid container item lg={4}>
                                          <CardPreview isOwner={this.state.isOwner} userState={this.state.userState} alfred={this.state.alfred} shop={this.state.shop} service={this.state.services[result].service} services={this.state.services[result]} needRefresh={this.needRefresh}/>
                                      </Grid>
                                    )
                                })
                                }
                                {this.state.userState && this.state.isOwner  ?
                                    <Grid container item lg={4}>
                                        <CardAddService/>
                                    </Grid>
                                  : null
                                }

                            </Grid>
                        </Grid>
                        <Grid>
                            <AlfredConditions isOwner={this.state.isOwner} userState={this.state.userState} alfred={this.state.alfred} shop={this.state.shop}/>
                            <hr style={{width : '90%'}}/>
                            <AlfredConditionsBooking isOwner={this.state.isOwner} userState={this.state.userState}  alfred={this.state.alfred} shop={this.state.shop}/>
                            <AlfredWelcomedMessage shop={this.state.shop}/>
                            <hr  style={{width : '90%'}}/>
                            <AlfredConditionsCancel isOwner={this.state.isOwner} userState={this.state.userState} alfred={this.state.alfred} shop={this.state.shop}/>
                        </Grid>
                        {/*
                        <Grid style={{marginLeft: '5%', marginRight: '5%', marginTop: '3%'}}>
                            <Grid>
                                <h3>Commentaires</h3>
                            </Grid>
                            <Grid>
                                <Grid style={{width : '100%'}}>
                                    <Commentary/>
                                </Grid>
                                <hr style={{marginTop: 30, marginBottom: 30}}/>
                                <Grid style={{width : '100%'}}>
                                    <Commentary/>
                                </Grid>
                                    <hr style={{marginTop: 30, marginBottom: 30}}/>
                                <Grid style={{width : '100%'}}>
                                    <Commentary/>
                                </Grid>
                            </Grid>
                            <Grid style={{marginTop:50, marginBottom: 50}}>
                                <Typography>
                                    <Link href="#" onClick={preventDefault}>
                                        Voir plus de commentaires
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>*/}
                    </Grid>
                </Layout>
                <Footer/>
            </Fragment>
        )
    };
}

export default shop;
