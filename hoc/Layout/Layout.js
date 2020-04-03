import React, { Fragment } from 'react';
import NavBar from './NavBar/NavBar';
import Loader from '../../components/Loader';
import Router from 'next/router';
import axios from 'axios';


class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:"",
    };
  }

  componentDidMount() {
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({
          user:user,
          address: user.billing_address,
          addressSelected: user.billing_address,
          otherAddress: user.service_address,
          gps: user.billing_address.gps,
        });
      })
      .catch(err => { console.log(err); }
      );
  }


  render() {
    const {gps, user, addressSelected} = this.state;
    const { children } = this.props;

    return(
      <Fragment>
        <Loader />
          <NavBar gps={gps} user={user} addressSelected={addressSelected} />
        {children}
      </Fragment>
    );
  }
}

export default Layout;
