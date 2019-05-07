import React, { Fragment } from 'react';
import Navbar from '../components/Navbar/Navbar';
import PopularCategories from '../components/PopularCategories/PopularCategories';
import SerenityNeed from '../components/SerenityNeed/SerenityNeed';

const Home = () => (
  <Fragment>
    <Navbar />
    <PopularCategories />
    <SerenityNeed />
  </Fragment>
);

export default Home;
