import React, { Fragment } from 'react';
import Layout from "../hoc/Layout/Layouthome";
import PopularCategories from '../components/home/PopularCategories/PopularCategories';
import SerenityNeed from '../components/home/SerenityNeed/SerenityNeed';
import BecomeAlfred from '../components/home/BecomeAlfred/BecomeAlfred';
import Recommandations from '../components/home/Recommandations/Recommandations';
import TemptedBy from '../components/home/TemptedBy/TemptedBy';
import NearbyYou from '../components/home/NearbyYou/NearbyYou';
import Homeheader from '../components/home/Homeheader/Homeheader';
import setAuthToken from '../utils/setAuthToken';
import Router from "next/router";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'logged':false
        }
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({'logged':true})
        }
    }

    logout() {
        localStorage.removeItem('token');
        // Remove auth header for future requests
        setAuthToken(false);
        window.location.reload();
};

     render()  {
         const { classes } = this.props;
        const test = this.state.logged;
         const ok = <a href='' onClick={this.logout}>Connecté</a>;
        const pasok = 'Déconnecté';
    return (
        <Fragment>
            <Layout />
            <Homeheader />
            <PopularCategories />
            <SerenityNeed />
            <BecomeAlfred />
            <TemptedBy />
            <NearbyYou />
        </Fragment>
    )
}


}



export default Home;
