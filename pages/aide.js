import React, { Fragment } from 'react';
import Layout from '../hoc/Layout/Layout';
import SubBar from '../components/search/SubBar/SubBar';
import BodySearch from '../components/search/BodySearch/BodySearch';
import Footer from '../hoc/Layout/Footer/Footer';

const Aide = () => (
  <Fragment>
    <Layout>
      <div style={{backgroundImage:'url(../static/background/pagesina.svg)',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover', width: '100%', height: '100vh'}}></div>
      {/* <Footer/>*/}

    </Layout>
  </Fragment>
);

export default Aide;
