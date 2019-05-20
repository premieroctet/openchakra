import React, { Component, Fragment } from 'react';
import NavBar from '../../components/NavBar/NavBar';

// eslint-disable-next-line react/prefer-stateless-function
class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <NavBar />
        {children}
      </Fragment>
    );
  }
}

export default Layout;
