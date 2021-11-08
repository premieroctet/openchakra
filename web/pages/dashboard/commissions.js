import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import {setAxiosAuthentication} from '../../utils/authentication'
import {
  Button,
  Checkbox,
  Fab,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import axios from 'axios'
import {withTranslation} from 'react-i18next'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import DashboardLayout from '../../hoc/Layout/DashboardLayout'
import Grid from '@material-ui/core/Grid'
import SaveIcon from '@material-ui/icons/Save'

import dashboardstyles from '../../static/css/components/CompanyDashboard/CompanyDashboard'
import custom from '../../static/assets/css/custom.css'

const styles = theme => ({
  ...dashboardstyles(theme),
  ...custom,
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',
  },
  'example::-webkit-scrollbar': {
    display: 'none',
  },
  paddingList: {
    backgroundColor: theme.palette.primary.main,
  },
})

class Commissions extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      providerFee: '',
      providerDestinee: null,
      customerFee: '',
      customerDestinee: null,
      companies: [],
    }
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/companies/all')
      .then(result => {
        this.setState({companies: result.data})
      })
      .catch(err => {
        console.error(err)
      })
    axios.get('/myAlfred/api/admin/customizations')
      .then(result => {
        const custo = result.data
        this.setState({
          providerFee: custo && custo.provider_fee && custo.provider_fee.rate*100.0 || '',
          providerDestinee: custo && custo.provider_fee && custo.provider_fee.destinee || null,
          customerFee: custo && custo.customer_fee && custo.customer_fee.rate*100.0 || '',
          customerDestinee: custo && custo.customer_fee && custo.customer_fee.destinee || null,
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  onFeeChanged = event => {
    const {name, value}=event.target
    const floatValue=parseFloat(value)
    if (!value || (floatValue>=0 && floatValue<=100)) {
      this.setState({[name]: floatValue})
    }
  }

  onFeeChecked = event => {
    const {name, checked} = event.target
    this.setState({[name]: checked ? 0: ''})
    if (!checked) {
      const key=name=='providerFee' ? 'providerDestinee' : 'customerDestinee'
      this.setState({[key]: null})
    }
  }

  onDestineeChanged = event => {
    const {name, value}=event.target
    this.setState({[name]: value})
  }

  canSave = () => {
    const {providerFee, providerDestinee, customerFee, customerDestinee}=this.state
    return ((typeof providerFee =='number') == !!providerDestinee)
      && ((typeof customerFee =='number') == !!customerDestinee)
  }

  onSave = () => {
    const {providerFee, providerDestinee, customerFee, customerDestinee}=this.state

    let data={provider_fee: null, customer_fee: null}
    if (providerFee) {
      data.provider_fee={rate: providerFee/100.0, destinee: providerDestinee}
    }
    if (customerFee) {
      data.customer_fee={rate: customerFee/100.0, destinee: customerDestinee}
    }
    setAxiosAuthentication()
    axios.put('/myAlfred/api/admin/customizations', data)
      .then(() => {
        snackBarSuccess('Configuration modifiée')
        this.componentDidMount()
      })
      .catch(err => {
        snackBarError(err.response.data)
      })
  }

  render = () => {
    const {providerFee, customerFee, providerDestinee, customerDestinee, companies}=this.state

    return (
      <DashboardLayout title='Commissions'>
        <Grid style={{display: 'flex', flexDirection: 'column', margin: '10px'}}>
          <span>
            <FormControlLabel
              label="Commission sur le prestataire de"
              control={<Checkbox checked={typeof providerFee =='number'}/>}
              name='providerFee'
              onChange={this.onFeeChecked}
            />
            <TextField
              type="number"
              name='providerFee'
              value={providerFee}
              onChange={this.onFeeChanged}
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
            />
            <FormControlLabel
              label="versée à"
              labelPlacement={'start'}
              name='providerDestinee'
              onChange={this.onDestineeChanged}
              value={providerDestinee}
              control={
                <Select>
                  {companies.map(e => (
                    <MenuItem key={e._id} value={e._id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </span>
          <span>
            <FormControlLabel
              label="Commission sur le client de"
              control={<Checkbox checked={typeof customerFee == 'number'}/>}
              name='customerFee'
              onChange={this.onFeeChecked}
            />
            <TextField
              type="number"
              name='customerFee'
              value={customerFee}
              onChange={this.onFeeChanged}
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
            />
            <FormControlLabel
              label="versée à"
              labelPlacement={'start'}
              name='customerDestinee'
              onChange={this.onDestineeChanged}
              value={customerDestinee}
              control={
                <Select>
                  {companies.map(e => (
                    <MenuItem key={e._id} value={e._id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </span>
          <Button variant={'outlined'} label='Enregistrer' disabled={!this.canSave()} onClick={this.onSave}>Enregistrer</Button>
        </Grid>
        <Grid style={{position: 'fixed', bottom: '10px', right: '100px'}}>
          <Fab color="primary" aria-label="CheckIcon" disabled={!this.canSave()} onClick={this.onSave}>
            <SaveIcon />
          </Fab>
        </Grid>
      </DashboardLayout>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Commissions))
