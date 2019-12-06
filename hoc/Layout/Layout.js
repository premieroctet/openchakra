import React, { Fragment } from 'react';
import NavBar from './NavBar/NavBar';
import Loader from '../../components/Loader';

const Layout = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <Loader />
      <NavBar />
      {children}
    </Fragment>
  );
};


export default Layout;
