import React from 'react';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './BadgesStyle';
import cookie from 'react-cookies';

class Badges extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
  }

  render() {

    return (
      <div>
        <h1>ICI LES BADGES</h1>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Badges)
