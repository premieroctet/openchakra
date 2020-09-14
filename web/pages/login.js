import {Component} from 'react';
import Router from 'next/router';

class login extends Component {

  componentDidMount() {
    Router.push('/?login=true');
  }

  render() {
    return null;
  }
}

export default login;
