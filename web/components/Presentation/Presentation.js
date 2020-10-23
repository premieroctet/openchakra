import React from 'react';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './PresentationStyle';
import cookie from 'react-cookies';
import WithTopic from "../../hoc/Topic/Topic"
const {frenchFormat} = require('../../utils/text')

class InnerPresentation extends WithTopic(null) {

  constructor(props) {
    super(props)
  }
}

class Presentation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then( res => {
        this.setState( { user: res.data})
      })
      .catch (err => console.error(err))
  }

  render() {

    const {user} = this.state

    const title=frenchFormat(`À propos de ${user ? user.firstname : ''}`)
    return (
      <InnerPresentation titleTopic={title} titleSummary={user ? user.description : ''} />
    )
  }


}

export default withStyles(styles, {withTheme: true})(Presentation)
