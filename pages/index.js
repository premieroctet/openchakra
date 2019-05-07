import React, { Fragment } from 'react';
import Navbar from '../components/Navbar/Navbar';
import PopularCategories from '../components/PopularCategories/PopularCategories';

const Home = () => (
  <Fragment>
    <Navbar />
    <PopularCategories />
  </Fragment>
);

export default Home;
