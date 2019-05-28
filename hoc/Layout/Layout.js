import React, { Fragment } from 'react';
import NavBar from './NavBar/NavBar';

const Layout = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <NavBar />
      {children}
    </Fragment>
  );
};


export default Layout;
