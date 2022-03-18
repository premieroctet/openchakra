const {
  BLADE_SHAPES,
  FIX_TYPES,
  PELLE_BUTTE,
} = require('../utils/consts')
import React from 'react'

import '../static/feurst.css'

const {is_development} = require('../config/config')
const axios = require('axios')
const {setAxiosAuthentication} = require('../utils/authentication')
const {Button, Grid} = require('@material-ui/core')
const {withTranslation} = require('react-i18next')
const {STEPS} = require('./configurator/configuratorSteps')
const ProgressBar = require('../components/ProgressBar/ProgressBar')
const lodash = require('lodash')
const {snackBarError, snackBarSuccess} = require('../utils/notifications')
const validateFeurstProspect=require('../server/validation/feurstProspect')
import parsePhoneNumber from 'libphonenumber-js'

export const feurstImgPath = './static/assets/img/feurst'

const utilizeFocus = () => {
  const ref = React.createRef()
  const setFocus = () => { ref.current && ref.current.focus() }
  return {ref, setFocus}
}
class Configurator extends React.Component {
  constructor(props) {
    super(props)
    this.titleFocus = utilizeFocus()
    this.state = {
      error: null,
      step: 0,
      machines: [],
      type: '',
      mark: '',
      marks: [],
      model: '',
      models: [],
      power: null,
      powers: [],
      weight: null,
      weights: [],
      teeth_count: null,
      bladeShape: null,
      bladeThickness: null,
      bucketWidth: null,
      thicknesses: [],
      ground: null,
      grounds: {},
      teethShieldFixType: null,
      borderShieldFixType: null,
      auto_quotation: false,
    }

  }

  onResize = () => {
    // Obviously you can format your data object however you want
    window.parent.postMessage({
      type: 'resize',
      height: document.body.scrollHeight,
    }, '*')
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get('/feurst/api/database')
      .then(res => {
        this.setState({
          machines: res.data.machines,
          thicknesses: res.data.thicknesses,
          grounds: res.data.grounds,
        })
        this.onMachinesChange(res.data.machines)
        this.onResize() // Invoke the handler manually once initially
      })
      .catch(err => console.error(err))

    if (is_development()) {
      this.getPrecos()
    }

    (new ResizeObserver(() =>
      this.onResize(),
    )).observe(document.body)

  }

  getPrecos = () => {
    setAxiosAuthentication()
    const data=lodash.pick(this.state, 'type mark model power weight bladeThickness ground borderShieldFixType teethShieldFixType bladeShape bucketWidth'.split(' '))
    axios.get('/feurst/api/auto_quotation_available', {params: data})
      .then(res => {
        this.setState({
          auto_quotation: res.data,
        })
      })
      .catch(err => console.error(err))
  }

  getList = (data, attribute) => {
    return lodash
      .uniq(data.map(v => v[attribute]))
      .sort((a, b) => (a == null ? -1 : b == null ? 1 : a - b))
      .sort()
  }

  updateThicknesses = () => {
    const params=lodash.pick(this.state, 'type mark model weight power ground bladeShape'.split(' '))
    setAxiosAuthentication()
    axios.get('/feurst/api/thicknesses', {params: params})
      .then(res => {
        const st=res.data
        if (st.thicknesses.length==1) {
          st.bladeThickness=st.thicknesses[0]
        }
        else if (st.thicknesses.length>0 && !st.thicknesses.includes(this.state.bladeThickness)) {
          st.bladeThickness=null
        }
        this.setState(st)
      })
  }

  onMachinesChange = machines => {
    this.setState({
      machines: machines,
      marks: this.getList(machines, 'mark'),
      models: this.getList(machines, 'model'),
      powers: this.getList(machines, 'power'),
      weights: this.getList(machines, 'weight'),
    }, () => this.updateThicknesses())
  }

