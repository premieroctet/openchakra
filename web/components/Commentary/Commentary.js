import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import styles from './CommentaryStyle'
import Rating from '@material-ui/lab/Rating'
import moment from 'moment'
import Skills from '../Skills/Skills'
import Typography from '@material-ui/core/Typography'


class Commentary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {user, review} = this.props

    if (!review) {
      return null
    }

    const globalNote = (review.note_alfred ? review.note_alfred : review.note_client).global
    const name = (review.alfred.id==user ? review.user : review.alfred).firstname
    return (
      <Grid container style={{width: '100%', display: 'flex', flexDirection: 'row', marginBottom: 50}} spacing={3}>
        <Grid item xl={3} lg={3} md={3} sm={3} style={{display: 'flex', flexDirection: 'column'}}>
          <Grid>
            <Typography><strong>{name}</strong></Typography>
          </Grid>
          <Grid>
            <Typography><strong>{moment(review.date).format('L')}</strong></Typography>
          </Grid>
          <Grid>
            <Typography>{review.serviceUser.service.label}</Typography>
          </Grid>
        </Grid>
        <Grid xl={4} lg={9} md={9} sm={9} item>
          <Grid>
            <Rating name="half-rating-read" value={globalNote} precision={0.5} readOnly />
          </Grid>
          <Grid style={{marginTop: '2%'}}>
            <Typography>{review.content}</Typography>
          </Grid>
          <Grid style={{marginTop: '3%'}}>
            <Skills key={review._id} review={review._id} hideCount={true}/>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

Commentary.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withTranslation(null, {withRef: true})(withStyles(styles, {withTheme: true})(Commentary))
