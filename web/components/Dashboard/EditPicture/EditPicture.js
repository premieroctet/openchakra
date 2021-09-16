import ReactHtmlParser from 'react-html-parser'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import {EDIT_PICTURE} from '../../../utils/i18n'
import {snackBarSuccess} from '../../../utils/notifications'
import styles from './EditPictureStyle'

const {clearAuthenticationToken, setAxiosAuthentication} = require('../../../utils/authentication')


class EditPicture extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      result: {},
      picture: null,
      id: null,
    }
  }

  static getInitialProps({query: {id}}) {
    return {prestation_id: id}
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/${this.props.type}/all/${this.props.id}`)
      .then(response => {
        let result = response.data
        this.setState({result: result})
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })
  }

  onChange = e => {
    this.setState({picture: e.target.files[0]})
  }

  onSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('picture', this.state.picture)
    axios.post(`/myAlfred/api/admin/${this.props.type}/editPicture/${this.props.id}`, formData)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('EDIT_PICTURE.snackbar_update_photo')))
        Router.push({pathname: `/dashboard/${this.props.type}s/all`})
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const {classes} = this.props
    const {result} = this.state

    return (
      <Grid container className={classes.loginContainer}>
        <Card className={classes.card}>
          <Grid>
            <Grid item style={{display: 'flex', justifyContent: 'center'}}>
              <Typography style={{fontSize: 30}}>{result.label}</Typography>
            </Grid>
            <form onSubmit={this.onSubmit}>
              {result.picture !== '' ?
                <img src={`../../../${result.picture}`} alt='image' width={100}/>
                : null
              }
              <Grid item>
                <input type="file" name="picture" onChange={this.onChange} accept="image/*"/>
              </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                <Button type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                  {ReactHtmlParser(this.props.t('EDIT_PICTURE.button_update'))}
                </Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Grid>
    )
  }
}

EditPicture.propTypes = {
  classes: PropTypes.object.isRequired,
}


export default withTranslation('custom', {withRef: true})(withStyles(styles, {withTheme: true})(EditPicture))