  onTypeChange = type => {

    const {machines} = this.state
    const isShovel = type == PELLE_BUTTE

    this.setState({
      type: type,
      mark: null,
      model: null,
      power: null,
      weight: null,
      marks:
        (isShovel && []) ||
        this.getList(
          machines.filter(v => v.type == type),
          'mark',
        ),
      models:
        (isShovel && []) ||
        this.getList(
          machines.filter(v => v.type == type),
          'model',
        ),
      powers:
        (isShovel && []) ||
        this.getList(
          machines.filter(v => v.type == type),
          'power',
        ),
      weights:
        (isShovel && []) ||
        this.getList(
          machines.filter(v => v.type == type),
          'weight',
        ),
    }, () => this.updateThicknesses())
  }

  onMarkChange = mark => {
    const {machines, type} = this.state
    let typeMachine = this.getList(
      machines.filter(v => !mark || v.mark == mark),
      'type',
    )

    const nextState = {
      mark: mark,
      power: null,
      weight: null,
      models: this.getList(
        machines.filter(v => (!mark || v.mark == mark) && (!type || v.type==type)),
        'model',
      ),
    }

    // Nouveau modèle : reset infos sur lame et fixations boucliers
    Object.assign(nextState, {
      bladeShape: null, bladeThickness: null, bucketWidth: null,
      teethShieldFixType: null, borderShieldFixType: null},
    )

    if (!nextState.models.includes(this.state.model)) {
      Object.assign(nextState, {model: null})
    }
    typeMachine.length == 1 && Object.assign(nextState, {type: typeMachine[0]})
    this.setState(nextState)
  }

  onModelChange = model => {
    const {machines} = this.state
    const nextState = {model}

    // Nouveau modèle : reset infos sur lame et fixations boucliers
    Object.assign(nextState, {
      bladeShape: null, bladeThickness: null, bucketWidth: null,
      teethShieldFixType: null, borderShieldFixType: null},
    )

    let brand = this.getList(
      machines.filter(v => v.model == model),
      'mark',
    )
    brand.length == 1 && Object.assign(nextState, {mark: brand[0]})

    let typeMachine = this.getList(
      machines.filter(v => v.model == model),
      'type',
    )
    typeMachine.length == 1 && Object.assign(nextState, {type: typeMachine[0]})

    let powerMachine = this.getList(
      machines.filter(v => v.model == model),
      'power',
    ) || ['']
    powerMachine.length == 1 && Object.assign(nextState, {power: powerMachine[0], powers: powerMachine})

    let machineWeight = this.getList(
      machines.filter(v => v.model == model),
      'weight',
    )

    machineWeight.length >= 1 && Object.assign(nextState, {weight: machineWeight[0], weights: machineWeight})

    this.setState(nextState, () => this.updateThicknesses())
  }

  onPowerChange = power => {
    this.setState({power}, () => this.updateThicknesses())
  }

  onWeightChange = weight => {
    let castWeightString = typeof weight === 'string' ? Number(weight.replace(/,/g, '.')) : weight
    this.setState({weight: castWeightString}, () => this.updateThicknesses())
  }

  onBladeShapeChange = bladeShape => {
    if (!Object.keys(BLADE_SHAPES).includes(bladeShape)) {
      return console.error(`Invalid blade shape:${bladeShape}`)
    }
    this.setState({bladeShape: bladeShape}, () => this.updateThicknesses())
  }

  onBucketWidthChange = width => {
    this.setState({bucketWidth: width})
  }

  onBladeThicknessChange = thickness => {
    this.setState({bladeThickness: thickness})
  }

  onGroundChange = ground => {
    this.setState({ground}, () => this.updateThicknesses())
  }

  onTeethShieldFixTypeChange = teethShieldFixType => {
    if (!Object.keys(FIX_TYPES).includes(teethShieldFixType)) {
      return console.error(`Invalid border shield fix type:${teethShieldFixType}`)
    }
    this.setState({teethShieldFixType})
  }

  onBorderShieldFixTypeChange = borderShieldFixType => {
    if (!Object.keys(FIX_TYPES).includes(borderShieldFixType)) {
      return console.error(`Invalid teeth shield fix type:${borderShieldFixType}`)
    }
    this.setState({borderShieldFixType})
  }

  onFixTypeChange = fixType => {
    this.setState({fixType})
  }

  isValueExpected = fieldname => {
    const {errors} = validateFeurstProspect(this.state)
    if (errors[fieldname]) {
      this.setState({error: {...this.state.error, [fieldname]: errors[fieldname]}})
    }
  }

