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

export const feurstImgPath = './static/assets/img/feurst'


class Configurator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      machines: [],
      type: '',
      types: ['excavatrice', 'chargeuse', 'pelle-butte'],
      mark: '',
      marks: [],
      model: '',
      models: [],
      power: null,
      powers: [],
      weight: null,
      weights: [],
      bladeThickness: null,
      thicknesses: [],
      ground: null,
      grounds: [],
      teethShieldFixType: null,
      borderShieldFixType: null,
    }


    if (is_development()) {
      this.state={...this.state, step: 4,
        type: 'excavatrice', mark: 'CATERPILLAR', borderShieldFixType: 'PIN',
        teethShieldFixType: 'PIN',
        model: '374D L', weight: 75.5, power: 355,
        ground: 'GRAVIER', bladeShape: 'droite', bladeThickness: 70, phone: '0675774324',
        firstname: 'Gérard', name: 'Robert', company: 'COLAS', email: 'sebastien.auvray@my-alfred.io',
      }
    }
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios
      .get('/feurst/api/database')
      .then(res => {
        this.setState({
          machines: res.data.machines,
          thicknesses: res.data.thicknesses,
          grounds: res.data.grounds,
        })
        this.onMachinesChange(res.data.machines)
      })
      .catch(err => console.error(err))

    if (is_development()) {
      this.getPrecos()
    }
  }

  getPrecos = () => {
    setAxiosAuthentication()
    const data=lodash.pick(this.state, 'type mark model power weight bladeThickness ground borderShieldFixType teethShieldFixType bladeShape'.split(' '))
    axios.post('/feurst/api/preconisations', data)
      .then(res => {
        this.setState({
          precos: res.data,
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

  onMachinesChange = machines => {
    this.setState({
      machines: machines,
      // types: this.getList(machines, 'type'),
      marks: this.getList(machines, 'mark'),
      models: this.getList(machines, 'model'),
      powers: this.getList(machines, 'power'),
      weights: this.getList(machines, 'weight'),
    })
  }

  onTypeChange = type => {
    const {machines} = this.state
    const isShovel = type == 'shovel'
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
    })
  }

  onMarkChange = mark => {
    const {machines} = this.state
    this.setState({
      mark: mark,
      model: null,
      power: null,
      weight: null,
      models: this.getList(
        machines.filter(v => !mark || v.mark == mark),
        'model',
      ),
    })
    let list = this.getList(
      machines.filter(v => !mark || v.mark == mark),
      'type',
    )
    if (list.length == 1) {
      this.setState({type: list[0]})
    }
  }

  onModelChange = model => {
    const {machines} = this.state
    this.setState({model: model})
    let list = this.getList(
      machines.filter(v => v.model == model),
      'mark',
    )
    if (list.length == 1) {
      this.setState({mark: list[0]})
    }
    list = this.getList(
      machines.filter(v => v.model == model),
      'type',
    )
    if (list.length == 1) {
      this.setState({type: list[0]})
    }
    list = this.getList(
      machines.filter(v => v.model == model),
      'power',
    )
    if (list.length == 1) {
      this.setState({power: list[0]})
    }
    list = this.getList(
      machines.filter(v => v.model == model),
      'weight',
    )
    if (list.length == 1) {
      this.setState({weight: list[0]})
    }
  }

  onPowerChange = power => {
    this.setState({power: power})
  }

  onWeightChange = weight => {
    this.setState({weight: weight})
  }

  onBladeShapeChange = shape => {
    this.setState({bladeShape: shape})
  }

  onBucketWidthChange = width => {
    this.setState({bucketWidth: width})
  }

  onBladeThicknessChange = thickness => {
    this.setState({bladeThickness: thickness})
  }

  onGroundChange = ground => {
    this.setState({ground: ground})
  }

  onTeethShieldFixTypeChange = teethShieldFixType => {
    this.setState({teethShieldFixType: teethShieldFixType})
  }

  onBorderShieldFixTypeChange = borderShieldFixType => {
    this.setState({borderShieldFixType})
  }

  onFixTypeChange = fixType => {
    this.setState({fixType: fixType})
  }

  onCompanyChange = company => {
    this.setState({company: company})
  }

  onFirstnameChange = name => {
    this.setState({name: name})
  }

  onNameChange = name => {
    this.setState({name: name})
  }

  onEmailChange = email => {
    this.setState({email: email})
  }

  onPhoneChange = phone => {
    this.setState({phone: phone})
  }

  nextPage = () => {
    const {step} = this.state
    const newStep = Math.min(step + 1, STEPS.length - 1)
    //if (newStep == 3) {
      this.getPrecos()
    //}
    this.setState({step: newStep})
  }

  previousPage = () => {
    const {step} = this.state
    const newStep = Math.max(step - 1, 0)
    this.setState({step: newStep})
  }

  render = () => {
    const {step, precos} = this.state

    const {component, validator, menu} = STEPS[step]

    return (
      <Grid
        className="configurator relative"
      >

        {/** is_development() && JSON.stringify(lodash.omit(this.state, ['marks', 'machines', 'models', 'powers', 'weights', 'thicknesses', 'grounds']))*/}

        <h1 className='whereami'>{menu}</h1>
        <ProgressBar value={step} max={STEPS.length} />
        <div className="rounded-container m-4 p-4">
          {component({...this.state, ...this})}
          {/** JSON.stringify(precos) */}
        </div>
        <div className='flex justify-between w-full nextprevZone bg-white p-4'>
          <Button className='previous' disabled={step == 0} onClick={this.previousPage}>
            Précédent
          </Button>
          <Button className='next' disabled={!validator(this.state)} onClick={this.nextPage}>
            Suivant
          </Button>
        </div>
      </Grid>)

  }
}

module.exports = withTranslation('custom', {withRef: true})(Configurator)
