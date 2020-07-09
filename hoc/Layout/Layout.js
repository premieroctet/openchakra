import React, { Fragment } from 'react';
import NavBar from './NavBar/NavBar';
import cookie from 'react-cookies'
import axios from 'axios';


class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:"",
    };
  }

  componentDidMount() {
    const token = cookie.load('token')
    if (token) {
      this.setState({ logged: true });
      axios.defaults.headers.common['Authorization'] = token;
    }
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({
          user:user,
        })
        this.setState({
          address: user.billing_address,
          addressSelected: user.billing_address,
          otherAddress: user.service_address,
          gps: user.billing_address.gps,
        });
      })
      .catch(err => {
        console.error(err)
      });
  }


  render() {
    const {gps, user, addressSelected} = this.state;
    const { children } = this.props;

    return(
      <Fragment>
          <NavBar gps={gps} user={user} addressSelected={addressSelected} searchCallback={this.props.searchCallback} googleAuth={this.props.googleAuth} />
        {children}
      </Fragment>
    );
  }
}

export default Layout;
