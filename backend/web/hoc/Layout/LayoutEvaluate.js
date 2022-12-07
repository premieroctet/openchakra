import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Layout from './Layout'
import axios from 'axios'
import {LAYOUT_EVALUATE} from '../../utils/i18n'


class LayoutEvaluate extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      user: {},
    }
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then(res => {
        this.setState({user: res.data})
      })
      .catch(err => console.error(err))
  };

  render() {
    const{user}= this.state
    const{children}= this.props

    return(
      <Layout user={user}>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
              <h2>{ReactHtmlParser(this.props.t('LAYOUT_EVALUATE.title'))}</h2>
            </Grid>
            <Grid style={{backgroundColor: 'rgba(249,249,249, 1)', width: '100%'}}>
              <Grid style={{margin: '0 15%', display: 'flex', justifyContent: 'center', backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', padding: '5% 10%', marginTop: '5vh', marginBottom: '5vh'}}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    )
  }

}

export default withTranslation(null, {withRef: true})(LayoutEvaluate)
