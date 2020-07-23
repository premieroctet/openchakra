import {Component} from 'react';
import Router from "next/router";

class signup extends Component {

  componentDidMount() {
      Router.push('/?signup=true')
  }

  render() {
    return null
  }
}

export default signup;
