const axios = require('axios');
const { setAxiosAuthentication } = require('../utils/authentication');
const {Button, Grid} = require('@material-ui/core')
const {withTranslation} = require('react-i18next')
const {STEPS} = require('./configurator/configuratorSteps')
const React = require('react')
const ProgressBar=require('../components/ProgressBar/ProgressBar')

class Configurator extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      step: 0,
      models: []
    }
    //setInterval(() => this.nextPage(), 2000)
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
        {label: 'Carrière/Mining', value: 'career'},
        {label: 'Construction', value: 'building'},
      ]
    }
    if (step==2) {
      const poids=(this.state.job=='career' ?
      ['30-39', '40-49', '50-85', '85-150', '150-200', '200-350']
      :['0-5', '5-10', '10-13', '13-18', '18-25', '25-35'])
      .map(v=> { return {label: `${v}T`, value: v}})
      return poids
    }
    if (step==3) {
      return ['Standard', 'HD', 'XHD'].map(v=> { return {label: v, value: v.toLowerCase()}})
    }
    return []
  }

  render = () => {
    const {step}=this.state
    const {component, validator, menu}=STEPS[step]
    const values=this.getValues(step)

    return (
      <Grid style={{width: '80%', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} classname='configurator'>
        <ProgressBar value={step} max={STEPS.length} />
        <h1>{menu}</h1>
        { component({...this.state, onChange: this.onChange, values: values}) }
        <Grid>
          <Button disabled={step==0} onClick={this.previousPage}>Précédent</Button>
          <Button disabled={!validator(this.state)} onClick={this.nextPage}>Suivant</Button>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(Configurator)
