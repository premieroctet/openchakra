import axios from 'axios';
import React, { Fragment } from 'react';
import Layout from "../hoc/Layout/Layout";
import Footer from "../hoc/Layout/Footer/Footer";
import SerenityNeed from '../components/home/SerenityNeed/SerenityNeed';
import Profiteandlearn from '../components/home/profite&learn/profite&learn'
import BecomeAlfred from '../components/home/BecomeAlfred/BecomeAlfred';
import NearbyYou from '../components/home/NearbyYou/NearbyYou';
import Homeheader from '../components/home/Homeheader/Homeheader';
import FeelingGood from '../components/home/feelingGood/feelingGood';
import Wellbeing from '../components/home/Wellbeing/Wellbeing';
import Proposeservice from '../components/home/proposeservice/Proposeservice';
import Assureback from '../components/home/AssureBack/Assureback';
import Section3 from '../components/home/section3';
import Section6 from '../components/home/section6';
import Section8 from '../components/home/section8';
import Passions from '../components/home/Passions/passions';
import Facons from '../components/home/Facons/facons';
import Otter from '../components/home/Otter/otter';
import Section10 from '../components/home/section10';
import Section12 from '../components/home/section12';
import Section15 from '../components/home/section15';
import Section16 from '../components/home/section16';
import Section18 from '../components/home/section18';
import Section19 from '../components/home/section19';
import Section21 from '../components/home/section21';
import Section22 from '../components/home/section22';
import setAuthToken from '../utils/setAuthToken';
import Router from "next/router";
import {Helmet} from 'react-helmet';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          gps:null,
          logged:false
        }
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({logged:true})
        }
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get('/myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({
                  user:user,
                  address: user.billing_address,
                  addressSelected: user.billing_address,
                  otherAddress: user.service_address,
                  gps: user.billing_address.gps,
                });
            })
            .catch(err => { console.log(err); }
            );

        console.clear();
    }

    logout() {
        localStorage.removeItem('token');
        // Remove auth header for future requests
        setAuthToken(false);
        window.location.reload();
    };

    render()  {
        const {gps} = this.state;

        return (
            <Fragment>
              <Helmet>
                  <title>Services rémunérés entre particuliers - My Alfred </title>
                  <meta property="description" content="Des milliers de services référencés ! Consultez les offres de service rémunérés de milliers de particuliers avec My Alfred, première application d’offres de services entre particuliers. Rendre service en étant rémunéré autour de chez soi n’a jamais été aussi simple" />
                </Helmet>
                <Layout/>
                <Homeheader />
                <SerenityNeed gps={gps}/>
                <BecomeAlfred />
                <Section3 gps={gps}/>
                <NearbyYou gps={gps}/>
                <Profiteandlearn gps={gps}/>
                <Section6 gps={gps}/>
                <Wellbeing gps={gps}/>
                <Section8 gps={gps}/>
                <FeelingGood gps={gps}/>
                <Section10 gps={gps}/>
                <Proposeservice />
                <Section12 gps={gps}/>
                <NearbyYou gps={gps}/>
                <Passions/>
                <Section15 gps={gps}/>
                <Section16 gps={gps}/>
                <Facons/>
                <Section18 gps={gps}/>
                <Section19 gps={gps}/>
                <Otter/>
                <Section21 gps={gps}/>
                <Section22 gps={gps}/>
                <Assureback/>
                <Footer  />
            </Fragment>
        )
    }
}



export default Home;

