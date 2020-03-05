import React, { Fragment, Component } from 'react';
import Layout from '../hoc/Layout/Layout';
import SubBar from '../components/search/SubBar/SubBar';
import BodySearch from '../components/search/BodySearch/BodySearch';
import Footer from '../hoc/Layout/Footer/Footer';
import SearchNotLogin from '../components/search/searchNotLogin';
import TestSearch2 from '../components/search/searchLogin';
import setAuthToken from "../utils/setAuthToken";

const jwt = require('jsonwebtoken');
class Search extends Component {
  state = {
    logged: false,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.setState({logged:true});
    }
  }

  render() {
    const test = this.state.logged;

    return(
      <Fragment>
        {test ? <TestSearch2/> : <SearchNotLogin/> }
      </Fragment>
    )
  }
}

export default Search;
