import React, { Fragment } from 'react';
import AlfredBanner from '../components/shop/AlfredBanner/AlfredBanner';
import CanDo from '../components/shop/CanDo/CanDo';
import MyBestSellers from '../components/shop/MyBestSellers/myBestSellers';

const shop = () => {
  return (
    <Fragment>
      <AlfredBanner />
      <CanDo />
      <MyBestSellers />
    </Fragment>
  );
};

export default shop;
