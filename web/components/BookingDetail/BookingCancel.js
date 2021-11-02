import CustomButton from '../CustomButton/CustomButton'
import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import io from 'socket.io-client'
import Typography from '@material-ui/core/Typography'
const {BOOK_STATUS} = require('../../utils/consts')
import styles from '../../static/css/components/BookingCancel/BookingCancel'
import Divider from '@material-ui/core/Divider'
import ReactHtmlParser from 'react-html-parser'

moment.locale('fr')

class Cancel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookingObj: null,
      currUser: null,
    }
  }

  componentDidMount() {
    const booking_id = this.props.booking_id
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current').then(res => {
      this.setState({currUser: res.data})
    })

    axios.get(`/myAlfred/api/booking/${ booking_id}`)
      .then(res => this.setState({bookingObj: res.data}))
      .catch()

    this.socket = io()
    this.socket.on('connect', () => {
      this.socket.emit('booking', booking_id)
    })
  }

  changeStatus(status) {
    setAxiosAuthentication()
    axios.put(`/myAlfred/api/booking/modifyBooking/${ this.props.booking_id}`, {
      status: status, user: this.state.currUser._id,
    })
      .then(res => {
        this.setState({bookingObj: res.data})
        setTimeout(() => this.socket.emit('changeStatus', res.data), 100)
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const {classes, t} = this.props
    const {currUser, bookingObj} = this.state

    return (
      <Grid>
        {bookingObj === null || currUser === null ?
          null
          :
          <Grid>
            <Grid container className={classes.bigContainer}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12}>
                      <h2>{ReactHtmlParser(t('BOOKING_CANCEL.title'))}</h2>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid container style={{width: '100%'}}>
                      <Grid item xs={12} style={{padding: '5%'}}>
                        <Typography>
                          {ReactHtmlParser(t('BOOKING_CANCEL.subtitle'))}
                          <br/>
                          {ReactHtmlParser(t('BOOKING_CANCEL.stepA'))}
                          <br/>
                          {ReactHtmlParser(t('BOOKING_CANCEL.stepB'))}
                          <br/>
                          {ReactHtmlParser(t('BOOKING_CANCEL.stepC'))}
                          <br/>
                          <br/>
                          {ReactHtmlParser(t('BOOKING_CANCEL.penality'))}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container
                    style={{display: 'flex', flexDirection: 'column', marginTop: '3vh', marginBottom: '3vh'}}>
                    <Divider/>
                  </Grid>
                  <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Grid>
                      <CustomButton
                        color={'primary'}
                        variant={'contained'}
                        style={{
                          textTransform: 'initial',
                          color: 'white',
                        }}
                        onClick={() => this.props.onMaintain(this.props.booking_id)}
                      >
                        {ReactHtmlParser(t('BOOKING_CANCEL.backButton'))}
                      </CustomButton>
                    </Grid>
                    <Grid>
                      <CustomButton
                        classes={{root: classes.buttonCancel}}
                        variant={'contained'}
                        style={{
                          textTransform: 'initial',
                        }}
                        onClick={() => {
                          this.changeStatus(BOOK_STATUS.CANCELLED)
                          this.props.onMaintain(this.props.booking_id)
                        }}
                      >
                        {ReactHtmlParser(t('BOOKING_CANCEL.confirm'))}
                      </CustomButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Cancel))
