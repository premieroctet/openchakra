const withParams = require('../components/withParams')
import CustomButton from '../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Router from 'next/router'
import StarRatings from 'react-star-ratings'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

import LayoutEvaluate from '../hoc/Layout/LayoutEvaluate'
import LayoutMobile from '../hoc/Layout/LayoutMobile'
import styles from '../static/css/pages/evaluateClient/evaluateClient'

const {clearAuthenticationToken, setAxiosAuthentication}=require('../utils/authentication')

class EvaluateClient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      service: {},
      accueil: 0,
      accuracy: 0,
      relational: 0,
      content: '',
    }
  }

  componentDidMount() {
    const id = this.props.params.id
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({user: user})
      })
      .catch(err => {
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      },
      )

    axios.get(`/myAlfred/api/serviceUser/${ id}`)
      .then(res => {
        let service = res.data
        this.setState({service: service})
      })
      .catch(err => console.error(err))
  }

  onComplimentChanged = name => {
    const org = this.state[name]
    this.setState({[name]: !org})
  }

  changeRating = newRating => {
    this.setState({
      accueil: newRating,
    })
  }

  changeRating2 = newRating => {
    this.setState({
      accuracy: newRating,
    })
  }

  changeRating3 = newRating => {
    this.setState({
      relational: newRating,
    })
  }

  back = () => {
    Router.back()
  }

  evaluate =() => {
    const {id, booking, client} = this.props.params
    const content = this.state.content
    const accueil = this.state.accueil
    const accuracy = this.state.accuracy
    const relational = this.state.relational

    const obj = {
      booking: booking,
      client: client,
      service: id,
      accueil: accueil,
      accuracy: accuracy,
      relational: relational,
      content: content,
    }

    axios.post('/myAlfred/api/reviews/add/client', obj)
      .then(() => {
        Router.push('/reservations/reservations')
      })
      .catch(err => {
        console.error(err)
      })

  }

  content = classes => {
    return(

      <Grid container className={classes.bigContainer}>
        <Grid style={{width: '100%'}}>
          <Grid style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <Grid item>
              <h3>{ReactHtmlParser(this.props.t('EVALUATE_CLIENT.title'))}</h3>
            </Grid>
            <Grid container style={{marginTop: '5vh'}} spacing={3}>
              <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex'}}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography>{ReactHtmlParser(this.props.t('EVALUATE_CLIENT.home'))}</Typography>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <StarRatings
                    rating={this.state.accueil}
                    starRatedColor={'rgba(248, 207, 97, 1)'}
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                    starDimension={'20px'}
                    starHoverColor={'rgba(248, 207, 97, 1)'}
                    starSpacing={'3px'}
                  />
                </Grid>
              </Grid>
              <Grid item container xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography>{ReactHtmlParser(this.props.t('EVALUATE_CLIENT.asking_precision'))}</Typography>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <StarRatings
                    rating={this.state.accuracy}
                    starRatedColor={'rgba(248, 207, 97, 1)'}
                    changeRating={this.changeRating2}
                    numberOfStars={5}
                    name='rating2'
                    starDimension={'20px'}
                    starHoverColor={'rgba(248, 207, 97, 1)'}
                    starSpacing={'3px'}
                  />
                </Grid>
              </Grid>
              <Grid item container xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography>{ReactHtmlParser(this.props.t('EVALUATE_CLIENT.relation'))}</Typography>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                  <StarRatings
                    rating={this.state.relational}
                    starRatedColor={'rgba(248, 207, 97, 1)'}
                    changeRating={this.changeRating3}
                    numberOfStars={5}
                    name='rating3'
                    starDimension={'20px'}
                    starHoverColor={'rgba(248, 207, 97, 1)'}
                    starSpacing={'3px'}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{marginTop: '10vh'}}>
          <Grid>
            <h3>{ReactHtmlParser(this.props.t('EVALUATE_CLIENT.your_commentary'))}</h3>
          </Grid>
          <Grid>
            <TextField
              id="outlined-multiline-static"
              style={{width: '100%'}}
              multiline
              rows="6"
              variant="outlined"
              onChange={e => this.setState({content: e.target.value})}
            />
          </Grid>
          <Grid>
            <em>{ReactHtmlParser(this.props.t('EVALUATE.warning_message'))}</em>
          </Grid>
        </Grid>
        <Grid style={{display: 'flex', justifyContent: 'space-between', marginTop: '10vh'}}>
          <Grid>
            <CustomButton
              onClick={this.back}
              variant={'outlined'}
              classes={{root: classes.buttonBack}}
            >
              {ReactHtmlParser(this.props.t('EVALUATE_CLIENT.back_button'))}
            </CustomButton>
          </Grid>
          <Grid>
            <CustomButton
              disabled={this.state.accueil === 0 || this.state.accuracy === 0 || this.state.relational === 0 || !this.state.content.trim()}
              onClick={this.evaluate}
              variant={'contained'}
              classes={{root: classes.buttonSend}}
              color={'primary'}
            >
              {ReactHtmlParser(this.props.t('EVALUATE_CLIENT.confirm_button'))}
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  render() {
    const {classes} = this.props
    const {user} = this.state
    return (

      <React.Fragment>
        <Grid className={classes.hideOnMobile}>
          <LayoutEvaluate user={user}>
            {this.content(classes)}
          </LayoutEvaluate>
        </Grid>
        <Grid className={classes.hideOnWeb}>
          <LayoutMobile currentIndex={null}>
            {this.content(classes)}
          </LayoutMobile>
        </Grid>
      </React.Fragment>
    )
  }
}


export default withTranslation('custom', {withRef: true})(withStyles(styles)(withParams(EvaluateClient)))
