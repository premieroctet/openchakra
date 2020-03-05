import React, { Fragment } from 'react';
import Layout from "../hoc/Layout/Layouthome";
import Footer from "../hoc/Layout/Footer/Footer";
import SerenityNeed from '../components/home/SerenityNeed/SerenityNeed';
import Profiteandlearn from '../components/home/profite&learn/profite&learn'
import BecomeAlfred from '../components/home/BecomeAlfred/BecomeAlfred';
import NearbyYou from '../components/home/NearbyYou/NearbyYou';
import Homeheader from '../components/home/Homeheader/Homeheader';
import Feelingood from '../components/home/feelingood/feelingood';
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
            logged:false
        }
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({logged:true})
        }
        console.clear();
    }

    logout() {
        localStorage.removeItem('token');
        // Remove auth header for future requests
        setAuthToken(false);
        window.location.reload();
    };

    render()  {
        return (
            <Fragment>
		<Helmet>
        <title>Services rémunérés entre particuliers - My Alfred </title>
        <meta property="description" content="Des milliers de services référencés ! Consultez les offres de service rémunérés de milliers de particuliers avec My Alfred, première application d’offres de services entre particuliers. Rendre service en étant rémunéré autour de chez soi n’a jamais été aussi simple" />
      </Helmet>

                <Layout />
                <Homeheader />
                <SerenityNeed />
                <BecomeAlfred />
                <Section3/>
                <NearbyYou />
                <Profiteandlearn />
                <Section6/>
                <Wellbeing />
                <Section8/>
                <Feelingood />
                <Section10/>
                <Proposeservice />
                <Section12/>
                <NearbyYou />
                <Passions/>
                <Section15/>
                <Section16 />
                <Facons/>
                <Section18 />
                <Section19 />
                <Otter/>
                <Section21 />
                <Section22/>
                <Assureback/>
                <Footer  />
            </Fragment>
        )
    }
}



export default Home;

