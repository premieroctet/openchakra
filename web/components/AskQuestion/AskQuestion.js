import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

function AskQuestion(props) {
  const {t, user} = props
  const [alfred, setAlfred] = useState({})

  useEffect(() => {
    axios.get(`/myAlfred/api/shop/alfred/${user}`)
      .then(response => {
        let user = response.data
        setAlfred(user.alfred)
      }).catch(err => console.error(err))
  }, [])

  return(
    <Grid style={{textAlign: 'center'}}>
      <Grid>
        <h2>{ReactHtmlParser(t('ASK_QUESTION.title', {firstname: alfred.firstname}))}</h2>
      </Grid>
      <Grid>
        <Typography>{ReactHtmlParser(t('ASK_QUESTION.info', {firstname: alfred.firstname}))}</Typography>
      </Grid>

    </Grid>
  )
}

export default withTranslation(null, {withRef: true})(AskQuestion)
