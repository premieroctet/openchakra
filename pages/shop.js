import React, { Fragment } from 'react';
import AlfredBanner from '../components/shop/AlfredBanner/AlfredBanner';
import CanDo from '../components/shop/CanDo/CanDo';
import MyBestSellers from '../components/shop/MyBestSellers/myBestSellers';
import Bio from '../components/shop/Bio/Bio';

const shop = () => {
  return (
    <Fragment>
      <AlfredBanner />
      <CanDo />
      <MyBestSellers />
      <Bio />
    </Fragment>
  );
};

export default shop;
