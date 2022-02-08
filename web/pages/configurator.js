const {is_development} = require('../config/config')
const axios = require('axios')
const {setAxiosAuthentication} = require('../utils/authentication')
const {Button, Grid} = require('@material-ui/core')
const {withTranslation} = require('react-i18next')
const {STEPS} = require('./configurator/configuratorSteps')
import React from 'react'
const ProgressBar=require('../components/ProgressBar/ProgressBar')
const lodash=require('lodash')

class Configurator extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      step: 3,
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
      fixType: null,
      fixTypes: [['PIN', 'À claveter'], ['SOLD', 'À souder']],
    }

    if (is_development()) {
      this.state={...this.state,
        type: 'excavatrice', mark: 'CATERPILLAR', fixType: 'PIN',
        model: '374D L', weight: 75.5, power: 355,
        ground: 'GRAVIER', bladeShape: 'delta', bladeThickness: 70,
        name: 'Gérard Robert', company: 'COLAS', email: 'sebastien.auvray@my-alfred.io',
      }
    }
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
      })
      .catch(err => console.error(err))

    if (is_development()) {
      this.getPrecos()
    }
  }

  getPrecos = () => {
    setAxiosAuthentication()
    const data=lodash.pick(this.state, 'type mark model power weight bladeThickness ground fixType'.split(' '))
    axios.post('/feurst/api/preconisations', data)
      .then(res => {
        this.setState({
          precos: res.data,
        })
      })
      .catch(err => console.error(err))
  }

  getList = (data, attribute) => {
    return lodash.uniq(data.map(v => v[attribute])).sort((a, b) => (a==null ? -1 : b ==null ? 1 : a-b)).sort()
  }

  onMachinesChange = machines => {
    this.setState({
      machines: machines,
      types: this.getList(machines, 'type'),
      marks: this.getList(machines, 'mark'),
      models: this.getList(machines, 'model'),
      powers: this.getList(machines, 'power'),
      weights: this.getList(machines, 'weight'),
    })
  }

  onTypeChange = type => {
    const {machines}=this.state
    const isShovel=type=='shovel'
    this.setState({
      type: type, mark: null, model: null, power: null, weight: null,
      marks: isShovel && [] || this.getList(machines.filter(v => v.type==type), 'mark'),
      models: isShovel && [] || this.getList(machines.filter(v => v.type==type), 'model'),
      powers: isShovel && [] || this.getList(machines.filter(v => v.type==type), 'power'),
      weights: isShovel && [] || this.getList(machines.filter(v => v.type==type), 'weight'),
    })
  }

  onMarkChange = mark => {
    const {machines}=this.state
    this.setState({
      mark: mark, model: null, power: null, weight: null,
      models: this.getList(machines.filter(v => !mark || v.mark==mark), 'model'),
    })
    let list=this.getList(machines.filter(v => !mark || v.mark==mark), 'type')
    if (list.length==1) { this.setState({type: list[0]}) }
  }

  onModelChange = model => {
    const {machines}=this.state
    this.setState({model: model})
    let list=this.getList(machines.filter(v => v.model==model), 'mark')
    if (list.length==1) { this.setState({mark: list[0]}) }
    list=this.getList(machines.filter(v => v.model==model), 'type')
    if (list.length==1) { this.setState({type: list[0]}) }
    list=this.getList(machines.filter(v => v.model==model), 'power')
    if (list.length==1) { this.setState({power: list[0]}) }
    list=this.getList(machines.filter(v => v.model==model), 'weight')
    if (list.length==1) { this.setState({weight: list[0]}) }
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

  onFixTypeChange = fixType => {
    this.setState({fixType: fixType})
  }

  onCompanyChange = company => {
    this.setState({company: company})
  }

  onNameChange = name => {
    this.setState({name: name})
  }

  onEmailChange = email => {
    this.setState({email: email})
  }

  nextPage = () => {
    const {step}=this.state
    const newStep=Math.min(step+1, STEPS.length-1)
    if (newStep==3) {
      this.getPrecos()
    }
    this.setState({step: newStep})
  }

  previousPage = () => {
    const {step}=this.state
    const newStep=Math.max(step-1, 0)
    this.setState({step: newStep})
  }

  render = () => {

    const {step, precos}=this.state

    const {component, validator, menu}=STEPS[step]

    return (
      <Grid style={{width: '80%', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} className='configurator'>
        <h6>{is_development() && JSON.stringify(lodash.omit(this.state, ['marks', 'machines', 'models', 'powers', 'weights', 'thicknesses', 'grounds']))}</h6>
        <ProgressBar value={step} max={STEPS.length} />
        <h1>{menu}</h1>
        { component({...this.state, ...this}) }
        {JSON.stringify(precos)}
        <Grid>
          <Button disabled={step==0} onClick={this.previousPage}>Précédent</Button>
          <Button disabled={!validator(this.state)} onClick={this.nextPage}>Suivant</Button>
        </Grid>
      </Grid>
    )
  }

}

module.exports =withTranslation('custom', {withRef: true})(Configurator)
