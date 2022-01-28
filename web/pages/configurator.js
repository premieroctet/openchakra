const axios = require('axios')
const {setAxiosAuthentication} = require('../utils/authentication')
const {Button, Grid} = require('@material-ui/core')
const {withTranslation} = require('react-i18next')
const {STEPS} = require('./configurator/configuratorSteps')
const React = require('react')
const ProgressBar=require('../components/ProgressBar/ProgressBar')
const lodash=require('lodash')

class Configurator extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      step: 0,
      models: [],
    }
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get('/feurst/api/database')
      .then(res => {
        this.setState({models: res.data})
      })
      .catch(err => console.error(err))
  }

  onChange= event => {
    const {name, value}=event.target
    this.setState({[name]: value})
  }

  nextPage = () => {
    let {step}=this.state
    step=Math.min(step+1, STEPS.length-1)
    this.setState({step: step})
  }

  previousPage = () => {
    let {step}=this.state
    step=Math.max(step-1, 0)
    this.setState({step: step})
  }

  getValues = step => {
    if (step==0) {
      return this.state.models
    }
    if (step==1) {
      return [
        {label: 'Terre/gravat/Tout venant', value: 'standard'},
        {label: 'Basalte/Calcaire/Marbre', value: 'hd'},
        {label: 'Granit/Porphyre/Rhyolite', value: 'xhd'},
      ]
    }
    return []
  }

  render = () => {
    const {step}=this.state
    const {component, validator, menu}=STEPS[step]
    const values=this.getValues(step)

    return (
      <Grid style={{width: '80%', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} classname='configurator'>
        <h6>{JSON.stringify(lodash.omit(this.state, 'models'))}</h6>
        <ProgressBar value={step} max={STEPS.length} />
        <h1>{menu}</h1>
        { component({...this.state, onChange: this.onChange}) }
        <Grid>
          <Button disabled={step==0} onClick={this.previousPage}>Précédent</Button>
          <Button disabled={!validator(this.state)} onClick={this.nextPage}>Suivant</Button>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(Configurator)
