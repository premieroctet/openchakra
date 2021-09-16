import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '../../Box/Box'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import axios from 'axios'
const {setAxiosAuthentication}=require('../../../utils/authentication')
const {ADMIN}=require('../../../utils/consts')
const {snackBarSuccess, snackBarError}=require('../../../utils/notifications')
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/pages/profile/editProfileCompany/editProfileCompany'
import Button from '@material-ui/core/Button'
const {emptyPromise} = require('../../../utils/promise')
import DateField from '../../DateField/DateField'
import {INDEX_DASHBOARD} from '../../../utils/i18n'

class IndexDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      admins: [],
      representative: null,
      birthday: null,
    }
    this.saveDisabled = this.saveDisabled.bind(this)
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/companies/members')
      .then(res => {
        const admins=res.data.filter(m => m.roles && m.roles.includes(ADMIN))
        this.setState({admins: admins})
      })
      .catch(err => console.error(err))
    axios.get('/myAlfred/api/companies/current')
      .then(res => {
        this.setState({representative: res.data.representative})
      })
      .catch(err => console.error(err))
  }

  getSelectedAdmin = () => {
    const {admins, representative} = this.state
    return admins.find(a => a._id == representative)
  }

  onChange = event => {
    const {name, value}=event.target
    this.setState({[name]: value})
    if (name=='representative') {
      this.setState({birthday: ''})
    }
  }

  saveDisabled = () => {
    const {representative, birthday} = this.state
    const selectedAdmin = this.getSelectedAdmin()
    const ok = representative && selectedAdmin && (selectedAdmin.birthday || birthday)
    return !ok
  }

  onSave = () => {
    const {representative, birthday} = this.state
    const selectedAdmin = this.getSelectedAdmin()
    const promise = selectedAdmin.birthday ? emptyPromise()
      : axios.put(`/myAlfred/api/users/profile/birthday/${representative}`, {birthday: birthday})

    setAxiosAuthentication()
    promise
      .then(() => {
        axios.put('/myAlfred/api/companies/representative', {representative_id: representative})
          .then(() => {
            snackBarSuccess(INDEX_DASHBOARD.snackbar_update_admin)
            this.componentDidMount()
          })
          .catch(err => {
            console.error(err.response)
            snackBarError(err.response.data)
          })
      })
      .catch(err => {
        console.error(err.response)
        snackBarError(err.response.data)
      })
  }

  render() {
    const {classes} = this.props
    const {representative, admins, birthday}=this.state

    const selected_admin = this.getSelectedAdmin()
    return(
      <Grid container spacing={3} style={{marginTop: '3vh', width: '100%', margin: 0}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3>{INDEX_DASHBOARD.title}</h3>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box>
            <Grid container item spacing={2} xl={12} lg={12} md={12} sm={12} xs={12} style={{width: '100%', margin: 0}}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                <h3>{INDEX_DASHBOARD.title_admin}</h3>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  onChange={this.onChange}
                  name={'representative'}
                  value={representative}
                  style={{width: '100%'}}
                  variant={'outlined'}
                >
                  { admins.map(admin => (
                    <MenuItem key={admin._id} value={admin._id}>{admin.full_name} ({admin.email})</MenuItem>
                  ))}
                </Select>
              </Grid>
              { selected_admin && !selected_admin.birthday ?
                <>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                    <Grid item xl={6} lg={6} xs={6} sm={6} md={6}>
                      <DateField
                        classes={{root: classes.textFieldDatePicker}}
                        variant="outlined"
                        label={INDEX_DASHBOARD.birthdate}
                        name={'birthday'}
                        value={birthday}
                        onChange={this.onChange}
                        error={selected_admin && !selected_admin.birthday && this.saveDisabled()}
                        helperText={INDEX_DASHBOARD.birthdate_helper}
                      />
                    </Grid>
                  </Grid>
                </>
                :
                null
              }
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={this.onSave} disabled={this.saveDisabled()} variant={'contained'} color={'primary'} style={{textTransform: 'initial', color: 'white'}}>
                  {INDEX_DASHBOARD.save_button}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(IndexDashboard))
