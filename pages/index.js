import React, { Fragment } from 'react';
import Navbar from '../components/Navbar/Navbar';
import PopularCategories from '../components/PopularCategories/PopularCategories';
import SerenityNeed from '../components/SerenityNeed/SerenityNeed';
import BecomeAlfred from '../components/BecomeAlfred/BecomeAlfred';
import Recommandations from '../components/Recommandations/Recommandations';
import TemptedBy from '../components/TemptedBy/TemptedBy';
import NearbyYou from '../components/NearbyYou/NearbyYou';

const Home = () => (
  <Fragment>
    <Navbar />
    <PopularCategories />
    <SerenityNeed />
    <BecomeAlfred />
    <Recommandations />
    <TemptedBy />
    <NearbyYou />
  </Fragment>
);

export default Home;
