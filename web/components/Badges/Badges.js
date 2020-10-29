import React from 'react';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './BadgesStyle';
import cookie from 'react-cookies';
import WithTopic from "../../hoc/Topic/Topic"
import Box from '../Box/Box'

class InnerBadges extends WithTopic(null) {}

class Badges extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
  }

  render() {

    return (
      <Box>
        <InnerBadges titleTopic={'Badges'}/>
      </Box>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Badges)
