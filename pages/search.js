import React, { Fragment } from 'react';
import NavBar from '../components/NavBar/NavBar';
import SubBar from '../components/search/SubBar/SubBar';
import BodySearch from '../components/search/BodySearch/BodySearch';

const Search = () => (
  <Fragment>
    <SubBar />
    <BodySearch />
  </Fragment>
);

export default Search;
