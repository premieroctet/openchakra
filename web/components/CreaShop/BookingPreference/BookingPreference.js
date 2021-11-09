import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import InputAdornment from '@material-ui/core/InputAdornment'
import axios from 'axios'
import styles from '../../../static/css/components/BookingPreference/BookingPreference'
import Checkbox from '@material-ui/core/Checkbox'
import {SHOP} from '../../../utils/i18n'
import '../../../static/assets/css/custom.css'

// FIX : réafficher la ville de référence

class BookingPreference extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deadline_unit: props.deadline_unit || 'jours',
      deadline_value: props.deadline_value || 1,
      minimum_basket: props.minimum_basket || 0,
      equipments: props.equipments || [],
    }
    this.onEquipmentChecked = this.onEquipmentChecked.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange = event => {
    let {name, value}=event.target
    if (['minimum_basket', 'deadline_value'].includes(name)) {
      value = parseInt(value)
      if (isNaN(value)) {
        return
      }
    }
    this.setState({[ name ]: value}, () => this.props.onChange(this.state))
  }

  componentDidMount() {
    axios.get(`/myAlfred/api/service/${this.props.service}`)
      .then(response => {
        let service = response.data
        this.setState({service: service})
      })
      .catch(error => {
        console.error(error)
      })
  }

  onEquipmentChecked(event) {
    const equipment_id = event.target.name
    let equipments = this.state.equipments
    if (equipments.includes(equipment_id)) {
      equipments = equipments.filter(id => id != equipment_id)
    }
    else {
      equipments.push(equipment_id)
    }
    this.setState({equipments: equipments}, () => this.props.onChange(this.state))
  }

  render() {
    const {classes, theme} = this.props
    const {service} = this.state

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.titleContainer}>
          <h2 className={classes.policySizeTitle}>{ReactHtmlParser(this.props.t('SHOP.preferences.title'))}</h2>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3 style={{color: '#403f3f'}} className={'custombookprefesubtitle'}>{ReactHtmlParser(this.props.t('SHOP.preferences.subtitle'))}</h3>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h4 className={`custombookprefedelay ${classes.policySizeSubtitle}`} style={{margin: 0}}>{ReactHtmlParser(this.props.t('SHOP.preferences.title_delay_prevenance'))} </h4>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <p className={`custombookprefexempledelay ${classes.policySizeContent}`}>{ReactHtmlParser(this.props.t('SHOP.preferences.example_delay'))}</p>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}} className={'custombookprefdelaycontainer'}>
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
            <Grid item xl={2} lg={2} md={6} sm={6} xs={12}>
              <TextField
                id="standard-start-adornment"
                variant={'outlined'}
                name={'deadline_value'}
                value={this.state.deadline_value}
                label={ReactHtmlParser(this.props.t('SHOP.preferences.label_delay_prevenance'))}
                style={{width: '100%'}}
                onChange={this.handleChange}
                classes={{root: 'custombookprefdelayfield'}}
              />
            </Grid>
            <Grid item xl={2} lg={2} md={6} sm={6} xs={12}>
              <TextField
                value={this.state.deadline_unit}
                name={'deadline_unit'}
                select
                variant="outlined"
                label={ReactHtmlParser(this.props.t('SHOP.preferences.units_dalay_prevenance'))}
                onChange={this.handleChange}
                style={{width: '100%'}}
                classes={{root: 'custombookprefperiod'}}
              >
                <MenuItem value="heures">{ReactHtmlParser(this.props.t('SHOP.preferences.hours'))}</MenuItem>
                <MenuItem value="jours">{ReactHtmlParser(this.props.t('SHOP.preferences.days'))}</MenuItem>
                <MenuItem value="semaines">{ReactHtmlParser(this.props.t('SHOP.preferences.weeks'))}</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={'custombookprefbasketcontainer'}>
          <h4 className={`custombookprefbaskettitle ${classes.policySizeSubtitle}`} style={{margin: 0}}>{ReactHtmlParser(this.props.t('SHOP.preferences.title_minimum_basket'))}</h4>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={'custombookprefbasketcontainer'}>
          <p className={`custombookprefbasketsubtilte ${classes.policySizeContent}`}>{ReactHtmlParser(this.props.t('SHOP.preferences.subtitle_minimum_basket'))}</p>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}} className={'custombookprefbasketcontainer'}>
          <Grid item xl={2} lg={2} md={6} sm={12} xs={12}>
            <TextField
              type="number"
              name={'minimum_basket'}
              style={{width: '100%'}}
              value={this.state.minimum_basket}
              classes={{root: 'custombookpreffieldbasket'}}
              label={ReactHtmlParser(this.props.t('SHOP.preferences.textfield_minimum_basket'))}
              variant="outlined"
              onChange={this.handleChange}
              InputProps={{
                inputProps: {
                  min: 0,
                },
                endAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
        {service && service.equipments.length > 0 ? <>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <h4 className={classes.policySizeSubtitle} style={{margin: 0}}>{ReactHtmlParser(this.props.t('SHOP.preferences.title_equipments'))}</h4>
          </Grid>
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
            <Grid container xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
              {service.equipments.map((result, index) => {
                const selected=this.state.equipments.includes(result._id)
                return (
                  <Grid key={index} item xl={1} lg={1} md={1} sm={1} xs={1}>
                    <label style={{cursor: 'pointer'}}>
                      <img
                        src={`/static/equipments/${result.logo}`}
                        height={100}
                        width={100}
                        alt={result.label}
                        title={result.label}
                        style={{filter: selected ? 'invert(3%) sepia(53%) saturate(1998%) hue-rotate(206deg) brightness(97%) contrast(88%)'
                          :
                          'invert(99%) sepia(0%) saturate(424%) hue-rotate(149deg) brightness(93%) contrast(88%)'}}
                      />
                      <Checkbox
                        style={{display: 'none'}}
                        color="primary"
                        type="checkbox"
                        name={result._id}
                        checked={selected}
                        onChange={this.onEquipmentChecked}/>
                    </label>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </> : null
        }
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles, {withTheme: true})(BookingPreference))
