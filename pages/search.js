import React, { Fragment } from 'react';
import Layout from '../hoc/Layout/Layout';
import SubBar from '../components/search/SubBar/SubBar';
import BodySearch from '../components/search/BodySearch/BodySearch';

const Search = () => (
  <Fragment>
    <Layout>
      <SubBar />
      <BodySearch />
    </Layout>
  </Fragment>
);

export default Search;
