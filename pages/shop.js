import React, { Fragment } from 'react';
import AlfredBanner from '../components/shop/AlfredBanner/AlfredBanner';
import CanDo from '../components/shop/CanDo/CanDo';
import MyBestSellers from '../components/shop/MyBestSellers/myBestSellers';
import Bio from '../components/shop/Bio/Bio';
import Review from '../components/shop/Review/Review';
import NavBar from '../components/NavBar/NavBar';

const shop = () => {
  return (
    <Fragment>
      <NavBar />
      <AlfredBanner />
      <CanDo />
      <MyBestSellers />
      <Bio />
      <Review />
    </Fragment>
  );
};

export default shop;
