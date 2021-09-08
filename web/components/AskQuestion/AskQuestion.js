import {withTranslation} from 'react-i18next'
import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import axios from "axios";import
{ASK_QUESTION} from '../../utils/i18n'

class AskQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      user: {},
    }
  }

  componentDidMount() {
    axios.get(`/myAlfred/api/shop/alfred/${this.props.user}`)
      .then(response => {
        let user = response.data
        this.setState({
          user: user.alfred,
        })
      }).catch(err => console.error(err))
  }


  render() {
    const {user} = this.state
    return(
      <Grid style={{textAlign: 'center'}}>
        <Grid>
          <h2>{ASK_QUESTION.title + user.firstname + ASK_QUESTION.question}</h2>
        </Grid>
        <Grid>
          <Typography>{ASK_QUESTION.info + user.firstname + ASK_QUESTION.exclamation}</Typography>
        </Grid>

      </Grid>
    )
  }

}

export default withTranslation()(AskQuestion)
