import React from 'react';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './BadgesStyle';
import cookie from 'react-cookies';
import Topic from "../../hoc/Topic/Topic"
import Box from '../Box/Box'

class Badges extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Box>
        <Topic titleTopic={'Badges'}/>
      </Box>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Badges)
