import {withTranslation} from 'react-i18next'
import {Component} from 'react';
import Router from 'next/router';

class signup extends Component {

  componentDidMount() {
    Router.push('/?signup=true');
  }

  render() {
    return null;
  }
}

export default withTranslation()(signup;)
