import React, { Fragment } from 'react';
import AlfredBanner from '../components/shop/AlfredBanner/AlfredBanner';
import CanDo from '../components/shop/CanDo/CanDo';
import MyBestSellers from '../components/shop/MyBestSellers/myBestSellers';
import Bio from '../components/shop/Bio/Bio';
import Review from '../components/shop/Review/Review';
import Layout from '../hoc/Layout/Layout';

const shop = () => {
  return (
    <Fragment>
      <Layout>
        <AlfredBanner />
        <CanDo />
        <MyBestSellers />
        <Bio />
        <Review />
      </Layout>
    </Fragment>
  );
};

export default shop;
