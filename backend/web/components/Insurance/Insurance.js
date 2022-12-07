import {
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from '@material-ui/core'

import {INSURANCE_TYPES} from '../../utils/consts'
import {withTranslation} from 'react-i18next'
import React from 'react'

class Insurance extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      insurances: this.props.items || [],
    }
  }

  onChange = kind => event => {
    const {name, value}=event.target
    let {insurances}=this.state
    let item=insurances.find(it => it.kind==kind)
    if (!item) {
      insurances.push({kind: kind, [name]: value})
    }
    else if (value && value.length>0) {
      item[name]=value
    }
    else {
      insurances = insurances.filter(it => it.kind!=kind)
    }
    this.setState({insurances: insurances})
    this.props.onChange && this.props.onChange({target: {name: this.props.name, value: insurances}})
  }

  insurance = (kind, label) => {
    const {insurances} = this.state
    const item=insurances.find(it => it.kind==kind) || {}
    const error = item && (Boolean(item.company)!=Boolean(item.contract_number))
    return (
      <>
        <Typography style={{marginBottom: '10px'}}>{label}</Typography>
        <TextField style={{marginRight: '20px'}}
          label={'Compagnie'}
          name={'company'}
          value={item.company}
          onChange={this.onChange(kind)}
          variant={'outlined'}
          InputLabelProps={{shrink: true}}
          placeholder={'Compagnie'}
          error={error && !item.company}
        />
        <TextField
          label={'N° de contrat'}
          name={'contract_number'}
          value={item.contract_number}
          onChange={this.onChange(kind)}
          variant={'outlined'}
          InputLabelProps={{shrink: true}}
          placeholder={'N° de contrat'}
          error={error}
          error={error && !item.contract_number}
        />
      </>
    )
  }

  render() {
    return (
      <div>
        { Object.entries(INSURANCE_TYPES).map(entry => (
          <div style={{margin: '10px'}}>{this.insurance(entry[0], entry[1])}</div>
        ))}
      </div>
    )
  }
}

export default withTranslation(null, {withRef: true})(Insurance)