  onPhoneChange = (numberPhone, langIsoCode, checkThisPhone=false) => {
    const checkPhone = parsePhoneNumber(numberPhone, langIsoCode)
    let phoneError = null
    if (checkThisPhone) {
      const {errors} = validateFeurstProspect({...this.state, 'phone': checkPhone?.number})
      phoneError = errors?.phone || null
    }

    this.setState({
      'phone': checkPhone?.number || numberPhone, error: {...this.state.error, phone: phoneError}})
  }

  onValueChange = ({inputName, value}) => {
    this.setState({[inputName]: value, error: {...this.state.error, [inputName]: null}})
  }

  nextPage = () => {
    const {step} = this.state
    const newStep = Math.min(step + 1, STEPS.length - 1)
    // if (newStep == 3) {
    this.getPrecos()
    // }
    this.setState({step: newStep})
    this.titleFocus.setFocus()
  }

  previousPage = () => {
    const {step} = this.state
    const newStep = Math.max(step - 1, 0)
    this.setState({step: newStep})
    this.titleFocus.setFocus()
  }

  sendAutoQuotation = () => {
    // TODO Envoyer le PDF ou le générer sur le serveur
    setAxiosAuthentication()

    const data=lodash.pick(this.state,
      'type,mark,model,weight,power,bladeShape,bladeThickness,bucketWidth,teethShieldFixType,borderShieldFixType,ground,firstname,name,company,phone,email'.split(','))
    axios.post('/feurst/api/auto_quotation', data)
      .then(() => {
        snackBarSuccess('Préconisation envoyée')
      })
      .catch(err => {
        console.error(err)
        snackBarError(JSON.stringify(err.response.data))
      })
  }

  sendCustomQuotation = () => {
    // TODO Envoyer le PDF ou le générer sur le serveur
    setAxiosAuthentication()

    const data=lodash.pick(this.state,
      'type,mark,model,weight,power,bladeShape,bladeThickness,bucketWidth,teethShieldFixType,borderShieldFixType,ground,firstname,name,company,phone,email'.split(','))
    axios.post('/feurst/api/custom_quotation', data)
      .then(() => {
        snackBarSuccess('Demande envoyée')
      })
      .catch(err => {
        console.error(err)
        this.setState({error: err.response.data})
        snackBarError(JSON.stringify(err.response.data))
      })
  }

  render = () => {
    const {step} = this.state
    const {t} = this.props
    const {component, validator, menu} = STEPS[step]

    return (
      <Grid
        className="configurator relative"
      >
        <a ref={this.titleFocus.ref} href='#'></a> {/* Lien pour remonter le focus suite actions "précédent" "suivant" */}
        <h1 className='whereami'>{t(menu)}</h1>
        <ProgressBar value={step} max={STEPS.length} label={t('PROGRESS_BAR.step_label')}/>
        <div className='app-container flex flex-col justify-between'>
          <div className="rounded-container m-4 p-4" >
            {component({...this.state, ...this})}
          </div>
          <div className='flex justify-between w-full bg-white p-4 mb-6'>
            {step !== 0 ?
              <Button className='previous' disabled={step == 0} onClick={this.previousPage}>
                {t('NAVIGATION.previous')}
              </Button> : <div></div>}
            {STEPS.length - 1 !== step ? <Button className='next' disabled={!validator(this.state)} onClick={this.nextPage}>
              {t('NAVIGATION.next')}
            </Button> : null}


            {STEPS.length - 1 === step &&
          <div className='flex gap-x-4'>
            <Button className='previous' disabled={!validator(this.state)} onClick={this.sendCustomQuotation}>
              {t('SUMMARY.contact_expert')}
            </Button>
            {this.state.auto_quotation && <Button className='next' disabled={!validator(this.state)} onClick={this.sendAutoQuotation}>
              {t('SUMMARY.receive_quotation')}
            </Button>}
          </div>
            }
          </div>
        </div>
      </Grid>)

  }
}


module.exports = withTranslation('feurst', {withRef: true})(Configurator)
